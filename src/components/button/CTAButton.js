

const CTAButton = ({ 
  children, 
  isFixed = false, 
  variant = "red",
  onClick,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
  icon,
  showIcon = true,
  ...props 
}) => {
  // Base stiller
  const baseClasses = "font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variants
  const variants = {
    grey: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    red: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  // Fixed - responsive
  const fixedClasses = isFixed 
    ? "px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 animate-bounce text-sm sm:text-base"
    : "px-4 py-2 sm:px-8 sm:py-3 rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base";

  // İkonlar
  const getIcon = () => {
    if (!showIcon) return null;
    
    if (icon) return icon;
    
    
    return null;
  };

  const buttonIcon = getIcon();

  // href, link gibi davran
  const handleClick = (e) => {
  if (onClick) {
    onClick(e);
  }
  if (href) {
    window.open(href, target, rel);
  }
};

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${fixedClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {buttonIcon}
      {children}
    </div>
  );
};

export default CTAButton;