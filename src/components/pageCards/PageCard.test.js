import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PageCard from "./PageCard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }), { virtual: true });
jest.mock("react-i18next", () => ({ useTranslation: () => ({ t: (_key, fallback) => fallback }) }));

it("işyeri kartı yönlendirmeyi dışındaki detay bağlantısına bırakır", () => {
  const openDetail = jest.fn((event) => event.preventDefault());
  render(<a href="/detay/2" onClick={openDetail}><PageCard id="2" name="Örnek İşyeri" /></a>);
  fireEvent.click(screen.getByText("Örnek İşyeri"));
  expect(openDetail).toHaveBeenCalledTimes(1);
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(screen.getByRole("link")).toHaveAttribute("href", "/detay/2");
});
