import axios from "axios";

// Axios örneği oluşturabiliriz (opsiyonel, baseURL vs için)
const api = axios.create({
  baseURL: "/api",
  timeout: 50000, // 50 saniye
});

/**
 * Tüm partnerleri listele
 * @param {number} page - Sayfa numarası
 * @param {number} limit - Sayfa başına öğe sayısı
 * @returns {Array} Partner dizisi
 */
export const getPartners = async (page = 1, limit = 5) => {
  try {
    const response = await api.get("/partners", {
      params: { page, limit },
    });

    const data = response.data;

    // API beklenen formatta değilse boş dizi dön
    if (!data || !Array.isArray(data.rows)) {
      console.warn("⚠️ API'den beklenen format gelmedi:", data);
      return [];
    }

    return data.rows;
  } catch (err) {
    handleAxiosError(err);
    return [];
  }
};

/**
 * Tek partner detayı al
 * @param {number|string} id - Partner ID
 * @returns {Object|null} Partner objesi veya null
 */

export const getPartner = async (id) => {
  try {
    const response = await api.get(`/partners/${id}`);
    return response.data || null;
  } catch (err) {
    handleAxiosError(err);
    return null;
  }
};


/**
 * Axios hatalarını merkezi şekilde yönet
 * @param {any} err
 */
const handleAxiosError = (err) => {
  if (err.response) {
    console.error(
      `API hatası (status ${err.response.status}):`,
      err.response.data
    );
  } else if (err.request) {
    console.error("API isteği yapıldı ama cevap gelmedi:", err.message);
  } else {
    console.error("Axios hatası:", err.message);
  }
};



/*import axios from "axios";

export const getPartners = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`/api/partners?page=${page}&limit=${limit}`, {
      timeout: 50000,
      withCredentials: true,
    });
    return res.data.rows || [];
  } catch (err) {
    console.error("Partner verisi çekilemedi:", err);
    return [];
  }
};

/*export const getPartners = async (page = 1, limit = 5) => {
  try {
    // URL oluştur
    const url = `/api/partners?page=${page}&limit=${limit}`;

    // fetch isteği at
    const controller = new AbortController(); // timeout için
    const timeout = setTimeout(() => controller.abort(), 50000); // 50 saniye

    const res = await fetch(url, {
      method: "GET",
      credentials: "include", // withCredentials: true karşılığı
      signal: controller.signal, // timeout çalışsın diye
    });

    clearTimeout(timeout); // başarılı olursa timeout'u temizle

    // response'un body kısmını JSON'a çevir
    if (!res.ok) {
      // 200 dışında bir durumsa hata fırlat
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.rows || [];
  } catch (err) {
    console.error("Partner verisi çekilemedi:", err);
    return [];
  }
};
*/
