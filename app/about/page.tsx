import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { ABOUT, TRUST_VALUES, whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";
import { FileCheck, RefreshCw, Eye, Lock, LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { FileCheck, RefreshCw, Eye, Lock };

export const metadata = {
  title: "من نحن | عبد الله النشار للمحاماة والاستشارات القانونية",
  description:
    "تعرف على الأستاذ عبد الله النشار، المحاماة والاستشارات القانونية بمدينة دمنهور، محافظة البحيرة.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* رأس الصفحة */}
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <Link href="/" className="hover:text-gold">
                الرئيسية
              </Link>{" "}
              <span className="mx-1">/</span> من نحن
            </div>
            <div className="text-sm font-semibold text-gold mb-3">من نحن</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              الأستاذ عبد الله النشار
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              المحاماة والاستشارات القانونية — دمنهور، محافظة البحيرة.
            </p>
          </div>
        </section>

        {/* الصورة والنبذة */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* صورة المحامي */}
            <div className="order-1 relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
              <Image
                src="/images/about/abdullah.png"
                alt="الأستاذ عبد الله النشار"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                priority
              />
              {/* تدرج خفيف من تحت */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
              {/* إطار ذهبي */}
              <div className="absolute inset-0 border border-gold/25 rounded-2xl pointer-events-none" />
            </div>

            <div className="order-2 text-right">
              <div className="text-sm font-semibold mb-3 text-gold">نبذة تعريفية</div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-slate">
                {ABOUT.subtitle}
              </h2>
              <p className="text-sm md:text-base leading-relaxed mb-6 text-gray-600">
                {ABOUT.paragraph}
              </p>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">
                يحرص المكتب على أن تكون كل استشارة نقطة بداية واضحة للعميل، من خلال شرح الموقف
                القانوني بلغة مبسطة، وتوضيح الخطوات المتاحة قبل اتخاذ أي قرار، مع متابعة الإجراءات
                أولًا بأول وإطلاع العميل على مستجداتها.
              </p>
            </div>
          </div>
        </section>

        {/* الرسالة والقيم */}
        <section className="py-20 bg-navy">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-14">
              <div className="text-sm font-semibold mb-3 text-gold">رسالتنا وقيمنا</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                المبادئ التي نعمل بها
              </h2>
              <p className="max-w-xl mx-auto text-sm md:text-base text-grayText">
                منهج عمل واضح يقوم على السرية والوضوح والمتابعة المستمرة مع كل عميل.
              </p>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_VALUES.map((v) => {
                const Icon = ICONS[v.icon] ?? FileCheck;
                return (
                  <div
                    key={v.title}
                    className="rounded-xl p-6 bg-card border border-cardBorder text-right"
                  >
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center border border-gold mb-5 mr-auto ml-0">
                      <Icon size={20} className="text-gold" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-white">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-grayText">{v.desc}</p>
                  </div>
                );
              })}
            </div> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {TRUST_VALUES.map((v) => {
    const Icon = ICONS[v.icon] ?? FileCheck;
    return (
      <div
        key={v.title}
        className="group rounded-xl p-6 bg-card border border-cardBorder text-right
                   transition-all duration-300 ease-out
                   hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold/10
                   hover:border-gold/50 cursor-default"
      >
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center border border-gold mb-5 mr-auto ml-0
                     transition-all duration-300
                     group-hover:bg-gold/10 group-hover:scale-110"
        >
          <Icon
            size={20}
            className="text-gold transition-colors duration-300"
            strokeWidth={1.75}
          />
        </div>
        <h3 className="text-base font-bold mb-2 text-white group-hover:text-gold transition-colors duration-300">
          {v.title}
        </h3>
        <p className="text-sm leading-relaxed text-grayText">
          {v.desc}
        </p>
      </div>
    );
  })}
</div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-cream">
          <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate mb-4">
              عندك موضوع قانوني وعاوز تتكلم معايا مباشرة؟
            </h2>
            <p className="text-sm md:text-base text-gray-500 mb-8">
              تواصل عبر واتساب أو احجز استشارة وسيتم الرد عليك في أقرب وقت مناسب.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-lg border border-slate text-slate hover:bg-slate hover:text-white transition-colors"
              >
                <MessageCircle size={16} /> تواصل عبر واتساب
              </a>
              <Link
                href="/book-consultation"
                className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
              >
                احجز استشارة
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}