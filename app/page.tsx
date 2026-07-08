import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { CoachingSection } from "@/components/CoachingSection";
import { About } from "@/components/About";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { EnquirySection } from "@/components/EnquirySection";
import { Footer } from "@/components/Footer";

// Section order is mandated by the brief (§5). Do not reorder: the coaching
// sequence must lead the offering, and price never leads. (The brief's final
// CTA band was merged into the enquiry section at the owner's request.)
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSection />
        <CoachingSection />
        <About />
        <SocialProof />
        <FAQ />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
