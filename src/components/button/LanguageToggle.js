import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "tr").startsWith("en") ? "en" : "tr";

  const toggleLanguage = () => {
    const nextLang = currentLang === "tr" ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  const setLang = (lang, e) => {
    e.stopPropagation();
    if (currentLang !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div
      onClick={toggleLanguage}
      className={`relative flex items-center bg-gray-200/90 hover:bg-gray-300/90 border border-gray-300/80 rounded-full p-1 cursor-pointer select-none transition-colors duration-200 shadow-inner w-[76px] h-[34px] ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Dil Değiştir / Change Language"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleLanguage();
        }
      }}
    >
      {/* Sliding Active Pill */}
      <div
        className={`absolute top-1 bottom-1 w-[32px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
          currentLang === "tr" ? "left-1" : "left-[39px]"
        }`}
      />

      {/* TR Button */}
      <button
        type="button"
        onClick={(e) => setLang("tr", e)}
        className={`relative z-10 w-[32px] text-center text-xs font-bold transition-colors duration-200 focus:outline-none ${
          currentLang === "tr" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        TR
      </button>

      {/* EN Button */}
      <button
        type="button"
        onClick={(e) => setLang("en", e)}
        className={`relative z-10 ml-auto w-[32px] text-center text-xs font-bold transition-colors duration-200 focus:outline-none ${
          currentLang === "en" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
