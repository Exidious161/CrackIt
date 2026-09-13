"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const SAMPLE_REVIEWS = [
  {
    initials: "AR",
    color: "var(--accent)",
    name: "Ananya R.",
    meta: "B.Tech CSE · TCS drive",
    stars: 5,
    quote:
      "The company breakdown for TCS was exactly what came up in my HR round. Wish I'd found this before wasting time on generic YouTube videos.",
  },
  {
    initials: "RS",
    color: "var(--blue)",
    name: "Rohit S.",
    meta: "B.Tech IT · Service Edition",
    stars: 5,
    quote:
      "The model answer templates helped me stop rambling in mock interviews. Practiced out loud like the guide said, actually made a difference.",
  },
  {
    initials: "PK",
    color: "var(--yellow)",
    name: "Priya K.",
    meta: "B.Tech ECE · Complete Bank",
    stars: 4,
    quote:
      "Bought the Complete Bank for Amazon prep — the coding appendix was a nice surprise, wasn't expecting that at this price.",
  },
  {
    initials: "KM",
    color: "var(--accent-soft)",
    name: "Karan M.",
    meta: "B.Tech CSE · Wipro drive",
    stars: 5,
    quote:
      "Straightforward PDF, no fluff. Company sections are genuinely organized by what recruiters ask, not just a random question dump.",
  },
  {
    initials: "SD",
    color: "var(--blue-soft)",
    name: "Simran D.",
    meta: "B.Tech IT · Infosys drive",
    stars: 5,
    quote:
      "Went in expecting a generic PDF, actually got company-specific patterns. The \"how to prepare\" notes before each section were the most useful part.",
  },
  {
    initials: "AV",
    color: "var(--yellow)",
    name: "Aman V.",
    meta: "B.Tech ECE · Complete Bank",
    stars: 4,
    quote:
      "Concept sheets saved me the night before — condensed OOP and DBMS into something I could actually skim in 20 minutes.",
  },
];

const CARDS = [
  {
    icon: "🔒",
    title: "Secure Shopify checkout",
    text: "Payments are processed through Shopify's own secure checkout — CrackIt never sees your card details.",
  },
  {
    icon: "⚡",
    title: "Instant delivery",
    text: "Your PDF unlocks immediately after payment — no waiting on email approvals.",
  },
  {
    icon: "✍️",
    title: "Honestly sourced",
    text: 'Built from candidate-reported experiences and public prep sources — never sold as a "leaked paper."',
  },
  {
    icon: "🎓",
    title: "For personal prep use",
    text: "Licensed for your own interview preparation — not for resale or redistribution.",
  },
];

const AUTOPLAY_MS = 4500;

function ReviewsCarousel() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  function scrollToIndex(i) {
    const next = (i + SAMPLE_REVIEWS.length) % SAMPLE_REVIEWS.length;
    cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => scrollToIndex(active + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active, paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-[18px] overflow-x-auto snap-x snap-mandatory scroll-px-6 px-1 pb-2"
      >
        {SAMPLE_REVIEWS.map((r, i) => (
          <div
            key={r.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className="relative shrink-0 snap-start w-[85%] sm:w-[calc(50%-9px)] md:w-[calc(33.333%-12px)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-[22px] text-left shadow-[var(--shadow-sm)]"
          >
            <span className="absolute top-3 right-3 text-[0.62rem] font-bold uppercase tracking-[0.04em] text-[var(--ink-faint)]">
              Sample
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full text-[0.8rem] font-bold text-[var(--ink)] shrink-0"
                style={{ backgroundColor: r.color }}
              >
                {r.initials}
              </div>
              <div>
                <div className="text-[0.9rem] font-bold text-[var(--ink)]">{r.name}</div>
                <div className="text-[0.74rem] text-[var(--ink-faint)]">{r.meta}</div>
              </div>
            </div>
            <div className="text-[var(--accent)] text-sm mb-2.5 tracking-[2px]">
              {"★".repeat(r.stars)}
              <span className="text-[var(--border)]">{"★".repeat(5 - r.stars)}</span>
            </div>
            <p className="text-[var(--ink-dim)] text-[0.86rem]">&ldquo;{r.quote}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={() => scrollToIndex(active - 1)}
          aria-label="Previous review"
          className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center transition-colors hover:bg-[var(--ink)] hover:text-white"
        >
          ←
        </button>
        <div className="flex gap-2">
          {SAMPLE_REVIEWS.map((r, i) => (
            <button
              key={r.name}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-[var(--accent)]" : "w-2 bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => scrollToIndex(active + 1)}
          aria-label="Next review"
          className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center transition-colors hover:bg-[var(--ink)] hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function Trust() {
  return (
    <section className="py-[100px] px-6" id="trust">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          Trust
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] mb-3.5">Why job-seekers choose CrackIt</h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem]">
          No hype, no fake urgency — just what you&apos;re actually getting and how it&apos;s delivered.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-16">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 90} translate="translate-y-5" scale className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            <div className="text-[1.5rem] mb-3">{c.icon}</div>
            <h4 className="text-[0.98rem] mb-2">{c.title}</h4>
            <p className="text-[var(--ink-dim)] text-[0.86rem]">{c.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="div" className="max-w-[980px] mx-auto text-center">
        <h3 className="text-[1.3rem] mb-2">Reviews</h3>
        <p className="text-[var(--ink-dim)] text-[0.92rem] mb-2">
          CrackIt just launched, so these aren&apos;t real customer reviews yet — this is a preview of how the
          section will look once genuine ones start coming in. Buy a guide and be one of the first to leave one.
        </p>
        <span className="inline-block text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[var(--accent-dark)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-[30px]">
          Preview · sample content
        </span>
        <ReviewsCarousel />
      </Reveal>
    </section>
  );
}
