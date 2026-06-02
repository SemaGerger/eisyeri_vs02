import { useState, useEffect } from "react";
import { getPartners } from "../api/partnersApi";

export const usePartners = (page = 1, limit = 5) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const partnersDataApi = await getPartners(page, limit);

        if (partnersDataApi && partnersDataApi.length > 0) {
          setPartners(partnersDataApi);
        } else {
          setPartners([]);
        }
      } catch (err) {
        console.error("Partner verisi çekilemedi:", err);
        setError(err);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { partners, loading, error };
};