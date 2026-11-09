import React from "react";

const PageTitle = ({ title, subtitle, lineColor = "bg-blue-600" }) => {
  return (
    <div className="min-w-0 text-center mb-12 sm:mb-16">
      <h1 className="break-words text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-6">
        {title}
      </h1>
      <div className={`w-24 h-2 ${lineColor} mx-auto mb-8 rounded-full`}></div>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default PageTitle;
