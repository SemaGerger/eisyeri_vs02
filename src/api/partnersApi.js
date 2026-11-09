import axios from "axios";

const api = axios.create({
  baseURL: "https://keos.bcekmece.bel.tr/BELNET/",
  timeout: 50000,
  // Oturum kimliği sorgu parametresindedir; CORS wildcard ile çerez gönderilmez.
  withCredentials: false,
});

const SESSION_TTL = 15 * 60 * 1000;
const DATA_TTL = 60 * 1000;
const COLUMN_PREFIX = "vw_esit_isyeri.";
const ID_COLUMN = `${COLUMN_PREFIX}objectid`;

let session = null;
let loginRequest = null;
let partnersRequest = null;
let cachedRows = null;
let cacheExpiry = 0;

class PartnerServiceError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "PartnerServiceError";
    this.code = code;
  }
}

async function login() {
  if (session && session.expiresAt > Date.now()) return session.id;
  if (!loginRequest) {
    loginRequest = (async () => {
      const username = process.env.REACT_APP_API_USERNAME;
      const password = process.env.REACT_APP_API_PASSWORD;
      if (!username || !password) {
        throw new PartnerServiceError("PARTNERS_CONFIG", "İşyeri servisi giriş bilgileri yapılandırılmamış.");
      }
      const { data } = await api.get("LogonService.asmx/Login", {
        params: { username, password },
        responseType: "text",
      });
      const xml = new DOMParser().parseFromString(data, "application/xml");
      const root = xml.documentElement;
      const id = root?.localName === "string" ? root.textContent?.trim() : "";
      if (xml.querySelector("parsererror") || !id) {
        throw new PartnerServiceError("PARTNERS_LOGIN", "İşyeri servisine giriş yapılamadı.");
      }
      session = { id, expiresAt: Date.now() + SESSION_TTL };
      return id;
    })().finally(() => { loginRequest = null; });
  }
  return loginRequest;
}

async function queryRows() {
  // Süresi biten oturumda bir kez yeniden giriş yapılır; sınırsız tekrar yoktur.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const id = await login();
    try {
      const { data } = await api.get("gisapi/query/query", {
        params: { queryname: "vw_esit_isyeri.Sorgusu", sessionid: id },
      });
      const rows = data?.Rows ?? data?.rows;
      if (!Array.isArray(rows) || rows.some((row) => !row || !Array.isArray(row.Cells ?? row.cells))) {
        throw new PartnerServiceError("PARTNERS_RESPONSE", "İşyeri servisinden beklenen veri alınamadı.");
      }
      // Liste bileşenlerinin kullandığı Cells/DisplayText sözleşmesini koru.
      return rows.map((row) => row.Cells ? row : { ...row, Cells: row.cells });
    } catch (error) {
      if (error.response?.status === 401) {
        if (session?.id === id) session = null;
        if (attempt === 0) continue;
      }
      throw error;
    }
  }
}

function serviceError(error) {
  if (error instanceof PartnerServiceError) return error;
  if (axios.isAxiosError(error)) {
    if (["ECONNABORTED", "ETIMEDOUT"].includes(error.code)) {
      return new PartnerServiceError("PARTNERS_TIMEOUT", "İşyeri servisi zamanında yanıt vermedi. Lütfen tekrar deneyin.");
    }
    if (!error.response) {
      return new PartnerServiceError("PARTNERS_NETWORK", "İşyeri servisine erişilemiyor. Lütfen daha sonra tekrar deneyin.");
    }
  }
  // Axios config/URL/yanıt içeriğini (giriş ve oturum verilerini) dışarı taşıma.
  return new PartnerServiceError("PARTNERS_SERVICE", "İşyeri verileri alınamadı. Lütfen daha sonra tekrar deneyin.");
}

async function getAllRows() {
  if (cachedRows !== null && cacheExpiry > Date.now()) return cachedRows;
  if (!partnersRequest) {
    partnersRequest = queryRows()
      .then((rows) => {
        cachedRows = rows;
        cacheExpiry = Date.now() + DATA_TTL;
        return rows;
      })
      .catch((error) => { throw serviceError(error); })
      .finally(() => { partnersRequest = null; });
  }
  return partnersRequest;
}

export async function getPartners(page = 1, limit = 5) {
  const rows = await getAllRows();
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 5);
  const start = (pageNumber - 1) * pageSize;
  return rows.slice(start, start + pageSize);
}

export async function getPartner(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;
  const rows = await getAllRows();
  const row = rows.find((item) => item.Cells.some((cell) =>
    cell?.ColumnName === ID_COLUMN && Number(cell.Value) === numericId
  ));
  if (!row) return null;
  // Eski /api/partners/:id endpoint'i ColumnName önekini kaldırıp Value döndürüyordu.
  return Object.fromEntries(row.Cells
    .filter((cell) => typeof cell?.ColumnName === "string")
    .map((cell) => [cell.ColumnName.replace(/^vw_esit_isyeri\./, ""), cell.Value]));
}
