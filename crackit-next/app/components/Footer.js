export default function Footer() {
  return (
    <footer className="px-6 pt-[60px] pb-[34px] mt-10">
      <div className="max-w-[1180px] mx-auto">
        <div className="font-head text-[1.2rem] font-bold mb-4">
          Crack<span className="text-[var(--accent)]">It</span>
        </div>
        <p className="text-[var(--ink-faint)] text-[0.78rem] leading-[1.7] max-w-[900px] mb-5">
          CrackIt is an independent publisher and is not affiliated with, endorsed by, or sponsored by TCS, Infosys,
          Wipro, Capgemini, Accenture, Cognizant, HCL Technologies, Tech Mahindra, IBM, LTIMindtree, Deloitte,
          Genpact, Zoho, Oracle, Mphasis, Hexaware, Persistent Systems, Amazon, Publicis Sapient, EPAM Systems,
          Virtusa, NTT Data, Zensar Technologies, or any other company named in these guides. Company names are used
          descriptively to indicate the recruiters these interview patterns were compiled from. All trademarks
          belong to their respective owners.
        </p>
        <div className="flex gap-[22px] text-[0.86rem] text-[var(--ink-dim)] mb-5 flex-wrap">
          <a href="mailto:chaudharyavnish161@gmail.com" className="hover:text-[var(--accent-dark)]">
            Contact
          </a>
          <a href="#faq" className="hover:text-[var(--accent-dark)]">
            Refund Policy
          </a>
          <a href="#faq" className="hover:text-[var(--accent-dark)]">
            FAQ
          </a>
        </div>
        <p className="text-[var(--ink-faint)] text-[0.8rem]">© 2026 CrackIt. All rights reserved.</p>
      </div>
    </footer>
  );
}
