/**
 * FAQ content. Covers the objections that block enquiries (brief §5.6).
 * TODO: adjust every answer to your real specifics (areas, billing, levels).
 */

import { site } from "./site";

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "How is this different from a regular tuition centre?",
    a: "A centre teaches a set curriculum to a room. Here every student starts with a written diagnostic, and lessons target the gaps it finds — your child's alone in 1-to-1, or the gaps a small group shares — adjusted every week. You're paying for the diagnosis, not a seat in a class.",
  },
  {
    q: "1-to-1 or small group — which suits my child?",
    a: "1-to-1 suits a child whose gaps are their own, or who needs the pace set entirely around them. A small group (up to six, two hours a week) works well when students share similar gaps and benefit from working alongside others. Everyone sits the diagnostic first, and I'll recommend a format on the call.",
  },
  {
    q: "How does the diagnostic work, and what happens after it?",
    a: "Your child sits a short written diagnostic that surfaces the exact misconceptions behind the lost marks. I map those into a lesson plan and we start closing them in order of impact. The plan then updates from what they get wrong each session and in school.",
  },
  {
    q: "What levels and subjects do you cover?",
    a: "Secondary math (Sec 1–4; E Math and A Math for O-Level) and A-Level math at JC. If it's outside this, I'll tell you honestly at the enquiry stage.",
  },
  {
    q: "In person, online, or both — and which areas do you serve?",
    a: "Both. I come to you for in-person sessions anywhere in Singapore, or we meet online — it works just as well for most students.",
  },
  {
    q: "How is billing handled — hourly or a package?",
    a: "Billed by the hour at the end of each month, not in packages — so you're never committing to a block up front. Both hourly rates — 1-to-1 and small group — are stated plainly in the coaching section of the main page.",
  },
  {
    q: "How do you decide whether my child is a fit?",
    a: "After you enquire we have a short call, and the diagnostic confirms it. If I don't think I'm the right person to move your child's grade, I'll say so — a good fit is what makes the coaching work.",
  },
  {
    q: "How quickly will I hear back after enquiring?",
    a: `I reply ${site.responseWindow} to arrange the call. WhatsApp is usually fastest.`,
  },
];
