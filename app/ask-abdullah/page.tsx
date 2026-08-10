"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Paperclip, Info, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { SITE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { uploadAttachment } from "@/lib/uploadAttachment";

const TOPICS = [
  "الأحوال الشخصية وقضايا الأسرة",
  "القضايا الجنائية",
  "القضايا المدنية",
  "الشركات والأعمال",
  "القضايا العقارية",
  "العقود",
  "أخرى",
];

const CONTACT_METHODS = [
  { value: "whatsapp", label: "واتساب" },
  { value: "phone", label: "هاتف" },
  { value: "email", label: "بريد إلكتروني" },
];

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

export default function AskAbdullahPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    topic: TOPICS[0],
    question: "",
    file: null as File | null,
    contactMethod: "whatsapp",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fileUrl = await uploadAttachment(form.file, "contact-messages");

      const supabase = createClient();
      const { error: insertError } = await supabase.from("contact_messages").insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        topic: form.topic,
        question: form.question,
        file_url: fileUrl,
        contact_method: form.contactMethod,
      });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إرسال السؤال. حاول مرة أخرى أو تواصل عبر واتساب مباشرة.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="bg-cream min-h-[60vh] flex items-center">
          <div className="max-w-xl mx-auto px-5 py-24 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-6 text-gold" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate mb-4">
              تم إرسال سؤالك بنجاح
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
              شكرًا لتواصلك. سيتم مراجعة سؤالك والتواصل معك عبر الوسيلة التي اخترتها في أقرب وقت
              ممكن.
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
              <Link href="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span> اسأل الأستاذ عبد الله
            </div>
            <div className="text-sm font-semibold text-gold mb-3">اسأل الأستاذ عبد الله</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              عندك سؤال قانوني؟
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              اكتب سؤالك أو وصف موضوعك، وسيتم التواصل معك من مكتب الأستاذ عبد الله النشار.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-2xl mx-auto px-5 md:px-8">
            <div
              className="flex items-start gap-3 rounded-lg border px-5 py-4 mb-8"
              style={{ backgroundColor: "rgba(205,165,71,0.06)", borderColor: "rgba(205,165,71,0.25)" }}
            >
              <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm leading-relaxed text-right text-gray-600">
                هذا النموذج وسيلة للتواصل وطلب استشارة، ولا يقدّم ردًا قانونيًا فوريًا أو تلقائيًا.
                سيقوم المكتب بمراجعة سؤالك والتواصل معك مباشرة.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#EEE9DF] p-8 md:p-10">
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
                <label className={labelClass}>نوع الموضوع *</label>
                <select
                  required
                  value={form.topic}
                  onChange={(e) => update("topic", e.target.value)}
                  className={inputClass}
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className={labelClass}>السؤال أو وصف المشكلة *</label>
                <textarea
                  required
                  rows={5}
                  value={form.question}
                  onChange={(e) => update("question", e.target.value)}
                  className={inputClass}
                  placeholder="اكتب سؤالك بالتفصيل..."
                />
              </div>

              <div className="mb-6">
                <label className={labelClass}>إرفاق ملف (اختياري)</label>
                <label
                  htmlFor="ask-file-upload"
                  className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#E3DECF] bg-cream px-4 py-6 text-sm text-gray-500 cursor-pointer hover:border-gold transition-colors"
                >
                  <Paperclip size={16} />
                  {form.file ? form.file.name : "اضغط لإرفاق مستند (PDF, JPG, PNG)"}
                </label>
                <input
                  id="ask-file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => update("file", e.target.files?.[0] ?? null)}
                />
              </div>

              <div className="mb-8">
                <label className={labelClass}>طريقة التواصل المفضلة *</label>
                <div className="grid grid-cols-3 gap-3">
                  {CONTACT_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.value}
                      onClick={() => update("contactMethod", m.value)}
                      className={`text-sm font-semibold px-3 py-3 rounded-lg border transition-colors ${
                        form.contactMethod === m.value
                          ? "bg-navy border-navy text-white"
                          : "border-[#E3DECF] text-slate"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-sm font-bold px-7 py-3.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors disabled:opacity-60"
              >
                {loading ? "جاري الإرسال..." : "إرسال السؤال"}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                يمكنك أيضًا التواصل مباشرة عبر واتساب على {SITE.phone}
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}