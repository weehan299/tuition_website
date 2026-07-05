/**
 * Long-form page copy, separated from presentation.
 *
 * Tone rules (from the brief — enforce on every edit):
 *  • The 6-step coaching sequence must stay in order; price appears once, in
 *    Step 5, unqualified.
 *  • No apologetic framing anywhere: no "although the fee is higher", "we know
 *    it's expensive", "worth every dollar", "premium but", and no comparisons
 *    to cheaper alternatives. The reader should finish asking "is my child a
 *    fit?" — not "can I afford this?"
 */

import { site } from "./site";

/** The specific failure modes this service is built for. Reused in the
 *  Problem section and in Step 1 of the coaching sequence. */
export const failureModes = [
  "Understands it in class, but can't reproduce the working alone at home.",
  "The same silly mistakes keep coming back, however many papers they do.",
  "One topic — trigonometry, differentiation — quietly drags the whole grade down.",
  "Stuck at a B or C for terms, despite the hours already going in.",
] as const;

export const copy = {
  hero: {
    eyebrow: "Premium 1-to-1 math tuition · Secondary",
    // The headline itself is rendered in Hero.tsx so the marking annotation
    // can sit on the exact words. Sub-headline and CTAs live here.
    subhead:
      "Diagnostic-led 1-to-1 coaching for secondary students — every lesson planned around the specific gaps holding your child's grade down, not a shared worksheet.",
    primaryCta: "Enquire about a slot",
    secondaryCta: "See how the coaching works",
  },

  problem: {
    eyebrow: "The pattern",
    heading: "More practice hasn't moved the grade — because practice isn't the problem.",
    paragraphs: [
      "If your child works hard and still lands at the same grade, the issue usually isn't effort or ability. It's a specific gap — a misconception repeated across dozens of questions — that ordinary practice never isolates.",
      "These are the patterns 1-to-1 coaching is built to fix. If one of them sounds like your child, the diagnostic will find exactly where it starts.",
    ],
  },

  coaching: {
    eyebrow: "How the coaching works",
    heading: "A diagnostic-led method — not regular tuition, delivered privately.",
    intro:
      "This is a different product from a standard worksheet lesson. Every student is coached against their own set of gaps, and the plan changes as those gaps close.",

    step2: {
      title: "A method built around the misconception, not the question",
      lead: "Here is what actually happens once your child starts:",
      points: [
        {
          k: "Diagnostic first",
          v: "Every student begins with a written diagnostic that surfaces the exact misconceptions and gaps — not just “weak topics”.",
        },
        {
          k: "Individually planned",
          v: "Each lesson is designed for that student's current gap set. There is no shared worksheet rotation.",
        },
        {
          k: "Adjusted every lesson",
          v: "The plan updates on what they got wrong last session and in school that week.",
        },
        {
          k: "Fix the pattern, not the question",
          v: "The goal is the underlying error pattern, so they can solve the next 20 variants unaided — not just the one on the page.",
        },
      ],
    },

    step3: {
      title: "Evidence it moves the grade",
      lead: "A few students, with permission — the method, not just “a nice teacher”.",
    },

    step4: {
      title: "What's included",
      items: [
        "An initial written diagnostic and full gap analysis",
        "A 1.5-hour weekly 1-to-1 session",
        "A custom lesson plan and materials prepared for each session",
        "Between-session WhatsApp support for stuck questions (weekdays)",
        "A termly progress update written for the parent",
        site.mode,
        "Secondary levels: Sec 1–4, O-Level (A-Level on request)",
      ],
    },

    step5: {
      title: "The rate",
      // Rendered once, unqualified. The only neutral clarifier permitted:
      clarifier: "Billed per session. No package lock-in.",
    },

    step6: {
      title: "See if it's a fit",
      body: "Places are taken on fit, and a few open each term. Send a short enquiry and we'll arrange a call to check whether the coaching is right for your child.",
      // TODO (open item): decide free trial vs paid diagnostic — this CTA and
      // the confirmation email should say the same thing.
      cta: "Enquire about suitability and availability",
    },
  },

  about: {
    eyebrow: `About ${site.tutorName}`,
    heading: "The person who'll be teaching your child.",
    // TODO: replace with the real 200–300 word bio.
    paragraphs: [
      `I'm ${site.tutorName}, and I coach secondary math one-to-one. I started because I kept meeting bright students who had been told they were “just not a math person” — when in fact they had two or three specific misconceptions no one had ever isolated.`,
      "My work is diagnostic before it is instructional. I find the exact step where the reasoning breaks, rebuild it, and then prove it holds across every variant of the question. Grades move because the underlying error is gone, not because we drilled harder.",
      "I take on a limited number of students at a time so each plan stays genuinely individual.",
    ],
    // TODO: replace with real, specific credentials (degrees, MOE reg., schools).
    credentials: [
      "B.Sc. (Hons) Mathematics — [University]",
      "8 years coaching secondary & O-Level math",
      "120+ students taught across [schools]",
      "MOE-registered tutor — [reg. no., if applicable]",
    ],
  },

  socialProof: {
    eyebrow: "Results & words",
    heading: "Grades that moved, in their families' words.",
  },

  faq: {
    eyebrow: "Before you enquire",
    heading: "The questions parents ask first.",
  },

  finalCta: {
    eyebrow: "Enquire",
    heading: "Is your child a fit for this?",
    body: "Places are limited and taken on fit. Send a short enquiry and we'll arrange a call to see whether the coaching is right — no commitment either way.",
  },

  enquiry: {
    heading: "Enquire about a slot",
    sub: "Three ways to reach us. WhatsApp is fastest; the form below works just as well.",
    formHeading: "Or send a short enquiry",
    // Expectation-setting line shown near the form (brief §6.2).
    expectation: `We'll reply ${site.responseWindow} to arrange a short call and check whether the fit is right.`,
  },
} as const;
