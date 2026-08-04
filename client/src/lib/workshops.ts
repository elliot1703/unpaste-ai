// Single source for workshop session data, price and venue.
// Sibling to booking.ts — every page that mentions a workshop reads from here,
// so changing a date or price is a one-file edit.
//
// A session with `paymentLinkId: null` is not on sale yet: it renders in a
// "dates announcing" state and is skipped by /api/seats. That's what lets the
// page ship before the Stripe links exist.

/** Default only — each session carries its own `seats`, so this can vary. */
export const SEATS_PER_SESSION = 6;

export const WORKSHOP_PRICE = {
  /** Headline price, matches the rest of the site. */
  display: "$399",
  suffix: "+ GST",
  /** What actually gets charged at checkout. */
  inclGst: "$438.90",
  /** Original price, shown struck through. */
  was: "$850",
} as const;

export type Venue = {
  name: string;
  street: string;
  suburb: string;
  /** Short form for compact labels. */
  short: string;
};

export const VENUES = {
  gatherBulimba: {
    name: "Gather Bulimba",
    street: "9/57 Karthina Street",
    suburb: "Bulimba QLD 4171",
    short: "Bulimba",
  },
} as const satisfies Record<string, Venue>;

export type WorkshopSession = {
  /** Stable id — used as the React key and the /api/seats lookup key. */
  id: string;
  /** "SESSION 01" */
  label: string;
  /** Display date, e.g. "THU 14 AUG". Null until confirmed. */
  date: string | null;
  /** ISO date for sorting and structured data. Null until confirmed. */
  isoDate: string | null;
  /** "5:00PM – 8:00PM" */
  time: string | null;
  /** Null = venue not locked in yet. Sessions don't have to share one. */
  venue: Venue | null;
  /** Stripe Payment Link id (plink_...). Null = not on sale. */
  paymentLinkId: string | null;
  /** Stripe Payment Link URL. Null = not on sale. */
  bookUrl: string | null;
  /** Per session on purpose — a room of 6 and a room of 100 both work here. */
  seats: number;
};

// Nothing here is global on purpose — venue, time and seat count all live per
// session, so a 6-seat evening in Bulimba and a 100-seat daytime thing
// somewhere else can sit side by side without touching a component.
//
// Session 01's venue is booked 4:30–8:30PM; the session runs 5:00–8:00PM with
// setup and pack-down either side. Dates pending — fill in `date`/`isoDate`
// and nothing else needs to change.
//
// ⚠️ TEST-MODE Stripe links (sandbox, no real money) so the preview can be
// exercised end-to-end. Swap for live plink ids + buy.stripe.com URLs (and set
// real dates) BEFORE merging to main.
export const SESSIONS: WorkshopSession[] = [
  {
    id: "s01",
    label: "Session 01",
    date: null,
    isoDate: null,
    time: "5:00PM – 8:00PM",
    venue: VENUES.gatherBulimba,
    paymentLinkId: "plink_1U0d3zP7rmTet5nIRUuAWWzR",
    bookUrl: "https://buy.stripe.com/test_8x2cN79Rbe4L2Zz86lfAc00",
    seats: SEATS_PER_SESSION,
  },
  {
    id: "s02",
    label: "Session 02",
    date: null,
    isoDate: null,
    time: null,
    venue: null,
    paymentLinkId: "plink_1U0d40P7rmTet5nIU2Cv0VQX",
    bookUrl: "https://buy.stripe.com/test_fZu4gB9Rb4ubbw5bixfAc01",
    seats: SEATS_PER_SESSION,
  },
  {
    id: "s03",
    label: "Session 03",
    date: null,
    isoDate: null,
    time: null,
    venue: null,
    paymentLinkId: "plink_1U0d41P7rmTet5nIeRtrj7yK",
    bookUrl: "https://buy.stripe.com/test_cNi00l4wR0dVeIh9apfAc02",
    seats: SEATS_PER_SESSION,
  },
];

/** Lookup for the post-payment page, which gets ?s=<id> from Stripe. */
export const sessionById = (id: string | null): WorkshopSession | null =>
  SESSIONS.find((s) => s.id === id) ?? null;

/** A session can be booked only once it has a live Stripe link. */
export const isOnSale = (s: WorkshopSession): boolean =>
  Boolean(s.paymentLinkId && s.bookUrl);

/** True when at least one session is bookable — gates the /api/seats call. */
export const anySessionOnSale = (): boolean => SESSIONS.some(isOnSale);

/** Earliest dated session, for the hero line. Null while dates are pending. */
export const nextSession = (): WorkshopSession | null =>
  SESSIONS.filter((s) => s.isoDate)
    .sort((a, b) => (a.isoDate! < b.isoDate! ? -1 : 1))[0] ?? null;

/** Hero date line — falls back to the existing copy while dates are pending. */
export const nextSessionLabel = (): string => {
  const s = nextSession();
  return s?.date ? `NEXT SESSION — ${s.date}` : "NEXT SESSION ANNOUNCING SOON";
};
