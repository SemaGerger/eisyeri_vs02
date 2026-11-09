import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageToggle from "./LanguageToggle";

const mockI18n = { language: "tr", changeLanguage: jest.fn() };
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (_key, fallback) => fallback, i18n: mockI18n }),
}));

beforeEach(() => {
  mockI18n.language = "tr";
  mockI18n.changeLanguage.mockClear();
});

it("Enter on the selected language does not select the other language", () => {
  render(<LanguageToggle />);
  screen.getByRole("button", { name: "Türkçe" }).focus();
  userEvent.keyboard("{Enter}");
  expect(mockI18n.changeLanguage).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Türkçe" })).toHaveAttribute("aria-pressed", "true");
});

it("Enter selects the focused language once and exposes the selected state", () => {
  const { rerender } = render(<LanguageToggle />);
  screen.getByRole("button", { name: "English" }).focus();
  userEvent.keyboard("{Enter}");
  expect(mockI18n.changeLanguage).toHaveBeenCalledTimes(1);
  expect(mockI18n.changeLanguage).toHaveBeenCalledWith("en");
  mockI18n.language = "en-US";
  rerender(<LanguageToggle />);
  expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "Türkçe" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getAllByRole("button")).toHaveLength(2);
});
