import { useRef, useState } from "react";
import SectionTitle from "../../components/section/SectionTitle";
import { TBBPhotos } from "../../api/DefaultData";

function TBBSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const startX = useRef(0);
  const scrollStart = useRef(0);

  const cardWidth = 240;
  const gap = 24;
  const itemWidth = cardWidth + gap;

  const getMaxIndex = () => {
    const carousel = carouselRef.current;
    if (!carousel) return 0;

    return Math.ceil((carousel.scrollWidth - carousel.clientWidth) / itemWidth);
  };

  const updateActiveIndex = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const index = Math.round(carousel.scrollLeft / itemWidth);
    const maxIndex = getMaxIndex();
    const safeIndex = Math.max(0, Math.min(index, maxIndex));

    setActiveIndex(safeIndex);
  };

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const scrollLeft = () => {
    const nextIndex = Math.max(activeIndex - 1, 0);
    scrollToIndex(nextIndex);
  };

  const scrollRight = () => {
    const maxIndex = getMaxIndex();
    const nextIndex = Math.min(activeIndex + 1, maxIndex);
    scrollToIndex(nextIndex);
  };

  const handleMouseDown = (event) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setIsDragging(true);
    startX.current = event.pageX;
    scrollStart.current = carousel.scrollLeft;
  };

  const handleMouseMove = (event) => {
    const carousel = carouselRef.current;
    if (!isDragging || !carousel) return;

    const diff = event.pageX - startX.current;
    carousel.scrollLeft = scrollStart.current - diff;
  };

  const stopDragging = () => {
    if (!isDragging) return;

    setIsDragging(false);
    updateActiveIndex();
  };

  const openPhoto = (photo) => {
    if (isDragging) return;
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const dotCount = getMaxIndex() + 1;

  return (
    <section ref={sectionRef} className="bg-gray-50 px-6 py-12">
      <SectionTitle
        title="TBB'de Biz"
        subtitle="Türkiye Belediyeler Birliği'nde Çıkan Haberler"
      />

      <div className="relative mx-auto mt-10 w-full max-w-[1600px]">
        <button
          type="button"
          onClick={scrollLeft}
          className="absolute -left-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105"
        >
          ‹
        </button>

        <div
          ref={carouselRef}
          onScroll={updateActiveIndex}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`flex select-none gap-6 overflow-x-auto scroll-smooth pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {TBBPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openPhoto(photo.image)}
              className="w-60 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={photo.image}
                alt={`TBB'de Biz ${photo.id}`}
                draggable="false"
                loading="lazy"
                className="h-[360px] w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollRight}
          className="absolute -right-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105"
        >
          ›
        </button>

        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-7 bg-gray-900"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
          onClick={closePhoto}
        >
          <button
            type="button"
            onClick={closePhoto}
            className="absolute right-6 top-6 text-4xl font-bold text-white transition hover:text-gray-300"
          >
            ×
          </button>


          <img
            src={selectedPhoto}
            alt="TBB büyütülmüş görsel"
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default TBBSection;