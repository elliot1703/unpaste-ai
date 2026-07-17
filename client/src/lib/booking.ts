// Single source for booking + contact links across pages.
export const CALENDLY_BASE = "https://calendly.com/elliot-unpaste/30min";

export const calendlyUrl = (source: string) =>
  `${CALENDLY_BASE}?utm_source=${source}`;

export const CONTACT_EMAIL = "elliot@unpaste.co";
