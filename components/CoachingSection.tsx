import { site } from "@/content/site";
import { copy, failureModes } from "@/content/copy";
import { testimonials } from "@/content/testimonials";
import { Container, Eyebrow } from "@/components/ui";
import { Tick } from "@/components/Marks";
import { ResultBadge } from "@/components/ResultBadge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/cn";

const caseStudies = testimonials.filter((t) => t.kind === "case-study");

/** One row of the 6-step ledger. Numbering is meaningful here — the brief
 *  mandates this exact order, so the sequence carries real information. */
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
      <div className={cn("pb-12", !last && "border-b border-line")}>
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
      className="scroll-mt-20 border-t border-line bg-paper-2/50 py-20 sm:py-28"
    >
      <Container>
        <Eyebrow>{copy.coaching.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight sm:text-[2.7rem]">
          {copy.coaching.heading}
        </h2>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft">
          {copy.coaching.intro}
        </p>

        <ol className="mt-16 space-y-12">
          {/* 1 ─ Identify */}
          <Step n="01" label="Identify" title="Start from the exact problem, not a vague one">
            <p className="text-ink-soft">
              These are the patterns this service is built for:
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {failureModes.map((mode, i) => (
                <li key={mode} className="flex gap-3 text-[1.02rem]">
                  <span aria-hidden className="nums mt-1 text-xs text-mark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink">{mode}</span>
                </li>
              ))}
            </ul>
            <p className="measure mt-5 text-ink-soft">
              If none of it sounds familiar, we&rsquo;re probably not the right
              fit — and saying so early is part of the job.
            </p>
          </Step>

          {/* 2 ─ Approach */}
          <Step n="02" label="Method" title={copy.coaching.step2.title}>
            <p className="text-ink-soft">{copy.coaching.step2.lead}</p>
            <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {copy.coaching.step2.points.map((pt) => (
                <div key={pt.k}>
                  <dt className="font-medium text-ink">{pt.k}</dt>
                  <dd className="mt-1 text-ink-soft">{pt.v}</dd>
                </div>
              ))}
            </dl>
          </Step>

          {/* 3 ─ Evidence */}
          <Step n="03" label="Evidence" title={copy.coaching.step3.title}>
            <p className="text-ink-soft">{copy.coaching.step3.lead}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {caseStudies.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-xl border border-line bg-paper p-5"
                >
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

          {/* 4 ─ What's included */}
          <Step n="04" label="Included" title={copy.coaching.step4.title}>
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {copy.coaching.step4.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Tick className="mt-0.5 h-5 w-5 text-green" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Step>

          {/* 5 ─ Rate. Stated once, unqualified. */}
          <Step n="05" label="Rate" title={copy.coaching.step5.title}>
            <p className="text-ink">
              <span className="nums text-5xl font-medium sm:text-6xl">$140</span>{" "}
              <span className="text-xl text-ink-soft">per session</span>
            </p>
            <p className="mt-4 text-ink-soft">{copy.coaching.step5.clarifier}</p>
          </Step>

          {/* 6 ─ Invite */}
          <Step n="06" label="Fit" title={copy.coaching.step6.title} last>
            <p className="measure text-ink-soft">{copy.coaching.step6.body}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                label={copy.coaching.step6.cta}
                context="coaching-step6"
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
