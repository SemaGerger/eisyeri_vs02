
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../layouts/main/header/Header";
import Footer from "../layouts/main/Footer";
import FixedCTABar from "../components/button/FixedCTABar";
import siteConfig from "../config/siteConfig";

const Layout = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Anasayfa mı
  const isHomePage = location.pathname === "/";
  // Anasayfa DEĞİLSE
  const showCTA = !isHomePage;

  const cta1Text = t("hero.cta1", siteConfig.hero.CTA1TEXT);
  const cta2Text = t("hero.cta2", siteConfig.hero.CTA2TEXT);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      
      {/* Fixed CTA button */}
      {showCTA && (
        <FixedCTABar
          secondary={{ href: siteConfig.hero.CTA2URL, label: cta2Text }}
          primary={{ href: siteConfig.hero.CTA1URL, label: cta1Text }}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Layout;
