import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../layouts/Layout";
import { usePartners } from "../../hooks/UsePartners";
import PageContainer from "../../components/pageCards/PageContainer";
import PageTitle from "../../components/pageCards/PageTitle";
import StatusMessage from "../../components/status/StatusMessage";

const PartnersPage = () => {
  const [page, setPage] = useState(1);
  const [allPartners, setAllPartners] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const { partners, loading, error } = usePartners(page, limit);

  useEffect(() => {
    if (partners && partners.length > 0) {
      setAllPartners(prev => [...prev, ...partners]);
      if (partners.length < limit) {
        setHasMore(false);
      }
    }
  }, [partners, limit]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Layout>
      <div className="py-12 px-6 mt-16">
        <PageTitle
          title="Eşit İşyerleri"
          subtitle="Eşitlik, çeşitlilik ve kapsayıcılık ilkelerini benimseyen işyerlerini keşfedin"
        />
        

        {allPartners.length === 0 && !loading && (
          <StatusMessage 
            loading={loading} 
            error={error} 
            data={allPartners} 
            emptyMessage="Henüz veri bulunmamaktadır."
            type="detailed"
          />
        )}

        {allPartners.length > 0 && (
          <>
            <PageContainer partners={allPartners} />
 
            {hasMore && (
              <div className="mt-8">
                <StatusMessage 
                  loading={loading} 
                  error={null} 
                  data={null} 
                  type="minimal"
                />
              </div>
            )}
            
           
          </>
        )}
        
        {/* Hata */}
        {error && allPartners.length === 0 && (
          <StatusMessage 
            loading={false} 
            error={error} 
            data={null} 
            type="detailed"
          />
        )}
      </div>
    </Layout>
  );
};

export default PartnersPage;