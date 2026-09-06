import { getSkillCategories } from "@/lib/supabase/queries";
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
            className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
          >
            <i className="bi bi-trash" /> Delete group
          </button>
        </AdminForm>
      }
    >
      <div className="space-y-4">
        <AdminForm action={saveSkillCategoryAction} successMessage="Saved.">
          <input type="hidden" name="_id" defaultValue={category.id} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Group label">
              <TextInput name="label" defaultValue={category.label} />
            </Field>
            <Field label="Icon">
              <TextInput name="icon" defaultValue={category.icon} placeholder="bi-code-slash" />
            </Field>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
              <input type="checkbox" name="is_published" defaultChecked={category.is_published} />
              Published
            </label>
            <SubmitButton>Save group</SubmitButton>
          </div>
        </AdminForm>

        <div className="border-t border-gray-100 pt-4">
          <p className="mb-3 text-[13px] font-semibold text-gray-700">Skills in this group</p>
          <ul className="space-y-2">
            {category.skills.map((skill) => (
              <li key={skill.id} className="rounded-md border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {skill.icon && <i className={`bi ${skill.icon}`} />}
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                  </div>
                  <AdminForm action={deleteRowAction} successMessage="Deleted.">
                    <input type="hidden" name="_table" value="skills" />
                    <input type="hidden" name="_id" value={skill.id} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                    >
                      <i className="bi bi-trash" /> Delete
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
                    <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                      <input type="checkbox" name="is_published" defaultChecked={skill.is_published} />
                      Published
                    </label>
                    <SubmitButton>Update</SubmitButton>
                  </div>
                </AdminForm>
              </li>
            ))}
            {category.skills.length === 0 && (
              <li className="text-[13px] text-gray-400">No skills in this group yet.</li>
            )}
          </ul>
        </div>
      </div>
    </AdminCard>
  );
}

export default async function SkillsPage() {
  const categories = await getSkillCategories();

  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="Individual skill rows grouped by category. Create, edit and delete skills below."
      />

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Add new skill">
          <AdminForm action={saveSkillAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
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
              <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <input type="checkbox" name="is_published" defaultChecked />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </AdminCard>

        <AdminCard title="Add new group">
          <AdminForm action={saveSkillCategoryAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Group label">
                <TextInput name="label" placeholder="Frontend" />
              </Field>
              <Field label="Icon">
                <TextInput name="icon" placeholder="bi-display" />
              </Field>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <input type="checkbox" name="is_published" defaultChecked />
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
