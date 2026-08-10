"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FaqRow = { id: string; question: string; answer: string };

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E3DECF] py-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 text-right">
        <ChevronDown
          size={18}
          className="text-gold flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
        <span className="text-base font-bold flex-1 text-right text-slate">{q}</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? 200 : 0 }}>
        <p className="text-sm leading-relaxed pt-3 text-right text-gray-500">{a}</p>
      </div>
    </div>
  );
}

export default function FaqSection({ faqs }: { faqs: FaqRow[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          {faqs.length === 0 ? (
            <p className="text-sm text-gray-500 text-right">
              سيتم عرض الأسئلة الشائعة هنا فور إضافتها من لوحة التحكم.
            </p>
          ) : (
            faqs.map((f, i) => (
              <FaqItem
                key={f.id}
                q={f.question}
                a={f.answer}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-right lg:sticky lg:top-24 self-start"
        >
          <div className="text-sm font-semibold mb-3 text-gold">الأسئلة الشائعة</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate">
            إجابات سريعة قبل التواصل
          </h2>
          <p className="text-sm md:text-base mb-6 text-gray-500">
            أسئلة متكررة حول حجز الاستشارة والتواصل مع المكتب.
          </p>
          <button className="text-sm font-bold px-6 py-3 rounded-lg border border-slate text-slate">
            كل الأسئلة
          </button>
        </motion.div>
      </div>
    </section>
  );
}