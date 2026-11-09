const MAP_HOSTS = new Set([
  "google.com",
  "www.google.com",
  "maps.google.com",
  "google.com.tr",
  "www.google.com.tr",
  "maps.google.com.tr",
]);

// API verisinden HTML veya iframe öznitelikleri değil, yalnızca harita adresi alınır.
export function getMapEmbedUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;

  const document = new DOMParser().parseFromString(value, "text/html");
  const source = document.querySelector("iframe")?.getAttribute("src") || value.trim();

  try {
    const url = new URL(source.startsWith("//") ? `https:${source}` : source);
    const isMapPath = url.pathname === "/maps"
      || url.pathname.startsWith("/maps/")
      || (url.hostname.startsWith("maps.") && url.pathname === "/");

    if (url.protocol !== "https:" || !MAP_HOSTS.has(url.hostname) || !isMapPath
      || url.username || url.password) return null;

    return url.href;
  } catch {
    return null;
  }
}
