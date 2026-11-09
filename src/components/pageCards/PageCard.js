import React from "react";
import { useTranslation } from "react-i18next";

const PageCard = ({ name, image, extraInfo }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex h-full min-w-0 flex-col bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-5 flex min-w-0 flex-col gap-3">
        <div className="w-full h-40 shrink-0">
          {image ? (
            <img
              src={image}
              alt={name || "Partner"}
              loading="lazy"
              decoding="async"
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              {t("defaultTexts.noImage", "Resim Yok")}
            </div>
          )}
        </div>

        <h3 title={name} className="h-[4.5rem] line-clamp-3 break-words text-lg leading-6 font-semibold text-gray-800">{name}</h3>
        <p title={extraInfo} className="h-[3.75rem] line-clamp-3 break-words text-gray-600 text-sm leading-5">{extraInfo}</p>
      </div>
    </div>
  );
};

export default PageCard;
