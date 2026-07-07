/**
 * Central site configuration — brand, contact, and offer details.
 *
 * ▸ Everything a non-developer needs to edit lives here or in the other
 *   files in /content. Search for "TODO" to find every placeholder to swap
 *   before launch. Values that also power integrations can be overridden with
 *   environment variables (see .env.example) without touching this file.
 */

export const site = {
  // ── Brand ────────────────────────────────────────────────────────────
  brandName: "Weehan Math Tuition",
  // TODO: replace with the tutor's real name (used in the trust strip + bio).
  tutorName: "Wee Han",
  tutorRole: "Math tutor · Diagnostic-led 1-to-1 coaching",

  // Canonical production URL (no trailing slash). Also used for SEO/OG.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://weehanmathtuition.com").replace(
    /\/$/,
    "",
  ),

  // ── Contact ──────────────────────────────────────────────────────────
  // WhatsApp Business number in E.164 *digits only* (country code, no "+").
  // TODO: replace 6580000000 with the real number, or set NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6580000000",
  // TODO: real phone number for display + tel: link.
  phoneDisplay: "+65 8000 0000",
  phoneE164: "+6580000000",
  // TODO: real reply-to inbox.
  email: "hello@weehanmathtuition.com",

  // ── Offer ────────────────────────────────────────────────────────────
  // Rate is fixed by the brief. Stated once, unqualified, in the coaching
  // section (the Rate block). Do not add comparisons or apologies around it.
  ratePerHour: "$140 per hour",

  // TODO: confirm mode + areas. Feeds the FAQ, footer, and LocalBusiness schema.
  mode: "Online across Singapore, and in-person in the east",
  areasServed: "Tampines · Bedok · Pasir Ris · Simei (in-person); anywhere in Singapore (online)",

  // How fast you promise to reply. Sets expectations on the form.
  responseWindow: "within 24 hours on weekdays",

  // Trust-strip numbers. TODO: use your real figures.
  stats: {
    yearsTutoring: 8,
    pastStudents: 120,
  },

  // Optional social links — leave blank to hide. TODO if you have them.
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
} as const;

/**
 * Build a wa.me click-to-chat deep link with an optional pre-filled message.
 * Used by every WhatsApp CTA so the message stays consistent.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** The default pre-fill for the primary "Enquire about a slot" CTA. */
export const whatsappPrefill =
  "Hi, I'd like to enquire about a 1-to-1 slot for my [Sec X] child.";
