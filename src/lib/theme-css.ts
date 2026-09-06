import type { ThemeSettings } from "@/types/site";

const CSS_VARS: Record<string, keyof ThemeSettings> = {
  "--color-accent": "accent",
  "--color-accent-dark": "accent_dark",
  "--color-accent-soft": "accent_soft",
  "--color-navy": "navy",
  "--color-navy-light": "navy_light",
  "--color-heading": "heading",
  "--color-body": "body",
  "--color-light": "light",
  "--color-navm": "navm",
  "--color-danger": "danger",
  "--color-success": "success",
};

export function themeCssVarBlock(theme: ThemeSettings): string {
  const lines = Object.entries(CSS_VARS).map(
    ([varName, key]) => `    ${varName}: ${theme[key]};`
  );
  return `:root {\n${lines.join("\n")}\n  }`;
}