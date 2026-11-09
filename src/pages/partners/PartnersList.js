import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, ArrowRight } from 'lucide-react';
import siteConfig from '../../config/siteConfig';
import PartnerListCard from './PartnerListCard';

const PartnersList = ({ partners }) => {
  const { t } = useTranslation();

  const title = t("partnerList.otherPartners", siteConfig.partners.list.title);
  const subtitle = t("partnerList.otherSubtitle", siteConfig.partners.list.subtitle);
  const emptyMessage = t("partnerList.emptyMessage", siteConfig.partners.list.emptyMessage);
  const viewAllText = t("partnerList.viewAll", siteConfig.partners.list.viewAllText);
  const viewAllLink = siteConfig.partners.list.viewAllLink;

  if (!partners || partners.length === 0) {
    return (
      <div className="min-w-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{subtitle}</p>
        <div className="text-center py-8">
          <Users className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return ( 
     /* in Partner */
    <div className="min-w-0 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
      <div className="flex min-w-0 flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 break-words">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        <Link
          to={viewAllLink}
          className="inline-flex min-h-11 max-w-full shrink-0 self-start items-center gap-1 break-words text-blue-600 hover:text-blue-800 font-medium transition-colors sm:self-center"
        >
          {viewAllText}

          <ArrowRight size={18} className="shrink-0" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {partners.slice(0, 3).map((partner, index) => (
          <PartnerListCard key={partner.id || `partner-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default PartnersList;