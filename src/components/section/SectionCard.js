import React from "react";

const SectionCard = ({ name, image, video, extraInfo, onClick, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition ${className}`}
      onClick={onClick}
    >
      {video ? (
        <video
          src={video}
          className="w-full h-48 object-cover"
          controls
          muted
          playsInline
        />
      ) : image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Video/Resim Yok
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        {extraInfo && <p className="text-gray-600 text-sm mt-1">{extraInfo}</p>}
      </div>
    </div>
  );
};

export default SectionCard;
