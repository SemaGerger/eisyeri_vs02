#!/usr/bin/env python3
"""Create Eşit İşyeri web media, preserving source files.

Requires ffmpeg, ffprobe, ImageMagick (magick), and cwebp on PATH.
Run: python3 scripts/optimize-media.py [--jobs 3] [--verify-only]
Full news videos keep their complete timeline, frame rate, picture and audio.
Only hero-loop.mp4 is deliberately shortened to twelve seconds and muted.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import os
import shutil
import struct
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/assets"
OUTPUT = ASSETS / "optimized"
PUBLIC = ROOT / "public"
MANIFEST = ROOT / "medya-metadata.json"
TOOLS = {name: shutil.which(name) for name in ("ffmpeg", "ffprobe", "magick", "cwebp")}

IMAGES = [
    ("logos/esitisyeri-kalp-logo.png", "site-logo.webp", 512, None),
    ("logos/esitisyeri-yazisi-logo.png", "site-wordmark.webp", 512, None),
    ("logos/esitisyeri-white.png", "white-wordmark.webp", 600, None),
    ("logos/esitIsyeriLogo.png", "esit-isyeri-logo.webp", 600, None),
    ("logos/bcekmecebldlogo.png", "belediye-logo.webp", 600, None),
    ("images/HasanAkgun.png", "president.webp", 1000, 86),
    ("images/tescil.png", "tescil.webp", 1400, None),
]
IMAGES += [(f"images/about/Image{i}.jpg", f"about-{i}.webp", 1400, 84) for i in range(1, 4)]
IMAGES += [(f"images/press/esitisyeri_press{i}.jpeg", f"press-photo-{i}.webp", 2200, 86) for i in range(1, 4)]
IMAGES += [(f"images/TBB/photo{i}.jpeg", f"tbb-photo-{i}.webp", 1400, 83) for i in range(1, 7)]
IMAGES += [(f"images/partners/{i}.{'jpeg' if i == 1 else 'jpg'}", f"partner-{i}.webp", 1400, 83) for i in range(1, 7)]
MOVIES = [
    ("videos/esitIsyeriVideo.mp4", "esit-isyeri-film.mp4", "hero-poster.webp", 2, 26),
    ("videos/press/basindabiz.mp4", "now-news.mp4", "now-poster.webp", 8, 25),
    ("videos/press/KRT.mp4", "krt-news.mp4", "krt-poster.webp", 12, 25),
    ("videos/press/Tele1.mp4", "tele1-news.mp4", "tele1-poster.webp", 12, 25),
    ("videos/press/HalkTv2.mp4", "halk-tv-news.mp4", "halk-tv-poster.webp", 12, 25),
    ("videos/press/Tv5.mp4", "tv5-news.mp4", "tv5-poster.webp", 12, 25),
    ("videos/press/HalkTv.mp4", "halk-tv-2-news.mp4", "halk-tv-2-poster.webp", 12, 25),
    ("videos/press/FlashTv.mp4", "flash-tv-news.mp4", "flash-tv-poster.webp", 12, 25),
    ("videos/press/45lik.mp4", "45lik-news.mp4", "45lik-poster.webp", 8, 26),
]
ICONS = [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]


def run(*args):
    result = subprocess.run([str(arg) for arg in args], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode:
        raise RuntimeError(f"Command failed: {args[0]}\n{result.stderr[-4000:]}")
    return result.stdout


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def probe(path):
    return json.loads(run(TOOLS["ffprobe"], "-v", "error", "-show_entries",
                         "stream=codec_type,codec_name,pix_fmt,width,height,r_frame_rate,avg_frame_rate,nb_frames,duration,channels,sample_rate:format=duration",
                         "-of", "json", path))


def faststart(path):
    atoms = []
    with path.open("rb") as file:
        while True:
            offset = file.tell()
            header = file.read(8)
            if len(header) < 8:
                break
            size, kind = struct.unpack(">I4s", header)
            if size == 1:
                size = struct.unpack(">Q", file.read(8))[0]
            if size == 0:
                size = path.stat().st_size - offset
            if size < 8:
                raise RuntimeError(f"Invalid MP4 atom in {path.name}")
            atoms.append(kind.decode("ascii", "replace"))
            file.seek(offset + size)
    return "moov" in atoms and "mdat" in atoms and atoms.index("moov") < atoms.index("mdat")


def encode_image(item):
    source, target, maximum, quality = item
    target_path = OUTPUT / target
    with tempfile.TemporaryDirectory(prefix="eisyeri-image-") as temporary:
        image = Path(temporary) / "scaled.png"
        run(TOOLS["magick"], ASSETS / source, "-auto-orient", "-resize", f"{maximum}x{maximum}>", "-strip", image)
        options = ["-lossless", "-z", 9] if quality is None else ["-q", quality, "-m", 6]
        run(TOOLS["cwebp"], "-quiet", *options, image, "-o", target_path)
    print(f"Image ready: {target} ({target_path.stat().st_size:,} bytes)", flush=True)


def movie_options(target):
    return ["-c:v", "libx264", "-threads", 2, "-preset", "medium", "-pix_fmt", "yuv420p",
            "-profile:v", "high", "-level:v", "3.1", "-movflags", "+faststart", target]


def encode_movie(item):
    source, target, poster, moment, crf = item
    target_path = OUTPUT / target
    temporary = target_path.with_suffix(".tmp.mp4")
    run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-i", ASSETS / source,
        "-map", "0:v:0", "-map", "0:a?", "-map_metadata", -1,
        "-vf", "scale='min(1280,iw)':-2", "-fps_mode", "passthrough",
        "-crf", crf, "-c:a", "aac", "-b:a", "96k", *movie_options(temporary))
    # Already efficient H.264/AAC sources should not get larger or lose quality.
    if temporary.stat().st_size >= (ASSETS / source).stat().st_size * 0.98:
        existing = probe(ASSETS / source)["streams"]
        can_copy = all(stream["codec_name"] == ("h264" if stream["codec_type"] == "video" else "aac")
                       for stream in existing if stream["codec_type"] in ("video", "audio"))
        can_copy = can_copy and all(stream.get("pix_fmt") == "yuv420p" for stream in existing if stream["codec_type"] == "video")
        if can_copy:
            if faststart(ASSETS / source):
                shutil.copyfile(ASSETS / source, temporary)
            else:
                run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-i", ASSETS / source,
                    "-map", "0:v:0", "-map", "0:a?", "-map_metadata", -1, "-c", "copy", "-movflags", "+faststart", temporary)
            print(f"Kept efficient source streams without generation loss: {target}", flush=True)
    os.replace(temporary, target_path)
    with tempfile.TemporaryDirectory(prefix="eisyeri-poster-") as directory:
        frame = Path(directory) / "frame.png"
        run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-ss", moment,
            "-i", ASSETS / source, "-frames:v", 1, "-vf", "scale='min(1200,iw)':-2", frame)
        run(TOOLS["cwebp"], "-quiet", "-q", 85, "-m", 6, frame, "-o", OUTPUT / poster)
    print(f"Full movie ready: {target} ({target_path.stat().st_size:,} bytes)", flush=True)


def make_hero():
    path = OUTPUT / "hero-loop.mp4"
    run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-y", "-i",
        ASSETS / "videos/esitIsyeriVideo.mp4", "-t", 12, "-an", "-map_metadata", -1,
        "-vf", "fps=24,scale='min(1280,iw)':-2", "-crf", 28, *movie_options(path))
    print(f"Hero loop ready: {path.stat().st_size:,} bytes", flush=True)


def make_icons():
    source = ASSETS / "logos/esitisyeri-kalp-logo.png"
    for size, target in ICONS:
        run(TOOLS["magick"], source, "-resize", f"{size}x{size}", "-background", "none", "-gravity", "center",
            "-extent", f"{size}x{size}", "-strip", "-define", "png:compression-level=9", PUBLIC / target)


def file_record(source, target, kind, **other):
    return {"source": str(source.relative_to(ROOT)), "path": str(target.relative_to(ROOT)), "kind": kind,
            "sourceBytes": source.stat().st_size, "sourceSha256": sha256(source),
            "bytes": target.stat().st_size, "sha256": sha256(target), **other}


def image_record(source, target, kind):
    width, height = map(int, run(TOOLS["magick"], "identify", "-format", "%w %h", target).split())
    return file_record(source, target, kind, width=width, height=height)


def movie_record(item):
    source, target, _, _, _ = item
    source_path, target_path = ASSETS / source, OUTPUT / target
    original, encoded = probe(source_path), probe(target_path)
    source_video = next(stream for stream in original["streams"] if stream["codec_type"] == "video")
    video = next(stream for stream in encoded["streams"] if stream["codec_type"] == "video")
    audio = [stream for stream in encoded["streams"] if stream["codec_type"] == "audio"]
    original_audio = [stream for stream in original["streams"] if stream["codec_type"] == "audio"]
    duration, source_duration = float(encoded["format"]["duration"]), float(original["format"]["duration"])
    delta = abs(duration - source_duration)
    checks = {"fullDurationPreserved": delta <= 0.15, "durationDeltaSeconds": round(delta, 6),
              "frameCountPreserved": source_video.get("nb_frames") == video.get("nb_frames"),
              "frameRatePreserved": source_video.get("r_frame_rate") == video.get("r_frame_rate"),
              "dimensionsPreserved": (source_video["width"], source_video["height"]) == (video["width"], video["height"]),
              "audioStreamCountPreserved": len(audio) == len(original_audio),
              "audioChannelsPreserved": [s.get("channels") for s in audio] == [s.get("channels") for s in original_audio],
              "audioSampleRatePreserved": [s.get("sample_rate") for s in audio] == [s.get("sample_rate") for s in original_audio],
              "h264": video["codec_name"] == "h264", "yuv420p": video["pix_fmt"] == "yuv420p",
              "aac": all(stream["codec_name"] == "aac" for stream in audio), "faststart": faststart(target_path)}
    if any(checks[key] is not True for key in checks if key != "durationDeltaSeconds"):
        raise RuntimeError(f"Movie validation failed: {target}: {checks}")
    # Decode the complete video and all audio streams, not merely the container header.
    run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-xerror", "-i", target_path,
        "-map", "0:v", "-map", "0:a?", "-f", "null", "-")
    checks["fullDecodePassed"] = True
    print(f"Verified complete audio/video: {target} ({duration:.3f}s)", flush=True)
    return file_record(source_path, target_path, "full-video", duration=duration, sourceDuration=source_duration,
                       streams=encoded["streams"], verification=checks)


def verify_all():
    records = [image_record(ASSETS / source, OUTPUT / target, "image") for source, target, _, _ in IMAGES]
    with ThreadPoolExecutor(max_workers=2) as pool:
        records += list(pool.map(movie_record, MOVIES))
    for source, _, poster, moment, _ in MOVIES:
        records.append(image_record(ASSETS / source, OUTPUT / poster, "poster") | {"sourceMomentSeconds": moment})
    hero_path = OUTPUT / "hero-loop.mp4"
    hero = probe(hero_path)
    video = next(stream for stream in hero["streams"] if stream["codec_type"] == "video")
    checks = {"duration12Seconds": abs(float(hero["format"]["duration"]) - 12) <= 0.05,
              "muted": all(stream["codec_type"] != "audio" for stream in hero["streams"]),
              "h264": video["codec_name"] == "h264", "yuv420p": video["pix_fmt"] == "yuv420p", "faststart": faststart(hero_path)}
    if not all(checks.values()):
        raise RuntimeError(f"Hero validation failed: {checks}")
    run(TOOLS["ffmpeg"], "-hide_banner", "-loglevel", "error", "-xerror", "-i", hero_path, "-f", "null", "-")
    checks["fullDecodePassed"] = True
    records.append(file_record(ASSETS / "videos/esitIsyeriVideo.mp4", hero_path, "background-loop",
                               duration=float(hero["format"]["duration"]), streams=hero["streams"], verification=checks))
    records += [image_record(ASSETS / "logos/esitisyeri-kalp-logo.png", PUBLIC / target, "icon") for _, target in ICONS]
    unique_sources = {record["source"]: record["sourceBytes"] for record in records if record["kind"] in ("full-video", "image")}
    optimized_bytes = sum(record["bytes"] for record in records)
    manifest = {"generatedAtUtc": datetime.now(timezone.utc).isoformat(), "originalsPreserved": True,
                "sourceBytes": sum(unique_sources.values()), "optimizedBytes": optimized_bytes,
                "fileCount": len(records), "assets": records}
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    print(f"All {len(records)} files verified; {manifest['sourceBytes']:,} -> {optimized_bytes:,} bytes", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--jobs", type=int, default=3)
    parser.add_argument("--verify-only", action="store_true")
    args = parser.parse_args()
    if not all(TOOLS.values()):
        raise SystemExit("Install ffmpeg, ffprobe, ImageMagick, and cwebp before regenerating media.")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    if not args.verify_only:
        for item in IMAGES:
            encode_image(item)
        make_icons()
        with ThreadPoolExecutor(max_workers=max(1, min(args.jobs, 3))) as pool:
            list(pool.map(encode_movie, MOVIES))
        make_hero()
    verify_all()


if __name__ == "__main__":
    main()
