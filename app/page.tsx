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
import {
  getPublishedVideos,
  getPublishedArticles,
  getActiveServices,
  getActiveFaqs,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [videos, articles, services, faqs] = await Promise.all([
    getPublishedVideos(),
    getPublishedArticles(),
    getActiveServices(),
    getActiveFaqs(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <TrustSection />
      <AboutSection />
      <ServicesSection services={services} />
      <LegalContentSection videos={videos} articles={articles} />
      <FaqSection faqs={faqs} />
      <CtaBanner />
      <Footer />
      <FloatingWhatsapp />
    </main>
  );
}