"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink, whatsappPrefill } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { btnPrimary, btnGhost, btnOnDark } from "@/components/ui";

const VARIANTS = {
  primary: btnPrimary,
  ghost: btnGhost,
  onDark: btnOnDark,
} as const;

export function WhatsAppButton({
  label = "Enquire about a slot",
  message = whatsappPrefill,
  variant = "primary",
  context,
  className,
}: {
  label?: string;
  message?: string;
  variant?: keyof typeof VARIANTS;
  /** Where on the page the click happened — sent as an analytics prop. */
  context?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track.whatsappClick(context ? { context } : undefined)}
      className={cn(VARIANTS[variant], className)}
    >
      <MessageCircle className="h-[1.05rem] w-[1.05rem]" aria-hidden />
      {label}
    </a>
  );
}
