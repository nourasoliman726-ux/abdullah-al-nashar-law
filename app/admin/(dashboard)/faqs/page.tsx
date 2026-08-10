import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteFaq } from "@/lib/actions/faqs";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("id, question, is_active, order_index")
    .order("order_index", { ascending: true });

  return (
    <div className="text-right">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
        >
          <Plus size={16} /> سؤال جديد
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate">الأسئلة الشائعة</h1>
          <p className="text-sm text-gray-500">{faqs?.length ?? 0} سؤال</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EEE9DF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream text-gray-500 text-xs">
              <th className="py-3 px-4 text-right font-semibold">السؤال</th>
              <th className="py-3 px-4 text-right font-semibold">الحالة</th>
              <th className="py-3 px-4 text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {(faqs ?? []).map((f) => (
              <tr key={f.id} className="border-t border-[#EEE9DF]">
                <td className="py-3 px-4 font-semibold text-slate">{f.question}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      f.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {f.is_active ? "ظاهر" : "مخفي"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/faqs/${f.id}`} className="text-gray-400 hover:text-gold">
                      <Pencil size={16} />
                    </Link>
                    <form action={deleteFaq}>
                      <input type="hidden" name="id" value={f.id} />
                      <button type="submit" className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}