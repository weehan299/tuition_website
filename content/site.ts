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
  tutorName: "Wee Han",
  tutorRole: "Math tutor · Diagnostic-led coaching",

  // Canonical production URL (no trailing slash). Also used for SEO/OG.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://weehanmathtuition.com").replace(
    /\/$/,
    "",
  ),

  // ── Contact ──────────────────────────────────────────────────────────
  // WhatsApp Business number in E.164 *digits only* (country code, no "+").
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6583821568",
  phoneDisplay: "+65 8382 1568",
  phoneE164: "+6583821568",
  email: "whlabssg@gmail.com",

  // ── Offer ────────────────────────────────────────────────────────────
  // Rates. Each is stated once, unqualified, in the coaching section (the
  // Rate block). Do not add comparisons or apologies around them.
  rates: [
    { format: "1-to-1", amount: "$140", unit: "per hour" },
    { format: "Small group", amount: "$70", unit: "per student, per hour" },
  ],

  // Coverage. Feeds the "What's included" list and the footer.
  mode: "In-person anywhere in Singapore, or online",
  areasServed: "Anywhere in Singapore",

  // How fast you promise to reply. Sets expectations on the form.
  responseWindow: "within 24 hours on weekdays",

  // Trust-strip numbers.
  stats: {
    yearsTutoring: 5,
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
  "Hi, I'd like to enquire about a slot (1-to-1 or small group) for my [Sec X] child.";
