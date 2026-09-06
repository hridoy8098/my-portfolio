"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const hide = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setLoaded(true), 250);
    };

    if (document.readyState === "complete") {
      hide();
      return () => {
        if (timer) clearTimeout(timer);
      };
    }

    window.addEventListener("load", hide);
    const fallback = setTimeout(() => setLoaded(true), 4000);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      id="preloader"
      suppressHydrationWarning
      className={cn(loaded && "loaded")}
      aria-hidden="true"
    >
      <div className="spinner" />
    </div>
  );
}