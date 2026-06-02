import React from "react";
import CTAButton from "./CTAButton";
import { BookOpen } from "lucide-react";

const CTAButton2 = ({ isFixed = false, children, ...props }) => {
  const greyIcon = isFixed ? <BookOpen size={20} /> : <BookOpen size={20} />;

  return (
    <CTAButton
      isFixed={isFixed}
      variant="grey"
      icon={greyIcon}
      className={isFixed ? "" : ""}
      {...props}
    >
      {children}
    </CTAButton>
  );
};

export default CTAButton2;