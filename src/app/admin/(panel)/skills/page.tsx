import { getAdminSkillCategories } from "@/lib/supabase/queries";
import {
  saveSkillAction,
  saveSkillCategoryAction,
  deleteRowAction,
} from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  SelectInput,
  SubmitButton,
} from "@/components/admin/ui";

function CategoryCard({
  category,
}: {
  category: { id: number; label: string; icon: string; is_published: boolean; skills: { id: number; name: string; icon: string; is_published: boolean }[] };
}) {
  return (
    <AdminCard
      title={category.label}
      description={`${category.skills.length} skill(s) in this group`}
      actions={
        <AdminForm action={deleteRowAction} successMessage="Deleted.">
          <input type="hidden" name="_table" value="skill_categories" />
          <input type="hidden" name="_id" value={category.id} />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
          >
            <i className="bi bi-trash text-[11px]" /> Delete group
          </button>
        </AdminForm>
      }
    >
      <div className="space-y-4">
        <AdminForm action={saveSkillCategoryAction} successMessage="Saved.">
          <input type="hidden" name="_id" defaultValue={category.id} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Group label">
              <TextInput name="label" defaultValue={category.label} />
            </Field>
            <Field label="Icon">
              <TextInput name="icon" defaultValue={category.icon} placeholder="bi-code-slash" />
            </Field>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
              <input type="checkbox" name="is_published" defaultChecked={category.is_published} className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
              Published
            </label>
            <SubmitButton>Save group</SubmitButton>
          </div>
        </AdminForm>

        <div className="border-t border-[var(--admin-border)] pt-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-text-soft)]">
            <i className="bi bi-list-ul" />
            Skills in this group
          </p>
          <ul className="space-y-2">
            {category.skills.map((skill) => (
              <li key={skill.id} className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                      <i className={`bi ${skill.icon || 'bi-dot'} text-[12px]`} />
                    </span>
                    <span className="text-[14px] font-semibold text-[var(--admin-text)]">{skill.name}</span>
                  </div>
                  <AdminForm action={deleteRowAction} successMessage="Deleted.">
                    <input type="hidden" name="_table" value="skills" />
                    <input type="hidden" name="_id" value={skill.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                    >
                      <i className="bi bi-trash text-[11px]" /> Delete
                    </button>
                  </AdminForm>
                </div>
                <AdminForm action={saveSkillAction} successMessage="Saved.">
                  <input type="hidden" name="_id" defaultValue={skill.id} />
                  <input type="hidden" name="category_id" value={category.id} />
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                    <Field label="Name">
                      <TextInput name="name" defaultValue={skill.name} placeholder="Skill name" />
                    </Field>
                    <Field label="Icon" hint="Optional — empty হলে নাম থেকে auto-detect হবে">
                      <TextInput name="icon" defaultValue={skill.icon} placeholder="bi-… বা খালি" />
                    </Field>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                      <input type="checkbox" name="is_published" defaultChecked={skill.is_published} className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                      Published
                    </label>
                    <SubmitButton>Update</SubmitButton>
                  </div>
                </AdminForm>
              </li>
            ))}
            {category.skills.length === 0 && (
              <li className="py-4 text-center text-[13px] text-[var(--admin-text-soft)]">No skills in this group yet.</li>
            )}
          </ul>
        </div>
      </div>
    </AdminCard>
  );
}

export default async function SkillsPage() {
  const categories = await getAdminSkillCategories();

  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="Individual skill rows grouped by category. Create, edit and delete skills below."
      />

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title={<div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20"><i className="bi bi-plus-circle-fill" /></span><div><h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Add new skill</h2></div></div>}>
          <AdminForm action={saveSkillAction} successMessage="Added.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name">
                <TextInput name="name" placeholder="Laravel" />
              </Field>
              <Field label="Icon" hint="Optional — empty হলে নাম থেকে auto-detect হবে">
                <TextInput name="icon" placeholder="bi-… বা খালি" />
              </Field>
            </div>
            <Field label="Group">
              <SelectInput name="category_id" defaultValue={categories[0]?.id ?? ""}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </AdminCard>

        <AdminCard title={<div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20"><i className="bi bi-folder-plus-fill" /></span><div><h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Add new group</h2></div></div>}>
          <AdminForm action={saveSkillCategoryAction} successMessage="Added.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Group label">
                <TextInput name="label" placeholder="Frontend" />
              </Field>
              <Field label="Icon">
                <TextInput name="icon" placeholder="bi-display" />
              </Field>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </AdminCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </>
  );
}
