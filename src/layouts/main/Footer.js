import { MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoWhite from "../../assets/optimized/white-wordmark.webp";
import siteConfig from "../../config/siteConfig";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-200 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
      
      <div className="py-10 border-b border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo, Contact */}
          <div>
            <Link to="/" className="inline-flex min-h-11 items-center py-5">
              <img src={logoWhite} alt="Eşit İşyeri" loading="lazy" decoding="async" className="h-12 w-auto max-w-full object-contain" />
            </Link>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 shrink-0 text-blue-400" aria-hidden="true" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center break-words hover:underline"
                >
                  {t("contact.address", siteConfig.contact.address)}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 shrink-0 text-blue-400" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-11 items-center break-words hover:underline">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              {t("footer.department", "Ruhsat ve Denetim Müdürlüğü")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.belediyeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-blue-400"
                >
                  {t("footer.municipality", siteConfig.belediyeName)}
                </a>
              </li>
              <li>
                <a
                  href={`${siteConfig.ebelediyeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-blue-400"
                >
                  {t("footer.eMunicipality", "E-Belediye")}
                </a>
              </li>
              <li>
                <Link to="/iletisim" className="inline-flex min-h-11 items-center hover:text-blue-400">{t("nav.contact", "Bize Ulaşın")}</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="inline-flex min-h-11 items-center hover:text-blue-400">{t("nav.about", "Hakkımızda")}</Link>
              </li>
            </ul>
          </div>

          {/* Social m. */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              {t("footer.socialMedia", "Sosyal Medya")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Twitter className="w-5 h-5 shrink-0 text-blue-400" aria-hidden="true" />
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center break-words hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 shrink-0 text-pink-400" aria-hidden="true" />
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center break-words hover:underline"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Facebook className="w-5 h-5 shrink-0 text-blue-600" aria-hidden="true" />
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center break-words hover:underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* About text */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              {t("hero.title", "Eşit İşyeri")}
            </h3>
            <p className="text-sm leading-relaxed">
              {t("about.whatText", "Büyükçekmece Belediyesi olarak; Toplumsal cinsiyet eşitliği ile ilgili farkındalık yaratmak, kadın girişimcilerin sayısını artırmak, kadınların toplumda çağdaş ve güçlü bireyler olarak yer almalarını sağlamak amacıyla Eşit İşyeri Projesi başlatılmıştır.")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="py-4 bg-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.belediyeName} - {t("footer.rights", "Tüm Hakları Saklıdır.")}
          </p>
          <ul className="flex space-x-4 mt-3 md:mt-0">
            <li>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.socialAccount", { name: "Facebook" })}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-400 hover:text-blue-500"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.socialAccount", { name: "X" })}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-400 hover:text-blue-400"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.socialAccount", { name: "Instagram" })}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-400 hover:text-pink-500"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
