import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CTAButton1 from "../../../components/button/CTAButton1";
import LanguageToggle from "../../../components/button/LanguageToggle";
import siteConfig from "../../../config/siteConfig";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const mobileMenuId = useId();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const navigationLabel = t("nav.primaryNavigation", "Ana gezinme");
  const linkLabel = (link) => link.key ? t(`nav.${link.key}`, link.name) : link.name;
  const municipalityLogo = (
    <a
      href={siteConfig.belediyeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[44px] shrink-0 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <img
        src={siteConfig.assets.logos.belediye.src}
        alt={siteConfig.assets.logos.belediye.alt}
        className="h-10 w-auto max-w-[200px] object-contain 2xl:h-12 2xl:max-w-[240px]"
      />
    </a>
  );

  return (
    <>
      <div className="hidden shrink-0 items-center gap-4 xl:flex 2xl:gap-6">
        <nav aria-label={navigationLabel} className="flex items-center gap-4 2xl:gap-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex min-h-[44px] items-center rounded py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 2xl:text-base"
            >
              {linkLabel(link)}
            </Link>
          ))}
        </nav>
        <LanguageToggle />
        {municipalityLogo}
      </div>

      <div className="flex shrink-0 items-center gap-2 xl:hidden">
        <LanguageToggle />
        <button
          ref={menuToggleRef}
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          aria-label={isMobileMenuOpen ? t("nav.closeMenu", "Menüyü kapat") : t("nav.openMenu", "Menüyü aç")}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <div
        id={mobileMenuId}
        hidden={!isMobileMenuOpen}
        className={`${isMobileMenuOpen ? "flex" : "hidden"} absolute top-full left-0 z-50 w-full max-h-[calc(100vh-5rem)] flex-col gap-3 overflow-y-auto overscroll-contain bg-white px-4 py-4 shadow-lg supports-[height:100dvh]:max-h-[calc(100dvh-5rem)] xl:hidden`}
      >
        <nav aria-label={navigationLabel} className="flex w-full flex-col">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex min-h-[44px] items-center rounded px-3 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {linkLabel(link)}
            </Link>
          ))}
        </nav>
        <div className="h-px w-full shrink-0 bg-gray-200" />
        <CTAButton1 href={siteConfig.hero.CTA1URL} className="w-full">
          {t("hero.cta1", siteConfig.hero.CTA1TEXT)}
        </CTAButton1>
        <div className="flex w-full justify-center border-t border-gray-100 pt-3 pb-[env(safe-area-inset-bottom,0px)]">
          {municipalityLogo}
        </div>
      </div>
    </>
  );
};

export default Navbar;
