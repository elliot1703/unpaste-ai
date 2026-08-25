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
  /** Same figure as a number, for analytics/pixel event values. */
  inclGstAmount: 438.9,
  /** Original price, shown struck through. */
  was: "$850",
} as const;

export type VenuePhoto = {
  src: string;
  alt: string;
  /** Mono caption shown under the frame. */
  caption: string;
  /** Small right-aligned detail beside the caption. */
  meta?: string;
};

export type Venue = {
  name: string;
  street: string;
  suburb: string;
  /** Short form for compact labels. */
  short: string;
  /** Link for a "find it" button — Google Maps search URL. */
  mapUrl?: string;
  /** First photo is the feature panel; the rest stack beside it. */
  photos?: VenuePhoto[];
};

export const VENUES = {
  gatherBulimba: {
    name: "Gather Bulimba",
    street: "9/57 Karthina Street",
    suburb: "Bulimba QLD 4171",
    short: "Bulimba",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Gather%20Bulimba%209%2F57%20Karthina%20Street%20Bulimba%20QLD%204171",
    photos: [
      {
        src: "/images/venues/gather-bulimba/room.webp",
        alt: "The workshop room at Gather Bulimba — one table, laptops out and the curriculum on screen",
        caption: "The room",
        meta: "Set up for a session",
      },
      {
        src: "/images/venues/gather-bulimba/lounge.webp",
        alt: "Breakout lounge with a curved sofa beside a window",
        caption: "Breakout",
        meta: "Coffee + reset",
      },
      {
        src: "/images/venues/gather-bulimba/entrance.webp",
        alt: "Gather signage on Karthina Lane, Bulimba",
        caption: "Look for this",
        meta: "9/57 Karthina",
      },
    ],
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
  /** True = event pulled, moving to a new (daytime) slot. Card shows an
      interest CTA instead of a buy button. */
  postponed?: boolean;
};

// Nothing here is global on purpose — venue, time and seat count all live per
// session, so a 6-seat evening in Bulimba and a 100-seat daytime thing
// somewhere else can sit side by side without touching a component.
//
// Session 01 rescheduled 2026-08-25 (Cherie, Gather): daytime slot, ten seats.
export const SESSIONS: WorkshopSession[] = [
  {
    id: "s01",
    label: "Session 01",
    date: "WED 16 SEP",
    isoDate: "2026-09-16",
    time: "10:00AM – 1:30PM",
    venue: VENUES.gatherBulimba,
    paymentLinkId: "plink_1U0g3j1gBgJJLcc0kWYke9Ej",
    bookUrl: "https://buy.stripe.com/fZu8wH6gQe2H0Al0zR5kk00",
    seats: 10,
  },
  {
    id: "s02",
    label: "Session 02",
    date: null,
    isoDate: null,
    time: null,
    venue: null,
    paymentLinkId: null,
    bookUrl: null,
    seats: SEATS_PER_SESSION,
  },
  {
    id: "s03",
    label: "Session 03",
    date: null,
    isoDate: null,
    time: null,
    venue: null,
    paymentLinkId: null,
    bookUrl: null,
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
  return s?.date ? `NEXT SESSION — ${s.date}` : "DAYTIME SESSIONS — DATES ANNOUNCING SOON";
};
