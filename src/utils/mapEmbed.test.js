import { getMapEmbedUrl } from "./mapEmbed";

it("yalnızca harita src adresini çıkarır ve diğer HTML özniteliklerini taşımaz", () => {
  const html = '<iframe src="https://www.google.com/maps/embed?pb=test&amp;hl=tr" onload="alert(1)" srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"></iframe><img src=x onerror="alert(1)">';
  expect(getMapEmbedUrl(html)).toBe("https://www.google.com/maps/embed?pb=test&hl=tr");
});

it.each([
  "https://maps.google.com/?q=41,28&output=embed",
  "https://www.google.com.tr/maps/embed?pb=test",
  "https://maps.google.com.tr/maps?q=41,28&output=embed",
])("izinli doğrudan HTTPS harita adresini kabul eder: %s", (url) => {
  expect(getMapEmbedUrl(url)).toBe(url);
});

it("protokol belirtilmemiş izinli iframe adresini HTTPS kullanarak açar", () => {
  expect(getMapEmbedUrl('<iframe src="//www.google.com/maps/embed?pb=test"></iframe>'))
    .toBe("https://www.google.com/maps/embed?pb=test");
});

it.each([
  "javascript:alert(1)",
  "data:text/html,<script>alert(1)</script>",
  "http://www.google.com/maps/embed",
  "https://www.google.com.evil.test/maps/embed",
  "https://maps.google.com@evil.test/maps/embed",
  "https://example.com/maps/embed",
  "https://www.google.com/search?q=test",
  "https://user:password@www.google.com/maps/embed",
])("çalıştırılabilir veya izin verilmeyen iframe kaynağını reddeder: %s", (url) => {
  expect(getMapEmbedUrl(`<iframe src="${url}"></iframe>`)).toBeNull();
});

it.each([null, undefined, "", "   ", 42, {}, "<iframe></iframe>", "<script>alert(1)</script>"])(
  "geçersiz harita verisini güvenle atlar: %p", (value) => {
    expect(getMapEmbedUrl(value)).toBeNull();
  },
);
