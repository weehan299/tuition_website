import { copy } from "@/content/copy";
import { testimonials } from "@/content/testimonials";
import { Container, Eyebrow } from "@/components/ui";
import { ResultBadge } from "@/components/ResultBadge";

const wall = testimonials.filter((t) => t.kind === "short");

// TODO: replace with the real schools your past students attend, or delete
// this strip if you'd rather not list them.
const schools = [
  "Victoria School",
  "Cedar Girls'",
  "Temasek Sec",
  "St. Andrew's",
  "Tanjong Katong",
];

export function SocialProof() {
  return (
    <section id="proof" className="scroll-mt-20 border-t border-line bg-paper-2/50 py-20 sm:py-28">
      <Container>
        <Eyebrow>{copy.socialProof.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-tight sm:text-[2.6rem]">
          {copy.socialProof.heading}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wall.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-line bg-paper p-6"
            >
              {t.result ? (
                <ResultBadge from={t.result.from} to={t.result.to} />
              ) : null}
              <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-sm text-ink-soft">
                <span className="font-medium text-ink">{t.name}</span> ·{" "}
                {t.level}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="eyebrow">Students have come from</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
            {schools.map((s) => (
              <li key={s} className="text-[0.95rem]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
