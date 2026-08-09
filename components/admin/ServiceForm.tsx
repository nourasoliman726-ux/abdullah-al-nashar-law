import { saveService } from "@/lib/actions/services";

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

// نفس أسماء الأيقونات المتاحة في الواجهة العامة (components/ServicesSection.tsx)
const ICON_OPTIONS = ["Users", "Shield", "Gavel", "Landmark", "Building2", "FileText"];

type ServiceRow = {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
  order_index?: number;
  is_active?: boolean;
};

export default function ServiceForm({ service }: { service?: ServiceRow }) {
  return (
    <form action={saveService} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-2xl">
      {service?.id && <input type="hidden" name="id" value={service.id} />}

      <div className="mb-6">
        <label className={labelClass}>عنوان الخدمة *</label>
        <input required name="title" defaultValue={service?.title} className={inputClass} />
      </div>

      <div className="mb-6">
        <label className={labelClass}>الوصف *</label>
        <textarea required name="description" rows={3} defaultValue={service?.description} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClass}>الأيقونة</label>
          <select name="icon" defaultValue={service?.icon ?? "Scale"} className={inputClass}>
            {ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>ترتيب الظهور</label>
          <input type="number" name="order_index" defaultValue={service?.order_index ?? 0} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 justify-end mb-8 text-sm font-semibold text-slate">
        ظاهرة في الموقع
        <input type="checkbox" name="is_active" defaultChecked={service?.is_active ?? true} className="w-4 h-4" />
      </label>

      <button
        type="submit"
        className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
      >
        حفظ الخدمة
      </button>
    </form>
  );
}