"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: "🎯",
    title: "Pick your guide",
    text: "Service Edition for the 14 mass-recruiter drives, or the Complete Bank if you're also chasing product-based and dream companies.",
  },
  {
    icon: "💳",
    title: "Checkout securely",
    text: "Pay through Shopify's own checkout — card, UPI, or netbanking. CrackIt never sees your payment details.",
  },
  {
    icon: "⚡",
    title: "Download instantly",
    text: "Your PDF unlocks the moment payment clears — straight to your device, no email approval wait.",
  },
  {
    icon: "🎓",
    title: "Walk in prepared",
    text: "Start with the Model Answer Bank, then your target company's section — and practice explaining answers out loud, not reciting them.",
  },
];

const STEP_MS = 4500;

export default function HowItWorks() {
  const [current, setCurrentState] = useState(0);
  const [playing, setPlaying] = useState(true);
  const currentRef = useRef(0);
  const playingRef = useRef(true);
  const segStartRef = useRef(null);
  const rafRef = useRef(null);
  const fillsRef = useRef([]);
  const stageRef = useRef(null);

  function setStep(i) {
    const next = (i + STEPS.length) % STEPS.length;
    currentRef.current = next;
    setCurrentState(next);
    fillsRef.current.forEach((fill, idx) => {
      if (!fill) return;
      fill.style.transition = "none";
      fill.style.width = idx < next ? "100%" : "0%";
    });
    segStartRef.current = null;
  }

  function tick(now) {
    if (!playingRef.current) return;
    if (segStartRef.current === null) segStartRef.current = now;
    const elapsed = now - segStartRef.current;
    const fill = fillsRef.current[currentRef.current];
    if (fill) {
      fill.style.transition = "none";
      fill.style.width = Math.min((elapsed / STEP_MS) * 100, 100) + "%";
    }
    if (elapsed >= STEP_MS) setStep(currentRef.current + 1);
    rafRef.current = requestAnimationFrame(tick);
  }

  function resume() {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePlayToggle() {
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } else {
      playingRef.current = true;
      setPlaying(true);
      segStartRef.current = null;
      resume();
    }
  }

  useEffect(() => {
    // current starts at 0 and .scrub-fill defaults to width:0% in CSS,
    // so no imperative reset is needed before the first tick.
    rafRef.current = requestAnimationFrame(tick);
    const el = stageRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && playingRef.current) {
            segStartRef.current = null;
            resume();
          } else if (!entry.isIntersecting) {
            cancelAnimationFrame(rafRef.current);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSegClick(idx) {
    setStep(idx);
    if (playingRef.current) resume();
  }

  return (
    <section className="py-[100px] px-6" id="how">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          How It Works
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] mb-3.5">
          From opening the PDF to <span className="text-[var(--accent)]">acing the round</span>
        </h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem]">Tap a step, or just let it play.</p>
      </Reveal>

      <Reveal as="div" className="max-w-[900px] mx-auto" delay={100}>
        <div
          ref={stageRef}
          className="relative rounded-[26px] bg-[var(--dark)] px-10 py-[52px] min-h-[220px] overflow-hidden shadow-[var(--shadow)] before:content-[''] before:absolute before:w-[280px] before:h-[280px] before:bg-[var(--accent)] before:opacity-[0.18] before:rounded-full before:-top-[120px] before:-right-[100px]"
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.title}
              className={`relative z-[1] text-center max-w-[520px] mx-auto text-white ${
                idx === current ? "block" : "hidden"
              }`}
            >
              <span className="text-[2.4rem] mb-4 inline-block">{step.icon}</span>
              <h3 className="text-[1.4rem] mb-3">{step.title}</h3>
              <p className="text-[#c7c8d1] text-[1rem]">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-[22px]">
          <button
            onClick={handlePlayToggle}
            aria-label={playing ? "Pause" : "Play"}
            className="shrink-0 w-[52px] h-[52px] rounded-full bg-[var(--dark)] text-white text-[1.1rem] flex items-center justify-center shadow-[var(--shadow-sm)] transition-transform hover:scale-[1.06]"
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <div className="flex-1 flex gap-2">
            {STEPS.map((step, idx) => (
              <div
                key={step.title}
                onClick={() => handleSegClick(idx)}
                className="scrub-seg flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden cursor-pointer"
              >
                <div
                  ref={(el) => (fillsRef.current[idx] = el)}
                  className={`scrub-fill ${idx === current ? "active" : ""} ${idx < current ? "done" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
