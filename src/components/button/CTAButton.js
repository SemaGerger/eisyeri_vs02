const CTAButton = ({
  children,
  isFixed = false,
  variant = "red",
  onClick,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  type = "button",
  className = "",
  icon,
  showIcon = true,
  ...props
}) => {
  const baseClasses = "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 font-semibold text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    grey: "bg-gray-600 hover:bg-gray-700 text-white focus-visible:ring-gray-500",
    red: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500",
  };
  const sizeClasses = isFixed
    ? "rounded-full px-3 py-2 text-xs leading-snug shadow-lg sm:px-6 sm:py-3 sm:text-sm md:text-base"
    : "rounded-lg px-4 py-2 text-sm leading-snug shadow-lg sm:px-8 sm:py-3 sm:text-base";
  const classNames = `${baseClasses} ${variants[variant] || variants.red} ${sizeClasses} ${className}`;
  const content = <>{showIcon && icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}<span className="min-w-0 break-words">{children}</span></>;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classNames} {...props}>
        {content}
      </a>
    );
  }

  return <button type={type} onClick={onClick} className={classNames} {...props}>{content}</button>;
};

export default CTAButton;
