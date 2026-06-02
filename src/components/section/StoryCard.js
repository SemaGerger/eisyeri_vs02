import React from "react";
import { useNavigate } from "react-router-dom";
import siteConfig from "../../config/siteConfig";

const StoryCard = ({ id, name, image, extraInfo, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
   navigate(`/detay/${id}`, { state: { image } });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer w-28 md:w-32 shrink-0
                 transform transition-transform duration-500 hover:scale-110 hover:-translate-y-2"
    >
      <div className="relative w-28 h-28 md:w-48 md:h-48 mb-4">
        {image ? (
          <img
            src={image}
            alt={name || siteConfig.defaultTexts.partnerName} 
            className="w-full h-full object-cover rounded-full border-4 border-blue relative z-10 shadow-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500 relative z-10">
            Yok
          </div>
        )}
      </div>

      {name && (<h3 className="text-center text-sm md:text-base font-semibold text-gray-800">{name}</h3>)}
      {extraInfo && (<p className="text-center text-xs md:text-sm text-gray-600">{extraInfo.split("Tür:")[1]?.trim()}</p>)}
    </div>
  );
};

export default StoryCard;