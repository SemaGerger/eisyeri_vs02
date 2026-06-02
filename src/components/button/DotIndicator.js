import React from "react";

const DotIndicator = ({ dotCount, currentIndex, totalVisibleItems, onDotClick }) => {
  if (dotCount <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {Array.from({ length: dotCount }).map((_, index) => (
        <DotButton
          key={index}
          index={index}
          currentIndex={currentIndex}
          totalVisibleItems={totalVisibleItems}
          onClick={onDotClick}
        />
      ))}
    </div>
  );
};

const DotButton = ({ index, currentIndex, totalVisibleItems, onClick }) => {
  const isActive = index === Math.floor(currentIndex / totalVisibleItems);
  
  return (
    <button
      onClick={() => onClick(index * totalVisibleItems)}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        isActive
          ? "bg-blue-600 scale-110"
          : "bg-gray-300 hover:bg-gray-400"
      }`}
      aria-label={`Sayfa ${index + 1}`}
      aria-current={isActive ? 'true' : 'false'}
    />
  );
};

export default DotIndicator;