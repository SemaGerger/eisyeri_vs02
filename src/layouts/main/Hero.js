import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CTAButton1 from "../../components/button/CTAButton1";
import CTAButton2 from "../../components/button/CTAButton2";
import siteConfig from "../../config/siteConfig";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 450);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const heroTitle = t("hero.title", siteConfig.hero.title);
  const heroHighlight = t("hero.highlight", siteConfig.hero.highlight);
  const heroSubtitle = t("hero.subtitle", siteConfig.hero.subtitle);
  const cta1Text = t("hero.cta1", siteConfig.hero.CTA1TEXT);
  const cta2Text = t("hero.cta2", siteConfig.hero.CTA2TEXT);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={siteConfig.hero.HERO_VIDEO}
          autoPlay
          muted
          loop
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>

        {/* Hero İçeriği */}
        <div className="relative z-10 text-center px-4 md:px-0 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {heroTitle} <span className="text-yellow-400">{heroHighlight}</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
            {heroSubtitle}
          </p>

          {/* CTA Butonlar */}
          <div className="flex justify-center mt-10 space-x-4">
            <CTAButton2
              className="cursor-pointer"
              isFixed={false}
              href={siteConfig.hero.CTA2URL}
            >
              {cta2Text}
            </CTAButton2>
            <CTAButton1
              className="cursor-pointer"
              isFixed={false}
              href={siteConfig.hero.CTA1URL}
            >
              {cta1Text}
            </CTAButton1>
          </div>
        </div>


      </section>

      {/* Aşağı Kaydırınca Görünür */}
      {isScrolled && (
        <div className="fixed bottom-6 left-4 right-4 flex justify-between z-50 md:left-6 md:right-6">
          <CTAButton2
            className="cursor-pointer"
            isFixed={true}
            href={siteConfig.hero.CTA2URL}
          >
            {cta2Text}
          </CTAButton2>
          <CTAButton1
            className="cursor-pointer"
            isFixed={true}
            href={siteConfig.hero.CTA1URL}
          >
            {cta1Text}
          </CTAButton1>
        </div>
      )}
    </>
  );
};

export default Hero;