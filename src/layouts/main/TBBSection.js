import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../components/section/SectionTitle";
import { TBBPhotos } from "../../api/DefaultData";


function TBBSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  const openPhoto = (index) => {
    if (isDragging) return;
    setSelectedIndex(index);
  };

  const closePhoto = () => {
    setSelectedIndex(null);
  };

  const showPrevPhoto = (event) => {
    event.stopPropagation();

    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === 0 ? TBBPhotos.length - 1 : current - 1;
    });
  };

  const showNextPhoto = (event) => {
    event.stopPropagation();

    setSelectedIndex((current) => {
      if (current === null) return null;
      return current === TBBPhotos.length - 1 ? 0 : current + 1;
    });
  };

  const showNextPhotoFromImage = (event) => {
    showNextPhoto(event);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePhoto();
        return;
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) => {
          if (current === null) return null;
          return current === 0 ? TBBPhotos.length - 1 : current - 1;
        });
        return;
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => {
          if (current === null) return null;
          return current === TBBPhotos.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const dotCount = getMaxIndex() + 1;
  const selectedPhoto =
    selectedIndex !== null ? TBBPhotos[selectedIndex].image : null;

  return (
    <section ref={sectionRef} className="bg-gray-50 px-6 py-12">
      <SectionTitle
        title="TBB'de Biz"
      />

      {/* Tanıtım ve Kurumsal Kapasite Bilgi Bölümü */}
      <div className="mx-auto mb-12 max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start text-gray-700">
          {/* Sol Sütun - TBB Öncelikli Çalışma Alanı */}
          <div className="relative pl-6 border-l-2 border-blue-500">
            <p className="text-base md:text-lg leading-relaxed font-light text-gray-600">
              <span className="font-semibold text-gray-900">Belediyelerimizin kurumsal kapasitelerinin geliştirilmesi</span>, 
              belediyeler arasında iş birliği ve koordinasyonun arttırılması ile karşılıklı öğrenme kültürünün yaygınlaştırılması, 
              Türkiye Belediyeler Birliği’nin öncelikli çalışma alanları arasında yer almaktadır.
            </p>
          </div>

          {/* Sağ Sütun - BELFOR ve Eşit İşyeri */}
          <div className="relative pl-6 border-l-2 border-purple-500">
            <p className="text-base md:text-lg leading-relaxed font-light text-gray-600">
              Bu kapsamda düzenlenen <span className="font-semibold text-gray-900">Belediyecilik Forumu (BELFOR)</span>, 
              farklı belediyelerin deneyim paylaşımında bulunmalarına ve iyi uygulama örneklerini birlikte değerlendirmelerine önemli katkılar sunmaktadır. 
              Belediyecilik forumu (BELFOR)’nda Eşit İşyeri Projemiz <span className="font-semibold text-purple-600">100’den fazla belediyeye</span> anlatılmış ve tecrübelerimiz paylaşılmıştır.
            </p>
          </div>
        </div>
      </div>

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
          {TBBPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openPhoto(index)}
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
            className="absolute right-6 top-6 z-20 text-4xl font-bold text-white transition hover:text-gray-300"
          >
            ×
          </button>

          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={showPrevPhoto}
              className="absolute -left-16 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-6xl text-white transition hover:bg-white/25"
            >
              ‹
            </button>

            <img
              src={selectedPhoto}
              alt="TBB büyütülmüş görsel"
              className="max-h-[85vh] max-w-[90vw] cursor-pointer rounded-2xl object-contain shadow-2xl"
              onClick={showNextPhotoFromImage}
            />

            <button
              type="button"
              onClick={showNextPhoto}
              className="absolute -right-16 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-6xl text-white transition hover:bg-white/25"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TBBSection;