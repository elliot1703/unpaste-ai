// PostHog: page views, funnel steps, scroll depth, heatmaps and session replay.
//
// Gated on VITE_POSTHOG_KEY and VITE_POSTHOG_HOST, the same way metaPixel.ts is
// gated: with either unset, every function here is a no-op and posthog-js is
// never fetched, so local dev and previews stay silent. The project key is
// public by design (it ships in the page bundle); it lives in Vercel env vars
// so it can be switched off without a code change.
//
// Loading: posthog-js is a separate chunk, imported once the browser is idle
// after the load event, so it never competes with first paint. Calls made
// before it arrives are queued with their original time.
//
// Privacy: no name, email, phone or typed answer may reach PostHog. Inputs are
// masked in replay, the one line that prints the applicant's email is masked,
// the payment link (its address carries the email) is blocked, autocapture
// keeps no element attributes, replay keeps no network bodies or headers, and
// before_send drops any value that still looks like an email address.

import type { CaptureResult, PostHog } from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

/** Never run during prerender: there's no document at build time. */
const canRun = (): boolean => typeof window !== "undefined" && Boolean(KEY && HOST);

type Queued = { event: string; props: Record<string, unknown>; at: Date };
let queue: Queued[] = [];
let client: PostHog | undefined;
let started = false;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const EMAIL = /[^\s@"'<>=&?/]+@[^\s@"'<>&?/]+\.[a-z]{2,}/i;
const EMAIL_ALL = new RegExp(EMAIL.source, "gi");

/** Replace anything that looks like an email address, wherever it sits. */
function scrub(value: unknown): unknown {
  if (typeof value === "string") return EMAIL.test(value) ? value.replace(EMAIL_ALL, "[redacted]") : value;
  if (Array.isArray(value)) return value.map(scrub);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, scrub(v)]));
  }
  return value;
}

function beforeSend(event: CaptureResult | null): CaptureResult | null {
  if (!event) return event;
  event.properties = scrub(event.properties) as CaptureResult["properties"];
  if (event.$set) event.$set = scrub(event.$set) as CaptureResult["$set"];
  if (event.$set_once) event.$set_once = scrub(event.$set_once) as CaptureResult["$set_once"];
  return event;
}

async function load(): Promise<void> {
  const { default: posthog } = await import("posthog-js");
  posthog.init(KEY!, {
    api_host: HOST!,
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    // Option A (Elliot, 14 Nov 2026 plan): one first-party cookie on unpaste.ai,
    // so a return visit still counts against the ad that first brought them.
    // Memory-only would be persistence: "memory".
    persistence: "localStorage+cookie",
    person_profiles: "identified_only",
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_heatmaps: true,
    autocapture: true,
    mask_all_element_attributes: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: ".apply-reveal .apply-note",
      blockSelector: 'a[href*="prefilled_email"]',
      recordHeaders: false,
      recordBody: false,
      maskCapturedNetworkRequestFn: (req) => ({ ...req, requestBody: undefined, responseBody: undefined, requestHeaders: undefined, responseHeaders: undefined }),
    },
    enable_recording_console_log: false,
    capture_exceptions: false,
    disable_surveys: true,
    disable_product_tours: true,
    disable_conversations: true,
    disable_web_experiments: true,
    before_send: beforeSend,
  });

  // Tag every event in this visit with the ad that sent it. Only set when the
  // URL carries the tags, so a later untagged page doesn't wipe them.
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(UTM_KEYS.flatMap((k) => (params.get(k) ? [[k, params.get(k)]] : [])));
  if (Object.keys(utm).length) posthog.register(utm);
  // Our own checks: open the page with ?ph_test=1 and PostHog filters the visit out.
  if (params.get("ph_test") === "1") posthog.register({ test_visit: true });

  client = posthog;
  for (const q of queue) posthog.capture(q.event, q.props, { timestamp: q.at });
  queue = [];
}

/** Starts PostHog once the page is idle. Safe to call repeatedly. */
export function initPostHog(): void {
  if (!canRun() || started) return;
  started = true;
  const go = () => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(() => void load(), { timeout: 2000 });
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
}

/**
 * Custom event. Funnel steps use the exact names the Meta pixel fires
 * (OfferView_oneonone, ApplyStart_oneonone, ...), so the two tools line up.
 */
export function trackPostHog(event: string, props: Record<string, unknown> = {}): void {
  if (!canRun()) return;
  if (client) client.capture(event, props);
  else queue.push({ event, props, at: new Date() });
}
