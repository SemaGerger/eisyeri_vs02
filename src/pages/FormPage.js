import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import siteConfig from "../config/siteConfig";

const FormPage = () => {
  const { t } = useTranslation();
  const formUrl = siteConfig.hero.CTA1URL;

  useEffect(() => {
    window.location.replace(formUrl);
  }, [formUrl]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-2xl font-bold">{t("hero.cta1")}</h1>
      <p>{t("contact.formNotice")}</p>
      <a href={formUrl} className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white">
        {t("hero.cta1")}
      </a>
    </main>
  );
};

export default FormPage;
