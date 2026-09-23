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
    <main className="py-20 px-6 md:px-20 bg-white-50 ">
      {/* Destek verenler */}
      <section className="mb-20">
        <PartnersSection />
      </section>

      {/* Büyükçekmece Belediyesi Ruhsat ve Denetim Müdürlüğü text */}
      <section className="mb-20">
        <div className="container mx-auto relative text-center">
          <h1 className="select-none text-5xl lg:text-8xl font-medium text-blue-100 absolute inset-0 flex items-center justify-center opacity-40">
            {subtitle}
          </h1>

          <h1 className="text-2xl lg:text-5xl font-bold text-blue-900 relative z-10">
            {subtitle}
          </h1>
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
    </main>
  );
};

export default Main;
