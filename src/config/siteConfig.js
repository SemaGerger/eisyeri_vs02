import heroPoster from "../assets/optimized/hero-poster.webp";
import heroFullVideo from "../assets/optimized/esit-isyeri-film.mp4";
import basindabizPoster from "../assets/optimized/now-poster.webp";
import KrtPoster from "../assets/optimized/krt-poster.webp";
import Tele1Poster from "../assets/optimized/tele1-poster.webp";
import HalkTvNisan2023Poster from "../assets/optimized/halk-tv-poster.webp";
import Tv5Poster from "../assets/optimized/tv5-poster.webp";
import HalkTVPoster from "../assets/optimized/halk-tv-2-poster.webp";
import FlashTVPoster from "../assets/optimized/flash-tv-poster.webp";
import belediyeLogo from "../assets/optimized/belediye-logo.webp";
import esitIsyeriLogo from "../assets/optimized/site-logo.webp";
import esitIsyeriYazisiLogo from "../assets/optimized/site-wordmark.webp";
import heroVideo from "../assets/optimized/hero-loop.mp4";


import aboutImage1 from "../assets/optimized/about-1.webp";
import aboutImage2 from "../assets/optimized/about-2.webp";
import aboutImage3 from "../assets/optimized/about-3.webp";

import basindabiz from "../assets/optimized/now-news.mp4";
import FlashTV from "../assets/optimized/flash-tv-news.mp4";
import HalkTV from "../assets/optimized/halk-tv-2-news.mp4";
import HalkTvNisan2023 from "../assets/optimized/halk-tv-news.mp4";
import Krt from "../assets/optimized/krt-news.mp4";
import Tele1 from "../assets/optimized/tele1-news.mp4";
import Tv5 from "../assets/optimized/tv5-news.mp4";

/*import foto1 from "../assets/optimized/partner-1.webp";
import foto2 from "../assets/optimized/partner-2.webp";
import foto3 from "../assets/optimized/partner-3.webp";
import foto4 from "../assets/optimized/partner-4.webp";
import foto5 from "../assets/optimized/partner-5.webp";
import foto6 from "../assets/optimized/partner-6.webp";*/

import president from "../assets/optimized/president.webp";

import logomuz from "../assets/optimized/esit-isyeri-logo.webp";
import tescil from "../assets/optimized/tescil.webp";

import logo from "../assets/optimized/site-logo.webp";
import logoYazisi from "../assets/optimized/site-wordmark.webp";




