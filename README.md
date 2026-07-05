# Weehan Math Tuition — Landing Page

A fast, mobile-first, single-page marketing site for a premium 1-to-1 math
tuition service. Its one job is capturing qualified tuition enquiries via
WhatsApp click-to-chat and an enquiry form.

Built from the Technical Spec + PRD in [`docs/`](docs/). Stack: **Next.js 16
(App Router) · TypeScript · Tailwind CSS v4 · zod · Resend · Cloudflare
Turnstile · Plausible**, deployed on **Vercel**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it — **no configuration required**. With no environment variables set,
the enquiry form still works end-to-end: submissions are validated and the
inline thank-you shows, with the lead logged to the server console instead of
being stored/emailed. Add real integrations whenever you're ready (below).

```bash
npm run build && npm run start   # production build + serve
npx tsc --noEmit                 # type-check
npx eslint .                     # lint
```

---

## Editing content (no code needed)

All copy and brand details live in [`content/`](content/). Search the repo for
`TODO` to find every placeholder to replace before launch.

| File | What's in it |
| --- | --- |
| `content/site.ts` | Brand name, tutor name, WhatsApp/phone/email, areas served, mode, stats, socials, canonical URL |
| `content/copy.ts` | Hero, problem, the 6 coaching steps, about bio, section headings |
| `content/testimonials.ts` | Testimonials + grade results (mark the 2–3 strongest as `"case-study"`) |
| `content/faq.ts` | FAQ questions & answers |

**House rules baked into the copy (keep them):** the 6 coaching steps stay in
order; the price appears **once**, in Step 5, as `$140 per session`, with no
apology or comparison. `content/copy.ts` documents the tone rules at the top.

### Adding real photos

The hero is intentionally typographic (fast LCP). The About section has a
headshot **placeholder** — replace the placeholder block in
`components/About.tsx` with a `next/image`:

```tsx
import Image from "next/image";
<Image src="/tutor.jpg" alt="{tutor name}" width={640} height={800}
       className="aspect-[4/5] w-full rounded-xl object-cover" />
```

Drop the file in `public/`. Use optimised WebP/AVIF to stay under the page-weight budget.

---

## Integrations

Everything is behind an **adapter that degrades gracefully** — unset = logs to
console and no-ops. Copy `.env.example` → `.env.local` and fill in what you have.

### WhatsApp
Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your number in **E.164 digits only**
(e.g. `6581234567`). Every "Enquire" button opens a chat pre-filled with the
message in `content/site.ts`.

### Google Sheets (lead store) — `SHEETS_WEBHOOK_URL`
The datastore adapter (`lib/datastore.ts`) POSTs each lead as JSON to a Google
Apps Script web app. Setup:

1. Create a Google Sheet with a header row matching the lead fields.
2. **Extensions → Apps Script**, paste a `doPost(e)` that appends
   `JSON.parse(e.postData.contents)` as a row.
3. **Deploy → New deployment → Web app**, execute as *you*, access *Anyone*.
4. Copy the web-app URL into `SHEETS_WEBHOOK_URL`.

Prefer Airtable/a CRM? Swap the single `fetch` in `lib/datastore.ts` — the rest
of the app is untouched (an Airtable snippet is in the file's comments).

### Email (Resend) — `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFICATION_EMAIL`
`lib/email.ts` sends a **lead notification to you** on every submission, and an
**auto-confirmation to the enquirer** if they left an email (the email field is
optional). `RESEND_FROM` must be a verified sender/domain in Resend.

### Cloudflare Turnstile (anti-spam) — `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
The widget renders on the form only when a site key is present; the server
verifies the token only when the secret is present (`lib/turnstile.ts`). A
hidden honeypot field runs regardless. With neither key set, verification is
skipped in dev.

### Plausible (analytics) — `NEXT_PUBLIC_ANALYTICS_DOMAIN`
Set to your Plausible site domain to inject the (cookie-free) script.
`lib/analytics.ts` fires the five tracked events — `enquiry_submit`,
`whatsapp_click`, `phone_click`, `cta_secondary_click`, `faq_open`. Configure
`enquiry_submit` and `whatsapp_click` as **goals** to report the visitor→enquiry
rate. Swapping to GA4 is a change to `lib/analytics.ts` + `app/layout.tsx` only.

---

## Deploying to Vercel

1. Push this repo to GitHub and **Import** it in Vercel (Next.js auto-detected).
2. Add the env vars from `.env.example` under **Settings → Environment
   Variables** (Production + Preview).
3. Every push gets a preview URL; merges to `main` deploy to production.
4. **Domain:** add `weehanmathtuition.com` in **Settings → Domains**; Vercel
   issues TLS automatically. Pick one canonical host (apex or `www`) and let the
   other 301-redirect — keep it consistent with `NEXT_PUBLIC_SITE_URL`.

Pages are statically prerendered to the edge CDN; only `POST /api/enquiry` runs
as a serverless function.

---

## Performance budget

Targets from the spec: **page < 1 MB, LCP < 2.0s on 4G.** Kept in check by a
typographic (image-free) hero, three self-hosted variable/subset fonts via
`next/font`, Server Components everywhere except the form, accordion, and menu,
and a cookie-free analytics script. Run **Lighthouse (mobile)** on a Vercel
preview before promoting to production and treat LCP ≥ 2.0s or weight ≥ 1 MB as
a release blocker.

---

## Pre-launch checklist

- [ ] Replace every `TODO` in `content/*` (name, number, bio, testimonials, areas).
- [ ] Add the tutor headshot + any session photos in `public/`.
- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and confirm the pre-filled message.
- [ ] Wire `SHEETS_WEBHOOK_URL`, `RESEND_*`, Turnstile keys, Plausible domain.
- [ ] Decide free-trial vs paid-diagnostic wording (Step 6 CTA + confirmation email).
- [ ] Confirm mode + areas served (feeds FAQ, footer, and JSON-LD).
- [ ] Have `app/privacy/page.tsx` reviewed against your real data flow.
- [ ] Lighthouse mobile pass; test the WhatsApp link and a real form submission.
