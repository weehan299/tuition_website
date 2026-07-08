"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  // Track which items are open (multiple allowed). Fire faq_open on expand.
  const [open, setOpen] = useState<Record<number, boolean>>({});

  function toggle(i: number, question: string) {
    setOpen((prev) => {
      const next = { ...prev, [i]: !prev[i] };
      if (next[i]) track.faqOpen(question);
      return next;
    });
  }

  return (
    <ul className="mt-10 divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = !!open[i];
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                onClick={() => toggle(i, item.q)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
              >
                <span className="text-[1.1rem] font-medium text-ink">
                  {item.q}
                </span>
                <Plus
                  aria-hidden
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 text-green transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="measure pb-6 text-[1.02rem] leading-relaxed text-ink-soft"
            >
              {item.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
