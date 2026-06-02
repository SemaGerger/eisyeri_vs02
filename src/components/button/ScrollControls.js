import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollControls = ({ showLeft, showRight, onLeftClick, onRightClick }) => (
  <>
    {showLeft && (
      <ScrollButton
        position="left"
        icon={ChevronLeft}
        onClick={onLeftClick}
      />
    )}
    
    {showRight && (
      <ScrollButton
        position="right"
        icon={ChevronRight}
        onClick={onRightClick}
      />
    )}
  </>
);

const ScrollButton = ({ position, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${position === 'left' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 z-10 
               bg-white/80 hover:bg-white rounded-full p-2 shadow-lg 
               transition-all duration-200 backdrop-blur-sm`}
    aria-label={position === 'left' ? 'Önceki' : 'Sonraki'}
  >
    <Icon className="w-6 h-6 text-gray-700" />
  </button>
);

export default ScrollControls;