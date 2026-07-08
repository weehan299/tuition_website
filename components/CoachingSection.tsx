import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { testimonials } from "@/content/testimonials";
import { Container, Eyebrow } from "@/components/ui";
import { Tick } from "@/components/Marks";
import { ResultBadge } from "@/components/ResultBadge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";

const caseStudies = testimonials.filter((t) => t.kind === "case-study");

/** One block of the coaching walkthrough. The numbering encodes a real
 *  narrative order: how it works → proof → what's included → rate → next step. */
function Step({
  n,
  label,
  title,
  children,
  last = false,
}: {
  n: string;
  label: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:gap-10">
      <div className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1.5">
        <span className="nums text-3xl font-medium leading-none text-green">
          {n}
        </span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className={cn("min-w-0 pb-10", !last && "border-b border-line")}>
        <h3 className="font-serif text-2xl leading-snug sm:text-[1.7rem]">
          {title}
        </h3>
        <div className="mt-5">{children}</div>
      </div>
    </li>
  );
}

export function CoachingSection() {
  return (
    <section
      id="coaching"
      className="scroll-mt-20 border-t border-line bg-paper-2/50 py-14 sm:py-20"
    >
      <Container>
        <Eyebrow>{copy.coaching.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight sm:text-[2.7rem]">
          {copy.coaching.heading}
        </h2>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
          {copy.coaching.intro}
        </p>

        <ol className="mt-12 space-y-10">
          {/* 01 ─ The fix. Leads with the mechanism (a callback to the hero
              diagnostic), then the two remaining operational facts. */}
          <Step n="01" label="The fix" title={copy.coaching.method.title}>
            <p className="measure text-[1.05rem] leading-relaxed text-ink-soft">
              {copy.coaching.method.lead}
            </p>
            <ul className="mt-5 space-y-3">
              {copy.coaching.method.points.map((pt) => (
                <li key={pt.k} className="text-[1.05rem] leading-relaxed">
                  <span className="font-medium text-ink">{pt.k}</span>
                  <span className="text-ink-soft"> — {pt.v}</span>
                </li>
              ))}
            </ul>
          </Step>

          {/* 02 ─ Evidence */}
          <Step n="02" label="Evidence" title={copy.coaching.evidence.title}>
            <p className="text-ink-soft">{copy.coaching.evidence.lead}</p>
            {/* Mobile: full-bleed swipe row; sm+: the original grid */}
            <div
              role="region"
              aria-label="Case studies"
              tabIndex={0}
              className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0"
            >
              {caseStudies.map((t) => (
                <figure
                  key={t.name}
                  className="flex w-[82%] max-w-xs shrink-0 snap-start flex-col rounded-xl border border-line bg-paper p-5 sm:w-auto sm:max-w-none"
                >
                  {t.echoes ? (
                    <p className="eyebrow mb-3 !text-mark">
                      Pattern {t.echoes.n}{" "}
                      <span className="text-ink-soft">· {t.echoes.label}</span>
                    </p>
                  ) : null}
                  {t.result ? (
                    <ResultBadge from={t.result.from} to={t.result.to} />
                  ) : null}
                  <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-ink-soft">
                    <span className="font-medium text-ink">{t.name}</span> ·{" "}
                    {t.level}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Step>

          {/* 03 ─ What's included */}
          <Step n="03" label="Included" title={copy.coaching.included.title}>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {copy.coaching.included.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Tick className="mt-0.5 h-5 w-5 text-green" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Step>

          {/* 04 ─ Rate. Stated once, unqualified. */}
          <Step n="04" label="Rate" title={copy.coaching.rate.title}>
            <p className="text-ink">
              <span className="nums text-5xl font-medium sm:text-6xl">$140</span>{" "}
              <span className="text-xl text-ink-soft">per hour</span>
            </p>
            <p className="mt-4 text-ink-soft">{copy.coaching.rate.clarifier}</p>
          </Step>

          {/* 05 ─ Fit */}
          <Step n="05" label="Fit" title={copy.coaching.fit.title} last>
            <p className="measure text-ink-soft">{copy.coaching.fit.body}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                label={copy.coaching.fit.cta}
                context="coaching-fit"
              />
              <a
                href="#enquire"
                className="inline-flex items-center justify-center px-2 py-3 text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
              >
                Or send the enquiry form →
              </a>
            </div>
          </Step>
        </ol>

        <p className="mt-10 text-sm text-ink-soft">
          {site.mode}. {site.areasServed}.
        </p>
      </Container>
    </section>
  );
}
