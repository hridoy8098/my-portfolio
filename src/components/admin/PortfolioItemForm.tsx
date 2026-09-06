import { savePortfolioItemAction } from "@/lib/actions/collections";
import type { PortfolioItem } from "@/types/site";
import { AdminForm } from "@/components/admin/AdminForm";
import { MediaPicker } from "@/components/admin/MediaPicker";
import {
  Field,
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/admin/ui";

const json = (sections: PortfolioItem["sections"]) =>
  JSON.stringify(sections, null, 2);

const EMPTY = {
  slug: "",
  title: "",
  categories: [],
  description: "",
  image: "",
  screenshots: [],
  technologies: [],
  live_url: "",
  github_url: "",
  detail_category: "",
  detail_client: "Hridoy Hussain",
  detail_date: "",
  detail_status: "Completed",
  sections: [],
  is_featured: false,
  is_published: true,
};

export function PortfolioItemForm({ item }: { item?: PortfolioItem }) {
  const values = item ?? EMPTY;

  return (
    <AdminForm
      action={savePortfolioItemAction}
      successMessage={item ? "Project saved." : "Project added."}
    >
      {item && <input type="hidden" name="_id" defaultValue={item.id} />}
      {!item && <input type="hidden" name="position" value="0" />}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Title">
              <TextInput name="title" defaultValue={values.title} required />
            </Field>
            <Field label="Slug">
              <TextInput name="slug" defaultValue={values.slug} placeholder="my-project" required />
            </Field>
          </div>

          <Field label="Description">
            <TextArea name="description" rows={3} defaultValue={values.description} />
          </Field>

          <Field label="Cover image URL">
            <MediaPicker
              name="image"
              value={values.image}
              folders={["portfolio", "media"]}
            />
          </Field>

          <Field label="Screenshots (one URL per line)">
            <TextArea
              name="screenshots"
              rows={3}
              defaultValue={values.screenshots.join("\n")}
            />
          </Field>

          <Field label="Technologies (one per line)">
            <TextArea
              name="technologies"
              rows={3}
              defaultValue={values.technologies.join("\n")}
            />
          </Field>

          <Field label="Categories (one per line)" hint="Use category values, e.g. web">
            <TextArea
              name="categories"
              rows={2}
              defaultValue={values.categories.join("\n")}
            />
          </Field>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Live URL">
              <TextInput name="live_url" defaultValue={values.live_url} placeholder="https://…" />
            </Field>
            <Field label="GitHub URL">
              <TextInput name="github_url" defaultValue={values.github_url} placeholder="https://…" />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Detail category">
              <TextInput name="detail_category" defaultValue={values.detail_category} />
            </Field>
            <Field label="Client">
              <TextInput name="detail_client" defaultValue={values.detail_client} />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Date">
              <TextInput name="detail_date" defaultValue={values.detail_date} placeholder="2025" />
            </Field>
            <Field label="Status">
              <TextInput name="detail_status" defaultValue={values.detail_status} />
            </Field>
          </div>

          <Field
            label="Case study sections (JSON)"
            hint="Array of { id, title, icon, items[] } — see README for the format."
          >
            <TextArea
              name="sections"
              rows={10}
              defaultValue={json(values.sections)}
              className="font-mono text-xs"
            />
          </Field>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
              <input type="checkbox" name="is_featured" defaultChecked={values.is_featured} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
              <input type="checkbox" name="is_published" defaultChecked={values.is_published} />
              Published
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <SubmitButton>{item ? "Save project" : "Add project"}</SubmitButton>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}