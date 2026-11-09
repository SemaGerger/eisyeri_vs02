import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../../layouts/Layout";
import { usePartners } from "../../hooks/UsePartners";
import PageContainer from "../../components/pageCards/PageContainer";
import PageTitle from "../../components/pageCards/PageTitle";
import StatusMessage from "../../components/status/StatusMessage";

const partnerKey = (partner) => {
  const id = partner.Cells?.find((cell) => cell.ColumnName === "vw_esit_isyeri.objectid")?.Value;
  return id == null ? partner : String(id);
};

const PartnersPage = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [allPartners, setAllPartners] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pendingPage = useRef(false);
  const processedPartners = useRef(null);
  const limit = 10;

  const { partners, loading, error } = usePartners(page, limit);

  useEffect(() => {
    if (loading) return;
    pendingPage.current = false;
    if (error || processedPartners.current === partners) return;
    processedPartners.current = partners;
    setHasMore(partners.length === limit);
    if (partners.length > 0) {
      setAllPartners((previous) => {
        const unique = new Map(previous.map((partner) => [partnerKey(partner), partner]));
        partners.forEach((partner) => unique.set(partnerKey(partner), partner));
        return Array.from(unique.values());
      });
    }
  }, [partners, loading, error, limit]);

  const handleScroll = useCallback(() => {
    if (loading || error || !hasMore || pendingPage.current) return;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    if (scrollTop + windowHeight >= documentHeight - 100) {
      pendingPage.current = true;
      setPage((previous) => previous + 1);
    }
  }, [loading, error, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Layout>
      <div className="py-12 px-6 mt-16">
        <PageTitle
          title={t("partnersPage.title", "Eşit İşyerleri")}
          subtitle={t("partnersPage.subtitle", "Eşitlik, çeşitlilik ve kapsayıcılık ilkelerini benimseyen işyerlerini keşfedin")}
        />
        {(allPartners.length === 0 || error) && (
          <StatusMessage
            loading={loading}
            error={error}
            data={allPartners}
            emptyMessage={t("partnersPage.emptyMessage", "Henüz veri bulunmamaktadır.")}
            type="detailed"
          />
        )}
        {allPartners.length > 0 && <PageContainer partners={allPartners} />}
        {allPartners.length > 0 && loading && (
          <div className="mt-8">
            <StatusMessage loading type="minimal" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PartnersPage;
