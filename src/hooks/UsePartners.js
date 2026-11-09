import { useState, useEffect } from "react";
import { getPartners } from "../api/partnersApi";

export const usePartners = (page = 1, limit = 5) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const data = await getPartners(page, limit);
        if (active) setPartners(data || []);
      } catch (err) {
        if (active) {
          setError(err);
          setPartners([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => { active = false; };
  }, [page, limit]);

  return { partners, loading, error };
};
