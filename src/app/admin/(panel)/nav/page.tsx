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

      <AdminCard title="Menu items">
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex justify-end pb-2">
                <AdminForm action={deleteRowAction} successMessage="Deleted.">
                  <input type="hidden" name="_table" value="nav_items" />
                  <input type="hidden" name="_id" value={item.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                  >
                    <i className="bi bi-trash" /> Delete
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
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                    <input type="checkbox" name="is_published" defaultChecked={item.is_published} />
                    Published
                  </label>
                  <SubmitButton>Save</SubmitButton>
                </div>
              </AdminForm>
            </div>
          ))}

          <div className="pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
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
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked />
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