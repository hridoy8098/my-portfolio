"use client";

import Image from "next/image";
import Link from "next/link";
import { useTyped } from "@/hooks/useTyped";
import type { Profile } from "@/types/site";
import type { HeroSettings } from "@/types/site";

export default function Hero({
  profile,
  heroSettings,
}: {
  profile: Profile;
  heroSettings: HeroSettings;
}) {
  const typedRef = useTyped(profile.typed_items);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20"
    >
      <div className="absolute inset-0">
        <Image
          src={profile.hero_bg_url}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-navy/55" />

      <div className="relative z-[2] mx-auto w-full max-w-[1200px] px-[15px]">
        <div className="max-w-[760px] text-center md:text-left">
          <p className="mb-3 font-nav text-[14px] font-semibold uppercase tracking-[4px] text-accent desk:text-[16px]">
            {heroSettings.hello_prefix}
          </p>

          <h1 className="break-words text-[30px] font-bold leading-tight text-white sm:text-[38px] md:text-[48px] desk:text-[64px]">
            {profile.name}
          </h1>

          <p className="mt-[10px] font-nav text-[18px] leading-snug text-white md:text-[20px] desk:text-[26px]">
            {heroSettings.typed_prefix}{" "}
            <span
              ref={typedRef as React.RefObject<HTMLSpanElement>}
              className="border-b-2 border-accent tracking-[1px]"
            >
              {profile.typed_items[0]}
            </span>
          </p>

          <p className="mx-auto mt-5 max-w-[640px] text-[14px] leading-relaxed text-white/85 md:text-[15px] desk:text-[17px]">
            {profile.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href={heroSettings.primary_link}
              className="inline-flex items-center gap-2 rounded-[50px] bg-accent px-5 py-3 font-nav text-sm font-semibold text-white no-underline transition-colors duration-300 hover:bg-accent-dark"
            >
              <i className="bi bi-grid-3x3-gap" />
              {heroSettings.primary_label}
            </Link>

            {profile.cv_url ? (
              <a
                href={profile.cv_url}
                download
                className="inline-flex items-center gap-2 rounded-[50px] border border-white/40 px-5 py-3 font-nav text-sm font-semibold text-white no-underline transition-colors duration-300 hover:border-accent hover:bg-accent"
              >
                <i className="bi bi-download" />
                {heroSettings.cv_label}
              </a>
            ) : (
              <span
                title="The CV download will be available soon."
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-[50px] border border-white/40 px-5 py-3 font-nav text-sm font-semibold text-white/60 no-underline opacity-60"
              >
                <i className="bi bi-download" />
                {heroSettings.cv_label}
                <span className="text-[12px] uppercase tracking-wide">
                  {heroSettings.cv_soon_label}
                </span>
              </span>
            )}

            <Link
              href={heroSettings.contact_link}
              className="inline-flex items-center gap-2 rounded-[50px] border border-white/40 px-5 py-3 font-nav text-sm font-semibold text-white no-underline transition-colors duration-300 hover:border-accent hover:bg-accent"
            >
              <i className="bi bi-envelope" />
              {heroSettings.contact_label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}