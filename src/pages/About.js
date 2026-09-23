import React from "react";
import { useTranslation } from "react-i18next";
import siteConfig from "../config/siteConfig";
import Layout from "../layouts/Layout";
import PageTitle from "../components/pageCards/PageTitle";

const About = () => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 1,
      title: t("about.whatTitle", siteConfig.aboutData.what.title),
      text: t("about.whatText", siteConfig.aboutData.what.text),
      image: siteConfig.aboutData.what.image,
    },
    {
      id: 2,
      title: t("about.whyTitle", siteConfig.aboutData.why.title),
      text: t("about.whyText", siteConfig.aboutData.why.text),
      image: siteConfig.aboutData.why.image,
    },
    {
      id: 3,
      title: t("about.conditionTitle", siteConfig.aboutData.condition.title),
      text: t("about.conditionText", siteConfig.aboutData.condition.text),
      image: siteConfig.aboutData.condition.image,
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
        {/* Title */}
        <PageTitle 
          title={t("about.title", "Eşit İşyerleri Projesi")}
          subtitle={t("about.subtitle", "İşyerlerinde eşitlik, çeşitlilik ve kapsayıcılık ilkelerini yaygınlaştırmak için tasarlanmış kapsamlı bir sosyal girişim")}
        />

        {/* Content */}
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row items-center mb-20 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Photo */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            
            {/* Metin */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
              <div className="p-2 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-700 font-bold text-xl">{section.id}</span>
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {section.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default About;
