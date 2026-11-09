import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = ({ className = "" }) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || "tr").startsWith("en") ? "en" : "tr";

  const selectLanguage = (language) => {
    if (currentLang !== language) i18n.changeLanguage(language);
  };

  return (
    <div
      role="group"
      aria-label={t("language.label", "Dil Değiştir / Change Language")}
      className={`relative inline-flex shrink-0 items-center rounded-full border border-gray-300 bg-gray-200/90 p-1 shadow-inner ${className}`}
    >
      {[
        { code: "tr", label: "Türkçe" },
        { code: "en", label: "English" },
      ].map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={label}
          aria-pressed={currentLang === code}
          onClick={() => selectLanguage(code)}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
            currentLang === code ? "bg-white text-gray-900 shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
