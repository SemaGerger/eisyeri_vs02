import { MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import logoWhite from "../../assets/logos/esitisyeri-white.png";
import siteConfig from "../../config/siteConfig";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 ">
      
      <div className="py-10 border-b border-gray-700">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo, Contact */}
          <div>
            <a href="/" className="flex items-center py-5">
              <img src={logoWhite} alt="Eşit İşyeri" className="h-12" />
            </a>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.contact.address}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:underline">
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              Ruhsat ve Denetim Müdürlüğü
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.belediyeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400"
                >
                  {siteConfig.belediyeName}
                </a>
              </li>
              <li>
                <a
                  href={`${siteConfig.ebelediyeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400"
                >
                  E-Belediye
                </a>
              </li>
              <li>
                <Link to="/iletisim" className="hover:text-blue-400">Bize Ulaşın</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="hover:text-blue-400">Hakkkımızda</Link>
              </li>
            </ul>
          </div>

          {/* Social m. */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              Sosyal Medya
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Twitter className="w-5 h-5 text-blue-400" />
                <a
                  href={siteConfig.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-pink-400" />
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Facebook className="w-5 h-5 text-blue-600" />
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* About text */}
          <div>
            <h3 className="text-lg mb-2 border-b-4 border-blue-400 inline-block pb-1">
              Eşit İşyeri
            </h3>
            <p className="text-sm leading-relaxed text-justify">
              Büyükçekmece Belediyesi olarak; Toplumsal cinsiyet eşitliği ile
              ilgili farkındalık yaratmak, kadın girişimcilerin sayısını
              artırmak, kadınların toplumda çağdaş ve güçlü bireyler olarak yer
              almalarını sağlamak amacıyla Eşit İşyeri Projesi başlatılmıştır.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="py-4 bg-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.belediyeName} - Tüm Hakları Saklıdır.
          </p>
          <ul className="flex space-x-4 mt-3 md:mt-0">
            <li>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-500"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-pink-500"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
