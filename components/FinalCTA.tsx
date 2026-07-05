import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui";

export function FinalCTA() {
  return (
    <section className="bg-green text-paper">
      <Container className="py-20 text-center sm:py-24">
        <p className="mx-auto flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/70">
          <span aria-hidden className="inline-block h-px w-6 bg-paper/50" />
          {copy.finalCta.eyebrow}
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-3xl leading-tight text-paper sm:text-[2.9rem]">
          {copy.finalCta.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
          {copy.finalCta.body}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton variant="onDark" context="final-cta" />
          <a
            href="#enquire"
            className="inline-flex items-center justify-center px-3 py-3 text-[0.95rem] font-medium text-paper underline-offset-4 hover:underline"
          >
            Or send the form ↓
          </a>
        </div>
      </Container>
    </section>
  );
}
