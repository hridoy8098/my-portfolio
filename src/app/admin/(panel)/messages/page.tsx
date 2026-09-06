import { authedAdminClient } from "@/lib/actions/helpers";
import { deleteMessageAction, toggleMessageReadAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminPageHeader, AdminCard } from "@/components/admin/ui";

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

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description={`${unread} unread of ${messages.length} shown. Submitted via the contact form (Supabase + email).`}
      />

      {messages.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-gray-500">
            No messages yet. Messages arrive here from the contact form.
          </p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg border bg-white p-5 shadow-sm ${
                m.is_read ? "border-gray-200" : "border-l-4 border-l-accent"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {m.name}{" "}
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      {timeAgo(m.created_at)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {m.subject} · <a href={`mailto:${m.email}`} className="text-accent">{m.email}</a>
                  </p>
                </div>
                <div className="flex gap-2">
                  <AdminForm action={toggleMessageReadAction} successMessage="Updated.">
                    <input type="hidden" name="_id" value={m.id} />
                    <input type="hidden" name="_read" value={String(!m.is_read)} />
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition ${
                        m.is_read
                          ? "text-gray-500 hover:text-accent"
                          : "bg-gray-100 text-accent hover:bg-gray-200"
                      }`}
                    >
                      {m.is_read ? (
                        <>
                          <i className="bi bi-envelope" /> Mark unread
                        </>
                      ) : (
                        <>
                          <i className="bi bi-envelope-open" /> Mark read
                        </>
                      )}
                    </button>
                  </AdminForm>
                  <AdminForm action={deleteMessageAction} successMessage="Deleted.">
                    <input type="hidden" name="_id" value={m.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-red-600 transition hover:text-red-700"
                    >
                      <i className="bi bi-trash" /> Delete
                    </button>
                  </AdminForm>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-[13px] leading-relaxed text-gray-700">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}