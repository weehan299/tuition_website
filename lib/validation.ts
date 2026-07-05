/**
 * Shared enquiry validation — the single source of truth used by BOTH the
 * client (instant feedback in EnquiryForm) and the server Route Handler
 * (authoritative check). Defining it once keeps the two in lockstep.
 */

import { z } from "zod";

/** Student level options — also used to render the <select>. */
export const LEVELS = ["Sec 1", "Sec 2", "Sec 3", "Sec 4"] as const;
export type Level = (typeof LEVELS)[number];

/** The visible form fields + PDPA consent. */
export const enquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name looks too long."),
  contact: z
    .string()
    .trim()
    .min(8, "Enter a contact number we can reach you on.")
    .max(40)
    .refine(
      (v) => v.replace(/\D/g, "").length >= 8,
      "Enter at least 8 digits (a WhatsApp number is ideal).",
    ),
  // Optional: enables the auto-confirmation email (brief §6.2). WhatsApp/phone
  // above stays the required contact path, so this is genuinely optional.
  email: z
    .string()
    .trim()
    .max(120)
    .optional()
    .refine(
      (v) => !v || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
      "Enter a valid email, or leave it blank.",
    ),
  level: z.enum(LEVELS, { error: "Select your child's current level." }),
  grade: z
    .string()
    .trim()
    .min(1, "Let us know the current math grade.")
    .max(60),
  issue: z
    .string()
    .trim()
    .min(5, "Tell us the main issue or goal in a sentence.")
    .max(1200),
  schedule: z.string().trim().max(200).optional(),
  heardFrom: z.string().trim().max(200).optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please tick to consent before submitting."),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** The full POST body: form fields plus the anti-spam fields. */
export const enquiryPayloadSchema = enquirySchema.extend({
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});
export type EnquiryPayload = z.infer<typeof enquiryPayloadSchema>;

/**
 * Flatten a ZodError into { field: firstMessage }. Works across zod versions
 * (reads `.issues` directly rather than the shifting `.flatten()` API).
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) out[key] = issue.message;
  }
  return out;
}
