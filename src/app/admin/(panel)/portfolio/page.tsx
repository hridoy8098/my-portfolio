import Link from "next/link";
import { getPortfolioItems, getPortfolioCategories } from "@/lib/supabase/queries";
import { savePortfolioCategoryAction, deleteRowAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  SubmitButton,
} from "@/components/admin/ui";

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getPortfolioCategories(),
  ]);

  const catLabel = (key: string) =>
    categories.find((c) => c.value === key)?.label ?? key;

  const publishedCount = items.filter((p) => p.is_published).length;
  const featuredCount = items.filter((p) => p.is_featured).length;

  return (
    <>
      <AdminPageHeader
        title="Portfolio"
        description="Manage your projects and their categories."
        actions={
          <Link href="/admin/portfolio/new" className="admin-btn-primary">
            <i className="bi bi-plus-lg" />
            New project
          </Link>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20">
            <i className="bi bi-collection-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {items.length}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Total projects
            </p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
            <i className="bi bi-eye-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {publishedCount}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Published
            </p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20">
            <i className="bi bi-star-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {featuredCount}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Featured
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Projects list — takes 2 cols */}
        <div className="xl:col-span-2">
          <AdminCard
            title="Projects"
            description={`${items.length} project(s) in the database.`}
          >
            <div className="space-y-3">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="group overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] transition hover:border-[var(--admin-accent)] hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row">
                    {/* Thumbnail */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[var(--admin-surface-2)] sm:h-24 sm:w-32">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || "/icon.png"}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                      {p.is_featured && (
                        <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
                          <i className="bi bi-star-fill text-[9px]" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[14px] font-semibold text-[var(--admin-text)]">
                              {p.title}
                            </p>
                            {!p.is_published && (
                              <span className="admin-pill bg-slate-500/10 text-slate-600 dark:text-slate-300">
                                <i className="bi bi-eye-slash-fill text-[9px]" />
                                Hidden
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-[12px] text-[var(--admin-text-soft)]">
                            <i className="bi bi-link-45deg" /> /projects/{p.slug}
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.categories.map((c) => (
                          <span
                            key={c}
                            className="admin-pill bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          >
                            {catLabel(c)}
                          </span>
                        ))}
                        {p.technologies.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="admin-pill bg-slate-500/10 text-slate-600 dark:text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                        {p.technologies.length > 4 && (
                          <span className="admin-pill bg-slate-500/10 text-slate-500 dark:text-slate-400">
                            +{p.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {p.live_url && (
                          <a
                            href={p.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--admin-accent)] hover:underline"
                          >
                            <i className="bi bi-box-arrow-up-right text-[11px]" />
                            Live demo
                          </a>
                        )}
                        {p.github_url && (
                          <a
                            href={p.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--admin-text-muted)] transition hover:text-[var(--admin-text)]"
                          >
                            <i className="bi bi-github text-[11px]" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-2">
                    <span className="text-[11px] font-mono text-[var(--admin-text-soft)]">
                      #{p.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/portfolio/${p.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-[var(--admin-accent)] transition hover:bg-[var(--admin-accent-soft)]"
                      >
                        <i className="bi bi-pencil-square text-[11px]" />
                        Edit
                      </Link>
                      <AdminForm action={deleteRowAction} successMessage="Deleted.">
                        <input type="hidden" name="_table" value="portfolio_items" />
                        <input type="hidden" name="_id" value={p.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                        >
                          <i className="bi bi-trash text-[11px]" />
                          Delete
                        </button>
                      </AdminForm>
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <i className="bi bi-folder2-open text-2xl" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-[var(--admin-text)]">
                    No projects yet
                  </p>
                  <p className="mt-1 text-[13px] text-[var(--admin-text-muted)]">
                    Click “New project” to add your first one.
                  </p>
                </div>
              )}
            </div>
          </AdminCard>
        </div>

        {/* Categories — 1 col */}
        <div>
          <AdminCard
            title="Categories"
            description="Filter chips used by the Portfolio section."
          >
            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-3"
                >
                  <div className="mb-2 flex justify-end">
                    <AdminForm action={deleteRowAction} successMessage="Deleted.">
                      <input type="hidden" name="_table" value="portfolio_categories" />
                      <input type="hidden" name="_id" value={cat.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                      >
                        <i className="bi bi-trash text-[11px]" />
                        Delete
                      </button>
                    </AdminForm>
                  </div>
                  <AdminForm action={savePortfolioCategoryAction} successMessage="Saved.">
                    <input type="hidden" name="_id" defaultValue={cat.id} />
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Filter key">
                        <TextInput name="value" defaultValue={cat.value} />
                      </Field>
                      <Field label="Label">
                        <TextInput name="label" defaultValue={cat.label} />
                      </Field>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                        <input
                          type="checkbox"
                          name="is_published"
                          defaultChecked={cat.is_published}
                          className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
                        />
                        Published
                      </label>
                      <SubmitButton>Save</SubmitButton>
                    </div>
                  </AdminForm>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-[var(--admin-border)] pt-4">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-text-soft)]">
                <i className="bi bi-plus-circle" />
                Add new category
              </p>
              <AdminForm action={savePortfolioCategoryAction} successMessage="Added.">
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Filter key">
                    <TextInput name="value" placeholder="web" />
                  </Field>
                  <Field label="Label">
                    <TextInput name="label" placeholder="Web" />
                  </Field>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                    <input
                      type="checkbox"
                      name="is_published"
                      defaultChecked
                      className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
                    />
                    Published
                  </label>
                  <SubmitButton>Add</SubmitButton>
                </div>
              </AdminForm>
            </div>
          </AdminCard>
        </div>
      </div>
    </>
  );
}
