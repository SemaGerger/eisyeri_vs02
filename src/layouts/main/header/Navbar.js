import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CTAButton1 from "../../../components/button/CTAButton1";
import LanguageToggle from "../../../components/button/LanguageToggle";
import siteConfig from "../../../config/siteConfig";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden xl:flex items-center space-x-6">
        <nav className="flex flex-row items-center space-x-8">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap duration-200"
            >
              {link.key ? t(`nav.${link.key}`, link.name) : link.name}
            </Link>
          ))}
        </nav>

        {/* Görseldeki gibi Kapsül / Switch TR-EN Dil Butonu */}
        <LanguageToggle />

        {/* Belediye Logo */}
        <a
          href={siteConfig.belediyeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img
            src={siteConfig.assets.logos.belediye.src}
            alt={siteConfig.assets.logos.belediye.alt}
            className="h-12"
          />
        </a>
      </div>

      {/* Hamburger & Mobile Language Switch */}
      <div className="xl:hidden flex items-center space-x-3">
        <LanguageToggle />

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg px-6 py-6 flex flex-col items-start space-y-4 xl:hidden animate-fadeIn z-40">
          <nav className="flex flex-col space-y-4 items-start pl-4 w-full">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className="text-gray-700 font-medium whitespace-nowrap hover:text-blue-600 transition duration-200"
              >
                {link.key ? t(`nav.${link.key}`, link.name) : link.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200"></div>

          {/* CTA Button */}
          <div className="w-full">
            <CTAButton1 href={siteConfig.hero.CTA1URL} className="w-full justify-center">
              {t("hero.cta1", siteConfig.hero.CTA1TEXT)}
            </CTAButton1>
          </div>

          {/* Belediye Logo */}
          <div className="flex justify-center w-full pt-4 border-t border-gray-100">
            <a
              href={siteConfig.belediyeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img
                src={siteConfig.assets.logos.belediye.src}
                alt={siteConfig.assets.logos.belediye.alt}
                className="h-12"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
