import { getServices } from "@/lib/supabase/queries";
import { saveServiceAction, deleteRowAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/admin/ui";

export default async function ServicesPage() {
  const services = await getServices();
  const publishedCount = services.filter((s) => s.is_published).length;

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Services shown in the Services section. The service-details page is a single shared page edited under Site Settings."
      />

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20">
            <i className="bi bi-briefcase-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {services.length}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Total services
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <AdminCard
            key={service.id}
            title={
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20">
                  <i className={`bi ${service.icon || "bi-briefcase"} text-[13px]`} />
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
                    {service.title || "Untitled service"}
                  </h2>
                  <p className="mt-0.5 text-[12px] text-[var(--admin-text-muted)]">
                    {service.points.length} point(s) · {service.is_published ? "Published" : "Hidden"}
                  </p>
                </div>
              </div>
            }
            actions={
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="services" />
                <input type="hidden" name="_id" value={service.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                >
                  <i className="bi bi-trash text-[11px]" /> Delete
                </button>
              </AdminForm>
            }
          >
            <AdminForm action={saveServiceAction} successMessage="Saved.">
              <input type="hidden" name="_id" defaultValue={service.id} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Title">
                  <TextInput name="title" defaultValue={service.title} />
                </Field>
                <Field label="Icon">
                  <TextInput name="icon" defaultValue={service.icon} placeholder="bi-code-square" />
                </Field>
              </div>
              <Field label="Description">
                <TextArea name="description" rows={2} defaultValue={service.description} />
              </Field>
              <Field label="Points (one per line)">
                <TextArea name="points" rows={3} defaultValue={service.points.join("\n")} />
              </Field>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                  <input
                    type="checkbox"
                    name="is_published"
                    defaultChecked={service.is_published}
                    className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
                  />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </AdminCard>
        ))}

        <AdminCard
          title={
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
                <i className="bi bi-plus-circle-fill text-[13px]" />
              </span>
              <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
                Add new service
              </h2>
            </div>
          }
        >
          <AdminForm action={saveServiceAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title">
                <TextInput name="title" placeholder="Web Development" />
              </Field>
              <Field label="Icon">
                <TextInput name="icon" placeholder="bi-code-square" />
              </Field>
            </div>
            <Field label="Description">
              <TextArea name="description" rows={2} />
            </Field>
            <Field label="Points (one per line)">
              <TextArea name="points" rows={3} />
            </Field>
            <div className="flex items-center justify-between">
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
        </AdminCard>
      </div>
    </>
  );
}
