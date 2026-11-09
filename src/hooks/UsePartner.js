import { useState, useEffect } from "react";
import { getPartner } from "../api/partnersApi";

export const usePartner = (id) => {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPartner(null);

    const fetchData = async () => {
      try {
        const data = await getPartner(id);
        if (active) setPartner(data || null);
      } catch (err) {
        if (active) {
          setError(err);
          setPartner(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => { active = false; };
  }, [id]);

  return { partner, loading, error };
};
