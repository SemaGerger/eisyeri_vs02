import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";
import SampleImage from "../../assets/optimized/site-logo.webp";
import { getPartnerField, getPartnerId, getPartnerImage } from "../../utils/partnerFields";

const emptyMetrics = { targets: [], currentPage: 0, hasPrevious: false, hasNext: false };

// Use the rendered cards, rather than the service row count or a guessed width.
export const measureStoryScroll = (container) => {
  const cards = Array.from(container.querySelectorAll(".scroll-item"));
  if (!cards.length || container.clientWidth <= 0) return emptyMetrics;
  const style = window.getComputedStyle(container);
  const gap = parseFloat(style.columnGap || style.gap) || 0;
  const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
  const cardWidth = cards[0].offsetWidth;
  const measuredStep = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
  const step = measuredStep > 0 ? measuredStep : cardWidth + gap;
  if (step <= 0) return emptyMetrics;
  const visibleItems = Math.max(1, Math.floor((container.clientWidth - padding + gap) / step));
  const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
  const position = Math.max(0, Math.min(container.scrollLeft, maxScroll));
  const targets = [];
  for (let index = 0; index < cards.length; index += visibleItems) {
    const offset = index === 0 ? 0 : cards[index].offsetLeft - cards[0].offsetLeft;
    const target = Math.min(maxScroll, Math.max(0, offset || index * step));
    if (!targets.length || target > targets[targets.length - 1] + 1) targets.push(target);
  }
  if (maxScroll > targets[targets.length - 1] + 1) targets.push(maxScroll);
  let currentPage = 0;
  targets.forEach((target, index) => {
    if (Math.abs(target - position) < Math.abs(targets[currentPage] - position)) currentPage = index;
  });
  return { targets, currentPage, hasPrevious: position > 1, hasNext: position < maxScroll - 1 };
};

const StoryCardContainer = ({ partners }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const suppressClickRef = useRef(false);
  const metricsRef = useRef(emptyMetrics);
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [isDragging, setIsDragging] = useState(false);
  const carouselId = useId();
  const items = useMemo(() => (Array.isArray(partners) ? partners : []).flatMap((partner) => {
    const id = getPartnerId(partner);
    if (id === null) return [];
    return [{
      id,
      name: getPartnerField(partner, "isyeri_unvani", t("defaultTexts.noName", "İsim yok")),
      activity: getPartnerField(partner, "faaliyet_turu", t("defaultTexts.noActivity", "Faaliyet türü yok")),
      image: getPartnerImage(partner, SampleImage),
    }];
  }), [partners, t]);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;
    const next = measureStoryScroll(containerRef.current);
    metricsRef.current = next;
    setMetrics((previous) => previous.currentPage === next.currentPage &&
      previous.hasPrevious === next.hasPrevious && previous.hasNext === next.hasNext &&
      previous.targets.join(",") === next.targets.join(",") ? previous : next);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition, { passive: true });
    window.addEventListener("resize", checkScrollPosition);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(checkScrollPosition) : null;
    observer?.observe(container);
    const firstCard = container.querySelector(".scroll-item");
    if (firstCard) observer?.observe(firstCard);
    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
      observer?.disconnect();
    };
  }, [checkScrollPosition, items.length]);

  const endDrag = useCallback(() => {
    if (!dragRef.current.active) return;
    suppressClickRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", endDrag);
    return () => window.removeEventListener("mouseup", endDrag);
  }, [endDrag]);

  const scrollToPage = (page) => {
    const current = metricsRef.current;
    const target = current.targets[Math.max(0, Math.min(page, current.targets.length - 1))];
    if (target === undefined || !containerRef.current) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    containerRef.current.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 || !containerRef.current) return;
    suppressClickRef.current = false;
    dragRef.current = { active: true, moved: false, startX: event.clientX, startScroll: containerRef.current.scrollLeft };
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || !containerRef.current) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) <= 6 && !drag.moved) return;
    drag.moved = true;
    event.preventDefault();
    containerRef.current.scrollLeft = drag.startScroll - distance * 2;
  };

  const handleClickCapture = (event) => {
    if (suppressClickRef.current && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  if (!partners) {
    return <div className="m-8 flex h-64 items-center justify-center"><p className="text-lg text-gray-500">{t("status.loading", "Yükleniyor...")}</p></div>;
  }
  if (!items.length) return null;

  const arrowClassName = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

  return (
    <div className="relative mt-8 mb-28">
      {metrics.hasPrevious && (
        <button type="button" aria-label={t("partnerCarousel.previous", "Önceki işyerleri")} aria-controls={carouselId} onClick={() => scrollToPage(metrics.currentPage - 1)} className={`${arrowClassName} left-1`}>
          <ChevronLeft className="h-6 w-6 text-gray-700" aria-hidden="true" />
        </button>
      )}
      {metrics.hasNext && (
        <button type="button" aria-label={t("partnerCarousel.next", "Sonraki işyerleri")} aria-controls={carouselId} onClick={() => scrollToPage(metrics.currentPage + 1)} className={`${arrowClassName} right-1`}>
          <ChevronRight className="h-6 w-6 text-gray-700" aria-hidden="true" />
        </button>
      )}
      <div
        id={carouselId}
        ref={containerRef}
        role="region"
        aria-label={t("partnerCarousel.label", "Eşit işyerleri")}
        tabIndex={0}
        className={`hide-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain px-2 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={handleClickCapture}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          const pages = { ArrowLeft: metrics.currentPage - 1, ArrowRight: metrics.currentPage + 1, Home: 0, End: metrics.targets.length - 1 };
          if (Object.prototype.hasOwnProperty.call(pages, event.key)) {
            event.preventDefault();
            scrollToPage(pages[event.key]);
          }
        }}
        style={{ scrollBehavior: isDragging ? "auto" : undefined }}
      >
        {items.map((item) => (
          <div key={item.id} className="scroll-item w-40 shrink-0 md:w-60">
            <Link to={`/detay/${item.id}`} state={{ image: item.image }} className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
              <StoryCard name={item.name} image={item.image} activity={item.activity} />
            </Link>
          </div>
        ))}
      </div>
      {metrics.targets.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center">
          {metrics.targets.map((target, index) => (
            <button
              key={target}
              type="button"
              aria-label={t("partnerCarousel.page", { page: index + 1, count: metrics.targets.length, defaultValue: "{{page}} / {{count}}. işyeri sayfası" })}
              aria-controls={carouselId}
              aria-current={index === metrics.currentPage ? "true" : undefined}
              onClick={() => scrollToPage(index)}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span aria-hidden="true" className={`h-3 w-3 rounded-full transition-colors ${index === metrics.currentPage ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryCardContainer;
