import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RouteEffects = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || "tr";

  useEffect(() => {
    document.documentElement.lang = language.startsWith("en") ? "en" : "tr";
  }, [language]);

  useLayoutEffect(() => {
    // History traversal keeps the browser's saved scroll position.
    if (navigationType !== "POP") window.scrollTo(0, 0);
  }, [location.key, location.pathname, location.search, navigationType]);

  return null;
};

export default RouteEffects;
