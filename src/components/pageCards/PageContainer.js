import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageCard from "../pageCards/PageCard";
import SampleImage from "../../assets/logos/esitisyeri-kalp-logo.png";

const PageContainer = ({ partners }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {partners.map((partner, index) => {
        const cells = partner.Cells || [];
        const name = cells[2]?.DisplayText || t("defaultTexts.noName", "İsim yok");
        const yetkili = cells[3]?.DisplayText || t("defaultTexts.noContact", "Yetkili yok");
        const faaliyet = cells[4]?.DisplayText || t("defaultTexts.noActivity", "Faaliyet türü yok");

        let image = SampleImage;
        try {
          const filesJson = cells[16]?.Value || "[]";
          const files = JSON.parse(filesJson);
          if (Array.isArray(files) && files.length > 0) {
            image = files[0]?.src ?? SampleImage;
          }
        } catch (err) {
          console.warn("Resim verisi okunamadı:", err);
        }

        // Partner ID’yi bul
        const objectCell = cells.find(c => c.ColumnName === "vw_esit_isyeri.objectid");
        const objectId = objectCell?.Value ? String(objectCell.Value) : null;
      
        if (!partners) {
          return (
            <div className="flex justify-center items-center h-64 m-16">
              <p className="text-gray-500 text-lg">{t("status.loading", "Yükleniyor...")}</p>
            </div>
          );
        }

        const authorizedLabel = t("partnerList.authorized", "Yetkili");
        const typeLabel = t("partnerList.type", "Tür");

        return (
          <Link
            key={objectId || `partner-${index}`}
            to={`/detay/${objectId}`}
            state={{ image }}
            className="block"
          >
            <PageCard
              id={objectId}
              name={name}
              image={image}
              extraInfo={`${authorizedLabel}: ${yetkili} | ${typeLabel}: ${faaliyet}`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default PageContainer;
