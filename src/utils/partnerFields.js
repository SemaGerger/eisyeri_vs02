const PREFIX = "vw_esit_isyeri.";
const ALIASES = {
  objectid: ["id"],
  isyeri_unvani: ["name"],
  yetkili_kisi: ["yetkili"],
  faaliyet_turu: ["faaliyet"],
  calisma_saati: ["calismaSaati"],
  yol_adi: ["yolAdi"],
  files: ["filesJson"],
};

const hasValue = (value) => value !== undefined && value !== null &&
  (typeof value !== "string" || value.trim() !== "");

// Servis kolon sırası değişebilir. Kimlik ve dosyalarda ham Value, metinlerde
// kullanıcıya gösterilen DisplayText tercih edilir; düz nesneler de desteklenir.
export function getPartnerField(partner, field, fallback = "") {
  const cells = partner?.Cells ?? partner?.cells;
  const raw = field === "objectid" || field === "files";
  if (Array.isArray(cells)) {
    for (const cell of cells) {
      if (cell?.ColumnName !== `${PREFIX}${field}` && cell?.ColumnName !== field) continue;
      const values = raw ? [cell.Value] : [cell.DisplayText, cell.Value];
      const value = values.find(hasValue);
      if (hasValue(value)) return value;
    }
  }
  for (const key of [field, ...(ALIASES[field] || [])]) {
    if (hasValue(partner?.[key])) return partner[key];
  }
  return fallback;
}

export function getPartnerId(partner) {
  const value = getPartnerField(partner, "objectid", null);
  return value === null ? null : String(value);
}

export function getPartnerFiles(partner) {
  try {
    const value = getPartnerField(partner, "files", []);
    const files = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(files)
      ? files.filter((file) => file && typeof file.src === "string" && file.src.trim())
      : [];
  } catch {
    return [];
  }
}

export function getPartnerImage(partner, fallback) {
  if (typeof partner?.image === "string" && partner.image.trim()) return partner.image;
  return getPartnerFiles(partner)[0]?.src || fallback;
}
