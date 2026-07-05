/**
 * POST /api/enquiry — the only dynamic operation on the site (brief §6.4).
 *
 * Flow: parse → honeypot → Turnstile → validate → persist → email.
 * Contract:
 *   200 { ok: true }              success (and honeypot hits, silently)
 *   400 { ok: false, error }      failed anti-spam / bad token
 *   422 { ok: false, errors }     validation failed (field → message)
 *   500 { ok: false, error }      server/adapter error
 */

import { NextResponse } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/validation";
import { verifyTurnstile } from "@/lib/turnstile";
import { saveLead, type Lead } from "@/lib/datastore";
import { sendEnquiryEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // 1) Honeypot — a real user never fills this. Bots that do get a silent
  //    "success" so they don't learn they were caught. Nothing is stored.
  const honeypot = typeof data.honeypot === "string" ? data.honeypot : "";
  if (honeypot.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 2) Cloudflare Turnstile (skipped automatically when unconfigured).
  const token =
    typeof data.turnstileToken === "string" ? data.turnstileToken : undefined;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const humanVerified = await verifyTurnstile(token, ip);
  if (!humanVerified) {
    return NextResponse.json(
      { ok: false, error: "Couldn't verify you're human. Please try again." },
      { status: 400 },
    );
  }

  // 3) Authoritative validation (same schema the client uses).
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  // 4) Persist + email (adapters degrade gracefully with no secrets).
  const lead: Lead = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    source: "enquiry-form",
  };

  try {
    await saveLead(lead);
    await sendEnquiryEmails(lead);
  } catch (err) {
    console.error("[enquiry] failed to process lead:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
