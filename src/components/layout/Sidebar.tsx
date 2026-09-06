"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Profile, NavItem as NavItemType, SocialLink } from "@/types/site";

export default function Sidebar({
  open,
  setOpen,
  profile,
  nav,
  socials,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  profile: Profile;
  nav: NavItemType[];
  socials: SocialLink[];
}) {
  const sectionIds = nav.map((item) => item.section_id);
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[996] bg-black/50 desk:hidden",
          open ? "block" : "hidden"
        )}
        onClick={() => setOpen(false)}
      />
      <header
        className={cn(
          "fixed bottom-0 left-0 top-0 z-[997] flex w-[85vw] max-w-[300px] flex-col overflow-y-auto border-r border-white/10 bg-navy px-[15px] py-5 text-white transition-transform duration-300 desk:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="shrink-0">
          <Image
            src={profile.photo_url}
            alt={profile.name}
            width={120}
            height={120}
            className="mx-auto my-[15px] block h-[120px] w-[120px] rounded-full border-8 border-white/[0.15] object-cover"
            priority
          />
        </div>

        <a
          href="#hero"
          className="mb-[15px] block text-center font-heading text-2xl font-bold leading-none no-underline"
        >
          {profile.name}
        </a>

        <div className="mb-5 flex justify-center gap-2">
          {socials.map((s) => (
            <SocialLink key={s.id} href={s.url} icon={s.icon} label={s.label} />
          ))}
        </div>

        <nav className="desk:block">
          <ul className="m-0 list-none p-0 pb-5">
            {nav.map((item) => (
              <li key={item.section_id} className="mb-[2px]">
                <a
                  href={`#${item.section_id}`}
                  onClick={() => setOpen(false)}
                  suppressHydrationWarning
                  className={cn(
                    "flex items-center rounded p-[10px] text-[15px] font-normal no-underline transition-colors duration-300 hover:bg-white/10 hover:text-white",
                    activeId === item.section_id
                      ? "bg-white/10 text-white"
                      : "text-navm"
                  )}
                >
                  <i
                    className={`bi ${item.icon} mr-2 text-lg ${
                      activeId === item.section_id ? "text-accent" : ""
                    }`}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-base text-white transition-colors duration-300 hover:bg-accent hover:text-white"
    >
      <i className={`bi ${icon}`} />
    </a>
  );
}