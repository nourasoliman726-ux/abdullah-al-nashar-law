import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { SITE, whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export const metadata = {
  title: "تواصل معنا | عبد الله النشار للمحاماة والاستشارات القانونية",
  description: "تواصل مع مكتب الأستاذ عبد الله النشار عبر الهاتف أو واتساب أو البريد الإلكتروني، أو زُر المكتب في دمنهور.",
};

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&output=embed`;

export default function ContactPage() {
  const cards = [
    {
      icon: Phone,
      title: "اتصل الآن",
      value: SITE.phone,
      dir: "ltr" as const,
      href: SITE.phoneHref,
    },
    {
      icon: MessageCircle,
      title: "واتساب",
      value: SITE.phone,
      dir: "ltr" as const,
      href: whatsappUrl(DEFAULT_WHATSAPP_MESSAGE),
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: SITE.email,
      dir: "ltr" as const,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: MapPin,
      title: "الموقع",
      value: SITE.address,
      dir: "rtl" as const,
      href: SITE.googleMaps,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <Link href="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span> تواصل معنا
            </div>
            <div className="text-sm font-semibold text-gold mb-3">تواصل معنا</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              نسعد بتواصلك معنا
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              يمكنك التواصل مع مكتب الأستاذ عبد الله النشار عبر أي من الوسائل التالية.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
              {cards.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.title === "الموقع" || c.title === "واتساب" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="rounded-xl p-6 bg-white border border-[#EEE9DF] hover:border-gold transition-colors text-right block"
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-navy mb-5 mr-auto ml-0">
                    <c.icon size={20} className="text-gold" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-bold mb-2 text-slate">{c.title}</h3>
                  <p dir={c.dir} className="text-sm leading-relaxed text-gray-500">
                    {c.value}
                  </p>
                </a>
              ))}
            </div>

            {/* الخريطة */}
            <div className="rounded-xl overflow-hidden border border-[#EEE9DF] mb-6">
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المكتب على الخريطة"
              />
            </div>

            <div className="text-center">
              <a
                href={SITE.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg border border-slate text-slate hover:bg-slate hover:text-white transition-colors"
              >
                فتح الموقع على Google Maps <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}