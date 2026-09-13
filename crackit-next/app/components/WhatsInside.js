"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const TABS = [
  {
    id: "answers",
    label: "Model Answer Bank",
    heading: "Section 1 · Model Answer Bank",
    body: (
      <>
        <p>
          The questions that repeat at almost every company in the guide — each with a template for structuring
          your answer, plus a worked example you adapt with your own details.
        </p>
        <ul className="mt-2.5">
          <li>&quot;Tell me about yourself&quot; — a 60-second structure</li>
          <li>&quot;Strengths and weaknesses&quot; — without the clichés</li>
          <li>&quot;Why should we hire you?&quot; / &quot;Why this company?&quot;</li>
          <li>Behavioral (STAR) questions on teamwork and conflict</li>
          <li>Technical concepts likely to get a follow-up (Complete Bank)</li>
        </ul>
      </>
    ),
    mockTag: "Section 1 · Sample",
    mockTitle: '"Tell me about yourself."',
    mockQ:
      "Template: present (course, year, college) → one relevant strength or project → why you're here / what you're looking for. Keep it under 60 seconds.",
    mockA:
      '"I\'m a final-year Computer Science student at [college], and I\'ve spent the last year focused on backend development — my strongest project was a [brief description] where I handled [specific part]…"',
  },
  {
    id: "company",
    label: "Company Breakdown",
    heading: "Section 2 · Company-by-Company",
    body: (
      <>
        <p>
          Every recruiter gets its own section: a &quot;how to prepare&quot; note on what that company&apos;s rounds
          actually emphasize, then its HR and technical questions.
        </p>
        <ul className="mt-2.5">
          <li>HR round questions specific to that recruiter&apos;s style</li>
          <li>Technical questions grouped by subject (OOP, DBMS, OS, C/C++…)</li>
          <li>What that company&apos;s interviewers tend to weight most</li>
        </ul>
      </>
    ),
    mockTag: "Part A · Company 1 of 23",
    mockTitle: "TCS — NQT-track roles (Ninja / Digital / Prime)",
    mockQ:
      "TCS interviewers often open with a casual, off-script line to see how you handle being thrown off — answer briefly and naturally, then move to your prepared material.",
    mockQPlain: true,
    mockList: [
      "What's your USP? Are you okay with relocation?",
      "Java vs. C# vs. C — key differences",
      "Write a SQL query using LIKE vs. =",
      "Explain any project on your resume, end-to-end",
    ],
  },
  {
    id: "coding",
    label: "Coding Appendix",
    heading: "Section 3 · Coding Solutions Appendix",
    headingNote: "(Complete Bank only)",
    body: (
      <>
        <p>The recurring &quot;write a program to…&quot; questions, worked end-to-end — not just described, actually solved.</p>
        <ul className="mt-2.5">
          <li>6 fully worked programs covering the patterns that show up across service-company technical rounds</li>
          <li>Clean, commented code you can walk an interviewer through line by line</li>
          <li>Picked for frequency, not novelty — the ones that actually get asked</li>
        </ul>
      </>
    ),
    mockTag: "Section 3 · Sample entry",
    mockTitle: '"Write a C program for the Fibonacci series."',
    mockA:
      "Iterative solution walkthrough, expected output, and the follow-up interviewers usually ask next — how you'd adapt it to a recursive version.",
  },
  {
    id: "concepts",
    label: "Concept Sheets",
    heading: "Section 4 · Concept Quick-Reference Sheets",
    headingNote: "(Complete Bank only)",
    body: (
      <>
        <p>9 topics condensed to a page each, so you can close a knowledge gap instead of just seeing that it exists.</p>
        <ul className="mt-2.5">
          <li>OOP fundamentals, DBMS &amp; normalization, OS scheduling</li>
          <li>Testing types, SDLC models, data structure basics</li>
          <li>C/C++ memory model, networking &amp; cloud fundamentals</li>
        </ul>
      </>
    ),
    mockTag: "Section 4 · Sample sheet",
    mockTitle: "OOP — the four pillars",
    mockA: "Encapsulation, abstraction, inheritance, polymorphism — one paragraph each, worded the way you'd actually say it out loud in an interview.",
  },
];

export default function WhatsInside() {
  const [active, setActive] = useState("answers");
  const tab = TABS.find((t) => t.id === active);

  return (
    <section className="py-[100px] px-6" id="whats-inside">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          Preview
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] mb-3.5">What&apos;s actually inside</h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem]">
          No mystery boxes. Here&apos;s exactly what you&apos;re opening the moment you download.
        </p>
      </Reveal>

      <Reveal as="div" className="max-w-[1000px] mx-auto">
        <div className="flex gap-2.5 flex-wrap justify-center mb-9">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full border-2 px-5 py-[11px] text-[0.86rem] font-bold transition-colors ${
                active === t.id
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : "bg-[var(--surface)] text-[var(--ink-dim)] border-[var(--border)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-[1.3rem] mb-3">
              {tab.heading}{" "}
              {tab.headingNote && (
                <em className="not-italic text-[var(--ink-faint)] text-[0.8rem]">{tab.headingNote}</em>
              )}
            </h3>
            <div className="text-[var(--ink-dim)] [&_ul]:mt-2.5 [&_li]:relative [&_li]:pl-5 [&_li]:py-[5px] [&_li]:text-[0.92rem] [&_li]:text-[var(--ink-dim)] [&_li]:before:content-['›'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[var(--accent)] [&_li]:before:font-extrabold">
              {tab.body}
            </div>
          </div>
          <div className="order-1 md:order-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-[26px] shadow-[var(--shadow-sm)] text-[0.84rem]">
            <div className="text-[0.68rem] uppercase tracking-[0.06em] text-[var(--accent-dark)] font-extrabold mb-2.5">
              {tab.mockTag}
            </div>
            <h5 className="text-[1rem] mb-2">{tab.mockTitle}</h5>
            {tab.mockQ && (
              <p
                className={
                  tab.mockQPlain
                    ? "text-[var(--ink-dim)] text-[0.82rem]"
                    : "text-[var(--ink)] italic mb-1.5"
                }
              >
                {tab.mockQ}
              </p>
            )}
            {tab.mockList && (
              <ul className="mt-2.5">
                {tab.mockList.map((item) => (
                  <li key={item} className="text-[var(--ink-dim)] text-[0.82rem] py-1">
                    · {item}
                  </li>
                ))}
              </ul>
            )}
            {tab.mockA && (
              <div className="text-[var(--ink-dim)] text-[0.82rem] border-l-[3px] border-[var(--accent)] pl-3 mt-2">
                {tab.mockA}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
