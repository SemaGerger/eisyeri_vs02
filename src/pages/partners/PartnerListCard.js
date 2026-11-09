import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, User, Clock, Building } from 'lucide-react';
import SampleImage from '../../assets/optimized/site-logo.webp';
import siteConfig from '../../config/siteConfig';
import { getPartnerField, getPartnerId, getPartnerImage } from '../../utils/partnerFields';


const PartnerListCard = ({ partner }) => {
    const { t } = useTranslation();
    
    const name = getPartnerField(partner, "isyeri_unvani", t("defaultTexts.noName", "İsim yok"));
    const yetkili = getPartnerField(partner, "yetkili_kisi", t("defaultTexts.noContact", "Yetkili yok"));
    const faaliyet = getPartnerField(partner, "faaliyet_turu", t("defaultTexts.noActivity", "Faaliyet türü yok"));
    const calismaSaati = getPartnerField(partner, "calisma_saati");
    const mahalle = getPartnerField(partner, "mahalle");
    const yolAdi = getPartnerField(partner, "yol_adi");
    const image = getPartnerImage(partner, SampleImage);
    const objectId = getPartnerId(partner);
    if (objectId === null) return null;

    return (
        <Link
            to={`${siteConfig.partners.detail.detailPath}/${objectId}`}
            state={{ image }}
            className="group block min-w-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200"
        >
            <div className="flex h-full min-w-0">
                <div className="relative min-h-40 w-2/5 shrink-0">
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="min-w-0 flex-1 flex flex-col justify-between p-3 sm:p-4">
                    <div className="min-w-0">
                        <h3 className="break-words font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {name}
                        </h3>

                        <div className="flex min-w-0 items-start text-sm text-gray-600 mt-2 mb-3">
                            <User size={14} aria-hidden="true" className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="min-w-0 break-words line-clamp-1">{yetkili}</span>
                        </div>

                        <div className="flex min-w-0 items-start text-xs text-gray-500 mb-2">
                            <Building size={14} aria-hidden="true" className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="min-w-0 break-words line-clamp-1">{faaliyet}</span>
                        </div>
                    </div>

                    <div className="min-w-0 mt-auto pt-2 border-t border-gray-100">
                        <div className="flex min-w-0 items-center text-xs text-gray-500">
                            <MapPin size={12} aria-hidden="true" className="mr-1 text-gray-400 flex-shrink-0" />
                            <span className="min-w-0 truncate">{[mahalle, yolAdi].filter(Boolean).join(", ")}</span>
                        </div>

                        {calismaSaati && (
                            <div className="flex min-w-0 items-center text-xs text-gray-500 mt-1">
                                <Clock size={12} aria-hidden="true" className="mr-1 text-gray-400 flex-shrink-0" />
                                <span className="min-w-0 truncate">{calismaSaati}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PartnerListCard;