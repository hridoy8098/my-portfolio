"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#"
      aria-label="Scroll to top"
      suppressHydrationWarning
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={cn(
        "fixed bottom-[15px] right-[15px] z-[996] flex h-10 w-10 items-center justify-center rounded-[50px] text-lg no-underline transition-all duration-300 print:hidden",
        visible
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      )}
      style={{
        backgroundColor: "var(--color-accent)",
        color: "#fff",
      }}
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  );
}