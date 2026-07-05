import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { Container, Eyebrow } from "@/components/ui";
import { Tick } from "@/components/Marks";

const initials = site.tutorName
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        {/* Headshot slot — replace with a real photo.
            Swap this block for:
              <Image src="/tutor.jpg" alt="{site.tutorName}" width={640} height={800}
                     className="aspect-[4/5] w-full rounded-xl object-cover" /> */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-paper-2">
            <div className="graph-bg absolute inset-0 opacity-40" aria-hidden />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-serif text-7xl text-ink/60">{initials}</span>
              <span className="eyebrow">Add headshot</span>
            </div>
          </div>
          <p className="nums mt-3 text-xs text-ink-soft">
            /public/tutor.jpg · use next/image
          </p>
        </div>

        <div>
          <Eyebrow>{copy.about.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-tight sm:text-[2.6rem]">
            {copy.about.heading}
          </h2>
          <div className="measure mt-7 space-y-4 text-lg leading-relaxed text-ink-soft">
            {copy.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 className="eyebrow mt-10">The specifics</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.about.credentials.map((c) => (
              <li key={c} className="flex gap-3">
                <Tick className="mt-0.5 h-5 w-5 text-green" />
                <span className="text-ink">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
