/**
 * Testimonials. TODO: replace all of these with real, attributed quotes before
 * launch — at least 2–3 "case-study" ones speaking to method and transformation.
 * The brief requires real attribution; avoid generic "great teacher" lines.
 *
 *  kind: "case-study" → shown as evidence inside the coaching section (Step 3)
 *  kind: "short"      → shown in the Social Proof wall
 *  result (optional)  → a { from, to } grade jump, rendered as a marked uplift
 */

export type Testimonial = {
  quote: string;
  name: string;
  level: string;
  kind: "case-study" | "short";
  result?: { from: string; to: string };
};

export const testimonials: Testimonial[] = [
  {
    kind: "case-study",
    quote:
      "The diagnostic found that my son's whole problem was one habit in his algebra working. Six weeks later the “careless” mistakes were just gone. It was never carelessness.",
    name: "Mrs Lim",
    level: "Parent of Sec 3 student",
    result: { from: "C6", to: "A1" },
  },
  {
    kind: "case-study",
    quote:
      "She'd been stuck at a B for over a year. What changed wasn't more papers — it was finally understanding why she kept losing the same marks in trigonometry.",
    name: "Mr Tan",
    level: "Parent of Sec 4 student",
    result: { from: "B4", to: "A2" },
  },
  {
    kind: "case-study",
    quote:
      "I actually understand what I'm doing now instead of copying a method. When a question looks different I can still start it.",
    name: "Rachel",
    level: "Sec 4 student",
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
