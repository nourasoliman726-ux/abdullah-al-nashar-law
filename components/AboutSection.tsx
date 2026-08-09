// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { ABOUT } from "@/lib/constants";

// export default function AboutSection() {
//   return (
//     <section id="about" className="py-20 bg-cream">
//       <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
//         {/* صورة المحامي */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.97 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="order-1 lg:order-1 relative rounded-2xl overflow-hidden aspect-[4/5]"
//         >
//           <Image
//          src="/images/about/abdullah.png" // صورة محامي احترافية مؤقتة
//             alt="الأستاذ عبد الله النشار"
//             fill
//             className="object-cover"
//             sizes="(max-width: 1024px) 100vw, 50vw"
//             priority
//           />
//           {/* إطار ذهبي خفيف */}
//           <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none" />
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="order-2 lg:order-2 text-right"
//         >
//           <div className="text-sm font-semibold mb-3 text-gold">{ABOUT.eyebrow}</div>
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-1 text-slate">{ABOUT.title}</h2>
//           <div className="text-sm font-semibold mb-5 text-gold">{ABOUT.subtitle}</div>
//           <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-500">
//             {ABOUT.paragraph}
//           </p>
//           <div className="flex flex-wrap items-center justify-end gap-4">
//             <Link
//               href="/#services"
//               className="text-sm font-bold px-6 py-3 rounded-lg border border-slate text-slate hover:bg-slate hover:text-white transition-colors"
//             >
//               استعرض الخدمات
//             </Link>
//             <Link
//               href="/about"
//               className="text-sm font-bold px-7 py-3 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
//             >
//               تعرف على المزيد
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ABOUT } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* صورة المحامي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-1 relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
        >
          <Image
            src="/images/about/abdullah.png"
            alt="الأستاذ عبد الله النشار"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority
          />
          
          {/* تدرج خفيف من تحت عشان الشكل يبقى أنضف */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
          
          {/* إطار ذهبي خفيف */}
          <div className="absolute inset-0 border border-gold/25 rounded-2xl pointer-events-none" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-2 text-right"
        >
          <div className="text-sm font-semibold mb-3 text-gold">{ABOUT.eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-1 text-slate">
            {ABOUT.title}
          </h2>
          <div className="text-sm font-semibold mb-5 text-gold">{ABOUT.subtitle}</div>
          <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-500">
            {ABOUT.paragraph}
          </p>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <Link
              href="/#services"
              className="text-sm font-bold px-6 py-3 rounded-lg border border-slate text-slate hover:bg-slate hover:text-white transition-colors"
            >
              استعرض الخدمات
            </Link>
            <Link
              href="/about"
              className="text-sm font-bold px-7 py-3 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
            >
              تعرف على المزيد
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}