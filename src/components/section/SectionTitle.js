import React from "react";

const SectionTitle = ({ title, className, subtitle }) => {
  return (
    <div className="text-center mb-10 -mt-6">
      <h2 className={`relative inline-block max-w-full break-words text-3xl md:text-5xl font-bold ${className || ""}`}>
        {title}
        
        <span aria-hidden="true" className="absolute left-1/2 -bottom-2 w-32 sm:w-52 max-w-full h-1
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-100 
                         rounded -translate-x-1/2"></span>
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
