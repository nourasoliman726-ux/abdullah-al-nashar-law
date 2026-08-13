import { Trash2, Phone, Mail, Paperclip } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteContactMessage } from "@/lib/actions/contact-messages";
import ReadToggle from "@/components/admin/ReadToggle";

export const dynamic = "force-dynamic";

const METHOD_LABELS: Record<string, string> = {
  whatsapp: "واتساب",
  phone: "هاتف",
  email: "بريد إلكتروني",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
}

export default async function ContactMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-1">رسائل التواصل (اسأل الأستاذ)</h1>
      <p className="text-sm text-gray-500 mb-8">{messages?.length ?? 0} رسالة</p>

      <div className="space-y-4">
        {(messages ?? []).map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-[#EEE9DF] p-6">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-3">
                <ReadToggle id={m.id} isRead={m.is_read} />
                <span className="text-xs text-gray-400">{formatDate(m.created_at)}</span>
              </div>
              <form action={deleteContactMessage}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">الاسم</div>
                <div className="text-sm font-bold text-slate">{m.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">نوع الموضوع</div>
                <div className="text-sm font-bold text-slate">{m.topic}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-gold" dir="ltr">
                <Phone size={14} /> {m.phone}
              </a>
              {m.email && (
                <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-gold" dir="ltr">
                  <Mail size={14} /> {m.email}
                </a>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream text-slate">
                يفضّل التواصل عبر: {METHOD_LABELS[m.contact_method] ?? m.contact_method}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed bg-cream rounded-lg p-4">
              {m.question}
            </p>

            {m.file_url && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3">
                <Paperclip size={13} /> ملف مرفق: {m.file_url}
              </div>
            )}
          </div>
        ))}

        {(!messages || messages.length === 0) && (
          <div className="bg-white rounded-xl border border-dashed border-[#EEE9DF] p-16 text-center text-gray-400">
            لا توجد رسائل بعد.
          </div>
        )}
      </div>
    </div>
  );
}