/**
 * Small presentational primitives shared across sections. Server components —
 * no interactivity here, so they add zero client JS.
 */
import { cn } from "@/lib/cn";

/** Centered content column. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Mono, tracked section label — the marking-sheet eyebrow. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-2", className)}>
      <span aria-hidden className="inline-block h-px w-6 bg-mark" />
      {children}
    </p>
  );
}

/** Button/link styles. Used by both <a> anchors and the WhatsApp CTA. */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-green px-5 py-3 text-[0.95rem] font-medium text-paper shadow-sm transition-colors hover:bg-green-deep";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-md border border-ink/15 bg-transparent px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink/45 hover:bg-ink/[0.03]";

/** Primary button rendered on a dark (green) band. */
export const btnOnDark =
  "inline-flex items-center justify-center gap-2 rounded-md bg-paper px-5 py-3 text-[0.95rem] font-medium text-green shadow-sm transition-colors hover:bg-white";
