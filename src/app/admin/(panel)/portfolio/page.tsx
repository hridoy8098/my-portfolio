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

  return (
    <>
      <AdminPageHeader
        title="Portfolio"
        description="Projects and their categories."
      />
      <div className="mb-6 flex justify-end">
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          <i className="bi bi-plus-lg" /> New project
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard
          title="Projects"
          description={`${items.length} project(s) in the database.`}
        >
          <div className="space-y-4">
            {items.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-md border border-gray-200"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row">
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-md bg-gray-50 sm:h-24 sm:w-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image || "/icon.png"}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                    {p.is_featured && (
                      <span className="absolute left-1.5 top-1.5 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        ✦ Featured
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {p.title}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          /projects/{p.slug}
                        </p>
                      </div>
                      {!p.is_published && (
                        <span className="shrink-0 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600">
                          hidden
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-dark"
                        >
                          {catLabel(c)}
                        </span>
                      ))}
                      {p.technologies.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600"
                        >
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 4 && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-400">
                          +{p.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {p.live_url && (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded text-xs font-medium text-accent transition hover:text-accent-dark"
                        >
                          <i className="bi bi-box-arrow-up-right" /> Live
                        </a>
                      )}
                      {p.github_url && (
                        <a
                          href={p.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded text-xs font-medium text-gray-600 transition hover:text-gray-900"
                        >
                          <i className="bi bi-github" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-4 py-2">
                  <span className="text-[11px] text-gray-400">#{p.id}</span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/portfolio/${p.id}`}
                      className="inline-flex items-center gap-1 rounded text-xs font-medium text-accent transition hover:text-accent-dark"
                    >
                      <i className="bi bi-pencil-square" /> Edit
                    </Link>
                    <AdminForm action={deleteRowAction} successMessage="Deleted.">
                      <input type="hidden" name="_table" value="portfolio_items" />
                      <input type="hidden" name="_id" value={p.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                      >
                        <i className="bi bi-trash" /> Delete
                      </button>
                    </AdminForm>
                  </div>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">
                No projects yet. Click “New project” to add your first one.
              </p>
            )}
          </div>
        </AdminCard>

        <AdminCard
          title="Categories"
          description="Filter chips used by the Portfolio section."
        >
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="rounded-md border border-gray-200 p-3">
                <div className="flex justify-end">
                  <AdminForm action={deleteRowAction} successMessage="Deleted.">
                    <input type="hidden" name="_table" value="portfolio_categories" />
                    <input type="hidden" name="_id" value={cat.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                    >
                      <i className="bi bi-trash" /> Delete
                    </button>
                  </AdminForm>
                </div>
                <AdminForm action={savePortfolioCategoryAction} successMessage="Saved.">
                  <input type="hidden" name="_id" defaultValue={cat.id} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Value (filter key)">
                      <TextInput name="value" defaultValue={cat.value} />
                    </Field>
                    <Field label="Label">
                      <TextInput name="label" defaultValue={cat.label} />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                      <input type="checkbox" name="is_published" defaultChecked={cat.is_published} />
                      Published
                    </label>
                    <SubmitButton>Save</SubmitButton>
                  </div>
                </AdminForm>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Add new category
            </p>
            <AdminForm action={savePortfolioCategoryAction} successMessage="Added.">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Value (filter key)">
                  <TextInput name="value" placeholder="web" />
                </Field>
                <Field label="Label">
                  <TextInput name="label" placeholder="Web" />
                </Field>
              </div>
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked />
                  Published
                </label>
                <SubmitButton>Add</SubmitButton>
              </div>
            </AdminForm>
          </div>
        </AdminCard>
      </div>
    </>
  );
}