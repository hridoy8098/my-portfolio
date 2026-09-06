import { getTheme } from "@/lib/supabase/queries";
import { saveThemeAction } from "@/lib/actions/settings";
import { fontPresetFor } from "@/lib/fonts";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  SubmitButton,
} from "@/components/admin/ui";
import { FontPresetPicker } from "@/components/admin/FontPresetPicker";

const COLORS: Array<{ key: "accent" | "accent_dark" | "accent_soft" | "navy" | "navy_light" | "heading" | "body" | "light" | "navm" | "danger" | "success"; label: string }> = [
  { key: "accent", label: "Accent" },
  { key: "accent_dark", label: "Accent (dark)" },
  { key: "accent_soft", label: "Accent (soft)" },
  { key: "navy", label: "Navy" },
  { key: "navy_light", label: "Navy (light)" },
  { key: "heading", label: "Heading" },
  { key: "body", label: "Body" },
  { key: "light", label: "Light" },
  { key: "navm", label: "Nav menu" },
  { key: "danger", label: "Danger" },
  { key: "success", label: "Success" },
];

export default async function ThemePage() {
  const t = await getTheme();
  const preset = fontPresetFor(t.font_heading, t.font_body, t.font_nav);

  return (
    <>
      <AdminPageHeader
        title="Theme"
        description="Site colors and font presets. Changes apply instantly across the site."
      />

      <AdminForm action={saveThemeAction}>
        <div className="grid gap-6 lg:grid-cols-2">
          <AdminCard title="Colors">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {COLORS.map((c) => (
                <Field key={c.key} label={c.label} htmlFor={String(c.key)}>
                  <div className="flex items-center gap-2">
                    <input
                      id={String(c.key)}
                      name={String(c.key)}
                      type="color"
                      defaultValue={String(t[c.key] ?? "#000000")}
                      className="h-9 min-w-10 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
                    />
                    <TextInput
                      name={`${String(c.key)}_hex`}
                      defaultValue={String(t[c.key] ?? "#000000")}
                      className="font-mono text-xs"
                    />
                  </div>
                </Field>
              ))}
            </div>

            <Field
              label={`Hero overlay opacity: ${t.hero_overlay_opacity}%`}
              hint="Adjusts how dark the hero background image appears."
            >
              <input
                type="range"
                name="hero_overlay_opacity"
                min="0"
                max="100"
                defaultValue={t.hero_overlay_opacity}
                className="w-full accent-accent"
              />
            </Field>
          </AdminCard>

          <div className="space-y-6">
            <AdminCard
              title="Font preset"
              description="Pick a combination. The three font fields below update automatically."
            >
              <Field label="Font preset">
                <FontPresetPicker defaultId={preset.id} />
              </Field>
            </AdminCard>

            <AdminCard
              title="Font fields"
              description="Stored with the theme and applied as CSS variables."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Heading font">
                  <TextInput id="font_heading" name="font_heading" defaultValue={t.font_heading} readOnly />
                </Field>
                <Field label="Body font">
                  <TextInput id="font_body" name="font_body" defaultValue={t.font_body} readOnly />
                </Field>
                <Field label="Nav font">
                  <TextInput id="font_nav" name="font_nav" defaultValue={t.font_nav} readOnly />
                </Field>
              </div>
            </AdminCard>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton>Save theme</SubmitButton>
        </div>
      </AdminForm>
    </>
  );
}