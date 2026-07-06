import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TrackedLink } from "@/components/TrackedLink";
import { UnderlineMark, CircleMark } from "@/components/Marks";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="graph-bg absolute inset-0" aria-hidden />
      <Container className="relative grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-20">
        {/* ── Message ─────────────────────────────────────────────── */}
        <div>
          <p className="eyebrow flex items-center gap-2">
            <span aria-hidden className="inline-block h-px w-6 bg-mark" />
            {copy.hero.eyebrow}
          </p>

          <h1 className="mt-6 font-serif text-[clamp(2.4rem,6.2vw,4.15rem)] font-medium leading-[1.03]">
            Your child doesn&rsquo;t need{" "}
            <span className="whitespace-nowrap text-ink-soft line-through decoration-mark decoration-[3px]">
              more tuition.
            </span>{" "}
            They need the{" "}
            <span className="relative inline-block whitespace-nowrap">
              right diagnosis.
              <UnderlineMark className="-bottom-2 left-0 h-3 w-full overflow-visible" />
            </span>
          </h1>

          <p className="measure mt-7 text-lg leading-relaxed text-ink-soft">
            {copy.hero.subhead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton label={copy.hero.primaryCta} context="hero" />
            <TrackedLink
              event="cta_secondary_click"
              href="#coaching"
              className="group inline-flex items-center justify-center gap-1.5 px-2 py-3 text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
            >
              {copy.hero.secondaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </TrackedLink>
          </div>

          {/* Trust strip */}
          <dl className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6 text-sm text-ink-soft">
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Tutor</dt>
              <dd>
                Run by{" "}
                <span className="font-medium text-ink">{site.tutorName}</span>
              </dd>
            </div>
            <span aria-hidden className="h-4 w-px bg-line" />
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Experience</dt>
              <dd>
                <span className="nums text-ink">{site.stats.yearsTutoring}</span>{" "}
                years coaching
              </dd>
            </div>
            <span aria-hidden className="h-4 w-px bg-line" />
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Students taught</dt>
              <dd>
                <span className="nums text-ink">{site.stats.pastStudents}+</span>{" "}
                students taught
              </dd>
            </div>
          </dl>
        </div>

        {/* ── Diagnostic vignette (the signature) ─────────────────── *
         * Four different-looking topics, one shared slip. The claim
         * a tuition centre can't make: pattern over instance.        */}
        <figure
          aria-label={copy.hero.diagnostic.ariaLabel}
          className="relative mx-auto w-full max-w-lg lg:mx-0"
        >
          <div className="rounded-xl border border-line bg-white/70 p-4 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_40px_-24px_rgba(26,25,23,0.35)] backdrop-blur-[2px] sm:p-7">
            <figcaption className="eyebrow mb-5 flex items-center justify-between sm:mb-6">
              <span>{copy.hero.diagnostic.eyebrow}</span>
              <span aria-hidden className="text-mark">
                ✎
              </span>
            </figcaption>

            {/* The convergence: 4 corners → 1 node */}
            <div className="relative aspect-[5/4] sm:aspect-[7/5]">
              {/* Leader lines. Behind the panels, covered at the centre by the node. */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="annotate pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  d="M 22 32 Q 38 42, 50 50"
                  stroke="var(--color-mark)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 78 32 Q 62 42, 50 50"
                  stroke="var(--color-mark)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 22 62 Q 38 56, 50 50"
                  stroke="var(--color-mark)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 78 62 Q 62 56, 50 50"
                  stroke="var(--color-mark)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Four panels anchored to the four corners */}
              <div className="relative grid h-full grid-cols-2 grid-rows-2">
                {copy.hero.diagnostic.panels.map((panel, i) => {
                  const isRight = i % 2 === 1;
                  const isBottom = i >= 2;
                  const anchor = cn(
                    isRight
                      ? "justify-self-end text-right"
                      : "justify-self-start text-left",
                    isBottom ? "self-end" : "self-start",
                  );
                  return (
                    <article
                      key={panel.topic}
                      className={cn("max-w-[10rem] sm:max-w-[12rem]", anchor)}
                    >
                      <p className="eyebrow mb-1 text-[0.56rem] sm:mb-1.5 sm:text-[0.62rem]">
                        {panel.topic}
                      </p>
                      <div className="nums space-y-0.5 text-[0.7rem] leading-relaxed text-ink sm:text-[0.82rem]">
                        {panel.pre.map((line, j) => (
                          <p key={j}>{line}</p>
                        ))}
                        <p className="pt-0.5">
                          <span className="relative inline-block">
                            {panel.answer}
                            <CircleMark className="-inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)] sm:-inset-x-3 sm:-inset-y-1.5 sm:h-[calc(100%+12px)] sm:w-[calc(100%+24px)]" />
                          </span>
                        </p>
                        <p className="mt-1.5 font-sans text-[0.6rem] italic leading-tight text-mark sm:mt-2 sm:text-[0.68rem]">
                          {panel.error}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Centre node — the diagnostic conclusion */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-2xl border border-line bg-paper px-3.5 py-2 shadow-[0_1px_2px_rgba(26,25,23,0.06),0_8px_20px_-8px_rgba(26,25,23,0.2)] sm:px-4 sm:py-2.5">
                  <span className="block max-w-[8.5rem] text-balance text-center font-serif text-[0.75rem] italic leading-snug text-ink sm:max-w-[10.5rem] sm:text-[0.85rem]">
                    {copy.hero.diagnostic.nodeLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 px-1 text-[0.92rem] leading-relaxed text-ink-soft">
            {copy.hero.diagnostic.caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
