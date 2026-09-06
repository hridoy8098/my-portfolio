"use client";

import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-[10px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3.5 py-2.5 text-sm text-[var(--admin-text)] outline-none transition placeholder:text-[var(--admin-text-soft)] focus:border-[var(--admin-accent)] focus:ring-4 focus:ring-[var(--admin-accent-glow)]";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-text)]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm text-[var(--admin-text-muted)]">{description}</p>
        ) : null}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`admin-card ${className ?? ""}`}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--admin-border)] px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">
                {description}
              </p>
            )}
          </div>
          {actions}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-[13px] font-medium text-[var(--admin-text)]"
      >
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[var(--admin-text-soft)]">{hint}</p>
      )}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
      <i className="bi bi-exclamation-triangle-fill mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
      <i className="bi bi-check-circle-fill mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

export { SubmitButton } from "@/components/admin/SubmitButton";
