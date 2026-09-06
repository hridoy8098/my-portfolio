"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ContactSettings } from "@/types/site";

type Status = "idle" | "loading" | "sent" | "error";
type FieldName = "name" | "email" | "subject" | "message";
type Values = Record<FieldName, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues: Values = { name: "", email: "", subject: "", message: "" };

export default function ContactForm({ labels }: { labels: ContactSettings }) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const fieldLabels: Record<FieldName, string> = {
    name: labels.name_label,
    email: labels.email_label,
    subject: labels.subject_label,
    message: labels.message_label,
  };

  const placeholders: Record<FieldName, string> = {
    name: labels.name_placeholder,
    email: labels.email_placeholder,
    subject: labels.subject_placeholder,
    message: labels.message_placeholder,
  };

  function validate(valuesToCheck: Values): Partial<Record<FieldName, string>> {
    const next: Partial<Record<FieldName, string>> = {};
    const t = labels.fieldErrorRequired ?? {};

    if (!valuesToCheck.name.trim()) {
      next.name = t.name_required ?? "Please enter your name.";
    } else if (valuesToCheck.name.trim().length < 2) {
      next.name = t.name_min ?? "Name must be at least 2 characters.";
    }

    if (!valuesToCheck.email.trim()) {
      next.email = t.email_required ?? "Please enter your email.";
    } else if (!EMAIL_PATTERN.test(valuesToCheck.email.trim())) {
      next.email = t.email_invalid ?? "Please enter a valid email address.";
    }

    if (!valuesToCheck.subject.trim()) {
      next.subject = t.subject_required ?? "Please add a subject.";
    } else if (valuesToCheck.subject.trim().length < 3) {
      next.subject = t.subject_min ?? "Subject must be at least 3 characters.";
    }

    if (!valuesToCheck.message.trim()) {
      next.message = t.message_required ?? "Please write a message.";
    } else if (valuesToCheck.message.trim().length < 10) {
      next.message = t.message_min ?? "Message must be at least 10 characters.";
    }

    return next;
  }

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (field: FieldName) =>
    cn(
      "w-full rounded-[4px] border px-3 py-2.5 text-body transition-colors focus:outline-none",
      errors[field]
        ? "border-danger bg-danger/[0.03] focus:border-danger"
        : "border-gray-300 focus:border-accent"
    );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        suppressHydrationWarning
        className="hidden"
      />
      {status === "error" && (
        <div className="mb-4 rounded-[4px] bg-danger p-[15px] text-left font-semibold text-white">
          {labels.error_message}
        </div>
      )}
      {status === "sent" && (
        <div className="mb-4 rounded-[4px] bg-success p-[15px] text-center font-semibold text-white">
          {labels.success_message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm" htmlFor="contact-name">
            {fieldLabels.name} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            suppressHydrationWarning
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={placeholders.name}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="mt-1 text-[13px] text-danger">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm" htmlFor="contact-email">
            {fieldLabels.email} <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            suppressHydrationWarning
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={placeholders.email}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-[13px] text-danger">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm" htmlFor="contact-subject">
            {fieldLabels.subject} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            suppressHydrationWarning
            value={values.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            placeholder={placeholders.subject}
            className={inputClass("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-[13px] text-danger">{errors.subject}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm" htmlFor="contact-message">
            {fieldLabels.message} <span className="text-danger">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            suppressHydrationWarning
            value={values.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder={placeholders.message}
            className={inputClass("message")}
          />
          {errors.message && (
            <p className="mt-1 text-[13px] text-danger">{errors.message}</p>
          )}
        </div>

        <div className="text-center md:col-span-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "inline-flex items-center gap-2 rounded-[50px] border-none px-7 py-3 font-nav text-sm font-semibold text-white transition-colors",
              status === "loading"
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:bg-accent-dark"
            )}
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {status === "loading" ? (
              <>
                <i className="bi bi-arrow-repeat animate-spin" />
                {labels.sending_label}
              </>
            ) : (
              <>
                <i className="bi bi-send" />
                {labels.submit_label}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}