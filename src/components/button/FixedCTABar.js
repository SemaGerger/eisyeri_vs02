import CTAButton1 from "./CTAButton1";
import CTAButton2 from "./CTAButton2";

const FixedCTABar = ({ primary, secondary }) => (
  <div className="pointer-events-none fixed left-3 right-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-40 grid grid-cols-2 items-stretch gap-2 md:left-6 md:right-6 md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:flex md:justify-between">
    <CTAButton2 isFixed href={secondary.href} className="pointer-events-auto min-w-0">
      {secondary.label}
    </CTAButton2>
    <CTAButton1 isFixed href={primary.href} className="pointer-events-auto min-w-0">
      {primary.label}
    </CTAButton1>
  </div>
);

export default FixedCTABar;
