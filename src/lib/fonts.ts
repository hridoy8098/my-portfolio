export type FontPreset = {
  id: string;
  label: string;
  heading: string;
  body: string;
  nav: string;
};

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "classic",
    label: "Classic (Raleway / Roboto / Poppins)",
    heading: "raleway",
    body: "roboto",
    nav: "poppins",
  },
  {
    id: "modern",
    label: "Modern (Poppins / Inter / Poppins)",
    heading: "poppins",
    body: "inter",
    nav: "poppins",
  },
  {
    id: "serif",
    label: "Serif (Playfair Display / Lora / Inter)",
    heading: "playfair",
    body: "lora",
    nav: "inter",
  },
  {
    id: "mono",
    label: "Monospace (Space Grotesk / Inter / Space Grotesk)",
    heading: "space",
    body: "inter",
    nav: "space",
  },
];

export function fontPresetFor(
  heading: string,
  body: string,
  nav: string
): FontPreset {
  return (
    FONT_PRESETS.find((f) => f.heading === heading && f.body === body && f.nav === nav) ??
    FONT_PRESETS[0]
  );
}