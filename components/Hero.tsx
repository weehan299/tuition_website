import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TrackedLink } from "@/components/TrackedLink";
import { UnderlineMark, Tick } from "@/components/Marks";
import { Container } from "@/components/ui";

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

        {/* ── Diagnostic vignette (the signature) ─────────────────── */}
        <figure className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="rounded-xl border border-line bg-white/70 p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_40px_-24px_rgba(26,25,23,0.35)] backdrop-blur-[2px] sm:p-7">
            <figcaption className="eyebrow mb-5 flex items-center justify-between">
              <span>Diagnostic · Quadratics</span>
              <span aria-hidden className="text-mark">
                ✎
              </span>
            </figcaption>

            <div className="nums space-y-3 text-[0.98rem] leading-relaxed text-ink">
              <p>x² + 5x + 6 = 0</p>
              <p>(x + 2)(x + 3) = 0</p>
              <p className="flex items-center gap-3">
                <span className="decoration-mark line-through decoration-2">
                  x = 2,&nbsp; x = 3
                </span>
                <span className="text-[0.78rem] italic text-mark">
                  ← sign slipped
                </span>
              </p>

              <div className="my-1 flex items-center gap-3 pt-1">
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="eyebrow text-green">the fix</span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>

              <p className="flex items-center gap-3 font-medium">
                <Tick className="h-5 w-5 text-green" />
                <span>x = −2,&nbsp; x = −3</span>
              </p>
            </div>
          </div>
          <figcaption className="mt-4 px-1 text-[0.92rem] leading-relaxed text-ink-soft">
            We don&rsquo;t just mark it wrong. We find the exact line it broke —
            then make sure it never breaks again.
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
