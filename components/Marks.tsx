/**
 * Hand-drawn marking annotations — the brand's signature gesture.
 * Red pen circles/strikes the problem; green marks the fix. Pure SVG (no JS);
 * the `.annotate` class draws them on load and respects reduced-motion.
 */
import { cn } from "@/lib/cn";

/** Loose red pen circle. Stretches to cover the element it's positioned over. */
export function CircleMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 64"
      fill="none"
      preserveAspectRatio="none"
      className={cn("annotate pointer-events-none absolute", className)}
    >
      <path
        d="M32 6 C 12 8, 3 30, 17 47 C 31 63, 82 62, 103 46 C 119 34, 112 12, 86 6 C 60 0, 38 3, 22 12"
        stroke="var(--color-mark)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Green pen underline — the "fixed" gesture. */
export function UnderlineMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 16"
      fill="none"
      preserveAspectRatio="none"
      className={cn("annotate pointer-events-none absolute", className)}
    >
      <path
        d="M4 10 C 54 3, 150 3, 196 9"
        stroke="var(--color-green)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small green hand-drawn tick, for "what's included" and results. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
    >
      <path
        d="M4 13 L10 19 L20 5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
