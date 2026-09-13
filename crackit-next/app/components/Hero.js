"use client";

import { useEffect, useRef, useState } from "react";
import RippleButton from "./RippleButton";

function StatCounter({ target, label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
              else setValue(target);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <span className="block font-head text-[1.7rem] font-bold text-[var(--ink)]">{value}</span>
      <span className="text-[0.76rem] text-[var(--ink-faint)] uppercase tracking-[0.05em]">{label}</span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const mascotRef = useRef(null);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function handleMouseMove(e) {
    if (!canHoverRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.left = x + "px";
      glowRef.current.style.top = y + "px";
    }
    if (mascotRef.current) {
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      mascotRef.current.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
    }
  }

  function handleMouseLeave() {
    if (mascotRef.current) mascotRef.current.style.transform = "";
  }

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-section relative overflow-hidden px-6 pt-[150px] pb-10"
    >
      <div className="blob w-[260px] h-[260px] bg-[var(--blue)] top-[70px] right-[6%] opacity-90" />
      <div className="blob w-[120px] h-[120px] bg-[var(--yellow)] top-[220px] left-[4%] opacity-85 [animation-name:floatSlow] [animation-duration:8s]" />
      <div ref={glowRef} className="cursor-glow" />

      <div className="relative z-[1] max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-5 items-center text-center md:text-left">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-[0.8rem] font-bold text-[var(--accent-dark)] mb-[22px]">
            ✨ Placement Season Prep · Updated for 2026 drives
          </span>
          <h1 className="text-[clamp(2.3rem,4.6vw,3.6rem)] mb-5 text-[var(--ink)]">
            Stop guessing what
            <br />
            they&apos;ll <span className="text-[var(--accent)]">actually ask</span>.
          </h1>
          <p className="text-[1.08rem] text-[var(--ink-dim)] max-w-[480px] mb-8 mx-auto md:mx-0">
            Real HR and technical questions compiled from recent campus drives at up to 23 companies — plus worked
            model answers. Not a leaked paper. Not a generic template. Just the patterns that actually repeat.
          </p>
          <div className="flex gap-3.5 flex-wrap mb-[38px] justify-center md:justify-start">
            <RippleButton
              href="#products"
              className="bg-[var(--accent)] text-white shadow-[0_14px_30px_-12px_rgba(255,106,26,.55)] hover:bg-[var(--accent-dark)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 rounded-full px-[30px] py-4 text-[1.02rem] font-bold transition-all"
            >
              See the Guides — from ₹199
            </RippleButton>
            <RippleButton
              href="#how"
              className="border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white inline-flex items-center justify-center gap-2 rounded-full px-[30px] py-4 text-[1.02rem] font-bold transition-colors"
            >
              How It Works ↓
            </RippleButton>
          </div>
          <div className="flex gap-7 flex-wrap justify-center md:justify-start">
            <StatCounter target={23} label="Companies" />
            <StatCounter target={440} label="Questions" />
            <StatCounter target={20} label="Worked Answers" />
          </div>
        </div>

        <div className="relative flex items-center justify-center mt-5 md:mt-0">
          <div ref={mascotRef} className="mascot-wrap relative w-full max-w-[400px]">
            <div className="float-chip absolute top-[6%] left-[-6%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[0.82rem] font-bold shadow-[var(--shadow-sm)]">
              🎯 300+ real Qs
            </div>
            <div className="float-chip chip-slow absolute bottom-[10%] right-[-8%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[0.82rem] font-bold shadow-[var(--shadow-sm)]">
              ✅ Selected
            </div>
            <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-auto">
              <defs>
                <radialGradient id="bgGrad" cx="32%" cy="26%" r="85%">
                  <stop offset="0%" stopColor="#2c2d36" />
                  <stop offset="100%" stopColor="var(--dark)" />
                </radialGradient>
                <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0.9" y2="1">
                  <stop offset="0%" stopColor="#FF8B4E" />
                  <stop offset="100%" stopColor="var(--accent-dark)" />
                </linearGradient>
                <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--accent-dark)" />
                  <stop offset="100%" stopColor="#A83808" />
                </linearGradient>
                <radialGradient id="skinGrad" cx="34%" cy="28%" r="78%">
                  <stop offset="0%" stopColor="#FFDFC0" />
                  <stop offset="100%" stopColor="#EFAD7C" />
                </radialGradient>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F3FAFF" />
                  <stop offset="100%" stopColor="var(--blue-soft)" />
                </linearGradient>
                <linearGradient id="deckGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E4E4E9" />
                </linearGradient>
                <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3a2c22" />
                  <stop offset="100%" stopColor="#201812" />
                </linearGradient>
                <filter id="heroShadow" x="-40%" y="-20%" width="180%" height="170%">
                  <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.3" />
                </filter>
              </defs>

              <circle cx="210" cy="220" r="190" fill="url(#bgGrad)" />

              <circle cx="330" cy="88" r="4" fill="var(--yellow)" />
              <circle cx="320" cy="102" r="7" fill="var(--yellow)" opacity="0.9" />
              <circle cx="70" cy="330" r="7" fill="var(--blue)" />
              <circle cx="60" cy="110" r="5" fill="var(--accent)" />
              <path
                d="M300 344 l4.5 -11 4.5 11 11 4.5 -11 4.5 -4.5 11 -4.5 -11 -11 -4.5 Z"
                fill="var(--yellow)"
              />

              <ellipse cx="210" cy="392" rx="118" ry="16" fill="rgba(0,0,0,.28)" />

              <g filter="url(#heroShadow)">
                {/* laptop */}
                <rect x="122" y="272" width="176" height="112" rx="14" fill="url(#deckGrad)" />
                <rect x="140" y="290" width="140" height="76" rx="6" fill="url(#screenGrad)" />
                <path d="M140 290 L280 290 L252 300 L168 300 Z" fill="#ffffff" opacity="0.3" />
                <path
                  d="M188 328 l16 16 32 -34"
                  stroke="var(--accent)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                {/* torso */}
                <rect x="132" y="176" width="156" height="140" rx="60" fill="url(#hoodieGrad)" />
                <path
                  d="M180 178 C190 190 230 190 240 178 L233 168 C222 176 198 176 187 168 Z"
                  fill="var(--accent-dark)"
                  opacity="0.5"
                />
                <path
                  d="M148 210 C142 240 142 275 152 306"
                  stroke="#000"
                  strokeOpacity="0.08"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* raised celebrating arm */}
                <rect
                  x="270"
                  y="140"
                  width="26"
                  height="90"
                  rx="13"
                  fill="url(#sleeveGrad)"
                  transform="rotate(18 283 185)"
                />
                <circle cx="308" cy="140" r="20" fill="url(#skinGrad)" />
                <path d="M296 129 q12 -9 24 0" stroke="#E3A06E" strokeWidth="3" strokeLinecap="round" fill="none" />
                <rect x="298" y="118" width="14" height="30" rx="7" fill="url(#skinGrad)" />

                {/* resting arm */}
                <rect
                  x="150"
                  y="230"
                  width="24"
                  height="70"
                  rx="12"
                  fill="url(#sleeveGrad)"
                  transform="rotate(-8 162 260)"
                />

                {/* neck + head */}
                <rect x="196" y="188" width="28" height="24" rx="10" fill="url(#skinGrad)" />
                <circle cx="210" cy="150" r="56" fill="url(#skinGrad)" />

                {/* ears */}
                <circle cx="156" cy="152" r="8" fill="#EFAD7C" />
                <circle cx="264" cy="152" r="8" fill="#EFAD7C" />

                {/* hair */}
                <path
                  d="M152 146
                     C148 104 176 78 210 78
                     C246 78 272 106 268 148
                     C262 130 250 140 250 122
                     C232 138 190 138 172 122
                     C170 138 158 130 152 146 Z"
                  fill="url(#hairGrad)"
                />

                {/* face */}
                <path d="M180 141 q7 -7 15 -3" stroke="#3a2c22" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M225 138 q8 -4 15 3" stroke="#3a2c22" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="188" cy="153" r="10" fill="none" stroke="#2b2b2b" strokeWidth="4" />
                <circle cx="232" cy="153" r="10" fill="none" stroke="#2b2b2b" strokeWidth="4" />
                <circle cx="191" cy="151" r="2.2" fill="#2b2b2b" />
                <circle cx="235" cy="151" r="2.2" fill="#2b2b2b" />
                <line x1="198" y1="153" x2="222" y2="153" stroke="#2b2b2b" strokeWidth="3.5" />
                <path d="M181 153 l-9 -2 M239 153 l9 -2" stroke="#2b2b2b" strokeWidth="3" strokeLinecap="round" />
                <path d="M196 176 q14 13 28 0" stroke="#8a4a2c" strokeWidth="5" fill="none" strokeLinecap="round" />
                <circle cx="180" cy="168" r="7" fill="var(--accent)" opacity="0.18" />
                <circle cx="240" cy="168" r="7" fill="var(--accent)" opacity="0.18" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
