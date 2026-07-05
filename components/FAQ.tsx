"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { copy } from "@/content/copy";
import { Container, Eyebrow } from "@/components/ui";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function FAQ() {
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
    <section id="faq" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <Eyebrow>{copy.faq.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-tight sm:text-[2.6rem]">
          {copy.faq.heading}
        </h2>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
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
      </Container>
    </section>
  );
}
