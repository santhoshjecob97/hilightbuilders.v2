/**
 * HILIGHT BUILDERS — single source of truth for business configuration.
 * Values here are editable by the business. Secrets never live here.
 */
export const site = {
  brand: "HILIGHT BUILDERS",
  tagline: "BUILDING TRUST. CREATING LEGACIES.",
  city: "Chennai, Tamil Nadu, India",
  address: ["No. 10/19, 1st Street, SSB Nagar,", "Vadapalani, Chennai – 600026."],
  email: "midsrini@gmail.com",
  gstin: "33EFBPS5010A1Z5",
  founder: "Mr. Srinivasan",
  operations: "Mr. Santhosh",
  /**
   * Verified business WhatsApp number in international format without "+",
   * e.g. "919876543210". Supplied by the owner before launch.
   * Leave empty to route WhatsApp CTAs to the contact page instead.
   */
  whatsappNumber: "",
  /** Click-to-call number, configurable by the business. Empty = hidden. */
  phone: "",
  /** Business hours, editable. */
  hours: "Mon – Sat · 9:30 AM – 6:30 PM",
} as const;

/** Prefilled WhatsApp messages per enquiry intent. */
export const whatsappMessages = {
  home: "Hello HILIGHT BUILDERS, I would like to discuss a home interiors project. Please contact me.",
  commercial:
    "Hello HILIGHT BUILDERS, I would like to discuss a commercial interiors project. Please contact me.",
  construction:
    "Hello HILIGHT BUILDERS, I would like to discuss a construction project. Please contact me.",
  renovation:
    "Hello HILIGHT BUILDERS, I would like to discuss a renovation project. Please contact me.",
  general: "Hello HILIGHT BUILDERS, I have an enquiry. Please contact me.",
} as const;

export type WhatsAppIntent = keyof typeof whatsappMessages;

export function whatsappLink(intent: WhatsAppIntent = "general"): string {
  const text = encodeURIComponent(whatsappMessages[intent]);
  return site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${text}`
    : `/contact?intent=${intent}`;
}
