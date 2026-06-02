import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, Clock, Building } from 'lucide-react';
import SampleImage from '../../assets/logos/esitisyeri-kalp-logo.png';
import siteConfig from '../../config/siteConfig';


const PartnerListCard = ({ partner }) => {

    //console.log('Partner data:', partner);
    
    const cells = partner.Cells || partner.cells || [];
    
    // Veya direkt partner objesinden property'leri al
    const name = partner.isyeri_unvani || partner.name || cells[2]?.DisplayText || "İsim yok";
    const yetkili = partner.yetkili_kisi || partner.yetkili || cells[3]?.DisplayText || "Yetkili yok";
    const faaliyet = partner.faaliyet_turu || partner.faaliyet || cells[4]?.DisplayText || "Faaliyet türü yok";
    const calismaSaati = partner.calisma_saati || partner.calismaSaati || cells[10]?.DisplayText || "";
    const mahalle = partner.mahalle || cells[7]?.DisplayText || "";
    const yolAdi = partner.yol_adi || partner.yolAdi || cells[8]?.DisplayText || "";

    let image = SampleImage;
    try {
        // Farklı image kaynaklarına bak
        if (partner.image) {
            image = partner.image;
        } else if (partner.files && Array.isArray(partner.files) && partner.files.length > 0) {
            image = partner.files[0].src;
        } else {
            const filesJson = cells[16]?.Value || partner.filesJson || "[]";
            const files = JSON.parse(filesJson);
            if (Array.isArray(files) && files.length > 0) {
                image = files[0]?.src ?? SampleImage;
            }
        }
    } catch (err) {
        console.warn("Resim verisi okunamadı:", err);
    }

    const objectId = partner.id || partner.objectid || cells.find(
        (c) => c.ColumnName === "vw_esit_isyeri.objectid"
    )?.Value || null;

    return (
        <Link
            to={`${siteConfig.partners.detail.detailPath}/${objectId}`}
            state={{ image }}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
            <div className="flex h-full">
                <div className="w-2/5 flex-shrink-0">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {name}
                        </h3>

                        <div className="flex items-start text-sm text-gray-600 mt-2 mb-3">
                            <User size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{yetkili}</span>
                        </div>

                        <div className="flex items-start text-xs text-gray-500 mb-2">
                            <Building size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{faaliyet}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                            <MapPin size={12} className="mr-1 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{`${mahalle} ${yolAdi ? ", " + yolAdi : ""}`}</span>
                        </div>

                        {calismaSaati && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock size={12} className="mr-1 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{calismaSaati}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PartnerListCard;