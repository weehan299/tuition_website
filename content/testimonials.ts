/**
 * Testimonials. TODO: replace all of these with real, attributed quotes before
 * launch — at least 2–3 "case-study" ones speaking to method and transformation.
 * The brief requires real attribution; avoid generic "great teacher" lines.
 *
 *  kind: "case-study" → shown as evidence inside the coaching section (Step 2)
 *  kind: "short"      → shown in the Social Proof wall
 *  result (optional)  → a { from, to } grade jump, rendered as a marked uplift
 *  echoes (optional)  → ties a case study back to a numbered symptom from the
 *                       Problem section (failureModes). `n` must match that
 *                       list's 1-based index, padded to two digits, so the card
 *                       reads as the *resolution* of a stated pattern, not a
 *                       re-listing of it. Case studies only.
 */

export type Testimonial = {
  quote: string;
  name: string;
  level: string;
  kind: "case-study" | "short";
  result?: { from: string; to: string };
  echoes?: { n: string; label: string };
};

export const testimonials: Testimonial[] = [
  {
    kind: "case-study",
    quote:
      "The diagnostic found that my son's whole problem was one habit in his algebra working. Six weeks later the “careless” mistakes were just gone. It was never carelessness.",
    name: "Mrs Lim",
    level: "Parent of Sec 3 student",
    result: { from: "C6", to: "A1" },
    echoes: { n: "02", label: "the silly mistakes that kept coming back" },
  },
  {
    kind: "case-study",
    quote:
      "She'd been stuck at a B for over a year. What changed wasn't more papers — it was finally understanding why she kept losing the same marks in trigonometry.",
    name: "Mr Tan",
    level: "Parent of Sec 4 student",
    result: { from: "B4", to: "A2" },
    echoes: { n: "04", label: "stuck at a B, term after term" },
  },
  {
    kind: "case-study",
    quote:
      "I actually understand what I'm doing now instead of copying a method. When a question looks different I can still start it.",
    name: "Rachel",
    level: "Sec 4 student",
    echoes: { n: "01", label: "got it in class, lost it alone" },
  },
  {
    kind: "short",
    quote:
      "Every lesson was clearly planned for exactly what he needed that week. Nothing felt generic.",
    name: "Mrs Chua",
    level: "Parent of Sec 2 student",
  },
  {
    kind: "short",
    quote:
      "The termly updates meant I always knew what was being worked on and why. That transparency was rare.",
    name: "Mr Fernandez",
    level: "Parent of Sec 3 student",
  },
  {
    kind: "short",
    quote:
      "Went in dreading A Math and came out treating it like a subject I could actually control.",
    name: "Daniel",
    level: "O-Level student",
    result: { from: "C5", to: "A1" },
  },
];
