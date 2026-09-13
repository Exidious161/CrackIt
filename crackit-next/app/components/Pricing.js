"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import RippleButton from "./RippleButton";

const TIERS = [
  {
    id: "service-edition",
    featured: false,
    tier: "Service Companies Edition",
    title: "Placement Interview Questions: What's Actually Asked",
    desc: "The 14 companies most students face first — the safety-net drives.",
    price: "₹199",
    features: [
      "14 major IT service recruiters — TCS, Infosys, Wipro, Capgemini, Accenture, Cognizant & more",
      "300+ real HR and technical questions",
      "12 fully worked model answers",
      'Company-by-company breakdown with "how to prepare" notes',
      "18 pages · instant PDF download",
    ],
    cta: "Get the Service Edition — ₹199",
    meta: "Best for campus drives at mass-recruiter IT services companies",
  },
  {
    id: "complete-edition",
    featured: true,
    tier: "Complete Edition",
    title: "The Complete Interview Question Bank — 23 Companies",
    desc: "Everything in the Service Edition, plus the product-based and dream-company tier.",
    price: "₹399",
    features: [
      "All 14 service companies + Deloitte, Zoho, Oracle, Amazon, EPAM, Virtusa, NTT Data & more (23 total)",
      "440+ questions, organized by topic — not dumped in one list",
      "20 fully worked model answers (HR + technical concepts)",
      "6-program coding solutions appendix",
      "9 concept quick-reference sheets",
      "31 pages · instant PDF download",
    ],
    cta: "Get the Complete Bank — ₹399",
    meta: "Best for students also targeting product-based & dream companies",
  },
];

const COMPARE_ROWS = [
  ["Companies covered", "14", "23"],
  ["Total questions", "300+", "440+"],
  ["Fully worked model answers", "12", "20"],
  ["Technical questions organized by topic", "—", "✓"],
  ["Coding solutions appendix", "—", "✓ 6 programs"],
  ["Concept quick-reference sheets", "—", "✓ 9 topics"],
  ["Product-based / dream companies", "—", "Amazon, Oracle, Zoho, Deloitte, EPAM & more"],
  ["Pages", "18", "31"],
];

function PriceCard({ tier, delay }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const canHoverRef = useRef(false);

  function handleMouseMove(e) {
    if (typeof window !== "undefined") {
      canHoverRef.current =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (!canHoverRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    if (shineRef.current) {
      shineRef.current.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      shineRef.current.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    }
  }

  function handleMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "";
  }

  function handleBuyClick(e) {
    e.preventDefault();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    console.warn(`CrackIt: "${tier.id}" buy button has no Shopify checkout URL yet — wire it up before launch.`);
  }

  return (
    <Reveal delay={delay} translate="translate-y-5" scale>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`price-card relative rounded-[26px] border-2 p-9 px-8 flex flex-col h-full ${
          tier.featured
            ? "bg-[var(--dark)] border-[var(--dark)] text-white"
            : "bg-[var(--surface)] border-[var(--border)]"
        }`}
      >
        <div ref={shineRef} className="price-card-shine" />
        {tier.featured && (
          <span className="absolute -top-[15px] left-8 rounded-full bg-[var(--accent)] px-4 py-[7px] text-[0.72rem] font-extrabold uppercase tracking-[0.03em] text-white">
            Most Popular
          </span>
        )}
        <div
          className={`text-[0.82rem] font-bold uppercase tracking-[0.06em] mb-2.5 ${
            tier.featured ? "text-[#9fa0ab]" : "text-[var(--ink-faint)]"
          }`}
        >
          {tier.tier}
        </div>
        <h3 className="text-[1.35rem] mb-2.5">{tier.title}</h3>
        <p className={`text-[0.92rem] mb-[22px] min-h-11 ${tier.featured ? "text-[#c7c8d1]" : "text-[var(--ink-dim)]"}`}>
          {tier.desc}
        </p>
        <div className="flex items-baseline gap-2 mb-[26px]">
          <span className="font-head text-[2.7rem] font-bold">{tier.price}</span>
        </div>
        <ul className="mb-7 flex-1">
          {tier.features.map((f, i) => (
            <li
              key={f}
              className={`flex gap-2.5 py-[9px] text-[0.92rem] ${
                i < tier.features.length - 1
                  ? `border-b border-dashed ${tier.featured ? "border-[#33343d]" : "border-[var(--border)]"}`
                  : ""
              } ${tier.featured ? "text-[#dcdde4]" : "text-[var(--ink-dim)]"}`}
            >
              <span className="shrink-0 font-bold text-[var(--accent)]">✓</span> {f}
            </li>
          ))}
        </ul>
        <RippleButton
          as="a"
          href="#"
          onClick={handleBuyClick}
          className="w-full bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] inline-flex items-center justify-center gap-2 rounded-full px-6 py-[13px] text-[0.94rem] font-bold transition-colors"
        >
          {tier.cta}
        </RippleButton>
        <p className={`text-[0.78rem] mt-3.5 text-center ${tier.featured ? "text-[#9fa0ab]" : "text-[var(--ink-faint)]"}`}>
          {tier.meta}
        </p>
      </div>
    </Reveal>
  );
}

export default function Pricing() {
  return (
    <section className="py-[100px] px-6" id="products">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          Pricing
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] mb-3.5">Pick your prep level</h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem]">
          Two guides, same honesty. Choose based on how wide a net you&apos;re casting this placement season.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] max-w-[960px] mx-auto mb-[60px]">
        {TIERS.map((tier, i) => (
          <PriceCard key={tier.id} tier={tier} delay={i * 120} />
        ))}
      </div>

      <Reveal as="div" className="overflow-x-auto max-w-[960px] mx-auto">
        <table className="w-full min-w-[560px] border-collapse rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-sm)] overflow-hidden">
          <thead>
            <tr>
              <th className="px-[18px] py-[15px] text-left text-[0.72rem] font-bold uppercase tracking-[0.05em] text-[var(--ink-faint)] bg-[var(--surface-2)] border-b border-[var(--border)]">
                What you get
              </th>
              <th className="px-[18px] py-[15px] text-center text-[0.72rem] font-bold uppercase tracking-[0.05em] text-[var(--ink-faint)] bg-[var(--surface-2)] border-b border-[var(--border)]">
                Service Edition · ₹199
              </th>
              <th className="px-[18px] py-[15px] text-center text-[0.72rem] font-bold uppercase tracking-[0.05em] text-[var(--ink-faint)] bg-[var(--surface-2)] border-b border-[var(--border)]">
                Complete Bank · ₹399
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(([label, a, b], i) => (
              <tr key={label}>
                <td
                  className={`px-[18px] py-[15px] text-[0.9rem] ${
                    i < COMPARE_ROWS.length - 1 ? "border-b border-[var(--border)]" : ""
                  }`}
                >
                  {label}
                </td>
                <td
                  className={`px-[18px] py-[15px] text-[0.9rem] text-center ${
                    a === "—" ? "text-[var(--ink-faint)]" : ""
                  } ${i < COMPARE_ROWS.length - 1 ? "border-b border-[var(--border)]" : ""}`}
                >
                  {a}
                </td>
                <td
                  className={`px-[18px] py-[15px] text-[0.9rem] text-center font-bold text-[var(--accent-dark)] ${
                    i < COMPARE_ROWS.length - 1 ? "border-b border-[var(--border)]" : ""
                  }`}
                >
                  {b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
