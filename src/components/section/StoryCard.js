import React from "react";
import { useTranslation } from "react-i18next";
import SampleImage from "../../assets/optimized/site-logo.webp";

const StoryCard = ({ name, image, activity }) => {
  const { t } = useTranslation();
  const displayName = name || t("defaultTexts.noName", "İsim yok");

  return (
    <div className="flex h-full w-full flex-col items-center px-2 transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transform-none">
      <div className="relative mb-4 h-28 w-28 shrink-0 md:h-48 md:w-48">
        <img
          src={image || SampleImage}
          alt=""
          width="192"
          height="192"
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(event) => {
            if (event.currentTarget.getAttribute("src") !== SampleImage) event.currentTarget.src = SampleImage;
          }}
          className="h-full w-full rounded-full border-4 border-blue-100 object-cover shadow-lg"
        />
      </div>
      <h3 className="min-h-[2.5rem] w-full line-clamp-2 break-words text-center text-sm font-semibold leading-5 text-gray-800 md:min-h-[3rem] md:text-base md:leading-6">
        {displayName}
      </h3>
      <p className="mt-1 min-h-[2rem] w-full line-clamp-2 break-words text-center text-xs leading-4 text-gray-600 md:min-h-[2.5rem] md:text-sm md:leading-5">
        {activity || ""}
      </p>
    </div>
  );
};

export default StoryCard;
