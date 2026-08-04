import { useEffect, useState } from "react";
import { anySessionOnSale } from "@/lib/workshops";

export type SeatInfo = {
  sessionId: string;
  total: number;
  taken: number;
  soldOut: boolean;
};

export type SeatsStatus = "loading" | "ready" | "unavailable";

export type SeatsResult = {
  /** Keyed by session id. Empty while loading or unavailable. */
  seats: Record<string, SeatInfo>;
  status: SeatsStatus;
};

/**
 * Live seat counts from /api/seats.
 *
 * Degrades silently on purpose: if the request fails we return "unavailable",
 * the grid stays outlined and the book buttons keep working — they're plain
 * links to Stripe, which knows the real availability. A broken count must never
 * block a booking, so there's no toast and no retry storm.
 */
export function useSeats(): SeatsResult {
  const [seats, setSeats] = useState<Record<string, SeatInfo>>({});
  const [status, setStatus] = useState<SeatsStatus>(() =>
    anySessionOnSale() ? "loading" : "unavailable"
  );

  useEffect(() => {
    // No session has a Stripe link yet — don't call the API at all.
    if (!anySessionOnSale()) return;

    const controller = new AbortController();
    let cancelled = false;

    fetch("/api/seats", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad status"))))
      .then((data: { seats?: SeatInfo[] }) => {
        if (cancelled) return;
        const list = Array.isArray(data.seats) ? data.seats : [];
        if (list.length === 0) {
          setStatus("unavailable");
          return;
        }
        setSeats(Object.fromEntries(list.map((s) => [s.sessionId, s])));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { seats, status };
}
