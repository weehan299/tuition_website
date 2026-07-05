import { copy, failureModes } from "@/content/copy";
import { Container, Eyebrow } from "@/components/ui";

export function ProblemSection() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <Eyebrow>{copy.problem.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight sm:text-[2.6rem]">
          {copy.problem.heading}
        </h2>
        <div className="measure mt-7 space-y-4 text-lg leading-relaxed text-ink-soft">
          {copy.problem.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <ul className="mt-11 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {failureModes.map((mode, i) => (
            <li key={mode} className="flex gap-4 bg-paper p-5 sm:p-6">
              <span
                aria-hidden
                className="nums mt-0.5 text-sm text-mark"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.02rem] leading-relaxed text-ink">{mode}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