const siteConfig = {

  navLinks: [
    { name: "Ana Sayfa", to: "/", key: "home" },
    { name: "Başkan Hakkında", to: "/baskan-hakkinda", key: "aboutPresident" },
    { name: "Eşit İşyerleri", to: "/esit-isyerleri", key: "partners" },
    { name: "Hakkımızda", to: "/hakkimizda", key: "about" },
    { name: "Bize Ulaşın", to: "/iletisim", key: "contact" },
    { name: "Logomuz", to: "/logomuz", key: "logo" },
  ],


  

  logos: { main: logo, text: logoYazisi, name: "Eşit İşyeri", homeUrl: "/", },



  hero: {
    title: "Eşit İşyeri",
    highlight: "Projesi",
    subtitle: "Büyükçekmece Belediyesi Ruhsat ve Denetim Müdürlüğü",
    CTA1TEXT: "İşyerinizi Kaydedin",
    CTA1URL: "https://ulakbel.bcekmece.bel.tr/WebBasvuru/esitisyeri#/",
    CTA2TEXT: "Bücep Grubuna Katılın",
    CTA2URL: "https://bucep.framer.website/",
    HERO_VIDEO: heroVideo,
    HERO_POSTER: heroPoster,
    HERO_FULL_VIDEO: heroFullVideo,
  },



  belediyeName: "Büyükçekmece Belediyesi",
  belediyeUrl: "https://bcekmece.bel.tr",
  ebelediyeUrl: "https://ebelediye.bcekmece.bel.tr",

  assets: {
    logos: {
      belediye: {
        src: belediyeLogo,
        alt: "Büyükçekmece Belediyesi",
      },
      esitIsyeri: {
        src: esitIsyeriLogo,
        alt: "Eşit İşyeri",
      },
      esitIsyeriYazisi: {
        src: esitIsyeriYazisiLogo,
        alt: "Eşit İşyeri Yazısı",
      },
    },
  },

  contact: {
    phone: "444 0 340",
    email: "danisma@bcekmece.bel.tr",
    address: "Fatih Mahallesi Şehremini Sokak. No:1 A Blok Zemin Kat Büyükçekmece/İstanbul",
  },


  socialLinks: {
    facebook: "https://tr-tr.facebook.com/Buyukcekmecebld",
    twitter: "https://x.com/BuyukcekmeceBld",
    instagram: "https://www.instagram.com/buyukcekmecebld/#",

  },


  defaultTexts: {
    partnerName: "İsim yok",
    partnerContact: "Yetkili yok",
    partnerActivity: "Faaliyet türü yok",
  },

  brand: {
    title: "Logomuz ve Marka Kimliği",
    description: "Eşit İşyeri projemizin logosu, şeffaflık, eşitlik ve güven ilkelerini temsil eder. Logomuz ve marka tescil belgemiz aşağıda yer almaktadır.",
    title1: "Eşit İşyeri Logosu",
    subtitle1: "Eşit işyeri",
    image: esitIsyeriLogo,
    title2: "Belediye Logosu",
    subtitle2: "Büyükçekmece Belediyesi",

  },

  form: {
    ctaButton: "https://ulakbel.bcekmece.bel.tr/WebBasvuru/esitisyeri#/",
  },

  theme: {
    colors: {
      primary: "#004aad",
      secondary: "#00b4d8",
      gray: "#6b7280",
    },
  },

  aboutData:
  {
    what: {
      id: 1,
      title: "Eşit İşyeri Nedir?",
      text: "Büyükçekmece Belediyesi olarak; Toplumsal cinsiyet eşitliği ile ilgili farkındalık yaratmak, kadın girişimcilerin sayısını artırmak, kadınların toplumda çağdaş ve güçlü bireyler olarak yer almalarını sağlamak amacıyla Eşit İşyeri Projesi başlatılmıştır.",
      image: aboutImage1,
    },
    why: {
      id: 2,
      title: "Neden Almalıyım?",
      text: "İşyerinize ait ruhsat ücretlerinde %50 oranında indirim sağlanacaktır. İşyerinize ait ilan ve reklam ücretlerinde %50 oranında indirim sağlanacaktır.",
      image: aboutImage2,
    },

    condition: {
      id: 3,
      title: "Başvuru Şartları",
      text: `- İşyerinde çalışanların %50'sinin ya da daha fazlasının kadın olması
- İşyerinde eşit işi yapan kadın ve erkek çalışanların eşit ücret alması
- İşyerinde işverenler haricinde en az 2 çalışan olması
- Kadınlara mahsus hizmet veren iş yerleri bu proje kapsamı dışındadır. Bu işyerlerinin tespiti Eşit İşyeri Komisyonu tarafından değerlendirilecektir.
- Eşit İşyeri Belgesini alan işyerleri yukarıdaki şartları koruması gerekmektedir. Aksi taktirde Eşit İşyeri Belgesi ve bu proje kapsamında faydalandığı avantajlar Eşit İşyeri Komisyonunca iptal edilecektir.`,
      image: aboutImage3,
    },





  },


  partners: {
    list: {
      title: "Diğer İşyerleri",
      subtitle: "Benzer eşit işyerlerini keşfedin",
      emptyMessage: "Gösterilecek işyeri bulunamadı",
      viewAllText: "Tümünü Görüntüle",
      viewAllLink: "/esit-isyerleri",
    },
    detail: {
      detailPath: "/detay",
      messages: { partnerNotFound: "Firma bulunamadı...", },
      sections: {
        address: {
          title: "Adres Bilgisi",
          fields: {
            acik_adres: "Açık Adres",
            mahalle: "Mahalle",
            yol_adi: "Cadde/Sokak",
          },
        },
        map: {
          title: "Konum Haritası",
        },
        contact: {
          title: "İletişim Bilgileri",
          fields: {
            yetkili_kisi: "Yetkili Kişi",
            telefon: "Telefon",
            eposta: "E-posta",
          },
        },
        calisma_saati: {
          title: "Çalışma Saatleri",
        },
      },
    },

  },

  loading: "Yükleniyor...",


  servicesData: {
    top: { id: 1, title: "%50 Harç İndirimi", description: "Ruhsat, ilan ve reklam ücretlerinde %50 indirim avantajından yararlanın." },
    middle: { id: 2, title: "Kadın İstihdamına Destek", description: "Kadın girişimcileri ve çalışanları güçlendirerek eşitliği teşvik edin." },
    buttom: { id: 3, title: "Eşit İşyeri Tescili", description: "Toplumsal cinsiyet eşitliğini benimseyen öncü işletmeler arasında yerinizi alın." },
  },


};

export default siteConfig;



export const pressData = [
  { id: 1, title: "Now", video: basindabiz, poster: basindabizPoster },
  { id: 2, title: "KRT", video: Krt, poster: KrtPoster },
  { id: 3, title: "Tele1", video: Tele1, poster: Tele1Poster },
  { id: 4, title: "Halk TV", video: HalkTvNisan2023, poster: HalkTvNisan2023Poster },
  { id: 5, title: "TV5", video: Tv5, poster: Tv5Poster },
  { id: 6, title: "Halk TV 2", video: HalkTV, poster: HalkTVPoster },
  { id: 7, title: "FlashTV", video: FlashTV, poster: FlashTVPoster },
];


export const abaoutPresident = [
  {
    id: 1, title: "BAŞKANIN MESAJI",
    text: "Eşit İşyeri projemizin amacı, şehrimiz genelinde toplumsal cinsiyet eşitliği ile ilgili farkındalık yaratmak, kadın girişimcilerin sayısını arttırmak, kadınların çalışma hayatatında çağdaş ve güçlü bireyler olarak üretimden yönetime kadar her alanda görev almalarını desteklemek ve toplumsal yaşamın her alanında ve işyerlerinde kadın-erkek eşitliğinin sağlanması konusunda önem vermek ve bu dengeyi gözetmektir.",
    image: president,
  },
];

export const logomuz2 = [
  { id: 1, title: "", image: logomuz },
  { id: 2, title: "", image: tescil },
];
