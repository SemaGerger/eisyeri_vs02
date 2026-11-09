import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PartnerImages from "./PartnerImages";

jest.mock("react-i18next", () => ({ useTranslation: () => ({
  t: (_key, fallback) => typeof fallback === "object" ? `Görsel ${fallback.number}` : fallback,
}) }));

it("bozuk JSON, dizi olmayan veri ve bozuk görsel kayıtları detay sayfasını çökertmez", () => {
  const { rerender } = render(<PartnerImages files="{" />);
  expect(screen.getByText("Görsel bulunamadı.")).toBeInTheDocument();

  rerender(<PartnerImages files={'{"src":"https://example.com/a.jpg"}'} />);
  expect(screen.getByText("Görsel bulunamadı.")).toBeInTheDocument();

  rerender(<PartnerImages files={JSON.stringify([
    null, 42, {}, [], { src: 17 }, { src: " " },
    { src: "https://example.com/valid.jpg", label: "Geçerli görsel" },
  ])} />);
  expect(screen.getAllByRole("img")).toHaveLength(1);
  expect(screen.getByRole("img", { name: "Geçerli görsel" }))
    .toHaveAttribute("src", "https://example.com/valid.jpg");
});

it("yeni firmanın görsel sayısı azaldığında güvenle ilk görsele döner", () => {
  const { rerender } = render(<PartnerImages files={JSON.stringify([
    { src: "https://example.com/1.jpg", label: "Birinci" },
    { src: "https://example.com/2.jpg", label: "İkinci" },
    { src: "https://example.com/3.jpg", label: "Üçüncü" },
  ])} />);
  fireEvent.click(screen.getByRole("button", { name: "Sonraki görsel" }));
  fireEvent.click(screen.getByRole("button", { name: "Sonraki görsel" }));
  expect(screen.getByRole("img", { name: "Üçüncü" })).toBeInTheDocument();

  rerender(<PartnerImages files={JSON.stringify([
    { src: "https://example.com/new.jpg", label: "Yeni firma" },
  ])} />);
  expect(screen.getByRole("img", { name: "Yeni firma" }))
    .toHaveAttribute("src", "https://example.com/new.jpg");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Yeni firma" })).toBeInTheDocument();
});

it("etiketsiz görselleri adlandırır ve önceki düğmesi son görsele döner", () => {
  render(<PartnerImages files={[{ src: "/first.jpg" }, { src: "/last.jpg" }]} />);
  expect(screen.getByRole("img", { name: "Görsel 1" })).toHaveAttribute("src", "/first.jpg");
  fireEvent.click(screen.getByRole("button", { name: "Önceki görsel" }));
  expect(screen.getByRole("img", { name: "Görsel 2" })).toHaveAttribute("src", "/last.jpg");
  fireEvent.click(screen.getByRole("button", { name: "Sonraki görsel" }));
  expect(screen.getByRole("img", { name: "Görsel 1" })).toBeInTheDocument();
});
