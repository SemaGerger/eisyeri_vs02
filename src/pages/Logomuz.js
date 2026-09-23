import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../layouts/Layout";
import { logo } from "../api/DefaultData";
import siteConfig from "../config/siteConfig";
import PageTitle from "../components/pageCards/PageTitle";

const { brand } = siteConfig;

const Logomuz = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
        {/* Title */}
        <PageTitle 
          title={t("brand.title", brand.title)}
          subtitle={t("brand.description", brand.description)}
        />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {logo.map((item) => (
            <div key={item.id} className="border rounded-xl shadow p-4 text-center">
              <h2 className="text-lg font-semibold mb-4">{item.title}</h2>
              <img
                src={item.image}
                alt={item.title || "Logo"}
                className="mx-auto max-h-64 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Logomuz;
