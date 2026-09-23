import belediyeLogo from "../assets/logos/bcekmecebldlogo.png";
import esitIsyeriLogo from "../assets/logos/esitisyeri-kalp-logo.png";
import esitIsyeriYazisiLogo from "../assets/logos/esitisyeri-yazisi-logo.png";
import heroVideo from "../assets/videos/esitIsyeriVideo.mp4";


import aboutImage1 from "../assets/images/about/Image1.jpg";
import aboutImage2 from "../assets/images/about/Image2.jpg";
import aboutImage3 from "../assets/images/about/Image3.jpg";

import basindabiz from "../assets/videos/press/basindabiz.mp4";
import FlashTV from "../assets/videos/press/FlashTv.mp4";
import HalkTV from "../assets/videos/press/HalkTv.mp4";
import HalkTvNisan2023 from "../assets/videos/press/HalkTv2.mp4";
import Krt from "../assets/videos/press/KRT.mp4";
import Tele1 from "../assets/videos/press/Tele1.mp4";
import Tv5 from "../assets/videos/press/Tv5.mp4";

/*import foto1 from "../assets/images/partners/1.jpeg";
import foto2 from "../assets/images/partners/2.jpg";
import foto3 from "../assets/images/partners/3.jpg";
import foto4 from "../assets/images/partners/4.jpg";
import foto5 from "../assets/images/partners/5.jpg";
import foto6 from "../assets/images/partners/6.jpg";*/

import president from "../assets/images/HasanAkgun.png";

import logomuz from "../assets/logos/esitIsyeriLogo.png";
import tescil from "../assets/images/tescil.png";

import logo from "../assets/logos/esitisyeri-kalp-logo.png";
import logoYazisi from "../assets/logos/esitisyeri-yazisi-logo.png";




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
  { id: 1, title: "Now", video: basindabiz },
  { id: 2, title: "KRT", video: Krt },
  { id: 3, title: "Tele1", video: Tele1 },
  { id: 4, title: "Halk TV", video: HalkTvNisan2023 },
  { id: 5, title: "TV5", video: Tv5 },
  { id: 6, title: "Halk TV 2", video: HalkTV },
  { id: 7, title: "FlashTV", video: FlashTV },
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
