import React from "react";
import { render, screen } from "@testing-library/react";
import StatusMessage from "./StatusMessage";
import tr from "../../i18n/locales/tr.json";
import en from "../../i18n/locales/en.json";

let mockLanguage = "tr";
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, fallback) => {
      const locale = mockLanguage === "en" ? require("../../i18n/locales/en.json") : require("../../i18n/locales/tr.json");
      return key.split(".").reduce((value, segment) => value?.[segment], locale) || fallback || key;
    },
  }),
}));

it("servis hatasını nesne olarak render etmez ve dil değiştiğinde mesajı çevirir", () => {
  const error = Object.assign(new Error("Güvenli servis hatası"), { code: "PARTNERS_NETWORK" });
  const { rerender } = render(<StatusMessage error={error} />);
  expect(screen.getByText(tr.status.serviceNetwork)).toBeInTheDocument();
  mockLanguage = "en";
  rerender(<StatusMessage error={error} />);
  expect(screen.getByText(en.status.serviceNetwork)).toBeInTheDocument();
});
