// Video play pause
export const safePlay = (videoEl) => {
  if (videoEl && videoEl.paused) {
    videoEl.play().catch(() => {}); // Hata varsa görmezden gelir
  }
};

export const safePause = (videoEl) => {
  if (videoEl && !videoEl.paused) {
    videoEl.pause();
  }
};
