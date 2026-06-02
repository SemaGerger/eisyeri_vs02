import React from "react";
import CTAButton from "./CTAButton";
import { ClipboardList } from "lucide-react";

const CTAButton1 = ({ isFixed = false, children, ...props }) => {
  const greenIcon = isFixed ? <ClipboardList size={20} /> : <ClipboardList size={20} />;

  return (
    <CTAButton
      isFixed={isFixed}
      variant="red"
      icon={greenIcon}
      className={isFixed ? "mx-2" : ""}
      {...props}
    >
      {children}
    </CTAButton>
  );
};

export default CTAButton1;