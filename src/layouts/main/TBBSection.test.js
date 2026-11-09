import { fireEvent, render, screen, within } from "@testing-library/react";
import TBBSection from "./TBBSection";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, options) => {
      const template = typeof options === "string" ? options : options?.defaultValue || key;
      return template.replace(/\{\{(\w+)\}\}/g, (_, name) => options[name]);
    },
  }),
  Trans: () => null,
}));
jest.mock("../../api/DefaultData", () => ({
  TBBPhotos: Array.from({ length: 6 }, (_, index) => ({ id: index + 1, image: `/event-${index + 1}.webp` })),
}));

afterEach(() => jest.restoreAllMocks());

it("measures gallery pages on mount and resize and scrolls the final page to the real edge", () => {
  let viewportWidth = 300;
  jest.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(1200);
  jest.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => viewportWidth);
  render(<TBBSection />);
  const gallery = screen.getByRole("region", { name: "TBB fotoğraf galerisi" });
  gallery.scrollTo = jest.fn();

  expect(screen.getAllByRole("button", { name: /Galeri sayfası/ })).toHaveLength(5);
  fireEvent.click(screen.getByRole("button", { name: "Galeri sayfası 5" }));
  expect(gallery.scrollTo).toHaveBeenLastCalledWith({ left: 900, behavior: "smooth" });

  viewportWidth = 800;
  fireEvent(window, new Event("resize"));
  expect(screen.getAllByRole("button", { name: /Galeri sayfası/ })).toHaveLength(3);
  viewportWidth = 1200;
  fireEvent(window, new Event("resize"));
  expect(screen.getAllByRole("button", { name: /Galeri sayfası/ })).toHaveLength(1);
});

it("does not open a photo after dragging, while an ordinary click and modal arrow keys still work", () => {
  render(<TBBSection />);
  const gallery = screen.getByRole("region", { name: "TBB fotoğraf galerisi" });
  const firstPhoto = within(gallery).getByRole("button", { name: "TBB’de Biz 1 görselini büyüt" });
  fireEvent.mouseDown(firstPhoto, { button: 0, clientX: 200 });
  fireEvent.mouseMove(gallery, { clientX: 80 });
  fireEvent.mouseUp(gallery);
  fireEvent.click(firstPhoto, { detail: 1 });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.mouseDown(firstPhoto, { button: 0, clientX: 100 });
  fireEvent.mouseUp(gallery, { clientX: 100 });
  fireEvent.click(firstPhoto, { detail: 1 });
  const dialog = screen.getByRole("dialog", { name: "TBB’de Biz 1" });
  expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/event-1.webp");
  fireEvent.keyDown(within(dialog).getByRole("button", { name: "Kapat" }), { key: "ArrowRight" });
  expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/event-2.webp");
  fireEvent.click(within(dialog).getByRole("button", { name: "Önceki görsel" }));
  expect(within(dialog).getByRole("img")).toHaveAttribute("src", "/event-1.webp");
});
