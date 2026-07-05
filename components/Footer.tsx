import { Check, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { TrackedLink } from "@/components/TrackedLink";
import { Container } from "@/components/ui";

const socialLinks = Object.entries(site.socials).filter(([, url]) => url);

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green" strokeWidth={3} aria-hidden />
              <span className="font-serif text-xl font-medium text-ink">
                {site.brandName}
              </span>
            </div>
            <p className="measure mt-3 text-sm leading-relaxed text-ink-soft">
              Diagnostic-led 1-to-1 math coaching for secondary students. We find
              the exact reason a grade is stuck — and fix it.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-ink hover:text-green"
                >
                  <MessageCircle className="h-4 w-4 text-ink-soft" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <TrackedLink
                  event="phone_click"
                  href={`tel:${site.phoneE164}`}
                  className="inline-flex items-center gap-2.5 text-ink hover:text-green"
                >
                  <Phone className="h-4 w-4 text-ink-soft" aria-hidden />
                  {site.phoneDisplay}
                </TrackedLink>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-ink hover:text-green"
                >
                  <Mail className="h-4 w-4 text-ink-soft" aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Coverage + legal */}
          <div>
            <p className="eyebrow">Where</p>
            <p className="mt-4 flex items-start gap-2.5 text-[0.95rem] text-ink">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" aria-hidden />
              <span>{site.areasServed}</span>
            </p>
            <ul className="mt-5 space-y-2 text-[0.95rem]">
              <li>
                <a
                  href="/privacy"
                  className="text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                >
                  Privacy policy (PDPA)
                </a>
              </li>
              {socialLinks.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft capitalize underline-offset-4 hover:text-ink hover:underline"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brandName}
          </p>
          <p>Run by {site.tutorName} · Singapore</p>
        </div>
      </Container>
    </footer>
  );
}
