"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  enquirySchema,
  fieldErrors,
  LEVELS,
  type EnquiryInput,
} from "@/lib/validation";
import { track } from "@/lib/analytics";
import { copy } from "@/content/copy";
import { whatsappLink, whatsappPrefill } from "@/content/site";
import { Tick } from "@/components/Marks";
import { Turnstile } from "@/components/Turnstile";
import { cn } from "@/lib/cn";

type Values = {
  parentName: string;
  contact: string;
  email: string;
  level: string;
  grade: string;
  issue: string;
  schedule: string;
  heardFrom: string;
  consent: boolean;
};

const EMPTY: Values = {
  parentName: "",
  contact: "",
  email: "",
  level: "",
  grade: "",
  issue: "",
  schedule: "",
  heardFrom: "",
  consent: false,
};

const inputClass =
  "w-full rounded-md border bg-paper px-3.5 py-2.5 text-ink outline-none placeholder:text-ink-soft/50 focus-visible:border-green focus-visible:ring-2 focus-visible:ring-green/20";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EnquiryForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const onToken = useCallback((t: string | null) => setToken(t), []);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    if (SITE_KEY && !token) {
      setServerError("Please complete the verification below.");
      return;
    }

    const honeypot =
      (
        e.currentTarget.elements.namedItem("company") as HTMLInputElement | null
      )?.value ?? "";

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(parsed.data as EnquiryInput),
          honeypot,
          turnstileToken: token,
        }),
      });

      if (res.ok) {
        track.enquirySubmit({ level: values.level });
        setStatus("success");
        return;
      }

      if (res.status === 422) {
        const body = (await res.json().catch(() => ({}))) as {
          errors?: Record<string, string>;
        };
        setErrors(body.errors ?? {});
        setStatus("error");
        setServerError("Please fix the highlighted fields and resend.");
        return;
      }

      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus("error");
      setServerError(
        body.error ?? "Something went wrong. Please try again or use WhatsApp.",
      );
    } catch {
      setStatus("error");
      setServerError(
        "Couldn't reach the server. Please try again, or message us on WhatsApp.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green/30 bg-green-tint p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green">
          <Tick className="h-6 w-6 text-paper" />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-ink">
          Thank you — your enquiry is in.
        </h3>
        <p className="mt-3 text-ink-soft">{copy.enquiry.expectation}</p>
        <p className="mt-4 text-sm text-ink-soft">
          Prefer to chat now?{" "}
          <a
            href={whatsappLink(whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green underline underline-offset-4"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-line bg-paper p-6 sm:p-7"
    >
      <h3 className="font-serif text-xl text-ink">{copy.enquiry.formHeading}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          name="parentName"
          required
          error={errors.parentName}
          value={values.parentName}
          onChange={(v) => update("parentName", v)}
          autoComplete="name"
        />
        <Field
          label="Contact (WhatsApp preferred)"
          name="contact"
          required
          error={errors.contact}
          value={values.contact}
          onChange={(v) => update("contact", v)}
          inputMode="tel"
          autoComplete="tel"
        />
        <Field
          label="Email"
          name="email"
          optional
          error={errors.email}
          value={values.email}
          onChange={(v) => update("email", v)}
          inputMode="email"
          autoComplete="email"
          hint="For a confirmation email."
        />
        <div>
          <FieldLabel htmlFor="level" label="Student's level" required />
          <select
            id="level"
            name="level"
            value={values.level}
            onChange={(e) => update("level", e.target.value)}
            aria-invalid={!!errors.level}
            aria-describedby={errors.level ? "level-error" : undefined}
            className={cn(inputClass, errors.level ? "border-mark" : "border-line")}
          >
            <option value="">Select…</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <FieldError id="level-error" message={errors.level} />
        </div>
        <Field
          label="Current math grade"
          name="grade"
          required
          error={errors.grade}
          value={values.grade}
          onChange={(v) => update("grade", v)}
          placeholder="e.g. B4, or 62%"
        />
        <Field
          label="Preferred schedule"
          name="schedule"
          optional
          error={errors.schedule}
          value={values.schedule}
          onChange={(v) => update("schedule", v)}
          placeholder="e.g. weekday evenings"
        />
      </div>

      <div className="mt-4">
        <FieldLabel htmlFor="issue" label="Main issue or goal" required />
        <textarea
          id="issue"
          name="issue"
          rows={4}
          value={values.issue}
          onChange={(e) => update("issue", e.target.value)}
          aria-invalid={!!errors.issue}
          aria-describedby={errors.issue ? "issue-error" : undefined}
          placeholder="What's the biggest struggle right now?"
          className={cn(inputClass, errors.issue ? "border-mark" : "border-line")}
        />
        <FieldError id="issue-error" message={errors.issue} />
      </div>

      <div className="mt-4">
        <Field
          label="How did you hear about us?"
          name="heardFrom"
          optional
          error={errors.heardFrom}
          value={values.heardFrom}
          onChange={(v) => update("heardFrom", v)}
        />
      </div>

      {/* Honeypot — hidden from users, must stay empty. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* PDPA consent */}
      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-green"
          />
          <span>
            I consent to {`Weehan Math Tuition`} using these details to respond
            to my enquiry, in line with the{" "}
            <a
              href="/privacy"
              className="text-green underline underline-offset-2"
            >
              privacy policy
            </a>
            . (PDPA)
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      {SITE_KEY ? (
        <div className="mt-5">
          <Turnstile siteKey={SITE_KEY} onToken={onToken} />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green px-5 py-3 font-medium text-paper transition-colors hover:bg-green-deep disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </button>

      {serverError ? (
        <p role="alert" className="mt-3 text-sm text-mark">
          {serverError}
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        {copy.enquiry.expectation}
      </p>
    </form>
  );
}

/* ── Small field helpers ─────────────────────────────────────────────── */

function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
  hint,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {label}
      {required ? <span className="text-mark"> *</span> : null}
      {optional ? (
        <span className="font-normal text-ink-soft"> (optional)</span>
      ) : null}
      {hint ? (
        <span className="block text-xs font-normal text-ink-soft">{hint}</span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-mark">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  required,
  optional,
  placeholder,
  hint,
  inputMode,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  hint?: string;
  inputMode?: "tel" | "email" | "text";
  autoComplete?: string;
}) {
  return (
    <div>
      <FieldLabel
        htmlFor={name}
        label={label}
        required={required}
        optional={optional}
        hint={hint}
      />
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(inputClass, error ? "border-mark" : "border-line")}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}
