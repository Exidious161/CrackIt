import ProgressBar from "./components/ProgressBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LogosMarquee from "./components/LogosMarquee";
import HowItWorks from "./components/HowItWorks";
import Honesty from "./components/Honesty";
import Pricing from "./components/Pricing";
import WhatsInside from "./components/WhatsInside";
import Roadmap from "./components/Roadmap";
import Trust from "./components/Trust";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <LogosMarquee />
        <HowItWorks />
        <Honesty />
        <Pricing />
        <WhatsInside />
        <Roadmap />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
