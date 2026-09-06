"use client";

import { FONT_PRESETS } from "@/lib/fonts";

export function FontPresetPicker({
  defaultId,
}: {
  defaultId?: string;
}) {
  function handleChange(value: string) {
    const preset = FONT_PRESETS.find((f) => f.id === value);
    if (!preset) return;
    const heading = document.getElementById("font_heading") as HTMLInputElement | null;
    const body = document.getElementById("font_body") as HTMLInputElement | null;
    const nav = document.getElementById("font_nav") as HTMLInputElement | null;
    if (heading) heading.value = preset.heading;
    if (body) body.value = preset.body;
    if (nav) nav.value = preset.nav;
  }

  return (
    <select
      id="preset"
      name="preset"
      defaultValue={defaultId ?? "classic"}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
    >
      {FONT_PRESETS.map((p) => (
        <option key={p.id} value={p.id}>
          {p.label}
        </option>
      ))}
    </select>
  );
}