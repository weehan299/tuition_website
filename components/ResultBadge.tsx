import { ArrowRight } from "lucide-react";

/** A grade jump shown as the brand's mark→fix gesture: the old grade struck
 *  in red, the new grade in green. */
export function ResultBadge({ from, to }: { from: string; to: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 text-sm">
      <span className="nums text-ink-soft line-through decoration-mark decoration-2">
        {from}
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-ink-soft" aria-hidden />
      <span className="nums font-medium text-green">{to}</span>
    </span>
  );
}
