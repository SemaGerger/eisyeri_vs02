import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

/** A single media viewer keeps keyboard focus, scrolling and dismissal consistent. */
export default function MediaDialog({ title, onClose, onPrevious, onNext, children }) {
  const { t } = useTranslation();
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const nativeModal = useRef(false);
  const callbacks = useRef({ onClose, onPrevious, onNext });
  callbacks.current = { onClose, onPrevious, onNext };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const opener = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nativeModal.current = typeof dialog.showModal === "function";
    if (nativeModal.current) dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.querySelectorAll("video").forEach((video) => video.pause());
      if (dialog.open && typeof dialog.close === "function") dialog.close();
      document.body.style.overflow = originalOverflow;
      if (opener?.isConnected && typeof opener.focus === "function") {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      callbacks.current.onClose();
      return;
    }
    // Do not steal the native seeking controls from a focused video.
    if (event.target.tagName !== "VIDEO") {
      if (event.key === "ArrowLeft" && callbacks.current.onPrevious) {
        event.preventDefault();
        callbacks.current.onPrevious();
      } else if (event.key === "ArrowRight" && callbacks.current.onNext) {
        event.preventDefault();
        callbacks.current.onNext();
      }
    }
    if (event.key !== "Tab") return;
    // Preserve native video-control tab stops; photo viewers wrap their buttons explicitly.
    if (nativeModal.current && dialogRef.current.querySelector("video[controls]")) return;

    const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      .filter((element) => !element.closest("[hidden]") && element.tabIndex >= 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (!first) {
      event.preventDefault();
      dialogRef.current.focus();
    } else if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialogRef.current.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault();
        callbacks.current.onClose();
      }}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) callbacks.current.onClose();
      }}
      className="fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none overflow-y-auto border-0 bg-transparent p-3 text-white backdrop:bg-black/80 sm:p-6"
    >
      <div
        className="flex min-h-full items-center justify-center"
        onClick={(event) => {
          if (event.target === event.currentTarget) callbacks.current.onClose();
        }}
      >
        <div className="relative w-full max-w-5xl rounded-xl bg-black p-2 shadow-2xl sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3 pl-2">
            <h2 id={titleId} className="min-w-0 break-words text-base font-semibold sm:text-lg">{title}</h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => callbacks.current.onClose()}
              aria-label={t("media.close", "Kapat")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-lg">
            {children}
            {onPrevious && (
              <button
                type="button"
                onClick={() => callbacks.current.onPrevious()}
                aria-label={t("media.previous", "Önceki görsel")}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-4xl text-white shadow transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-14 sm:w-14"
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={() => callbacks.current.onNext()}
                aria-label={t("media.next", "Sonraki görsel")}
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-4xl text-white shadow transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-14 sm:w-14"
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
