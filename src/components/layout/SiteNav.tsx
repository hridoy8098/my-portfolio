"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import type { Profile, NavItem as NavItemType, SocialLink } from "@/types/site";

export default function SiteNav({
  profile,
  nav,
  socials,
}: {
  profile: Profile;
  nav: NavItemType[];
  socials: SocialLink[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} profile={profile} nav={nav} socials={socials} />
      <MobileHeader open={open} setOpen={setOpen} />
    </>
  );
}