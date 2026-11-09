import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { ZoomIn } from "lucide-react";
import SectionTitle from "../../components/section/SectionTitle";
import MediaDialog from "../../components/media/MediaDialog";
import { TBBPhotos } from "../../api/DefaultData";

const DEFAULT_ITEM_WIDTH = 264;

function getScrollPositions(maxScroll, itemWidth) {
  const positions = [0];
  for (let position = itemWidth; position < maxScroll; position += itemWidth) positions.push(position);
  if (maxScroll > 0) positions.push(maxScroll);
  return positions;
}

function TBBSection() {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, scrollStart: 0 });
  const suppressClick = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [positions, setPositions] = useState([0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const updateActiveIndex = useCallback((nextPositions = positions) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const nearestIndex = nextPositions.reduce((nearest, position, index) => (
      Math.abs(carousel.scrollLeft - position) < Math.abs(carousel.scrollLeft - nextPositions[nearest])
        ? index : nearest
    ), 0);
    setActiveIndex(nearestIndex);
  }, [positions]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const measure = () => {
      const firstCard = carousel.firstElementChild;
      const width = firstCard?.getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(carousel).columnGap) || 24;
      const itemWidth = width > 0 ? width + gap : DEFAULT_ITEM_WIDTH;
      const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      const nextPositions = getScrollPositions(maxScroll, itemWidth);
      setPositions(nextPositions);
      const nearest = nextPositions.reduce((result, position, index) => (
        Math.abs(carousel.scrollLeft - position) < Math.abs(carousel.scrollLeft - nextPositions[result])
          ? index : result
      ), 0);
      setActiveIndex(nearest);
    };

    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(carousel);
    if (carousel.firstElementChild) observer?.observe(carousel.firstElementChild);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const scrollToIndex = (index) => {
    const safeIndex = Math.max(0, Math.min(index, positions.length - 1));
    carouselRef.current?.scrollTo({ left: positions[safeIndex], behavior: "smooth" });
    setActiveIndex(safeIndex);
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 || !carouselRef.current) return;
    suppressClick.current = false;
    drag.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollStart: carouselRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (event) => {
    if (!drag.current.active || !carouselRef.current) return;
    const diff = event.clientX - drag.current.startX;
    if (Math.abs(diff) > 6) {
      drag.current.moved = true;
      suppressClick.current = true;
      setIsDragging(true);
    }
    if (drag.current.moved) {
      event.preventDefault();
      carouselRef.current.scrollLeft = drag.current.scrollStart - diff;
    }
  };

  const stopDragging = () => {
    drag.current.active = false;
    setIsDragging(false);
    updateActiveIndex();
  };

  const openPhoto = (index, event) => {
    // Mouseup runs before click. Keep the drag flag until that click is consumed.
    if (suppressClick.current && event.detail !== 0) {
      suppressClick.current = false;
      event.preventDefault();
      return;
    }
    suppressClick.current = false;
    setSelectedIndex(index);
  };

  const showPrevPhoto = () => setSelectedIndex((current) => (
    current === null ? null : (current + TBBPhotos.length - 1) % TBBPhotos.length
  ));
  const showNextPhoto = () => setSelectedIndex((current) => (
    current === null ? null : (current + 1) % TBBPhotos.length
  ));
  const photoTitle = (index) => t("media.tbbPhoto", {
    number: index + 1,
    defaultValue: "TBB’de Biz {{number}}",
  });
  const selectedPhoto = selectedIndex === null ? null : TBBPhotos[selectedIndex];

  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6">
      <SectionTitle
        title={t("sections.tbbTitle", "TBB'de Biz")}
        subtitle={t("sections.tbbSubtitle", "Türkiye Belediyeler Birliği ve Proje Etkinlikleri")}
      />

      <div className="mx-auto mb-12 max-w-5xl px-2 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start text-gray-700">
          <div className="relative pl-6 border-l-2 border-blue-500">
            <p className="text-base md:text-lg leading-relaxed font-light text-gray-600">
              <Trans
                i18nKey="sections.tbbText1"
                components={[<span className="font-semibold text-gray-900" />]}
              />
            </p>
          </div>
          <div className="relative pl-6 border-l-2 border-purple-500">
            <p className="text-base md:text-lg leading-relaxed font-light text-gray-600">
              <Trans
                i18nKey="sections.tbbText2"
                components={[
                  <span className="font-semibold text-gray-900" />,
                  <span className="font-semibold text-purple-600" />,
                ]}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-[1600px]">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label={t("media.previous", "Önceki görsel")}
          className="absolute left-1 top-[180px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          ref={carouselRef}
          role="region"
          aria-label={t("media.gallery", "TBB fotoğraf galerisi")}
          onScroll={() => updateActiveIndex()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`flex select-none gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"}`}
        >
          {TBBPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={(event) => openPhoto(index, event)}
              aria-label={t("media.openImage", { title: photoTitle(index), defaultValue: "{{title}} görselini büyüt" })}
              className="group relative w-60 shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
            >
              <img
                src={photo.image}
                alt={photoTitle(index)}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-[360px] w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm group-hover:bg-blue-600">
                <ZoomIn size={18} />
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === positions.length - 1}
          aria-label={t("media.next", "Sonraki görsel")}
          className="absolute right-1 top-[180px] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-105 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <span aria-hidden="true">›</span>
        </button>

        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {positions.map((position, index) => (
            <button
              key={position}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={t("media.galleryPage", { number: index + 1, defaultValue: "Galeri sayfası {{number}}" })}
              aria-current={activeIndex === index ? "true" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <span aria-hidden="true" className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-7 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"}`} />
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <MediaDialog
          title={photoTitle(selectedIndex)}
          onClose={() => setSelectedIndex(null)}
          onPrevious={showPrevPhoto}
          onNext={showNextPhoto}
        >
          <img
            src={selectedPhoto.image}
            alt={photoTitle(selectedIndex)}
            className="max-h-[75vh] max-w-full rounded-lg object-contain"
          />
        </MediaDialog>
      )}
    </section>
  );
}

export default TBBSection;
