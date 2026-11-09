import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Hero from "./Hero";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key, options) => {
      const template = typeof options === "string" ? options : options?.defaultValue || key;
      return template.replace(/\{\{(\w+)\}\}/g, (_, name) => options[name]);
    },
  }),
}));
jest.mock("../../config/siteConfig", () => ({
  hero: {
    title: "Equal Workplace",
    highlight: "Project",
    subtitle: "Municipality",
    CTA1TEXT: "Apply",
    CTA1URL: "https://example.com/apply",
    CTA2TEXT: "Join",
    CTA2URL: "https://example.com/join",
    HERO_VIDEO: "/hero-loop.mp4",
    HERO_POSTER: "/hero.webp",
    HERO_FULL_VIDEO: "/full-film.mp4",
  },
}));

const originalMatchMedia = window.matchMedia;
const originalConnection = Object.getOwnPropertyDescriptor(navigator, "connection");
let queries;

function setDevice({ desktop = false, reducedMotion = false, saveData = false, effectiveType = "4g" } = {}) {
  queries = [];
  window.matchMedia = jest.fn((query) => {
    const mediaQuery = {
      matches: query.includes("prefers-reduced-motion") ? reducedMotion : desktop,
      media: query,
      listeners: new Set(),
      addEventListener: (event, listener) => mediaQuery.listeners.add(listener),
      removeEventListener: (event, listener) => mediaQuery.listeners.delete(listener),
    };
    queries.push(mediaQuery);
    return mediaQuery;
  });
  const connection = new EventTarget();
  connection.saveData = saveData;
  connection.effectiveType = effectiveType;
  Object.defineProperty(navigator, "connection", { configurable: true, value: connection });
}

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
  window.matchMedia = originalMatchMedia;
  if (originalConnection) Object.defineProperty(navigator, "connection", originalConnection);
  else delete navigator.connection;
});

it.each([
  ["a small or coarse-pointer device", { desktop: false }],
  ["reduced motion", { desktop: true, reducedMotion: true }],
  ["data saving", { desktop: true, saveData: true }],
  ["a 2g connection", { desktop: true, effectiveType: "2g" }],
  ["a slow-2g connection", { desktop: true, effectiveType: "slow-2g" }],
])("does not attach a background video source for %s", (description, settings) => {
  setDevice(settings);
  const { container } = render(<Hero />);
  expect(container.querySelector("video, source")).toBeNull();
  expect(container.querySelector('img[src="/hero.webp"]')).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});

it("lets desktop visitors pause and resume the loop and removes it if their motion preference changes", () => {
  setDevice({ desktop: true });
  const { container } = render(<Hero />);
  const video = container.querySelector("video");
  expect(video).toHaveAttribute("src", "/hero-loop.mp4");
  expect(video).toHaveAttribute("playsinline");
  expect(video.muted).toBe(true);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button", { name: "Arka plan videosunu duraklat" }));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Arka plan videosunu oynat" }));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);

  const motionQuery = queries.find((query) => query.media.includes("prefers-reduced-motion"));
  act(() => {
    motionQuery.matches = true;
    motionQuery.listeners.forEach((listener) => listener({ matches: true }));
  });
  expect(container.querySelector("video, source")).toBeNull();
});

it("keeps the full, audible film available on mobile only after an explicit play click", () => {
  setDevice();
  const { container } = render(<Hero />);
  const opener = screen.getByRole("button", { name: "Tanıtım filmini izleyin" });
  expect(container.querySelector("video")).toBeNull();
  opener.focus();
  fireEvent.click(opener);

  const dialog = screen.getByRole("dialog", { name: "Equal Workplace" });
  const video = dialog.querySelector("video");
  expect(video).toHaveAttribute("src", "/full-film.mp4");
  expect(video).toHaveAttribute("controls");
  expect(video.muted).toBe(false);
  expect(video.loop).toBe(false);
  fireEvent.click(within(dialog).getByRole("button", { name: "Kapat" }));
  expect(document.querySelector("video")).toBeNull();
  expect(opener).toHaveFocus();
});
