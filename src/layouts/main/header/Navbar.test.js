import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, onClick, ...props }) => <a href={to} {...props} onClick={(event) => { event.preventDefault(); onClick?.(event); }}>{children}</a>,
}), { virtual: true });
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (_key, fallback) => fallback,
    i18n: { language: "tr", changeLanguage: jest.fn() },
  }),
}));

it("connects the menu toggle to a closed panel and returns focus on Escape", () => {
  render(<Navbar />);
  const toggle = screen.getByRole("button", { name: "Menüyü aç" });
  const menu = document.getElementById(toggle.getAttribute("aria-controls"));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(menu).not.toBeVisible();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(menu).toBeVisible();
  const link = within(menu).getByRole("link", { name: "Hakkımızda" });
  link.focus();
  fireEvent.keyDown(link, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(menu).not.toBeVisible();
  expect(toggle).toHaveFocus();
});

it("closes the mobile menu when a destination is selected", () => {
  render(<Navbar />);
  const toggle = screen.getByRole("button", { name: "Menüyü aç" });
  fireEvent.click(toggle);
  const menu = document.getElementById(toggle.getAttribute("aria-controls"));
  const link = within(menu).getByRole("link", { name: "Bize Ulaşın" });
  fireEvent.click(link);
  expect(link).toHaveAttribute("href", "/iletisim");
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(menu).not.toBeVisible();
});
