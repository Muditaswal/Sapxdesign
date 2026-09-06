/**
 * Rewrites an Unsplash URL to fetch an optimized, correctly-sized image.
 * - auto=format  -> serves WebP/AVIF (removes a forced fm=jpg)
 * - fit=crop     -> crops to the target aspect ratio
 * - w=<width>    -> serves exactly the displayed width (saves bytes vs 1920/1080)
 * - q=<quality>  -> compression (60-70 is near-lossless for photos)
 * Non-Unsplash URLs (local assets, other CDNs) are returned unchanged.
 */
export function optimizeImageUrl(
  url: string | null | undefined,
  width = 800,
  quality = 70,
): string {
  if (!url) return "";
  if (!url.includes("images.unsplash.com")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", String(quality));
    u.searchParams.delete("fm");
    return u.toString();
  } catch {
    return url;
  }
}
