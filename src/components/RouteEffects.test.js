import React from "react";
import { render } from "@testing-library/react";
import RouteEffects from "./RouteEffects";

let mockLocation;
let mockNavigationType;
const mockI18n = { language: "tr" };
jest.mock("react-router-dom", () => ({
  useLocation: () => mockLocation,
  useNavigationType: () => mockNavigationType,
}), { virtual: true });
jest.mock("react-i18next", () => ({ useTranslation: () => ({ i18n: mockI18n }) }));

beforeEach(() => {
  mockLocation = { key: "first", pathname: "/", search: "" };
  mockNavigationType = "POP";
  mockI18n.language = "tr";
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

it("starts new and replaced routes at the top while preserving back/forward scrolling", () => {
  const { rerender } = render(<RouteEffects />);
  expect(window.scrollTo).not.toHaveBeenCalled();
  mockNavigationType = "PUSH";
  mockLocation = { key: "second", pathname: "/iletisim", search: "" };
  rerender(<RouteEffects />);
  expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
  mockNavigationType = "REPLACE";
  mockLocation = { key: "third", pathname: "/hakkimizda", search: "" };
  rerender(<RouteEffects />);
  expect(window.scrollTo).toHaveBeenCalledTimes(2);
  mockNavigationType = "POP";
  mockLocation = { key: "second", pathname: "/iletisim", search: "" };
  rerender(<RouteEffects />);
  expect(window.scrollTo).toHaveBeenCalledTimes(2);
});

it("updates the document language when the selected translation changes", () => {
  const { rerender } = render(<RouteEffects />);
  expect(document.documentElement).toHaveAttribute("lang", "tr");
  mockI18n.language = "en-US";
  rerender(<RouteEffects />);
  expect(document.documentElement).toHaveAttribute("lang", "en");
  mockI18n.language = "tr-TR";
  rerender(<RouteEffects />);
  expect(document.documentElement).toHaveAttribute("lang", "tr");
});
