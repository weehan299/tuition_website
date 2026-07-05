import { MessageCircle, Phone, Mail } from "lucide-react";
import { site, whatsappLink, whatsappPrefill } from "@/content/site";
import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TrackedLink } from "@/components/TrackedLink";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Container, Eyebrow } from "@/components/ui";

export function EnquirySection() {
  return (
    <section id="enquire" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — the three contact paths */}
        <div>
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-[2.6rem]">
            {copy.enquiry.heading}
          </h2>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-soft">
            {copy.enquiry.sub}
          </p>

          <div className="mt-8">
            <WhatsAppButton
              label="Chat on WhatsApp"
              message={whatsappPrefill}
              context="enquiry-section"
              className="w-full sm:w-auto"
            />
          </div>

          <dl className="mt-6 space-y-3 text-[0.98rem]">
            <div className="flex items-center gap-3">
              <dt className="text-ink-soft">
                <Phone className="h-4 w-4" aria-hidden />
                <span className="sr-only">Phone</span>
              </dt>
              <dd>
                <TrackedLink
                  event="phone_click"
                  href={`tel:${site.phoneE164}`}
                  className="text-ink hover:text-green"
                >
                  {site.phoneDisplay}
                </TrackedLink>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-soft">
                <Mail className="h-4 w-4" aria-hidden />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink hover:text-green"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-soft">
                <MessageCircle className="h-4 w-4" aria-hidden />
                <span className="sr-only">WhatsApp</span>
              </dt>
              <dd>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-green"
                >
                  wa.me/{site.whatsappNumber}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-8 rounded-lg border border-line bg-paper-2/60 p-4 text-sm leading-relaxed text-ink-soft">
            {copy.enquiry.expectation}
          </p>
        </div>

        {/* Right — the form */}
        <div>
          <EnquiryForm />
        </div>
      </Container>
    </section>
  );
}
