"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top fixed right-[22px] bottom-[22px] w-12 h-12 rounded-full bg-[var(--dark)] text-white border-none text-[1.2rem] cursor-pointer flex items-center justify-center shadow-[var(--shadow-sm)] z-[850] ${
        visible ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3.5"
      }`}
    >
      ↑
    </button>
  );
}
