import Reveal from "./Reveal";
import RippleButton from "./RippleButton";

export default function FinalCta() {
  return (
    <Reveal as="section" className="relative overflow-hidden text-center text-white bg-[var(--dark)] rounded-[32px] mx-6 px-6 py-[90px] before:content-[''] before:absolute before:w-[320px] before:h-[320px] before:bg-[var(--accent)] before:opacity-[0.22] before:rounded-full before:-bottom-40 before:-left-[100px]">
      <h2 className="relative z-[1] text-[clamp(1.7rem,3.4vw,2.4rem)] mb-7 max-w-[600px] mx-auto">
        Your next interview shouldn&apos;t start from zero.
      </h2>
      <RippleButton
        href="#products"
        className="relative z-[1] bg-[var(--accent)] text-white shadow-[0_14px_30px_-12px_rgba(255,106,26,.55)] hover:bg-[var(--accent-dark)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 rounded-full px-[30px] py-4 text-[1.02rem] font-bold transition-all"
      >
        Get Your Guide
      </RippleButton>
    </Reveal>
  );
}
