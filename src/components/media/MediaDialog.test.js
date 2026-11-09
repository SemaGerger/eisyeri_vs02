import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import MediaDialog from "./MediaDialog";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key, fallback) => fallback }),
}));

afterEach(() => {
  document.body.style.overflow = "";
});

it("keeps focus inside the viewer, navigates by keyboard and restores the opener and scrolling", () => {
  const previous = jest.fn();
  const next = jest.fn();
  function Viewer() {
    const [open, setOpen] = useState(false);
    return <>
      <button onClick={() => setOpen(true)}>Open gallery</button>
      {open && <MediaDialog title="Event photo" onClose={() => setOpen(false)} onPrevious={previous} onNext={next}>
        <img src="/event.webp" alt="Event" />
      </MediaDialog>}
    </>;
  }
  document.body.style.overflow = "scroll";
  render(<Viewer />);
  const opener = screen.getByRole("button", { name: "Open gallery" });
  opener.focus();
  fireEvent.click(opener);

  const dialog = screen.getByRole("dialog", { name: "Event photo" });
  const close = within(dialog).getByRole("button", { name: "Kapat" });
  const nextButton = within(dialog).getByRole("button", { name: "Sonraki görsel" });
  expect(close).toHaveFocus();
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
  expect(nextButton).toHaveFocus();
  fireEvent.keyDown(nextButton, { key: "Tab" });
  expect(close).toHaveFocus();
  fireEvent.keyDown(close, { key: "ArrowLeft" });
  fireEvent.keyDown(close, { key: "ArrowRight" });
  expect(previous).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(close, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
  expect(document.body.style.overflow).toBe("scroll");
});

it("handles native dialog cancellation without closing on a media click", () => {
  const close = jest.fn();
  render(<MediaDialog title="Photo" onClose={close}><img src="/photo.webp" alt="Photo" /></MediaDialog>);
  const dialog = screen.getByRole("dialog", { name: "Photo" });
  fireEvent.click(screen.getByRole("img", { name: "Photo" }));
  expect(close).not.toHaveBeenCalled();
  const cancel = new Event("cancel", { cancelable: true });
  fireEvent(dialog, cancel);
  expect(cancel.defaultPrevented).toBe(true);
  expect(close).toHaveBeenCalledTimes(1);
});

it("wraps photo navigation in both directions even when native showModal is available", () => {
  const prototype = HTMLDialogElement.prototype;
  const originalShowModal = Object.getOwnPropertyDescriptor(prototype, "showModal");
  const originalClose = Object.getOwnPropertyDescriptor(prototype, "close");
  const showModal = jest.fn(function () { this.setAttribute("open", ""); });
  Object.defineProperty(prototype, "showModal", { configurable: true, writable: true, value: showModal });
  Object.defineProperty(prototype, "close", {
    configurable: true,
    writable: true,
    value: function () { this.removeAttribute("open"); },
  });

  const { unmount } = render(
    <MediaDialog title="Native photo viewer" onClose={jest.fn()} onPrevious={jest.fn()} onNext={jest.fn()}>
      <img src="/native-photo.webp" alt="Native gallery photo" />
    </MediaDialog>
  );
  try {
    const dialog = screen.getByRole("dialog", { name: "Native photo viewer" });
    const close = within(dialog).getByRole("button", { name: "Kapat" });
    const next = within(dialog).getByRole("button", { name: "Sonraki görsel" });
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(next).toHaveFocus();
    expect(dialog.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(next, { key: "Tab" });
    expect(close).toHaveFocus();
    expect(dialog.contains(document.activeElement)).toBe(true);
  } finally {
    unmount();
    if (originalShowModal) Object.defineProperty(prototype, "showModal", originalShowModal);
    else delete prototype.showModal;
    if (originalClose) Object.defineProperty(prototype, "close", originalClose);
    else delete prototype.close;
  }
});
