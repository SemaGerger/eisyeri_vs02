import React from "react";
import { useTranslation } from "react-i18next";
import PartnersSection from '../main/PartnersSection';
import PressSection from "../main/PressSection";
import TBBSection from "../main/TBBSection";
import siteConfig from "../../config/siteConfig";

const Main = () => {
  const { t } = useTranslation();
  const subtitle = t("hero.subtitle", siteConfig.hero.subtitle);

  return (
    <div className="min-w-0 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Destek verenler */}
      <section className="mb-20">
        <PartnersSection />
      </section>

      {/* Büyükçekmece Belediyesi Ruhsat ve Denetim Müdürlüğü text */}
      <section className="mb-20">
        <div className="container mx-auto relative min-w-0 overflow-hidden py-6 text-center">
          <div aria-hidden="true" className="select-none text-5xl lg:text-8xl font-medium text-blue-100 absolute inset-0 flex items-center justify-center opacity-40">
            {subtitle}
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-blue-900 relative z-10">
            {subtitle}
          </h2>
        </div>
      </section>


      {/* Haberler*/}
      <section className="mb-2 lg:pt-8">
        <PressSection />
      </section>

 {/* TBB*/}
      <section className="mb-5 lg:pt-8">
        <TBBSection />
      </section>
    </div>
  );
};

export default Main;
