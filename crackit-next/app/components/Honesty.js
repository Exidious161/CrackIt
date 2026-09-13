import Reveal from "./Reveal";

const CARDS = [
  {
    icon: "🎯",
    title: "Real patterns, not scripts",
    text: "Compiled from what candidates actually reported hearing in the room — grouped by what repeats across companies.",
  },
  {
    icon: "🧠",
    title: "Explain it, don't recite it",
    text: "Every model answer is a template plus a worked example — adapt it with your own details. Interviewers can tell rehearsed lines from real understanding.",
  },
  {
    icon: "📚",
    title: "Organized to actually study from",
    text: 'A shared Model Answer Bank up front, then a company-by-company breakdown with "how to prepare" notes for each recruiter.',
  },
];

export default function Honesty() {
  return (
    <section className="py-[100px] px-6 bg-[var(--surface-2)]" id="honesty">
      <Reveal as="div" className="max-w-[900px] mx-auto text-center">
        <span className="inline-block text-[0.78rem] font-extrabold text-[var(--accent-dark)] bg-[var(--accent-soft)] px-4 py-[7px] rounded-full mb-4">
          The CrackIt difference
        </span>
        <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-[18px]">
          There&apos;s no such thing as a <span className="text-[var(--accent)]">&quot;leaked paper.&quot;</span> We
          won&apos;t pretend otherwise.
        </h2>
        <p className="text-[var(--ink-dim)] text-[1.05rem] max-w-[660px] mx-auto mb-11">
          Every question here is compiled from candidate-reported interview experiences and public placement-prep
          sources across recent hiring cycles. That means recurring patterns you can actually prepare for — not a
          script for your exact drive, because that doesn&apos;t exist.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 100}
              translate="translate-y-5"
              scale
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-[26px] shadow-[var(--shadow-sm)]"
            >
              <div className="text-[1.6rem] mb-3.5">{c.icon}</div>
              <h4 className="text-[1.04rem] mb-2">{c.title}</h4>
              <p className="text-[var(--ink-dim)] text-[0.92rem]">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
