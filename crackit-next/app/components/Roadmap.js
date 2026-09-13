import Reveal from "./Reveal";

const ITEMS = [
  {
    done: true,
    tag: "Live now",
    title: "Service Companies Edition & Complete 23-Company Bank",
    text: "Both guides are live with worked model answers, company-by-company breakdowns, and (in the Complete Bank) a coding appendix and concept sheets.",
  },
  {
    tag: "Next up",
    title: "Product-based & dream-company deep dive",
    text: "A focused pack for the harder-to-crack rounds — Google, Microsoft, Adobe, Flipkart-style product companies — going beyond what the Complete Bank covers today.",
  },
  {
    tag: "Coming soon",
    title: "Mock-interview drills",
    text: "Short, scenario-based practice prompts so you can rehearse answers out loud, not just read them.",
  },
  {
    tag: "On the horizon",
    title: "Rolling updates as hiring cycles refresh",
    text: "Company sections get refreshed as new candidate-reported patterns come in each placement season, so the guides don't go stale.",
  },
];

export default function Roadmap() {
  return (
    <section className="py-[100px] px-6" id="roadmap">
      <Reveal as="div" className="max-w-[640px] mx-auto mb-[54px] text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          Roadmap
        </span>
        <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)] mb-3.5">Where CrackIt is headed</h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem]">
          This isn&apos;t a one-and-done PDF drop. Here&apos;s what&apos;s live and what&apos;s next.
        </p>
      </Reveal>

      <Reveal as="div" className="max-w-[780px] mx-auto relative pl-8 border-l-2 border-dashed border-[var(--border)]">
        {ITEMS.map((item, i) => (
          <div
            key={item.title}
            className={`timeline-dot relative ${i < ITEMS.length - 1 ? "pb-11" : ""} ${item.done ? "done" : ""}`}
          >
            <span className="block mb-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.05em] text-[var(--accent-dark)]">
              {item.tag}
            </span>
            <h4 className="text-[1.1rem] mb-1.5">{item.title}</h4>
            <p className="text-[var(--ink-dim)] text-[0.92rem]">{item.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
