import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteService } from "@/lib/actions/services";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, title, is_active, order_index")
    .order("order_index", { ascending: true });

  return (
    <div className="text-right">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
        >
          <Plus size={16} /> خدمة جديدة
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate">الخدمات</h1>
          <p className="text-sm text-gray-500">{services?.length ?? 0} خدمة</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EEE9DF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream text-gray-500 text-xs">
              <th className="py-3 px-4 text-right font-semibold">العنوان</th>
              <th className="py-3 px-4 text-right font-semibold">الترتيب</th>
              <th className="py-3 px-4 text-right font-semibold">الحالة</th>
              <th className="py-3 px-4 text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {(services ?? []).map((s) => (
              <tr key={s.id} className="border-t border-[#EEE9DF]">
                <td className="py-3 px-4 font-semibold text-slate">{s.title}</td>
                <td className="py-3 px-4 text-gray-500">{s.order_index}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      s.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {s.is_active ? "ظاهرة" : "مخفية"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/services/${s.id}`} className="text-gray-400 hover:text-gold">
                      <Pencil size={16} />
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={s.id} />
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