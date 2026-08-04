import { ArrowRight } from "lucide-react";
import { SeatGrid } from "@/components/SeatGrid";
import type { SeatInfo } from "@/hooks/useSeats";
import { WORKSHOP_PRICE, isOnSale, type WorkshopSession } from "@/lib/workshops";
import { trackMeta } from "@/lib/metaPixel";

type SessionCardProps = {
  session: WorkshopSession;
  /** Undefined while loading or if /api/seats was unreachable. */
  seats?: SeatInfo;
};

export function SessionCard({ session, seats }: SessionCardProps) {
  const onSale = isOnSale(session);
  const known = Boolean(seats);
  const soldOut = seats?.soldOut ?? false;
  const total = seats?.total ?? session.seats;
  const taken = seats?.taken ?? 0;
  const open = total - taken;

  // Three mutually exclusive card modes.
  const mode: "pending" | "soldout" | "open" = !onSale
    ? "pending"
    : soldOut
      ? "soldout"
      : "open";

  // Highest-intent signal we can see: Stripe checkout is off-site, so this
  // fires on the click through, not on payment. Purchase is tracked on the
  // confirmation page instead.
  const onCheckoutClick = () =>
    trackMeta("InitiateCheckout", {
      value: WORKSHOP_PRICE.inclGstAmount,
      currency: "AUD",
      content_name: `Workshop — ${session.label}`,
      content_ids: [session.id],
    });

  return (
    <article
      className={`session-card${mode === "soldout" ? " session-card--soldout" : ""}${
        mode === "pending" ? " session-card--pending" : ""
      }`}
    >
      {mode === "soldout" && <div className="session-card__soldbar">Sold out</div>}

      <div className="flex items-baseline justify-between gap-3">
        <span className="mono-label">{session.label}</span>
        <span className="mono-label">{session.seats} seats</span>
      </div>

      <div className="session-card__date">{session.date ?? "DATE TBC"}</div>
      <div className="session-card__time">
        {session.time ?? "Time announcing soon"}
      </div>

      {/* Venue lives on the session, not the page — sessions can be in
          different places, or not have one locked in yet. */}
      <div className="session-card__venue">
        {session.venue ? (
          <>
            {session.venue.name}
            <span className="session-card__venue-addr">
              {session.venue.street}, {session.venue.suburb}
            </span>
          </>
        ) : (
          <span className="session-card__venue-tbc">Venue announcing soon</span>
        )}
      </div>

      <div className="session-card__rule" />

      {mode === "open" ? (
        <a
          className="seat-link"
          href={session.bookUrl!}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCheckoutClick}
          aria-label={`Take a seat — ${session.date ?? "date to be confirmed"}${
            session.time ? `, ${session.time}` : ""
          }${session.venue ? `, ${session.venue.name}` : ""}`}
        >
          <span className="seat-tip" aria-hidden="true">
            Take this seat &rarr;
          </span>
          <SeatGrid total={total} taken={taken} known={known} />
        </a>
      ) : (
        <SeatGrid
          total={total}
          taken={taken}
          known={known && mode === "soldout"}
          inverted={mode === "soldout"}
        />
      )}

      <div className="session-card__count">
        {mode === "pending" ? (
          <span className="session-card__count-dim">
            {total} seats &middot; not yet on sale
          </span>
        ) : !known ? (
          <span className="session-card__count-dim">{total} seats per session</span>
        ) : (
          `${open} of ${total} seats open`
        )}
      </div>

      <div className="session-card__price">
        {WORKSHOP_PRICE.display}{" "}
        <span className="session-card__gst">{WORKSHOP_PRICE.suffix}</span>
      </div>

      {mode === "open" && (
        <a
          className="session-card__cta"
          href={session.bookUrl!}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCheckoutClick}
        >
          Take a seat <ArrowRight className="h-4 w-4" />
        </a>
      )}

      {mode === "pending" && (
        <span className="session-card__cta session-card__cta--ghost">
          Dates announcing soon
        </span>
      )}

      {mode === "soldout" && (
        <div className="session-card__waitlist">
          <span className="mono-label">Tell me if a seat opens</span>
          <WaitlistRow session={session} />
        </div>
      )}
    </article>
  );
}

/**
 * Sold-out sessions keep their shape by putting the waitlist exactly where the
 * CTA was — an empty hole at the bottom of the card reads as broken.
 *
 * No backend yet: this opens a prefilled email, the same mechanism the rest of
 * the page already uses. Swap for a POST when there's somewhere to store it.
 */
function WaitlistRow({ session }: { session: WorkshopSession }) {
  const subject = `Waitlist — ${session.date ?? session.label} Brisbane workshop`;
  const href = `mailto:elliot@unpaste.co?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(
    `Hi Elliot, please let me know if a seat opens up for the ${
      session.date ?? session.label
    } session. My name is `
  )}`;

  return (
    <a className="session-card__waitlist-cta" href={href}>
      Join the waitlist
    </a>
  );
}
