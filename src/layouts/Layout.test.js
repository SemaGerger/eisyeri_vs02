import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import siteConfig from "../config/siteConfig";

let mockPathname = "/iletisim";
jest.mock("react-router-dom", () => ({ useLocation: () => ({ pathname: mockPathname }) }), { virtual: true });
jest.mock("react-i18next", () => ({ useTranslation: () => ({ t: (_key, fallback) => fallback }) }));
jest.mock("../layouts/main/header/Header", () => () => <header />);
jest.mock("../layouts/main/Footer", () => () => <footer />);

it("shows both fixed action links on inner pages and leaves home actions to the hero", () => {
  const { rerender } = render(<Layout>Page content</Layout>);
  expect(screen.getByRole("link", { name: siteConfig.hero.CTA1TEXT })).toHaveAttribute("href", siteConfig.hero.CTA1URL);
  expect(screen.getByRole("link", { name: siteConfig.hero.CTA2TEXT })).toHaveAttribute("href", siteConfig.hero.CTA2URL);
  mockPathname = "/";
  rerender(<Layout>Home content</Layout>);
  expect(screen.queryByRole("link", { name: siteConfig.hero.CTA1TEXT })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: siteConfig.hero.CTA2TEXT })).not.toBeInTheDocument();
});
