"use client";

import { motion } from "framer-motion";
import { FileCheck, RefreshCw, Eye, Lock, LucideIcon } from "lucide-react";
import { TRUST_VALUES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = { FileCheck, RefreshCw, Eye, Lock };

export default function TrustSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-sm font-semibold mb-3 text-gold">قيمنا المهنية</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate">
            قيم مهنية قبل الوعود
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500">
            لا نقدّم أرقامًا أو نسب نجاح، بل منهج عمل واضح يقوم على السرية والوضوح والمتابعة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_VALUES.map((v, i) => {
            const Icon = ICONS[v.icon] ?? FileCheck;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-xl p-6 bg-white border border-[#EEE9DF] text-right"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-navy mb-4">
                  <Icon size={18} className="text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold mb-2 text-slate">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}