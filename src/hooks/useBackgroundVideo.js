import { useEffect, useState } from "react";

/** Do not attach a video source until the device and visitor preferences allow it. */
export default function useBackgroundVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const desktopPointer = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const update = () => {
      const slowConnection = ["slow-2g", "2g"].includes(connection?.effectiveType);
      setEnabled(desktopPointer.matches && !reducedMotion.matches && !connection?.saveData && !slowConnection);
    };
    const mediaQueries = [desktopPointer, reducedMotion];

    mediaQueries.forEach((query) => {
      if (query.addEventListener) query.addEventListener("change", update);
      else query.addListener?.(update);
    });
    connection?.addEventListener?.("change", update);
    update();

    return () => {
      mediaQueries.forEach((query) => {
        if (query.removeEventListener) query.removeEventListener("change", update);
        else query.removeListener?.(update);
      });
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return enabled;
}
