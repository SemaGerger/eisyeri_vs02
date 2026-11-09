import React from "react";
import CTAButton from "./CTAButton";
import { BookOpen } from "lucide-react";

const CTAButton2 = ({ isFixed = false, children, ...props }) => (
  <CTAButton isFixed={isFixed} variant="grey" icon={<BookOpen size={20} />} {...props}>
    {children}
  </CTAButton>
);

export default CTAButton2;
