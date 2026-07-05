/**
 * Analytics event helpers. Centralised so every component fires the same
 * event names (brief §9). Uses Plausible if it's loaded; otherwise no-ops
 * (and logs in dev), so the site runs with no analytics configured.
 */

export type AnalyticsEvent =
  | "enquiry_submit"
  | "whatsapp_click"
  | "phone_click"
  | "cta_secondary_click"
  | "faq_open";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, props?: Props): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the UI */
  }
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, props ?? "");
  }
}

/** Named helpers for the five tracked interactions. */
export const track = {
  enquirySubmit: (props?: Props) => trackEvent("enquiry_submit", props),
  whatsappClick: (props?: Props) => trackEvent("whatsapp_click", props),
  phoneClick: () => trackEvent("phone_click"),
  ctaSecondaryClick: () => trackEvent("cta_secondary_click"),
  faqOpen: (question: string) => trackEvent("faq_open", { question }),
};
