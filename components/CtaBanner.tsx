"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-navy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-5 md:px-8 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-white">
          لديك موضوع قانوني، وتحتاج رأيًا واضحًا؟
        </h2>
        <p className="text-sm md:text-base mb-8 text-grayText">
          اشرح موضوعك باختصار وسيتم التواصل معك بأقرب وقت مناسب لتحديد الخطوة المناسبة.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/ask-abdullah"
            className="text-sm font-bold px-7 py-3 rounded-lg border border-gold text-white hover:bg-white/5 transition-colors"
          >
            اسأل الأستاذ عبد الله
          </Link>
          <Link
            href="/book-consultation"
            className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
          >
            احجز استشارة
          </Link>
        </div>
      </motion.div>
    </section>
  );
}