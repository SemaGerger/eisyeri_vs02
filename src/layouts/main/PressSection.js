import React, { useRef, useEffect, useState } from "react";
import { pressData, pressPhotos } from "../../api/DefaultData";
import SectionTitle from "../../components/section/SectionTitle";

const PressSection = () => {
  const sectionRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null); // { type: 'video'|'image', src: string }

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

  const handleCardClick = (type, src) => {
    setSelectedMedia({ type, src });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedMedia(null);
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
        {/* Videos Grid - Top 3 */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {firstThree.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick("video", item.video)}
            />
          ))}
        </div>

        {/* Videos Grid - Next 4 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {nextFour.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick("video", item.video)}
            />
          ))}
        </div>

        {/* Videos Grid - Last 1 */}
        <div className="mt-12 flex justify-center">
          {lastOne.map((item) => (
            <PressCard
              key={item.id}
              video={item.video}
              onClick={() => handleCardClick("video", item.video)}
              className="w-full max-w-3xl"
              mediaClassName="h-[280px]"
              objectClassName="object-cover"
            />
          ))}
        </div>

        {/* Photos Grid - 3 per row at the bottom */}
        {pressPhotos && pressPhotos.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pressPhotos.map((item) => (
                <PressPhotoCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  onClick={() => handleCardClick("image", item.image)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {modalOpen && selectedMedia && (
        selectedMedia.type === "video" ? (
          <ModalVideo src={selectedMedia.src} onClose={handleClose} />
        ) : (
          <ModalImage src={selectedMedia.src} onClose={handleClose} />
        )
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

const PressPhotoCard = ({
  image,
  title,
  onClick,
  className = "",
  mediaClassName = "h-64",
}) => {
  return (
    <div
      onClick={onClick}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className={`relative overflow-hidden bg-gray-100 ${mediaClassName}`}>
        <img
          src={image}
          alt={title || "Basında Biz Fotoğraf"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-lg text-white shadow-lg">
            🔍
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

const ModalImage = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-lg bg-black p-2"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl font-bold text-white transition hover:bg-red-600 hover:text-white"
        >
          ×
        </button>

        <img
          src={src}
          alt="Basında Biz Görseli"
          className="max-h-[85vh] w-auto max-w-full rounded object-contain"
        />
      </div>
    </div>
  );
};

export default PressSection;