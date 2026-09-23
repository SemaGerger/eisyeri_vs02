
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../layouts/main/header/Header";
import Footer from "../layouts/main/Footer";
import CTAButton1 from "../components/button/CTAButton1";
import CTAButton2 from "../components/button/CTAButton2";
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
        <div className="fixed bottom-6 left-4 right-4 flex justify-between z-50 md:left-6 md:right-6">
          <CTAButton2 className="cursor-pointer" isFixed={true} href={siteConfig.hero.CTA2URL}>
            {cta2Text}
          </CTAButton2>
          <CTAButton1 className="cursor-pointer" isFixed={true} href={siteConfig.hero.CTA1URL}>
            {cta1Text}
          </CTAButton1>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Layout;