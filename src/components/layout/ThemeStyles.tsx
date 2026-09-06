import type { ThemeSettings } from "@/types/site";
import { themeCssVarBlock } from "@/lib/theme-css";

const FONT_FALLBACKS: Record<string, string> = {
  raleway: "var(--font-raleway), ui-sans-serif, system-ui, sans-serif",
  roboto: "var(--font-roboto), ui-sans-serif, system-ui, sans-serif",
  poppins: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
  inter: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  playfair: "var(--font-playfair), ui-serif, Georgia, serif",
  lora: "var(--font-lora), ui-serif, Georgia, serif",
  space: "var(--font-space), ui-monospace, monospace",
};

export function ThemeStyles({ theme }: { theme: ThemeSettings }) {
  const heading = FONT_FALLBACKS[theme.font_heading] ?? FONT_FALLBACKS.raleway;
  const body = FONT_FALLBACKS[theme.font_body] ?? FONT_FALLBACKS.roboto;
  const nav = FONT_FALLBACKS[theme.font_nav] ?? FONT_FALLBACKS.poppins;

  const css = `
${themeCssVarBlock(theme)}

:root {
  --default-font: ${body};
  --heading-font: ${heading};
  --nav-font: ${nav};
}

.hero-overlay {
  opacity: ${(theme.hero_overlay_opacity / 100).toFixed(2)};
}
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}