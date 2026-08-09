"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE, whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

const HERO_IMAGES = [
  // 1. مكتب محاماة فاخر (القوة والثقة)
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=90",
  
  // 2. ميزان العدالة الذهبي (العدل والقانون)

  
  // 3. كتب قانونية (العلم والخبرة)
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=90",
    "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1920&q=90",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=90",
  
  // 4. مصافحة احترافية (الثقة والشراكة)
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=90",

]
// const HERO_IMAGES = [
//   "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=90",
// "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=90",
//   "https://images.unsplash.com/photo-1505664194779-8be221c883ed?w=1920&q=90" // فيها مطرقة خفيفة لكن الميزان واضح
// ];
const SLIDE_DURATION_MS = 4000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy min-h-[580px] flex items-end">
      {/* سلايدر الصور */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={HERO_IMAGES[activeIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[activeIndex]}
              alt=""
              fill
              priority={activeIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* تدرج أخف عشان الصورة تبان أوضح */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,20,40,0.85) 0%, rgba(11,20,40,0.70) 50%, rgba(11,20,40,0.50) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(11,20,40,0.30) 0%, rgba(11,20,40,0.70) 100%)",
          }}
        />
      </div>

      {/* نقط المؤشر */}
      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-5 right-1/2 translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`الصورة ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === activeIndex ? 22 : 8,
                backgroundColor: i === activeIndex ? "#CDA547" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-12 text-right w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-end gap-3 mb-4"
        >
          <span className="text-xs md:text-sm font-semibold text-gold">
            محاماة واستشارات قانونية — دمنهور
          </span>
          <span className="w-7 h-px bg-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-extrabold text-3xl md:text-5xl leading-tight max-w-2xl mr-0 ml-auto text-white"
        >
          خبرة قانونية تبدأ بفهم قضيتك
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-sm md:text-base max-w-xl mr-0 ml-auto leading-relaxed text-grayText"
        >
          حلول قانونية احترافية تضع مصلحة العميل أولًا.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-7 flex flex-wrap items-center justify-end gap-3"
        >
          <a
            href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg border border-gold text-white hover:bg-white/5 transition-colors"
          >
            <MessageCircle size={15} /> واتساب
          </a>
          <a
            href="/book-consultation"
            className="text-sm font-bold px-6 py-2.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
          >
            احجز استشارة
          </a>
        </motion.div>

        <div className="mt-10 pt-5 flex flex-wrap items-center justify-end gap-5 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-grayText">
            <span>{SITE.city}</span>
            <MapPin size={15} className="text-gold" />
          </div>
          <a href={SITE.phoneHref} className="flex items-center gap-2 text-sm text-grayText">
            <span dir="ltr">{SITE.phone}</span>
            <Phone size={15} className="text-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}