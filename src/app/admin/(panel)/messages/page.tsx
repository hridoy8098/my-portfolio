import { authedAdminClient } from "@/lib/actions/helpers";
import { deleteMessageAction, toggleMessageReadAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/ui";

export const revalidate = 10;

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "indigo" | "emerald" | "rose" | "slate";
}) {
  const accents = {
    indigo: "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-600 ring-rose-500/20",
    slate: "bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-300",
  };
  return (
    <div className="admin-card flex items-center gap-3 p-4">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${accents[accent]}`}
      >
        <i
          className={`bi ${
            label === "Unread"
              ? "bi-envelope-exclamation-fill"
              : label === "Read"
              ? "bi-envelope-open-fill"
              : label === "Total"
              ? "bi-envelope-fill"
              : "bi-inbox-fill"
          }`}
        />
      </span>
      <div>
        <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
          {value}
        </p>
        <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
          {label}
        </p>
      </div>
    </div>
  );
}

export default async function MessagesPage() {
  const db = await authedAdminClient();
  const { data } = await db
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const messages = (data ?? []) as Array<{
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
  }>;

  const unread = messages.filter((m) => !m.is_read).length;
  const read = messages.length - unread;

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description="Inbox of submissions from your contact form."
      />

      {/* Stats row */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatPill label="Unread" value={unread} accent="rose" />
        <StatPill label="Read" value={read} accent="emerald" />
        <StatPill label="Total" value={messages.length} accent="indigo" />
      </div>

      {messages.length === 0 ? (
        <div className="admin-card">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <i className="bi bi-inbox text-2xl" />
            </span>
            <p className="mt-4 text-sm font-medium text-[var(--admin-text)]">
              No messages yet
            </p>
            <p className="mt-1 text-[13px] text-[var(--admin-text-muted)]">
              Messages from your contact form will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`admin-card overflow-hidden ${
                !m.is_read ? "border-l-4 border-l-indigo-500" : ""
              }`}
            >
              <div className="p-5">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    {/* Avatar */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                        m.is_read
                          ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          : "bg-gradient-to-br from-indigo-500 to-indigo-700 text-white ring-2 ring-indigo-500/20"
                      }`}
                    >
                      {m.name?.charAt(0).toUpperCase() ?? "?"}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[14px] font-semibold text-[var(--admin-text)]">
                          {m.name}
                        </p>
                        {!m.is_read && (
                          <span className="admin-pill bg-rose-500/10 text-rose-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                            New
                          </span>
                        )}
                        <span className="text-[12px] text-[var(--admin-text-soft)]">
                          · {timeAgo(m.created_at)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-[13px] font-medium text-[var(--admin-text)]">
                        {m.subject || "(no subject)"}
                      </p>
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-0.5 inline-flex items-center gap-1 text-[12px] text-[var(--admin-accent)] hover:underline"
                      >
                        <i className="bi bi-envelope text-[10px]" />
                        {m.email}
                      </a>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex shrink-0 items-center gap-1.5">
                    <AdminForm
                      action={toggleMessageReadAction}
                      successMessage="Updated."
                    >
                      <input type="hidden" name="_id" value={m.id} />
                      <input
                        type="hidden"
                        name="_read"
                        value={String(!m.is_read)}
                      />
                      <button
                        type="submit"
                        title={m.is_read ? "Mark as unread" : "Mark as read"}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                          m.is_read
                            ? "text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800"
                            : "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 dark:text-indigo-400"
                        }`}
                      >
                        <i
                          className={`bi ${
                            m.is_read ? "bi-envelope" : "bi-envelope-open"
                          } text-[13px]`}
                        />
                      </button>
                    </AdminForm>
                    <AdminForm action={deleteMessageAction} successMessage="Deleted.">
                      <input type="hidden" name="_id" value={m.id} />
                      <button
                        type="submit"
                        title="Delete message"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
                      >
                        <i className="bi bi-trash text-[13px]" />
                      </button>
                    </AdminForm>
                  </div>
                </div>

                {/* Message body */}
                <div className="mt-4 rounded-xl bg-[var(--admin-surface-2)] p-4">
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[var(--admin-text)]">
                    {m.message}
                  </p>
                </div>

                {/* Footer with timestamp */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--admin-text-soft)]">
                  <span className="flex items-center gap-1.5">
                    <i className="bi bi-clock" />
                    {formatDate(m.created_at)}
                  </span>
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(
                      m.subject || "Your message"
                    )}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-border)] px-2.5 py-1 font-medium text-[var(--admin-text-muted)] transition hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)]"
                  >
                    <i className="bi bi-reply text-[11px]" />
                    Reply
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
