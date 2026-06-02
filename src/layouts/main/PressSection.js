import React, { useRef, useEffect, useState } from "react";
import { pressData } from "../../api/DefaultData";
import SectionTitle from "../../components/section/SectionTitle";

const PressSection = () => {
  const sectionRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const firstThree = pressData.slice(0, 3);
  const nextFour = pressData.slice(3, 7);
  const lastOne = pressData.slice(7, 8);

  return (
    <section
      ref={sectionRef}
      className="flex translate-y-8 flex-col items-center justify-center bg-gray-50 px-4 py-12 opacity-0 transition-all duration-700 sm:px-6 lg:px-2"
    >
      <SectionTitle
        title="Basında Biz"
        subtitle="Basında Eşit İşyeri ile ilgili çıkan haberler"
      />

      <div className="w-full max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {firstThree.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick(item.video)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {nextFour.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick(item.video)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          {lastOne.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick(item.video)}
       className="w-full max-w-3xl"
      mediaClassName="h-[280px]"
      objectClassName="object-cover"
            />
          ))}
        </div>
      </div>

      {modalOpen && selectedVideo && (
        <ModalVideo src={selectedVideo} onClose={handleClose} />
      )}
    </section>
  );
};

const PressCard = ({
  video,
  onClick,
  className = "",
  mediaClassName = "h-48",
  objectClassName = "object-cover",
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className={`relative overflow-hidden ${mediaClassName}`}>
        <video
          src={video}
          className={`h-full w-full ${objectClassName}`}
          muted
          autoPlay
          playsInline
          loop
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-2xl text-white">
            ▶
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalVideo = ({ src, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      videoEl.play().catch((error) => {
        console.error("Video oynatma hatası:", error);
      });
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (videoEl) videoEl.pause();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [src, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-lg bg-black p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute -top-10 right-0 text-3xl font-bold text-white transition hover:text-red-400"
        >
          ×
        </button>

        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="max-h-[80vh] w-full rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default PressSection;