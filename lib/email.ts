/**
 * Transactional email adapter (brief §6.2). Two messages:
 *  1. A lead notification to the business owner (so you act fast).
 *  2. An auto-confirmation to the enquirer — only if they left an email.
 *
 * Uses Resend when RESEND_API_KEY is set; otherwise logs and no-ops, so the
 * form works with no email provider configured. `resend` is dynamically
 * imported so it's only loaded when actually used.
 */

import { site } from "@/content/site";
import type { Lead } from "./datastore";

const FROM =
  process.env.RESEND_FROM || `${site.brandName} <onboarding@resend.dev>`;
const OWNER_INBOX = process.env.LEAD_NOTIFICATION_EMAIL || site.email;

export async function sendEnquiryEmails(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      "[email] RESEND_API_KEY not set — confirmation/notification emails skipped (dev).",
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  // 1) Owner notification — always.
  await resend.emails.send({
    from: FROM,
    to: OWNER_INBOX,
    subject: `New 1-to-1 enquiry — ${lead.parentName} (${lead.level})`,
    replyTo: lead.email || undefined,
    html: ownerHtml(lead),
  });

  // 2) Enquirer auto-confirmation — only when an email was provided.
  if (lead.email) {
    await resend.emails.send({
      from: FROM,
      to: lead.email,
      subject: `We've got your enquiry — ${site.brandName}`,
      html: confirmationHtml(lead),
    });
  }
}

function confirmationHtml(lead: Lead): string {
  return wrap(`
    <h1 style="font-size:20px;margin:0 0 12px">Thank you, ${escape(lead.parentName)}.</h1>
    <p>Your enquiry about 1-to-1 math coaching for your ${escape(lead.level)} child has arrived.</p>
    <p>We'll reply <strong>${site.responseWindow}</strong> to arrange a short call and check
       whether the coaching is the right fit for your child.</p>
    <p style="color:#57534a">If it's easier, you can also reach us on WhatsApp any time.</p>
    <p style="margin-top:24px">— ${escape(site.tutorName)}, ${escape(site.brandName)}</p>
  `);
}

function ownerHtml(lead: Lead): string {
  const rows = [
    ["Parent", lead.parentName],
    ["Contact", lead.contact],
    ["Email", lead.email || "—"],
    ["Level", lead.level],
    ["Current grade", lead.grade],
    ["Main issue / goal", lead.issue],
    ["Preferred schedule", lead.schedule || "—"],
    ["Heard about us", lead.heardFrom || "—"],
    ["Submitted", lead.submittedAt],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#57534a;vertical-align:top">${k}</td><td style="padding:4px 0">${escape(String(v))}</td></tr>`,
    )
    .join("");
  return wrap(
    `<h1 style="font-size:20px;margin:0 0 12px">New enquiry</h1><table style="border-collapse:collapse">${rows}</table>`,
  );
}

function wrap(inner: string): string {
  return `<div style="font-family:ui-sans-serif,system-ui,Arial,sans-serif;background:#fbf9f3;color:#1a1917;padding:28px;line-height:1.55;font-size:15px">
    <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e4dccb;border-radius:10px;padding:28px">
      ${inner}
    </div>
  </div>`;
}

/** Minimal HTML-escape for values interpolated into email markup. */
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
