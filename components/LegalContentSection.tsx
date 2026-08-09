"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Info } from "lucide-react";
import { VIDEO_CATEGORIES, LEGAL_DISCLAIMER } from "@/lib/constants";

function EmptyStateCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#E3DECF] bg-white p-10 text-center text-sm text-grayText">
      {text}
    </div>
  );
}

export default function LegalContentSection() {
  const [activeCat, setActiveCat] = useState("الكل");

  return (
    <section id="legal-content" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-sm font-semibold mb-3 text-gold">المحتوى القانوني</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate">
            محتوى توعوي يشرح لك موقفك القانوني
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500">
            فيديوهات ومقالات وشروحات مبسطة تساعدك على فهم حقوقك والإجراءات القانونية.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-[#E3DECF] bg-white px-4 py-3">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="ابحث في المحتوى القانوني..."
              className="flex-1 bg-transparent outline-none text-sm text-right"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-14">
          {VIDEO_CATEGORIES.map((cat) => {
            const active = cat === activeCat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  active ? "bg-navy border-navy text-white" : "border-[#E3DECF] text-slate"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <a href="/videos" className="text-sm font-semibold text-gold">
              عرض الكل
            </a>
            <h3 className="text-xl font-extrabold text-slate">أحدث الفيديوهات</h3>
          </div>
          <EmptyStateCard text="سيتم نشر الفيديوهات القانونية هنا فور إضافتها من لوحة التحكم." />
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <a href="/articles" className="text-sm font-semibold text-gold">
              عرض الكل
            </a>
            <h3 className="text-xl font-extrabold text-slate">أحدث المقالات</h3>
          </div>
          <EmptyStateCard text="سيتم نشر المقالات القانونية هنا فور إضافتها من لوحة التحكم." />
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <a href="/know-your-rights" className="text-sm font-semibold text-gold">
              عرض الكل
            </a>
            <h3 className="text-xl font-extrabold text-slate">اعرف حقك</h3>
          </div>
          <EmptyStateCard text="نبذات قانونية مختصرة سيتم نشرها تباعًا لمساعدتك على فهم حقوقك الأساسية." />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-3 rounded-lg border px-5 py-4"
          style={{ backgroundColor: "rgba(205,165,71,0.06)", borderColor: "rgba(205,165,71,0.25)" }}
        >
          <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm leading-relaxed text-right text-gray-600">
            {LEGAL_DISCLAIMER}
          </p>
        </motion.div>
      </div>
    </section>
  );
}