"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Shield, Gavel, Landmark, Building2, FileText, LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Shield,
  Gavel,
  Landmark,
  Building2,
  FileText,
};

type ServiceRow = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

function ServiceCard({ icon, title, description, index }: ServiceRow & { index: number }) {
  const Icon = ICONS[icon] ?? Users;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-xl p-6 bg-card border border-cardBorder hover:border-gold hover:shadow-[0_12px_30px_-10px_rgba(205,165,71,0.35)] transition-colors"
    >
      <div className="flex justify-end mb-5">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center border border-gold">
          <Icon size={20} className="text-gold" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-lg font-bold text-right mb-2 text-white">{title}</h3>
      <p className="text-sm text-right leading-relaxed mb-6 text-grayText">{description}</p>
      <div className="flex items-center justify-between">
        <button className="text-sm font-semibold text-gold">استشارة</button>
        <button className="text-sm font-semibold px-4 py-2 rounded-full border border-gold text-gold">
          تعرف على المزيد
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ services }: { services: ServiceRow[] }) {
  return (
    <section id="services" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-sm font-semibold mb-3 text-gold">مجالات العمل</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">
            خدمات قانونية متكاملة
          </h2>
          <div className="w-16 h-px mx-auto mb-5 bg-gold" />
          <p className="max-w-xl mx-auto text-sm md:text-base text-grayText">
            مجالات عمل قابلة للتعديل والإضافة من لوحة التحكم بحسب ما يعتمده المكتب.
          </p>
        </motion.div>

        {services.length === 0 ? (
          <p className="text-center text-grayText text-sm">
            سيتم عرض الخدمات هنا فور إضافتها من لوحة التحكم.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.id} {...s} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/#services"
            className="inline-block text-sm font-bold px-7 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-navy transition-colors"
          >
            جميع مجالات العمل
          </Link>
        </div>
      </div>
    </section>
  );
}