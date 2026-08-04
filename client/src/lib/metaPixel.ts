// Meta (Facebook) pixel — retargeting + conversion tracking.
//
// Gated on VITE_META_PIXEL_ID: with no id set, every function here is a no-op
// and the fbevents script is never fetched. That keeps local dev and previews
// clean and means the pixel can be turned off by removing one env var.
//
// Pixel ids are public by design (they appear in page source), so VITE_ is the
// correct prefix — nothing secret is being exposed.

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Never run during prerender — there's no document at build time. */
const canRun = (): boolean =>
  typeof window !== "undefined" && Boolean(PIXEL_ID);

let initialised = false;

/**
 * Injects fbevents.js and initialises the pixel. Safe to call repeatedly;
 * only the first call does work.
 */
export function initMetaPixel(): void {
  if (!canRun() || initialised) return;
  initialised = true;

  // Standard Meta bootstrap: queue calls until fbevents.js finishes loading.
  /* eslint-disable */
  const n: Fbq = (window.fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
  } as Fbq);
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  /* eslint-enable */

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq!("init", PIXEL_ID);
}

/**
 * Standard Meta event. `PageView` builds the retargeting audience; the rest
 * mark intent and conversion.
 */
export function trackMeta(
  event: "PageView" | "ViewContent" | "InitiateCheckout" | "Purchase" | "Lead",
  params?: Record<string, unknown>
): void {
  if (!canRun()) return;
  // A route change can fire before init on a hard refresh — initMetaPixel is
  // idempotent and queues, so calling it here is free insurance.
  initMetaPixel();
  window.fbq!("track", event, params);
}

export const META_PIXEL_ENABLED = Boolean(PIXEL_ID);
