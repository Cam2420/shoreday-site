const PIXEL_ID = "a2_jwzpg5ilr1zg";

type RedditPixel = ((...args: unknown[]) => void) & {
  callQueue: unknown[][];
  sendEvent?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    rdt?: RedditPixel;
  }
}

let initialized = false;
let lastPathname: string | undefined;

/** Reddit's supplied bootstrap, with PageVisit dispatched once per route. */
export function trackRedditPageVisit(pathname: string) {
  if (typeof window === "undefined" || lastPathname === pathname) return;

  if (!window.rdt) {
    const pixel: RedditPixel = Object.assign(
      (...args: unknown[]) => {
        if (pixel.sendEvent) pixel.sendEvent(...args);
        else pixel.callQueue.push(args);
      },
      { callQueue: [] as unknown[][] },
    );
    window.rdt = pixel;
    const script = document.createElement("script");
    script.src = `https://www.redditstatic.com/ads/pixel.js?pixel_id=${PIXEL_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }

  if (!initialized) {
    // No advanced-matching identifiers or user-entered fields are supplied.
    window.rdt("init", PIXEL_ID);
    initialized = true;
  }
  window.rdt("track", "PageVisit");
  lastPathname = pathname;
}
