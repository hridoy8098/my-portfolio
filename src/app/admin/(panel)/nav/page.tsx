import { getNavItems } from "@/lib/supabase/queries";
import { saveNavItemAction, deleteRowAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  SubmitButton,
} from "@/components/admin/ui";

export default async function NavPage() {
  const items = await getNavItems();

  return (
    <>
      <AdminPageHeader
        title="Navigation"
        description="Sidebar menu items. section_id should match the target section id on the homepage."
      />

      <AdminCard
        title={
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20">
              <i className="bi bi-list-nested text-[13px]" />
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Menu items</h2>
              <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">{items.length} item(s) in the navigation menu</p>
            </div>
          </div>
        }
      >
        <div className="divide-y divide-[var(--admin-border)]">
          {items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[12px] font-medium text-[var(--admin-text-soft)]">
                  <i className={`bi ${item.icon || 'bi-list'}`} />
                  {item.label}
                </span>
                <AdminForm action={deleteRowAction} successMessage="Deleted.">
                  <input type="hidden" name="_table" value="nav_items" />
                  <input type="hidden" name="_id" value={item.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                  >
                    <i className="bi bi-trash text-[11px]" /> Delete
                  </button>
                </AdminForm>
              </div>
              <AdminForm action={saveNavItemAction} successMessage="Saved.">
                <input type="hidden" name="_id" defaultValue={item.id} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Label">
                    <TextInput name="label" defaultValue={item.label} />
                  </Field>
                  <Field label="Section id">
                    <TextInput name="section_id" defaultValue={item.section_id} />
                  </Field>
                  <Field label="Icon">
                    <TextInput name="icon" defaultValue={item.icon} placeholder="bi-house" />
                  </Field>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                    <input type="checkbox" name="is_published" defaultChecked={item.is_published} className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                    Published
                  </label>
                  <SubmitButton>Save</SubmitButton>
                </div>
              </AdminForm>
            </div>
          ))}

          <div className="pt-4">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-text-soft)]">
              <i className="bi bi-plus-circle" />
              Add new item
            </p>
            <AdminForm action={saveNavItemAction} successMessage="Added.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Label">
                  <TextInput name="label" placeholder="About" />
                </Field>
                <Field label="Section id">
                  <TextInput name="section_id" placeholder="about" />
                </Field>
                <Field label="Icon">
                  <TextInput name="icon" placeholder="bi-person" />
                </Field>
              </div>
              <div className="flex items-center justify-between pt-3">
                <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                  <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                  Published
                </label>
                <SubmitButton>Add</SubmitButton>
              </div>
            </AdminForm>
          </div>
        </div>
      </AdminCard>
    </>
  );
}