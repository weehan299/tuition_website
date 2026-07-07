/**
 * FAQ content. Covers the objections that block enquiries (brief §5.6).
 * TODO: adjust every answer to your real specifics (areas, billing, levels).
 */

import { site } from "./site";

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "How is this different from a regular tuition centre?",
    a: "A centre teaches a shared curriculum to a room. This is the opposite: a written diagnostic first, then a plan built only for your child's specific gaps, adjusted every week. You're paying for the diagnosis and the individual plan — not a seat in a class.",
  },
  {
    q: "How does the diagnostic work, and what happens after it?",
    a: "Your child sits a short written diagnostic that surfaces the exact misconceptions behind the lost marks. I map those into a lesson plan and we start closing them in order of impact. The plan then updates from what they get wrong each session and in school.",
  },
  {
    q: "What levels and subjects do you cover?",
    a: "Secondary math and O-Level (E Math and A Math), Sec 1 to 4. A-Level math on request. If it's outside this, I'll tell you honestly at the enquiry stage.",
  },
  {
    q: "In person, online, or both — and which areas do you serve?",
    a: `${site.mode}. In-person coaching covers ${site.areasServed.split(";")[0].trim()}. Online works just as well for most students and opens up the rest of Singapore.`,
  },
  {
    q: "How is billing handled — hourly or a package?",
    a: "Billed by the hour at the end of each month, not in packages — so you're never committing to a block up front. The hourly rate is stated plainly in the coaching section above.",
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
