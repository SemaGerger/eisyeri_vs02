jest.mock("axios", () => ({
  create: jest.fn(() => ({ get: jest.fn() })),
  isAxiosError: (error) => Boolean(error?.isAxiosError),
}));

let api;
let get;
let axios;
const originalUsername = process.env.REACT_APP_API_USERNAME;
const originalPassword = process.env.REACT_APP_API_PASSWORD;
const loginXml = '<string xmlns="http://tempuri.org/">test-session</string>';
const row = (id) => ({Cells:[
  {ColumnName:"vw_esit_isyeri.objectid",Value:id,DisplayText:String(id)},
  {ColumnName:"vw_esit_isyeri.isyeri_unvani",Value:`İşyeri ${id}`,DisplayText:`Gösterilen İşyeri ${id}`},
  {ColumnName:"vw_esit_isyeri.files",Value:'[{"src":"https://example.com/photo.jpg"}]'},
]});
const unauthorized = () => ({isAxiosError:true,response:{status:401}});

beforeEach(() => {
  jest.resetModules();
  process.env.REACT_APP_API_USERNAME = "test-user";
  process.env.REACT_APP_API_PASSWORD = "test-password";
  api = require("./partnersApi");
  axios = require("axios");
  get = axios.create.mock.results[0].value.get;
});

afterEach(() => { jest.restoreAllMocks(); });
afterAll(() => {
  if (originalUsername === undefined) delete process.env.REACT_APP_API_USERNAME;
  else process.env.REACT_APP_API_USERNAME = originalUsername;
  if (originalPassword === undefined) delete process.env.REACT_APP_API_PASSWORD;
  else process.env.REACT_APP_API_PASSWORD = originalPassword;
});

it("doğrudan CORS çağrısını çerezsiz kurar ve namespace XML oturumunu okur", async () => {
  get.mockResolvedValueOnce({data:'<s:string xmlns:s="http://tempuri.org/"> session-value </s:string>'})
    .mockResolvedValueOnce({data:{Rows:[row(1)]}});
  await api.getPartners();
  expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({baseURL:"https://keos.bcekmece.bel.tr/BELNET/",timeout:50000,withCredentials:false}));
  expect(get.mock.calls[1]).toEqual(["gisapi/query/query",{params:{queryname:"vw_esit_isyeri.Sorgusu",sessionid:"session-value"}}]);
});

it("eşzamanlı liste ve detay çağrılarında tek giriş/sorgu kullanır ve Cells sözleşmesini korur", async () => {
  const rows = [row(1),row(2),row(3)];
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{Rows:rows}});
  const [list,detail] = await Promise.all([api.getPartners(2,1),api.getPartner("02")]);
  expect(list).toEqual([rows[1]]);
  expect(list[0].Cells[1].DisplayText).toBe("Gösterilen İşyeri 2");
  expect(detail).toEqual({objectid:2,isyeri_unvani:"İşyeri 2",files:'[{"src":"https://example.com/photo.jpg"}]'});
  expect(await api.getPartners(4,1)).toEqual([]);
  expect(await api.getPartner(999)).toBeNull();
  expect(get).toHaveBeenCalledTimes(2);
});

it("küçük harfli rows/cells yanıtını liste kontratına uyarlar", async () => {
  const item = row(4);
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{rows:[{cells:item.Cells}]}});
  expect((await api.getPartners())[0].Cells).toEqual(item.Cells);
  expect((await api.getPartner(4)).objectid).toBe(4);
});

it.each([
  '<string xmlns="http://tempuri.org/"></string>',
  '<string>broken',
  '<html>not a login response</html>',
])("geçersiz/boş giriş XML'inden sonra sorgu göndermez: %s", async (xml) => {
  get.mockResolvedValueOnce({data:xml});
  await expect(api.getPartners()).rejects.toMatchObject({code:"PARTNERS_LOGIN"});
  expect(get).toHaveBeenCalledTimes(1);
});

it("401 yanıtında oturumu yalnız bir kez yenileyip yeni kimlikle sorgular", async () => {
  get.mockResolvedValueOnce({data:loginXml}).mockRejectedValueOnce(unauthorized())
    .mockResolvedValueOnce({data:'<string>renewed-session</string>'}).mockResolvedValueOnce({data:{Rows:[row(2)]}});
  await expect(api.getPartner(2)).resolves.toMatchObject({objectid:2});
  expect(get).toHaveBeenCalledTimes(4);
  expect(get.mock.calls[3][1].params.sessionid).toBe("renewed-session");
});

it("sürekli 401 yanıtında durur ve sonraki çağrıda temiz oturumla toparlanır", async () => {
  get.mockResolvedValueOnce({data:loginXml}).mockRejectedValueOnce(unauthorized())
    .mockResolvedValueOnce({data:loginXml}).mockRejectedValueOnce(unauthorized());
  await expect(api.getPartners()).rejects.toMatchObject({code:"PARTNERS_SERVICE"});
  expect(get).toHaveBeenCalledTimes(4);
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{Rows:[row(1)]}});
  await expect(api.getPartners()).resolves.toHaveLength(1);
  expect(get).toHaveBeenCalledTimes(6);
});

it("60 saniye veri önbelleği sonrası veriyi, 15 dakika sonra oturumu da yeniler", async () => {
  const clock = jest.spyOn(Date,"now").mockReturnValue(1000000);
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{Rows:[row(1)]}});
  await api.getPartners();
  clock.mockReturnValue(1059999);
  await api.getPartners();
  expect(get).toHaveBeenCalledTimes(2);
  clock.mockReturnValue(1060001);
  get.mockResolvedValueOnce({data:{Rows:[row(2)]}});
  await expect(api.getPartners()).resolves.toEqual([row(2)]);
  expect(get).toHaveBeenCalledTimes(3);
  clock.mockReturnValue(1900001);
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data:{Rows:[]}});
  await expect(api.getPartners()).resolves.toEqual([]);
  expect(get).toHaveBeenCalledTimes(5);
});

it.each([
  [{isAxiosError:true,code:"ERR_NETWORK"},"PARTNERS_NETWORK"],
  [{isAxiosError:true,code:"ECONNABORTED"},"PARTNERS_TIMEOUT"],
  [{isAxiosError:true,response:{status:500}},"PARTNERS_SERVICE"],
])("Axios ayrıntılarını sızdırmadan güvenli hata üretir", async (failure,code) => {
  const sensitive = {...failure,message:"private-service-details",config:{params:{password:"private-value",sessionid:"private-session"}}};
  get.mockRejectedValueOnce(sensitive);
  const error = await api.getPartners().catch((err) => err);
  expect(error).toMatchObject({code});
  expect(error.config).toBeUndefined();
  expect(error.cause).toBeUndefined();
  expect(error.message).not.toContain("private");
});

it.each([{Rows:"not-an-array"},{Rows:[{}]},{error:"service-error"}])("geçersiz veri formatını boş liste gibi göstermez", async (data) => {
  get.mockResolvedValueOnce({data:loginXml}).mockResolvedValueOnce({data});
  await expect(api.getPartners()).rejects.toMatchObject({code:"PARTNERS_RESPONSE"});
});

it("giriş bilgileri eksikse ağ isteği yapmaz", async () => {
  delete process.env.REACT_APP_API_PASSWORD;
  await expect(api.getPartners()).rejects.toMatchObject({code:"PARTNERS_CONFIG"});
  expect(get).not.toHaveBeenCalled();
});
