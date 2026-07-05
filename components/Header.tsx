"use client";

import { useEffect, useState } from "react";
import { Check, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#coaching", label: "How it works" },
  { href: "#proof", label: "Results" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // Reveal the mobile WhatsApp bar after the hero, hide it near the footer so
  // it never covers the PDPA/contact links.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        y + window.innerHeight > document.documentElement.scrollHeight - 240;
      setShowBar(y > 560 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="flex items-baseline gap-2"
            aria-label={`${site.brandName} — home`}
          >
            <span className="flex items-center gap-1.5">
              <Check
                className="h-4 w-4 text-green"
                strokeWidth={3}
                aria-hidden
              />
              <span className="font-serif text-xl font-medium tracking-tight text-ink">
                Weehan
              </span>
            </span>
            <span className="eyebrow hidden sm:inline">Math Tuition</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enquire"
              className="rounded-md bg-green px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-green-deep"
            >
              Enquire
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-line bg-paper md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[0.95rem] text-ink hover:bg-ink/[0.04]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#enquire"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-green px-2 py-2.5 text-center text-[0.95rem] font-medium text-paper"
            >
              Enquire about a slot
            </a>
          </Container>
        </div>
      </header>

      {/* Sticky mobile WhatsApp CTA — reveals after the hero */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden",
          showBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <WhatsAppButton
          label="Enquire about a slot"
          context="sticky-bar"
          className="w-full"
        />
      </div>
    </>
  );
}
