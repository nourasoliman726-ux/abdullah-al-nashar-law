import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveSettings } from "@/lib/actions/settings";

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-1">إعدادات الموقع</h1>
      <p className="text-sm text-gray-500 mb-8">بيانات التواصل والسوشيال ميديا وإعدادات SEO الأساسية.</p>

      {saved === "1" && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
          <CheckCircle2 size={16} /> تم حفظ الإعدادات بنجاح
        </div>
      )}

      <form action={saveSettings} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>رقم الهاتف</label>
            <input dir="ltr" name="phone" defaultValue={settings?.phone} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>رقم واتساب (بدون +)</label>
            <input dir="ltr" name="whatsapp" defaultValue={settings?.whatsapp} className={inputClass} placeholder="201003665319" />
          </div>
        </div>

        <div>
          <label className={labelClass}>البريد الإلكتروني</label>
          <input dir="ltr" type="email" name="email" defaultValue={settings?.email} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>عنوان المكتب</label>
          <textarea name="address" rows={2} defaultValue={settings?.address} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>رابط فيسبوك</label>
            <input dir="ltr" name="facebook" defaultValue={settings?.facebook} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>رابط انستجرام</label>
            <input dir="ltr" name="instagram" defaultValue={settings?.instagram} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>رابط خرائط جوجل</label>
          <input dir="ltr" name="google_maps" defaultValue={settings?.google_maps} className={inputClass} />
        </div>

        <hr className="border-[#EEE9DF]" />

        <div>
          <label className={labelClass}>عنوان SEO للموقع</label>
          <input name="seo_title" defaultValue={settings?.seo_title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>وصف SEO للموقع</label>
          <textarea name="seo_description" rows={2} defaultValue={settings?.seo_description} className={inputClass} />
        </div>

        <button
          type="submit"
          className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
        >
          حفظ الإعدادات
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-4 max-w-2xl">
        ملحوظة: تعديل هذه البيانات لا يغيّر تلقائيًا القيم المكتوبة في الكود (lib/constants.ts) —
        دي خطوة لاحقة لو حبيت الموقع بالكامل يقرأ من هنا بدل الكود.
      </p>
    </div>
  );
}