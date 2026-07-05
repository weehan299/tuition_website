import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.brandName} collects, uses, and protects your personal data under Singapore's PDPA.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

// TODO: have this reviewed against your actual data flow before launch.
export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line">
        <Container className="flex h-16 items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to {site.brandName}
          </Link>
        </Container>
      </header>

      <main id="main" className="py-16 sm:py-20">
        <Container className="measure">
          <p className="eyebrow">PDPA</p>
          <h1 className="mt-4 font-serif text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ink-soft">
            Last updated: {new Date().getFullYear()}
          </p>

          <div className="mt-10 space-y-8 leading-relaxed text-ink-soft [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ink [&_p]:mt-2">
            <section>
              <h2>Who we are</h2>
              <p>
                {site.brandName} (&ldquo;we&rdquo;) provides 1-to-1 math coaching
                in Singapore. For any privacy question, contact us at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-green underline underline-offset-2"
                >
                  {site.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2>What we collect</h2>
              <p>
                When you submit an enquiry we collect the details you provide:
                your name, contact number, email (if given), the student&rsquo;s
                level and current grade, the issue or goal you describe, and any
                scheduling or referral notes. We do not collect payment details
                through this site.
              </p>
            </section>

            <section>
              <h2>Why we collect it</h2>
              <p>
                Solely to respond to your enquiry, arrange a short fit call, and
                assess whether the coaching suits your child. We do not use it
                for unrelated marketing without your consent.
              </p>
            </section>

            <section>
              <h2>How it is stored and shared</h2>
              <p>
                Enquiry details are sent securely to our lead store and email
                provider so we can follow up. We do not sell your data or share
                it with third parties beyond the tools needed to contact you.
                Access is limited to {site.tutorName}.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                We retain enquiry data only as long as needed to follow up and,
                if you become a student, for the duration of coaching. You may
                ask us to delete it at any time.
              </p>
            </section>

            <section>
              <h2>Your rights under the PDPA</h2>
              <p>
                You may request access to, correction of, or deletion of your
                personal data, and you may withdraw consent, by emailing{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-green underline underline-offset-2"
                >
                  {site.email}
                </a>
                . We will respond within a reasonable time.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
