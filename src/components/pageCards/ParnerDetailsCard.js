import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, User, Clock } from "lucide-react";
import PartnersList from "../../pages/partners/PartnersList";
import StatusMessage from "../../components/status/StatusMessage";
import PageTitle from "./PageTitle";
import { usePartners } from "../../hooks/UsePartners";
import PartnerImages from "./PartnerImages";
import { getMapEmbedUrl } from "../../utils/mapEmbed";
import { getPartnerId } from "../../utils/partnerFields";

const PartnerDetailsCard = ({ partner, loading, error }) => {
  const { t } = useTranslation();
  const { partners } = usePartners(1, 20);

  if (!partner) {
    return (
      <StatusMessage
        loading={loading}
        error={error}
        data={partner}
        emptyMessage={t("partnerDetail.notFound", "Firma bulunamadı...")}
      />
    );
  }

  const {
    isyeri_unvani,
    acik_adres,
    mahalle,
    yol_adi,
    calisma_saati,
    harita_kodu,
    yetkili_kisi,
    telefon,
    eposta,
    faaliyet_turu,
  } = partner;
  const mapUrl = getMapEmbedUrl(harita_kodu);
  const currentId = getPartnerId(partner);
  const otherPartners = partners.filter((item) => currentId === null || getPartnerId(item) !== currentId);

  return (
    <div className="min-w-0 max-w-6xl mx-auto space-y-8 break-words">
      {/* Header */}
      <PageTitle
        title={isyeri_unvani}
        subtitle={faaliyet_turu}
      />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Photo + Adres + Harita + Çalışma Saatleri */}
        <div className="min-w-0 lg:col-span-2 space-y-6">

          {/* Photos */}
          {partner?.files && (
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <PartnerImages files={partner.files} />
            </div>
          )}

          {/* Adres Bilgisi */}
          <div className="min-w-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
            <h2 className="min-w-0 text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
              <MapPin className="shrink-0 text-blue-600 mr-3" aria-hidden="true" size={28} />
              {t("partnerDetail.addressInfo", "Adres Bilgisi")}
            </h2>
            <p className="text-sm text-gray-500">{t("partnerDetail.fullAddress", "Açık Adres")}</p>
            <p className="text-lg font-medium text-gray-800">{acik_adres}</p>
            <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{t("partnerDetail.neighborhood", "Mahalle")}</p>
                <p className="text-lg font-medium text-gray-800">{mahalle}</p>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{t("partnerDetail.street", "Cadde/Sokak")}</p>
                <p className="text-lg font-medium text-gray-800">{yol_adi}</p>
              </div>
            </div>
          </div>

          {/* Çalışma Saatleri (Mobil) */}
          {calisma_saati && (
            <div className="min-w-0 lg:hidden p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
              <div className="flex items-center mb-2">
                <Clock className="shrink-0 text-blue-600 mr-3" aria-hidden="true" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  {t("partnerDetail.workingHours", "Çalışma Saatleri")}
                </h2>
              </div>
              <p className="text-gray-700">{calisma_saati}</p>
            </div>
          )}

          {/* Map */}
          {mapUrl && (
            <div className="min-w-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
              <h2 className="min-w-0 text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
                <MapPin className="shrink-0 text-blue-600 mr-3" aria-hidden="true" size={28} />
                {t("partnerDetail.locationMap", "Konum Haritası")}
              </h2>
              <div className="rounded-xl overflow-hidden shadow-md w-full">
                <iframe
                  title={t("partnerDetail.locationMap", "Konum Haritası")}
                  className="block w-full h-80 border-0"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: İletişim + Çalışma Saatleri (Desktop) + Diğer Şirketler */}
        <div className="min-w-0 lg:col-span-2 space-y-6">
          {/* İletişim Bilgileri */}
          <div className="min-w-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
            <h2 className="min-w-0 text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
              <User className="shrink-0 text-blue-600 mr-3" aria-hidden="true" size={28} />
              {t("partnerDetail.contactInfo", "İletişim Bilgileri")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="text-gray-500 mt-1 flex-shrink-0" aria-hidden="true" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">{t("partnerDetail.authorizedPerson", "Yetkili Kişi")}</p>
                  <p className="text-lg font-medium text-gray-800">
                    {yetkili_kisi || t("defaultTexts.notProvided", "Belirtilmemiş")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gray-500 mt-1 flex-shrink-0" aria-hidden="true" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">{t("partnerDetail.phone", "Telefon")}</p>
                  <p className="text-lg font-medium text-gray-800">
                    {telefon ? <a href={`tel:${String(telefon).replace(/[^\d+]/g, "")}`} className="inline-flex min-h-11 max-w-full items-center break-all hover:text-blue-600">
                      {telefon}
                    </a> : t("defaultTexts.notProvided", "Belirtilmemiş")}
                  </p>
                </div>
              </div>
              {eposta && (
                <div className="flex items-start gap-3">
                  <Mail
                    className="text-gray-500 mt-1 flex-shrink-0" aria-hidden="true"
                    size={20}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500">{t("partnerDetail.email", "E-posta")}</p>
                    <p className="text-lg font-medium text-gray-800">
                      <a
                        href={`mailto:${eposta}`}
                        className="inline-flex min-h-11 max-w-full items-center break-all hover:text-blue-600"
                      >
                        {eposta}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Çalışma Saatleri (Desktop) */}
          {calisma_saati && (
            <div className="min-w-0 hidden lg:block p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
              <div className="flex items-center mb-2">
                <Clock className="shrink-0 text-blue-600 mr-3" aria-hidden="true" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  {t("partnerDetail.workingHours", "Çalışma Saatleri")}
                </h2>
              </div>
              <p className="text-gray-700">{calisma_saati}</p>
            </div>
          )}

          {/* Partners */}
          <PartnersList partners={otherPartners} />
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsCard;
