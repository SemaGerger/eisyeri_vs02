import React from "react";
import { useNavigate } from "react-router-dom";

const PageCard = ({ id, name, image, extraInfo }) => {

  const navigate = useNavigate();
  
  const handleClick = () => { navigate(`/details/${id}`);};

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="w-full">
          {image ? (
            <img
              src={image}
              alt={name || "Partner"}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Resim Yok
            </div>
          )}
        </div>

        {name && <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>}
        {extraInfo && <p className="text-gray-600 text-sm mb-2">{extraInfo}</p>}
      
      
      </div>
    </div>
  );
};

export default PageCard;
