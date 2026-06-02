const testSiteConfig = {
  testData: {
    partners: {
      loading: true,
      error: "Sunucu bağlantı hatası",
      emptyData: [],
      nullData: null,
      mockPartners: [
        {
          id: 1,
          name: "Örnek Firma 1",
          logo: "/logo1.png",
          description: "Örnek açıklama 1",
          sector: "Teknoloji"
        },
        {
          id: 2, 
          name: "Örnek Firma 2",
          logo: "/logo2.png",
          description: "Örnek açıklama 2",
          sector: "Finans"
        },
        {
          id: 3,
          name: "Örnek Firma 3",
          logo: "/logo3.png",
          description: "Örnek açıklama 3",
          sector: "Sağlık"
        }
      ]
    }
  }
};
export default testSiteConfig;