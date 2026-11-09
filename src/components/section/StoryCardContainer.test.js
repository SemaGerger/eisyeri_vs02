import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoryCardContainer, { measureStoryScroll } from "./StoryCardContainer";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, state, children, ...props }) => <a href={to} {...props} onClick={(event) => {
    if (!event.defaultPrevented) {
      event.preventDefault();
      mockNavigate(to, { state });
    }
  }}>{children}</a>,
}), { virtual: true });
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (_key, fallback) => typeof fallback === "object"
    ? fallback.defaultValue.replace("{{page}}", fallback.page).replace("{{count}}", fallback.count)
    : fallback }),
}));

const partner = (id) => ({ Cells: [
  { ColumnName: "vw_esit_isyeri.faaliyet_turu", DisplayText: "Yeme İçme" },
  { ColumnName: "vw_esit_isyeri.files", Value: JSON.stringify([{ src: "https://example.com/image.jpg" }]) },
  { ColumnName: "vw_esit_isyeri.objectid", Value: id },
  { ColumnName: "vw_esit_isyeri.isyeri_unvani", DisplayText: `Örnek İşyeri ${id}` },
] });

const setGeometry = (container, { count, width = 356, position = 0 }) => {
  const contentWidth = count * 160 + Math.max(0, count - 1) * 16 + 16;
  container.style.gap = "16px";
  container.style.paddingLeft = "8px";
  container.style.paddingRight = "8px";
  Object.defineProperties(container, {
    clientWidth: { configurable: true, value: width },
    scrollWidth: { configurable: true, value: contentWidth },
  });
  container.scrollLeft = position;
  container.querySelectorAll(".scroll-item").forEach((card, index) => {
    Object.defineProperties(card, {
      offsetWidth: { configurable: true, value: 160 },
      offsetLeft: { configurable: true, value: 8 + index * 176 },
    });
  });
};

beforeEach(() => mockNavigate.mockClear());

it("uses one keyboard accessible detail link and ignores rows without an ID", () => {
  render(<StoryCardContainer partners={[partner(42), { name: "Kimliksiz" }]} />);
  const link = screen.getByRole("link", { name: /Örnek İşyeri 42/ });
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(link).toHaveAttribute("href", "/detay/42");
  expect(screen.getByText("Yeme İçme")).toBeInTheDocument();
  link.focus();
  userEvent.keyboard("{Enter}");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/detay/42", { state: { image: "https://example.com/image.jpg" } });
});

it("suppresses the click following a drag and allows the next normal click", () => {
  render(<StoryCardContainer partners={[partner(1)]} />);
  const track = screen.getByRole("region", { name: "Eşit işyerleri" });
  const link = screen.getByRole("link", { name: /Örnek İşyeri 1/ });
  fireEvent.mouseDown(link, { button: 0, clientX: 120 });
  fireEvent.mouseMove(track, { clientX: 40 });
  fireEvent.mouseUp(track);
  fireEvent.click(link, { detail: 1 });
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(track.scrollLeft).toBe(160);
  fireEvent.mouseDown(link, { button: 0, clientX: 40 });
  fireEvent.mouseUp(link);
  fireEvent.click(link, { detail: 1 });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});

it("measures rendered card spacing and clamps the final page to the actual end", () => {
  const container = document.createElement("div");
  for (let index = 0; index < 6; index += 1) {
    const card = document.createElement("div");
    card.className = "scroll-item";
    container.appendChild(card);
  }
  setGeometry(container, { count: 6, position: 700 });
  expect(measureStoryScroll(container)).toEqual({
    targets: [0, 352, 700], currentPage: 2, hasPrevious: true, hasNext: false,
  });
});

it("handles an unmeasured viewport and a viewport narrower than one card", () => {
  const container = document.createElement("div");
  container.innerHTML = '<div class="scroll-item"></div><div class="scroll-item"></div>';
  setGeometry(container, { count: 2, width: 0 });
  expect(measureStoryScroll(container).targets).toEqual([]);
  setGeometry(container, { count: 2, width: 80 });
  expect(measureStoryScroll(container).targets).toEqual([0, 176, 272]);
});

it("updates named arrow and page controls after resize and scrolling", () => {
  render(<StoryCardContainer partners={[1, 2, 3, 4].map(partner)} />);
  const track = screen.getByRole("region", { name: "Eşit işyerleri" });
  setGeometry(track, { count: 4 });
  track.scrollTo = jest.fn(({ left }) => {
    track.scrollLeft = left;
    fireEvent.scroll(track);
  });
  fireEvent.resize(window);
  const next = screen.getByRole("button", { name: "Sonraki işyerleri" });
  expect(next).toHaveAttribute("aria-controls", track.id);
  fireEvent.click(next);
  expect(track.scrollTo).toHaveBeenCalledWith({ left: 348, behavior: "smooth" });
  expect(screen.getByRole("button", { name: "2 / 2. işyeri sayfası" })).toHaveAttribute("aria-current", "true");
  expect(screen.queryByRole("button", { name: "Sonraki işyerleri" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Önceki işyerleri" }));
  expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });
});
