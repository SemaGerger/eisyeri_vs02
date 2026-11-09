import { getPartnerField, getPartnerFiles, getPartnerId, getPartnerImage } from "./partnerFields";

const cell = (field, value, displayText) => ({ColumnName:`vw_esit_isyeri.${field}`,Value:value,DisplayText:displayText});
const cells = [
  cell("telefon","05550000000","05550000000"),
  cell("mahalle",42,"19 MAYIS"),
  cell("yol_adi",17,"OSMANGAZİ CADDE"),
  cell("isyeri_unvani","Örnek İşyeri","Örnek İşyeri"),
  cell("yetkili_kisi","Örnek Yetkili","Örnek Yetkili"),
  cell("faaliyet_turu",3,"MARKET"),
  cell("calisma_saati","09:00 - 22:00","09:00 - 22:00"),
  cell("objectid",103,"103,00"),
  cell("files",'[{"src":"https://example.com/photo.jpg"}]',"1 dosya"),
];

it("kolon sırası değişse de telefon yerine doğru mahalle/cadde alanlarını okur", () => {
  for (const Cells of [cells, [...cells].reverse(), [...cells.slice(4), ...cells.slice(0,4)]]) {
    const partner = {Cells};
    expect(getPartnerField(partner,"mahalle")).toBe("19 MAYIS");
    expect(getPartnerField(partner,"yol_adi")).toBe("OSMANGAZİ CADDE");
    expect(getPartnerField(partner,"isyeri_unvani")).toBe("Örnek İşyeri");
    expect(getPartnerField(partner,"yetkili_kisi")).toBe("Örnek Yetkili");
    expect(getPartnerField(partner,"faaliyet_turu")).toBe("MARKET");
    expect(getPartnerField(partner,"calisma_saati")).toBe("09:00 - 22:00");
    expect(getPartnerId(partner)).toBe("103");
    expect(getPartnerImage(partner,"default.png")).toBe("https://example.com/photo.jpg");
  }
});

it("düz partner nesnelerini, eski alan takma adlarını ve sıfır kimliğini korur", () => {
  const partner = {id:0,name:"Düz İşyeri",yetkili:"Yetkili",faaliyet:"Atölye",calismaSaati:"08:00",mahalle:"Mahalle",yolAdi:"Sokak",files:[{src:"/photo.jpg"}]};
  expect(getPartnerId(partner)).toBe("0");
  expect(getPartnerField(partner,"isyeri_unvani")).toBe("Düz İşyeri");
  expect(getPartnerField(partner,"yetkili_kisi")).toBe("Yetkili");
  expect(getPartnerField(partner,"faaliyet_turu")).toBe("Atölye");
  expect(getPartnerField(partner,"calisma_saati")).toBe("08:00");
  expect(getPartnerField(partner,"mahalle")).toBe("Mahalle");
  expect(getPartnerField(partner,"yol_adi")).toBe("Sokak");
  expect(getPartnerImage(partner,"default.png")).toBe("/photo.jpg");
  expect(getPartnerImage({image:"/direct.jpg"},"default.png")).toBe("/direct.jpg");
});

it("boş DisplayText için Value, bulunmayan alan için düz nesne veya varsayılanı kullanır", () => {
  expect(getPartnerField({cells:[cell("mahalle","Mahalle","")]},"mahalle")).toBe("Mahalle");
  expect(getPartnerField({Cells:[cell("mahalle",null,"")],mahalle:"Düz Mahalle"},"mahalle")).toBe("Düz Mahalle");
  expect(getPartnerField({Cells:"broken"},"isyeri_unvani","İsim yok")).toBe("İsim yok");
  expect(getPartnerId({})).toBeNull();
});

it("dosyalarda DisplayText yerine JSON Value okur ve bozuk dosya verisini güvenle atlar", () => {
  expect(getPartnerFiles({Cells:cells})).toEqual([{src:"https://example.com/photo.jpg"}]);
  for (const files of ['{','{"src":"wrong-shape"}',null,[null,{}, {src:""}]]) {
    expect(getPartnerImage({files},"default.png")).toBe("default.png");
  }
  expect(getPartnerImage({filesJson:'[{"src":"/legacy.jpg"}]'},"default.png")).toBe("/legacy.jpg");
});
