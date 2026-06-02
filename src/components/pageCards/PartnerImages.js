import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PartnerImages = ({ files }) => {
  // API'den gelen JSON string ise parse et
  const images = typeof files === "string" ? JSON.parse(files) : files || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return <p className="text-gray-500 text-center">Görsel bulunamadı.</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Aktif Görsel */}
      <div className="rounded-xl overflow-hidden shadow-md">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].label || `Görsel ${currentIndex + 1}`}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Sol Ok */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Sağ Ok */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
      >
        <ArrowRight size={20} />
      </button>

      {/* Alt Grid Küçük Önizlemeler 
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.label || `Görsel ${index + 1}`}
            className={`h-20 object-cover rounded-lg cursor-pointer border-2 ${
              index === currentIndex ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>*/}
    </div>
  );
};

export default PartnerImages;
