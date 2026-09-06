"use client";

import { cn } from "@/lib/cn";

export default function MobileHeader({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen(!open)}
      className={cn(
        "fixed right-[15px] top-[15px] z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-accent text-[24px] text-white shadow-lg shadow-black/30 transition-colors hover:bg-accent-dark desk:hidden"
      )}
    >
      <i className={cn("bi", open ? "bi-x" : "bi-list")} />
    </button>
  );
}