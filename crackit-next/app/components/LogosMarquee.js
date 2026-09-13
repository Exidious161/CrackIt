const COMPANIES = [
  "TCS", "Infosys", "Wipro", "Capgemini", "Accenture", "Cognizant", "HCL Technologies",
  "Tech Mahindra", "IBM", "LTIMindtree", "Deloitte", "Genpact", "Zoho", "Oracle",
  "Mphasis", "Hexaware", "Persistent Systems", "Amazon", "Publicis Sapient",
  "EPAM Systems", "Virtusa", "NTT Data", "Zensar Technologies",
];

export default function LogosMarquee() {
  const chips = [...COMPANIES, ...COMPANIES];

  return (
    <section className="py-9 pt-9 pb-2.5">
      <p className="text-center text-[0.8rem] text-[var(--ink-faint)] uppercase tracking-[0.08em] mb-5">
        Questions compiled from patterns reported at drives for
      </p>
      <div className="logos-track">
        <div className="logos-scroll">
          {chips.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="rounded-full border-[1.5px] border-[var(--border)] bg-[var(--surface)] px-[18px] py-[9px] text-[0.84rem] font-semibold text-[var(--ink-dim)] whitespace-nowrap"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
