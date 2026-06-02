import React, { useRef, useEffect } from "react";
import { safePlay, safePause } from "./VideoControl";

const ModalVideo = ({ src, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    safePlay(videoEl);

    // ESC ile kapatma
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      safePause(videoEl);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [src, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-black p-4 rounded-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()} // içeride tıklamayı engelle
      >
        {/* Kapatma butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-400 transition"
        >
          ×
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="w-full h-auto rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default ModalVideo;
