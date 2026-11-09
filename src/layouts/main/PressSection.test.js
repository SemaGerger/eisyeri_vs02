import { fireEvent, render, screen, within } from "@testing-library/react";
import PressSection from "./PressSection";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, options) => {
      const template = typeof options === "string" ? options : options?.defaultValue || key;
      return template.replace(/\{\{(\w+)\}\}/g, (_, name) => options[name]);
    },
  }),
}));
jest.mock("../../api/DefaultData", () => ({
  pressData: Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: `News ${index + 1}`,
    video: `/news-${index + 1}.mp4`,
    poster: `/news-${index + 1}.webp`,
  })),
  pressPhotos: [{ id: 1, title: "Published report", image: "/report.webp" }],
}));

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

it("loads only lazy posters until a visitor opens one complete, audible news video", () => {
  const { container } = render(<PressSection />);
  expect(screen.getByRole("heading", { name: "Basında Biz" })).toBeInTheDocument();
  expect(container.querySelectorAll("video, source")).toHaveLength(0);
  expect(container.querySelectorAll('img[loading="lazy"]')).toHaveLength(9);

  const opener = screen.getByRole("button", { name: "News 1 videosunu oynat" });
  opener.focus();
  fireEvent.click(opener);
  const dialog = screen.getByRole("dialog", { name: "News 1" });
  const video = dialog.querySelector("video");
  expect(document.querySelectorAll("video")).toHaveLength(1);
  expect(video).toHaveAttribute("src", "/news-1.mp4");
  expect(video).toHaveAttribute("controls");
  expect(video.muted).toBe(false);

  fireEvent.click(within(dialog).getByRole("button", { name: "Kapat" }));
  expect(document.querySelector("video")).toBeNull();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(opener).toHaveFocus();
});

it("opens a published image without loading any video and closes with Escape", () => {
  render(<PressSection />);
  fireEvent.click(screen.getByRole("button", { name: "Published report görselini büyüt" }));
  const dialog = screen.getByRole("dialog", { name: "Published report" });
  expect(within(dialog).getByRole("img", { name: "Published report" })).toHaveAttribute("src", "/report.webp");
  expect(document.querySelector("video")).toBeNull();
  fireEvent.keyDown(dialog, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
