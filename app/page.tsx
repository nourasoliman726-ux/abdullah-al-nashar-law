import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import LegalContentSection from "@/components/LegalContentSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <LegalContentSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}