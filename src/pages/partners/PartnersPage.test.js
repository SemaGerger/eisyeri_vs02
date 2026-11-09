import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import PartnersPage from "./PartnersPage";
import { getPartners } from "../../api/partnersApi";

jest.mock("../../api/partnersApi", () => ({ getPartners: jest.fn() }));
jest.mock("../../layouts/Layout", () => ({ children }) => <main>{children}</main>);
jest.mock("../../components/pageCards/PageContainer", () => ({ partners }) => <div data-testid="partner-count">{partners.length}</div>);
jest.mock("../../components/pageCards/PageTitle", () => () => null);
jest.mock("react-i18next", () => ({ useTranslation: () => ({ t: (_key, fallback) => fallback }) }));

const rows = (count) => Array.from({ length: count }, (_, id) => ({ Cells: [{ ColumnName: "vw_esit_isyeri.objectid", Value: id }] }));

beforeEach(() => { jest.resetAllMocks(); });

it("eski kayıtları tekrar eklemez ve boş son sayfadan sonra istek göndermez", async () => {
  let finishSecond;
  const second = new Promise((resolve) => { finishSecond = resolve; });
  getPartners.mockResolvedValueOnce(rows(10)).mockReturnValueOnce(second);
  render(<PartnersPage />);
  await act(async () => {});
  expect(screen.getByTestId("partner-count")).toHaveTextContent("10");
  act(() => {
    fireEvent.scroll(window);
    fireEvent.scroll(window);
  });
  expect(getPartners).toHaveBeenCalledTimes(2);
  expect(getPartners).toHaveBeenLastCalledWith(2, 10);
  expect(screen.getByTestId("partner-count")).toHaveTextContent("10");
  await act(async () => { finishSecond([]); });
  fireEvent.scroll(window);
  expect(getPartners).toHaveBeenCalledTimes(2);
  expect(screen.getByTestId("partner-count")).toHaveTextContent("10");
});

it("hatayı bir kez gösterir ve hatadan sonra sonsuz sayfa istemez", async () => {
  getPartners.mockRejectedValueOnce(new Error("Servise erişilemiyor"));
  render(<PartnersPage />);
  await act(async () => {});
  expect(screen.getAllByText("Servise erişilemiyor")).toHaveLength(1);
  fireEvent.scroll(window);
  expect(getPartners).toHaveBeenCalledTimes(1);
});
