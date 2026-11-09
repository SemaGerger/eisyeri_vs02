import { act, renderHook } from "@testing-library/react";
import { getPartner, getPartners } from "../api/partnersApi";
import { usePartner } from "./UsePartner";
import { usePartners } from "./UsePartners";

jest.mock("../api/partnersApi", () => ({
  getPartner: jest.fn(),
  getPartners: jest.fn(),
}));

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

beforeEach(() => { jest.clearAllMocks(); });

it("eski liste yanıtı yeni sayfanın sonucunu değiştiremez", async () => {
  const first = deferred();
  const second = deferred();
  getPartners.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  const { result, rerender } = renderHook(({ page }) => usePartners(page, 10), { initialProps: { page: 1 } });
  rerender({ page: 2 });
  await act(async () => { second.resolve([{ Cells: [], id: 2 }]); });
  expect(result.current.partners[0].id).toBe(2);
  await act(async () => { first.resolve([{ Cells: [], id: 1 }]); });
  expect(result.current.partners[0].id).toBe(2);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
});

it("detay hatasında yükleme biter ve sonraki işyerinde hata temizlenir", async () => {
  const error = new Error("Servise erişilemiyor");
  getPartner.mockRejectedValueOnce(error);
  const { result, rerender, unmount } = renderHook(({ id }) => usePartner(id), { initialProps: { id: 1 } });
  await act(async () => {});
  expect(result.current).toEqual({ partner: null, loading: false, error });
  const next = deferred();
  getPartner.mockReturnValueOnce(next.promise);
  rerender({ id: 2 });
  expect(result.current).toEqual({ partner: null, loading: true, error: null });
  await act(async () => { next.resolve({ objectid: 2 }); });
  expect(result.current).toEqual({ partner: { objectid: 2 }, loading: false, error: null });
  const pending = deferred();
  getPartner.mockReturnValueOnce(pending.promise);
  rerender({ id: 3 });
  unmount();
  await act(async () => { pending.reject(new Error("Geç yanıt")); });
});
