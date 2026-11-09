import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PartnerImages = ({ files }) => {
  const { t } = useTranslation();
  const images = useMemo(() => {
    try {
      const parsed = typeof files === "string" ? JSON.parse(files) : files;
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((image) => image && typeof image === "object"
        && !Array.isArray(image) && typeof image.src === "string" && image.src.trim());
    } catch {
      return [];
    }
  }, [files]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => { setCurrentIndex(0); }, [files]);

  if (images.length === 0) {
    return <p className="text-gray-500 text-center">{t("defaultTexts.noImage", "Görsel bulunamadı.")}</p>;
  }

  const activeIndex = currentIndex < images.length ? currentIndex : 0;
  const activeImage = images[activeIndex];
  const nextSlide = () => setCurrentIndex((previous) => ((previous < images.length ? previous : 0) + 1) % images.length);
  const prevSlide = () => setCurrentIndex((previous) => ((previous < images.length ? previous : 0) + images.length - 1) % images.length);

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-4xl">
      <div className="overflow-hidden rounded-xl shadow-md">
        <img
          src={activeImage.src}
          alt={typeof activeImage.label === "string" && activeImage.label.trim()
            ? activeImage.label : t("media.image", { number: activeIndex + 1 })}
          loading="lazy"
          decoding="async"
          className="block h-80 w-full max-w-full object-cover"
        />
      </div>
      {images.length > 1 && <>
        <button
          type="button"
          aria-label={t("media.previous", "Önceki görsel")}
          onClick={prevSlide}
          className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        ><ArrowLeft size={20} aria-hidden="true" /></button>
        <button
          type="button"
          aria-label={t("media.next", "Sonraki görsel")}
          onClick={nextSlide}
          className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        ><ArrowRight size={20} aria-hidden="true" /></button>
      </>}
    </div>
  );
};

export default PartnerImages;
