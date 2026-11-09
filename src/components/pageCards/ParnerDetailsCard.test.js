import React from "react";
import { render } from "@testing-library/react";
import PartnerDetailsCard from "./ParnerDetailsCard";
import PartnersList from "../../pages/partners/PartnersList";

const mockRows = ["7", 8, "9"].map((id) => ({ Cells: [{ ColumnName: "vw_esit_isyeri.objectid", Value: id }] }));
jest.mock("../../hooks/UsePartners", () => ({ usePartners: () => ({ partners: mockRows }) }));
jest.mock("../../pages/partners/PartnersList", () => jest.fn(() => null));
jest.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key, fallback) => fallback || key }) }));

it("açık işyerini Diğer İşyerleri listesinden ham ve düz kimlikleri karşılaştırarak çıkarır", () => {
  render(<PartnerDetailsCard partner={{ objectid: 7, isyeri_unvani: "Açık İşyeri" }} loading={false} error={null} />);
  const props = PartnersList.mock.calls[PartnersList.mock.calls.length - 1][0];
  expect(props.partners).toEqual(mockRows.slice(1));
});
