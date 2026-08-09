"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Paperclip } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { SITE } from "@/lib/constants";

const CONSULTATION_TYPES = [
  "الأحوال الشخصية وقضايا الأسرة",
  "القضايا الجنائية",
  "القضايا المدنية",
  "الشركات والأعمال",
  "القضايا العقارية",
  "العقود",
  "أخرى",
];

const METHODS = [
  { value: "office", label: "داخل المكتب" },
  { value: "phone", label: "هاتف" },
  { value: "whatsapp", label: "واتساب" },
  { value: "online", label: "أونلاين" },
];

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

export default function BookConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: CONSULTATION_TYPES[0],
    description: "",
    preferredDate: "",
    preferredTime: "",
    method: "whatsapp",
    file: null as File | null,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO: هيتوصل بـ Supabase في خطوة قاعدة البيانات — دلوقتي بس log للتجربة
    console.log("طلب حجز استشارة:", form);
    await new Promise((r) => setTimeout(r, 700));

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="bg-cream min-h-[60vh] flex items-center">
          <div className="max-w-xl mx-auto px-5 py-24 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-6 text-gold" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate mb-4">
              تم استلام طلبك بنجاح
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
              شكرًا لتواصلك مع مكتب الأستاذ عبد الله النشار. سيتم مراجعة طلبك والتواصل معك في أقرب
              وقت ممكن على الرقم أو البريد الإلكتروني المُرسَل.
            </p>
            <Link
              href="/"
              className="inline-block text-sm font-bold px-7 py-3 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </main>
        <Footer />
        <FloatingWhatsapp />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <Link href="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span> احجز استشارة
            </div>
            <div className="text-sm font-semibold text-gold mb-3">احجز استشارة</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              احجز موعد استشارتك
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              املأ البيانات التالية وسيتم التواصل معك لتأكيد الموعد المناسب.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto px-5 md:px-8 bg-white rounded-xl border border-[#EEE9DF] p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>الاسم *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                  placeholder="الاسم بالكامل"
                />
              </div>
              <div>
                <label className={labelClass}>رقم الهاتف *</label>
                <input
                  required
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={labelClass}>البريد الإلكتروني</label>
              <input
                type="email"
                dir="ltr"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                placeholder="example@email.com"
              />
            </div>

            <div className="mb-6">
              <label className={labelClass}>نوع الاستشارة *</label>
              <select
                required
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className={inputClass}
              >
                {CONSULTATION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className={labelClass}>وصف مختصر *</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={inputClass}
                placeholder="اشرح موضوعك باختصار..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={labelClass}>التاريخ المفضل</label>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>الوقت المفضل</label>
                <input
                  type="time"
                  value={form.preferredTime}
                  onChange={(e) => update("preferredTime", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className={labelClass}>طريقة الاستشارة *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {METHODS.map((m) => (
                  <button
                    type="button"
                    key={m.value}
                    onClick={() => update("method", m.value)}
                    className={`text-sm font-semibold px-3 py-3 rounded-lg border transition-colors ${
                      form.method === m.value
                        ? "bg-navy border-navy text-white"
                        : "border-[#E3DECF] text-slate"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className={labelClass}>إرفاق ملف (اختياري)</label>
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#E3DECF] bg-cream px-4 py-6 text-sm text-gray-500 cursor-pointer hover:border-gold transition-colors"
              >
                <Paperclip size={16} />
                {form.file ? form.file.name : "اضغط لإرفاق مستند (PDF, JPG, PNG)"}
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => update("file", e.target.files?.[0] ?? null)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm font-bold px-7 py-3.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors disabled:opacity-60"
            >
              {loading ? "جاري الإرسال..." : "إرسال طلب الحجز"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              يمكنك أيضًا التواصل مباشرة عبر واتساب على {SITE.phone}
            </p>
          </form>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}