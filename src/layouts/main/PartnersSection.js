import React from "react";
import { usePartners } from "../../hooks/UsePartners";
import SectionTitle from "../../components/section/SectionTitle";
import StoryCardContainer from "../../components/section/StoryCardContainer";
import StatusMessage from "../../components/status/StatusMessage";

const PartnersSection = () => {
  const { partners, loading, error } = usePartners(1, 10);
  const hasPartners = partners && partners.length > 0;
  const showContent = !loading && !error && hasPartners;

  return (
    <section>
      <SectionTitle
        title="Eşit İşyerleri"
        subtitle="Eşitlik, çeşitlilik ve kapsayıcılık ilkelerini benimseyen işyerleri"
      />
      
      <StatusMessage
        loading={loading}
        error={error}
        data={hasPartners ? partners : null}
        emptyMessage="Firmalar bulunamadı..."
        
      />

      {showContent && <StoryCardContainer partners={partners} />}
    </section>
  );
};

export default PartnersSection;