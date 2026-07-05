/**
 * Lead datastore adapter (brief §2 / §6.2). Default implementation posts the
 * lead to a Google Apps Script web-app webhook (zero SDK, low-ops). Swapping to
 * Airtable / a CRM is a one-function change — see the note at the bottom.
 *
 * Degrades gracefully: with no SHEETS_WEBHOOK_URL set, the lead is logged to
 * the server console and not persisted, so the form still works in dev.
 */

import type { EnquiryInput } from "./validation";

export type Lead = EnquiryInput & {
  /** ISO timestamp the server received it. */
  submittedAt: string;
  /** Which form/pipeline produced it (future-proofs a waitlist form). */
  source: string;
};

export async function saveLead(lead: Lead): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;

  if (!url) {
    console.info(
      "[datastore] SHEETS_WEBHOOK_URL not set — lead NOT persisted (dev). Lead:",
      JSON.stringify(lead),
    );
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    // Apps Script webhooks answer fast; fail loudly if they don't.
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`[datastore] webhook responded ${res.status}`);
  }
}

/*
 * ── Swapping to Airtable ─────────────────────────────────────────────────
 * Replace the fetch above with:
 *
 *   await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leads`, {
 *     method: "POST",
 *     headers: {
 *       Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
 *       "Content-Type": "application/json",
 *     },
 *     body: JSON.stringify({ fields: lead }),
 *   });
 *
 * Nothing else in the app needs to change — the Route Handler only calls
 * saveLead().
 */
