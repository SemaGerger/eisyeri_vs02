import React from "react";
import CTAButton from "./CTAButton";
import { ClipboardList } from "lucide-react";

const CTAButton1 = ({ isFixed = false, children, ...props }) => (
  <CTAButton isFixed={isFixed} variant="red" icon={<ClipboardList size={20} />} {...props}>
    {children}
  </CTAButton>
);

export default CTAButton1;
