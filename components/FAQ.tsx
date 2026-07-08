import Link from "next/link";
import { faq } from "@/content/faq";
import { copy } from "@/content/copy";
import { Container, Eyebrow } from "@/components/ui";
import { FaqAccordion } from "@/components/FaqAccordion";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <Container>
        <Eyebrow>{copy.faq.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-tight sm:text-[2.6rem]">
          {copy.faq.heading}
        </h2>

        <FaqAccordion items={faq.filter((item) => item.featured)} />

        <Link
          href="/faq"
          className="mt-8 inline-block text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
        >
          {copy.faqPage.seeAll} ({faq.length}) &rarr;
        </Link>
      </Container>
    </section>
  );
}
