# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This is NOT the Next.js you know

Next.js 16 has breaking changes from earlier versions your training data covered — APIs, conventions, and file structure may differ. Before writing Next-specific code, read the relevant guide under `node_modules/next/dist/docs/` (start at `01-app/`) and honour any deprecation notices.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build && npm run start` — production build + serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`)
- `npx tsc --noEmit` — type-check (there is no `npm run typecheck` script)

There is no test suite. Verification is manual — the README's performance budget (page < 1 MB, LCP < 2.0s on mobile) is treated as a release gate. Use the browser harness noted in the auto-memory index for visual verification.

Path alias `@/*` maps to the repo root (`tsconfig.json`) — imports are `@/lib/...`, `@/components/...`, `@/content/...`.

## Architecture

Single-page marketing site whose one job is capturing tuition enquiries (WhatsApp click-to-chat + a form). The page is assembled in `app/page.tsx` in a **fixed section order — do not reorder** (mandated by the brief, per the comment in that file):

```
Header → Hero → ProblemSection → CoachingSection → About → SocialProof → FAQ → EnquirySection → Footer
```

(The brief's original FinalCTA band was merged into EnquirySection at the owner's request. The home FAQ section shows only `featured` questions from `content/faq.ts`; the full list lives on the standalone `/faq` route.)

Everything is a Server Component except three explicit client leaves (`EnquiryForm`, `FAQ` accordion, `Header` mobile menu). Keep that split; the hero is intentionally typographic (no image) to protect LCP.

### Content vs code

Copy, brand, and offer details live in `content/*.ts` (`site.ts`, `copy.ts`, `testimonials.ts`, `faq.ts`) and drive the whole page. Non-developer edits — tutor name, WhatsApp number, testimonials, FAQ — happen there, not in components. Search for `TODO` to find every unresolved launch placeholder.

### The `lib/` adapter layer

Each integration is a single-function adapter that **degrades gracefully when its env var is missing** — it logs and no-ops instead of throwing, so the form and site run end-to-end with zero secrets. Preserve this pattern when editing:

- `lib/datastore.ts` — `saveLead()` POSTs to `SHEETS_WEBHOOK_URL` (Google Apps Script webhook). Swapping to Airtable/CRM is a change to the single `fetch`; snippet in-file.
- `lib/email.ts` — `sendEnquiryEmails()` uses Resend (dynamically imported) when `RESEND_API_KEY` is set. Sends an owner notification + enquirer auto-confirm (only if they left an email).
- `lib/turnstile.ts` — server-side Cloudflare verify, skipped when `TURNSTILE_SECRET_KEY` is unset.
- `lib/analytics.ts` — Plausible `track.*` helpers. The five event names (`enquiry_submit`, `whatsapp_click`, `phone_click`, `cta_secondary_click`, `faq_open`) are canonical; reuse them, don't invent new ones.
- `lib/validation.ts` — the zod `enquirySchema` is the **single source of truth** used by both the client form and `POST /api/enquiry`. Edit here and both sides stay in lockstep.

### The one dynamic route

`app/api/enquiry/route.ts` is the only non-static operation on the site. Flow is fixed: parse → honeypot (silent 200) → Turnstile → validate → `saveLead` → `sendEnquiryEmails`. Response contract is 200/400/422/500 (documented in the file header). Everything else statically prerenders.

## Copy and design rules (hard constraints from the brief)

Enforce on every content edit — these are not stylistic preferences:

- **Say each thing once**, and no apologetic price framing anywhere ("although the fee is higher", "premium but", comparisons to cheaper tuition).
- **The price appears exactly once**, in the coaching section's Rate block, as `$140 per session`, unqualified, and it never leads. `content/site.ts` holds the value; `content/copy.ts` documents the rule at the top of the file.
- **Two-gesture colour system** defined in `app/globals.css` under `@theme`: `--color-green` = the fix / tick / primary CTA; `--color-mark` = the red pen circling the problem, used sparingly. Don't introduce a third accent.
- Typography via `next/font` in `app/layout.tsx`: Fraunces (display serif) for headings, Inter for body, IBM Plex Mono for exam-data labels/grades/rate. Use the `.nums` utility for tabular figures.

## Tailwind v4

Design tokens live in `app/globals.css` inside `@theme` (colours, fonts, radius) with a `.eyebrow` / `.nums` / `.graph-bg` / `.annotate` component layer. There is **no `tailwind.config.*`** — do not introduce a v3-style JS config. Tailwind classes reference the CSS tokens (`bg-paper`, `text-ink`, `text-ink-soft`, `border-line`, `bg-green`, `text-mark`, etc.).
