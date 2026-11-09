import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageCard from "../pageCards/PageCard";
import SampleImage from "../../assets/optimized/site-logo.webp";
import { getPartnerField, getPartnerId, getPartnerImage } from "../../utils/partnerFields";

const PageContainer = ({ partners }) => {
  const { t } = useTranslation();

  return (
    <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {(Array.isArray(partners) ? partners : []).map((partner) => {
        const name = getPartnerField(partner, "isyeri_unvani", t("defaultTexts.noName", "İsim yok"));
        const yetkili = getPartnerField(partner, "yetkili_kisi", t("defaultTexts.noContact", "Yetkili yok"));
        const faaliyet = getPartnerField(partner, "faaliyet_turu", t("defaultTexts.noActivity", "Faaliyet türü yok"));
        const image = getPartnerImage(partner, SampleImage);
        const objectId = getPartnerId(partner);
        if (objectId === null) return null;

        const authorizedLabel = t("partnerList.authorized", "Yetkili");
        const typeLabel = t("partnerList.type", "Tür");

        return (
          <Link
            key={objectId}
            to={`/detay/${objectId}`}
            state={{ image }}
            className="block h-full min-w-0 rounded-2xl"
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
