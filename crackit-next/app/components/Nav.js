"use client";

import { useEffect, useRef, useState } from "react";
import RippleButton from "./RippleButton";

const LINKS = [
  { href: "#how", label: "How It Works" },
  { href: "#whats-inside", label: "What's Inside" },
  { href: "#products", label: "Pricing" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const THRESHOLD = 6; // ignore sub-pixel/jitter deltas from trackpad & momentum scrolling
    let ticking = false;

    function update() {
      const y = window.scrollY;
      setCompact(y > 40);
      setHidden((prevHidden) => {
        if (open) return false;
        if (y <= 160) return false;
        const delta = y - lastY.current;
        if (delta > THRESHOLD) return true;
        if (delta < -THRESHOLD) return false;
        return prevHidden;
      });
      lastY.current = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <div className="fixed top-[18px] left-0 right-0 z-[900] flex justify-center px-4">
      <header
        className={`nav-pill w-full max-w-[1080px] rounded-full bg-[var(--dark)] pl-[22px] pr-3 py-[10px] flex items-center justify-between gap-5 shadow-[0_16px_40px_-14px_rgba(22,23,27,.45)] ${
          compact ? "nav-compact" : ""
        } ${hidden ? "nav-hidden" : ""}`}
      >
        <a href="#top" className="font-head text-[1.3rem] font-bold text-white -tracking-[0.01em]">
          Crack<span className="text-[var(--accent)]">It</span>
        </a>
        <nav className={`nav-links gap-[26px] text-[0.9rem] font-medium text-[#c7c8d1] hidden md:flex`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <RippleButton
          href="#products"
          className="hidden md:inline-flex whitespace-nowrap bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] items-center justify-center gap-2 rounded-full px-6 py-[13px] text-[0.94rem] font-bold transition-colors"
        >
          Get the Bank
        </RippleButton>
        <button
          className="md:hidden text-white text-[1.4rem] p-1.5"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </header>

      {open && (
        <nav className="md:hidden fixed top-[76px] left-4 right-4 z-[800] flex flex-col rounded-[20px] bg-[var(--dark)] px-[22px] py-2.5">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-[13px] text-white ${i < LINKS.length - 1 ? "border-b border-[#2c2d36]" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
