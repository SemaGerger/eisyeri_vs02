import React from "react";

const PageTitle = ({ title, subtitle, lineColor = "bg-blue-600" }) => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-blue-800 mb-6">
        {title}
      </h1>
      <div className={`w-24 h-2 ${lineColor} mx-auto mb-8 rounded-full`}></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default PageTitle;