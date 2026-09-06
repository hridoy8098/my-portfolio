"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export function useTyped(strings: string[]) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const typed = new Typed(elRef.current, {
      strings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, [strings]);

  return elRef as React.RefObject<HTMLElement>;
}