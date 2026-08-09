import { SessionCard } from "@/components/SessionCard";
import { useSeats } from "@/hooks/useSeats";
import { SESSIONS } from "@/lib/workshops";
import { CONTACT_EMAIL } from "@/lib/booking";

type SessionsSectionProps = {
  /** Section number differs between the main page and the variants. */
  tag?: string;
};

/**
 * The bookable sessions block, shared by /workshops and every variant page.
 *
 * Extracted so messaging tests can't drift from the real booking state — there
 * is exactly one seat grid in the codebase, reading one source of truth. A
 * variant can change every word above it and still cannot misreport what's
 * actually for sale.
 */
export function SessionsSection({ tag = "[010] TAKE A SEAT" }: SessionsSectionProps) {
  const { seats } = useSeats();

  return (
    <section id="sessions" className="py-20 md:py-28 border-t border-border">
      <div className="container">
        <div className="max-w-3xl">
          <div className="section-tag mb-6">{tag}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            CURRENT <span className="text-primary">SESSIONS.</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-12 max-w-xl">
            Dates, venues and group sizes vary by session — everything running
            right now is below. Seats update live.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SESSIONS.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              seats={seats[session.id]}
            />
          ))}
        </div>

        <p className="mono-label mt-10">
          QUESTIONS? EMAIL{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:underline"
          >
            {CONTACT_EMAIL.toUpperCase()}
          </a>
        </p>
      </div>
    </section>
  );
}
