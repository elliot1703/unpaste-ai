// Single source for workshop session data, price and venue.
// Sibling to booking.ts — every page that mentions a workshop reads from here,
// so changing a date or price is a one-file edit.
//
// A session with `paymentLinkId: null` is not on sale yet: it renders in a
// "dates announcing" state and is skipped by /api/seats. That's what lets the
// page ship before the Stripe links exist.

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

export const WORKSHOP_VENUE = {
  name: "Gather Bulimba",
  street: "9/57 Karthina Street",
  suburb: "Bulimba QLD 4171",
  /** Short form for card labels. */
  short: "Bulimba",
} as const;

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
  /** Stripe Payment Link id (plink_...). Null = not on sale. */
  paymentLinkId: string | null;
  /** Stripe Payment Link URL. Null = not on sale. */
  bookUrl: string | null;
  seats: number;
};

// Venue is booked 4:30–8:30PM; the session runs 5:00–8:00PM with setup and
// pack-down either side. Dates pending — swap `date`/`isoDate` and drop in the
// Stripe ids and nothing else needs to change.
export const SESSIONS: WorkshopSession[] = [
  {
    id: "s01",
    label: "Session 01",
    date: null,
    isoDate: null,
    time: "5:00PM – 8:00PM",
    paymentLinkId: null,
    bookUrl: null,
    seats: SEATS_PER_SESSION,
  },
  {
    id: "s02",
    label: "Session 02",
    date: null,
    isoDate: null,
    time: "5:00PM – 8:00PM",
    paymentLinkId: null,
    bookUrl: null,
    seats: SEATS_PER_SESSION,
  },
  {
    id: "s03",
    label: "Session 03",
    date: null,
    isoDate: null,
    time: "5:00PM – 8:00PM",
    paymentLinkId: null,
    bookUrl: null,
    seats: SEATS_PER_SESSION,
  },
];

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
