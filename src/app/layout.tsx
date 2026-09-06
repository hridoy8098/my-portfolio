import type { Metadata } from "next";
import { Roboto, Raleway, Poppins, Inter, Lora, Playfair_Display, Space_Grotesk } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import { getSettings, getTheme } from "@/lib/supabase/queries";
import { ThemeStyles } from "@/components/layout/ThemeStyles";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const fontVariables = [
  roboto.variable,
  raleway.variable,
  poppins.variable,
  inter.variable,
  playfair.variable,
  lora.variable,
  space.variable,
].join(" ");

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const meta = settings.meta;
  return {
    metadataBase: meta.canonical_url ? new URL(meta.canonical_url) : undefined,
    title: meta.site_title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.og_title,
      description: meta.og_description,
      ...(meta.og_image ? { images: [{ url: meta.og_image }] } : {}),
      type: "website",
      locale: "en_US",
    },
    icons: {
      icon: meta.favicon_url || "/icon.png",
      ...(meta.apple_icon_url ? { apple: meta.apple_icon_url } : {}),
    },
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, theme] = await Promise.all([getSettings(), getTheme()]);
  const presetId = `${theme.font_heading}-${theme.font_body}-${theme.font_nav}`;

  return (
    <html
      lang={settings.meta.lang || "en"}
      className={`${fontVariables} font-preset-${presetId}`}
    >
      <body>
        <ThemeStyles theme={theme} />
        {children}
      </body>
    </html>
  );
}