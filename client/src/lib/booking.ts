// Single source for booking + contact links across pages.
// Calls are booked on /book, which embeds the GoHighLevel "Discovery call" calendar.
export const BOOKING_PAGE = "/book";

export const bookingUrl = (source: string) =>
  `${BOOKING_PAGE}?utm_source=${source}`;

export const CONTACT_EMAIL = "elliot@unpaste.co";
