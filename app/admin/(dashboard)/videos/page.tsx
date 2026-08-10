import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteVideo } from "@/lib/actions/videos";

export const dynamic = "force-dynamic";

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("id, title, category, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="text-right">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/videos/new"
          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
        >
          <Plus size={16} /> فيديو جديد
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate">الفيديوهات</h1>
          <p className="text-sm text-gray-500">{videos?.length ?? 0} فيديو</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EEE9DF] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream text-gray-500 text-xs">
              <th className="py-3 px-4 text-right font-semibold">العنوان</th>
              <th className="py-3 px-4 text-right font-semibold">التصنيف</th>
              <th className="py-3 px-4 text-right font-semibold">الحالة</th>
              <th className="py-3 px-4 text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {(videos ?? []).map((v) => (
              <tr key={v.id} className="border-t border-[#EEE9DF]">
                <td className="py-3 px-4 font-semibold text-slate">{v.title}</td>
                <td className="py-3 px-4 text-gray-500">{v.category}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      v.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {v.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/videos/${v.id}`} className="text-gray-400 hover:text-gold">
                      <Pencil size={16} />
                    </Link>
                    <form action={deleteVideo}>
                      <input type="hidden" name="id" value={v.id} />
                      <button type="submit" className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!videos || videos.length === 0) && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  لا توجد فيديوهات بعد. ابدأ بإضافة أول فيديو.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}