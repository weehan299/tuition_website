import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { faq } from "@/content/faq";
import { copy } from "@/content/copy";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to the questions parents ask before enquiring about ${site.brandName}'s 1-to-1 math coaching.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Header />

      <main id="main" className="py-14 sm:py-20">
        <Container>
          <Eyebrow>{copy.faqPage.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight">
            {copy.faqPage.heading}
          </h1>

          <FaqAccordion items={faq} />

          <Link
            href="/#enquire"
            className="mt-8 inline-block text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
          >
            Still have a question? Enquire about a slot &rarr;
          </Link>
        </Container>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Footer />
    </>
  );
}
