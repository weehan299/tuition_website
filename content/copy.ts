/**
 * Long-form page copy, separated from presentation.
 *
 * Tone rules (from the brief — enforce on every edit):
 *  • State each idea once. Each rate appears once, in the Rate block,
 *    unqualified, and never leads.
 *  • No apologetic framing anywhere: no "although the fee is higher", "we know
 *    it's expensive", "worth every dollar", "premium but", and no comparisons
 *    to cheaper alternatives. The reader should finish asking "is my child a
 *    fit?" — not "can I afford this?"
 */

import { site } from "./site";

/** The specific failure modes this service is built for. Shown in the Problem
 *  section as the emotional hook, right before the coaching section. */
export const failureModes = [
  "Understands it in class, but can't reproduce the working alone at home.",
  "Lost in class — the concepts never clicked, and each new topic makes it worse.",
  "One topic — trigonometry, differentiation — quietly drags the whole grade down.",
  "Stuck at a B or C for terms, despite the hours already going in.",
] as const;

export const copy = {
  hero: {
    eyebrow: "Premium math coaching · Secondary & JC",
    // The headline itself is rendered in Hero.tsx so the marking annotation
    // can sit on the exact words. Sub-headline and CTAs live here.
    subhead:
      "Coaching that identifies the exact gaps holding your child back — and fixes them at the source.",
    primaryCta: "Enquire about a slot",
    secondaryCta: "See how the coaching works",

    // The right-column diagnostic vignette. Four different-looking topics,
    // each failing at the same shared slip (not tracking the negative),
    // with the four errors converging on one node. Editing rules:
    //   • Keep exactly four panels. The claim is "many topics, one habit".
    //   • `answer` is the wrong answer the red pen circles — pick a single,
    //     unambiguous fragment. Everything else stays uncircled.
    //   • `error` is the tutor's red-pen margin note under the circle. Keep
    //     it under ~4 words, in the tutor's voice. No leading arrow — the
    //     label sits directly below the circle, so directional glyphs read
    //     as vestigial.
    //   • `nodeLabel` is the shared habit — the answer to *why* all four
    //     panels are the same slip. If you change it, also update `ariaLabel`.
    //   • Don't add a "fix" line here. Green is reserved for the coaching
    //     section; this graphic is diagnosis, not correction.
    diagnostic: {
      panels: [
        {
          topic: "Quadratic",
          pre: ["(x + 2)(x + 3) = 0"],
          answer: "x = 2,  x = 3",
          error: "sign flipped wrong",
        },
        {
          topic: "Differentiation",
          pre: ["y = cos x"],
          answer: "dy/dx = sin x",
          error: "dropped the minus",
        },
        {
          topic: "Inequality",
          pre: ["−2x > 6"],
          answer: "x > −3",
          error: "didn't flip the sign",
        },
        {
          topic: "Factorising",
          pre: ["−(x − 3)"],
          answer: "−x − 3",
          error: "didn't distribute the sign",
        },
      ],
      nodeLabel: "Track the negative sign, every step.",
      caption:
        "Four topics. One habit. That's what “more tuition” keeps missing.",
      ariaLabel:
        "Four algebra topics — quadratic, differentiation, inequality, factorisation — each failing at one shared habit: tracking the negative sign through every step.",
    },
  },

  problem: {
    eyebrow: "The pattern",
    heading: "Does one of these sound like your child?",
    paragraphs: [
      "If any of them do, this is what the coaching is built to fix — and the diagnostic will find where it starts.",
    ],
  },

  coaching: {
    eyebrow: "How the coaching works",
    // Third beat of a relay: Hero makes the claim, the pattern section proves
    // it, and this answers what they can't yet infer — what happens *after* the
    // diagnosis. Do not re-sell diagnosis here; the hero and the diagnostic
    // graphic already own it.
    heading: "What happens once the diagnosis is done.",
    intro:
      "You've seen the pattern. This is the part you can't infer yet — how a habit, not a topic, actually gets fixed, week to week.",

    method: {
      title: "The fix isn't more practice — it's rewiring the habit",
      // A callback to the hero diagnostic (the negative-sign slip), not a
      // restatement of it — this is the mechanism the demo left unanswered.
      lead: "Once the diagnostic isolates the habit — like the negative-sign slip above — each lesson is built to interrupt it until the correct step becomes automatic across every topic it touches. As each habit closes, the plan moves to the next: week 2 isn't week 8.",
      // Only genuinely-new operational facts remain. "Diagnostic first" and
      // "Fix the pattern" were removed as duplicates of the hero + demo above.
      points: [
        {
          k: "Planned from the diagnostic",
          v: "1-to-1, the plan is your child's alone; in a small group, it targets the gaps the group shares.",
        },
        {
          k: "Adjusted every lesson",
          v: "updated on what they missed last session and in school.",
        },
      ],
    },

    evidence: {
      title: "Evidence it moves the grade",
      // Framed as resolution, not a re-listing: each case study below carries a
      // callback to the numbered pattern it closes (see testimonials.echoes).
      lead: "Not “a nice teacher” — the same patterns from the top of the page, closed. A few students, shared with permission.",
      schoolsLabel: "Students have come from",
    },

    included: {
      title: "What's included",
      items: [
        "An initial written diagnostic and full gap analysis",
        "Weekly sessions — 1.5 hours 1-to-1, or 2 hours in a small group of up to 6",
        "A custom lesson plan and materials prepared for each session",
        "Between-session WhatsApp support for stuck questions (weekdays)",
        "A termly progress update written for the parent",
        site.mode,
        "Levels: Sec 1–4 (O-Level) and JC (A-Level)",
      ],
    },

    rate: {
      title: "Rates",
      // Rendered once, unqualified. The only neutral clarifier permitted:
      clarifier: "Billed at the end of the month. No package lock-in.",
    },
  },

  about: {
    eyebrow: `About ${site.tutorName}`,
    heading: "The person who'll be teaching your child.",
    // TODO: replace with the real 200–300 word bio.
    paragraphs: [
      `I'm ${site.tutorName}, and I coach secondary, IP and JC math, one-to-one and in small groups. If your child understands things in class but freezes on their own, or keeps making the “same silly mistake,” that's usually not carelessness and never a sign they can't do math. More often it's a couple of specific misconceptions sitting underneath, quietly costing marks.`,
      "What I do is find where the reasoning actually breaks, work out why, and check the fix holds across the different ways an exam can ask the same thing. It's detailed work, and it's the part that tends to move a grade.",
      "I only take on a limited number of students, and groups stay small, so every child still gets close attention.",
    ],
    credentials: [
      "M.Sc. Data Science & Machine Learning — NUS",
      "B.Sc. Mathematics, Honours (Highest Distinction) — NUS",
      "5+ years coaching O-Level and A-Level math",
    ],
  },

  // Standalone /faq page (linked from the header nav; not on the home page).
  faqPage: {
    eyebrow: "Before you enquire",
    heading: "Every question, answered.",
  },

  enquiry: {
    heading: "Is your child a fit for this?",
    sub: "Places are limited and taken on fit. WhatsApp is fastest; the form works just as well — no commitment either way.",
    formHeading: "Or send a short enquiry",
    // Expectation-setting line shown near the form (brief §6.2).
    expectation: `We'll reply ${site.responseWindow} to arrange a short call and check whether the fit is right.`,
  },
} as const;
