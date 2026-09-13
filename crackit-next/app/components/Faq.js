"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    q: "Is this a leaked question paper?",
    a: "No — no such thing exists for a specific drive, and any guide claiming otherwise is overselling. This is a compilation of recurring patterns from candidate-reported experiences and public placement-prep sources, meant to help you prepare and explain concepts clearly, not memorize a script.",
  },
  {
    q: "What format do I get, and how fast?",
    a: "A PDF, delivered instantly after checkout through Shopify's digital delivery — no waiting.",
  },
  {
    q: "What's the actual difference between the two guides?",
    a: "The ₹199 Service Edition covers the 14 mass-recruiter IT services companies most students interview with first. The ₹399 Complete Bank covers all 23 — adding product-based and dream companies like Amazon, Oracle, Zoho, Deloitte, and EPAM — plus a coding-solutions appendix and 9 concept reference sheets the Service Edition doesn't include.",
  },
  {
    q: "Will this help for non-IT or core-branch interviews?",
    a: "The behavioral/HR framework (Model Answer Bank) transfers to almost any interview. The technical content is focused on IT/software recruitment, so it's the strongest fit if you're interviewing for a software or IT-services role.",
  },
  {
    q: "What's your refund policy?",
    a: "Because this is an instantly-delivered digital file, we can't offer refunds once it's downloaded. If something's wrong with your order or the file won't open, contact us and we'll sort it out.",
  },
  {
    q: "Can I share this with friends or resell it?",
    a: "It's licensed for your own personal interview preparation. Please don't redistribute or resell it — point your friends to CrackIt instead.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState({});
  const bodyRefs = useRef([]);

  function handleToggle(i, open) {
    if (!open) {
      const el = bodyRefs.current[i];
      if (el) setHeights((h) => ({ ...h, [i]: el.scrollHeight }));
    }
    setOpenIndex(open ? null : i);
  }

  return (
    <section className="py-[100px] px-6" id="faq">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          FAQ
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)]">Questions, answered honestly</h2>
      </Reveal>

      <Reveal as="div" className="max-w-[760px] mx-auto">
        {ITEMS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className={`faq-item border-b border-[var(--border)] ${open ? "open" : ""}`}>
              <button
                onClick={() => handleToggle(i, open)}
                className="faq-q w-full text-left bg-none border-none text-[var(--ink)] text-base font-bold py-[22px] px-1 cursor-pointer flex justify-between items-center gap-4"
              >
                {item.q}
                <span className="plus text-[var(--accent)] text-[1.3rem] shrink-0">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open ? `${heights[i] ?? 300}px` : "0px" }}>
                <p ref={(el) => (bodyRefs.current[i] = el)} className="text-[var(--ink-dim)] text-[0.94rem] px-1 pb-[22px]">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
