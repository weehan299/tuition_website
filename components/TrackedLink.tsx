"use client";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/** An anchor that fires a single analytics event on click. */
export function TrackedLink({
  event,
  href,
  children,
  className,
  external,
  "aria-label": ariaLabel,
}: {
  event: AnalyticsEvent;
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => trackEvent(event)}
    >
      {children}
    </a>
  );
}
