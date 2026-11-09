import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CTAButton1 from "../../components/button/CTAButton1";
import CTAButton2 from "../../components/button/CTAButton2";
import FixedCTABar from "../../components/button/FixedCTABar";
import MediaDialog from "../../components/media/MediaDialog";
import useBackgroundVideo from "../../hooks/useBackgroundVideo";
import siteConfig from "../../config/siteConfig";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const allowBackgroundVideo = useBackgroundVideo();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 450);
    };

    let frame = null;
    const throttledScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(() => {
          handleScroll();
          frame = null;
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))
      : null;
    if (sectionRef.current) observer?.observe(sectionRef.current);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let active = true;
    if (isPaused || isFilmOpen || !isVisible || !isDocumentVisible) video.pause();
    else video.play()?.catch(() => {
      if (active) setIsPaused(true);
    });
    return () => {
      active = false;
      video.pause();
    };
  }, [allowBackgroundVideo, isPaused, isFilmOpen, isVisible, isDocumentVisible]);

  const heroTitle = t("hero.title", siteConfig.hero.title);
  const heroHighlight = t("hero.highlight", siteConfig.hero.highlight);
  const heroSubtitle = t("hero.subtitle", siteConfig.hero.subtitle);
  const cta1Text = t("hero.cta1", siteConfig.hero.CTA1TEXT);
  const cta2Text = t("hero.cta2", siteConfig.hero.CTA2TEXT);

  return (
    <>
      <section ref={sectionRef} className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-gray-900 py-28 text-white sm:py-32">
        {siteConfig.hero.HERO_POSTER && (
          <img
            src={siteConfig.hero.HERO_POSTER}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {allowBackgroundVideo && siteConfig.hero.HERO_VIDEO && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={siteConfig.hero.HERO_VIDEO}
            poster={siteConfig.hero.HERO_POSTER}
            aria-hidden="true"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>

        {/* Hero İçeriği */}
        <div className="relative z-10 w-full max-w-5xl px-4 text-center motion-safe:animate-fadeIn sm:px-6">
          <h1 className="mb-4 break-words text-4xl font-extrabold drop-shadow-lg md:text-6xl">
            {heroTitle} <span className="text-yellow-400">{heroHighlight}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg drop-shadow-md md:text-2xl">
            {heroSubtitle}
          </p>

          {/* CTA Butonlar */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <CTAButton2
              className="cursor-pointer"
              isFixed={false}
              href={siteConfig.hero.CTA2URL}
            >
              {cta2Text}
            </CTAButton2>
            <CTAButton1
              className="cursor-pointer"
              isFixed={false}
              href={siteConfig.hero.CTA1URL}
            >
              {cta1Text}
            </CTAButton1>
          </div>
          {siteConfig.hero.HERO_FULL_VIDEO && (
            <button
              type="button"
              onClick={() => setIsFilmOpen(true)}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/60 bg-black/40 px-5 py-2 text-sm font-medium text-white transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span aria-hidden="true">▶</span>
              {t("media.watchFilm", "Tanıtım filmini izleyin")}
            </button>
          )}
        </div>
        {allowBackgroundVideo && siteConfig.hero.HERO_VIDEO && (
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            aria-label={isPaused
              ? t("media.resumeBackground", "Arka plan videosunu oynat")
              : t("media.pauseBackground", "Arka plan videosunu duraklat")}
            className="absolute bottom-4 right-4 z-20 flex h-11 min-w-11 items-center justify-center rounded-full bg-black/70 px-3 text-lg text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
          </button>
        )}
      </section>

      {/* Aşağı Kaydırınca Görünür */}
      {isScrolled && (
        <FixedCTABar
          secondary={{ href: siteConfig.hero.CTA2URL, label: cta2Text }}
          primary={{ href: siteConfig.hero.CTA1URL, label: cta1Text }}
        />
      )}
      {isFilmOpen && (
        <MediaDialog title={heroTitle} onClose={() => setIsFilmOpen(false)}>
          <video
            src={siteConfig.hero.HERO_FULL_VIDEO}
            poster={siteConfig.hero.HERO_POSTER}
            aria-label={heroTitle}
            tabIndex={0}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="max-h-[70vh] w-full rounded object-contain"
          />
        </MediaDialog>
      )}
    </>
  );
};

export default Hero;
