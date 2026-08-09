import { saveFaq } from "@/lib/actions/faqs";

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

type FaqRow = {
  id?: string;
  question?: string;
  answer?: string;
  order_index?: number;
  is_active?: boolean;
};

export default function FaqForm({ faq }: { faq?: FaqRow }) {
  return (
    <form action={saveFaq} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-2xl">
      {faq?.id && <input type="hidden" name="id" value={faq.id} />}

      <div className="mb-6">
        <label className={labelClass}>السؤال *</label>
        <input required name="question" defaultValue={faq?.question} className={inputClass} />
      </div>

      <div className="mb-6">
        <label className={labelClass}>الإجابة *</label>
        <textarea required name="answer" rows={4} defaultValue={faq?.answer} className={inputClass} />
      </div>

      <div className="mb-6">
        <label className={labelClass}>ترتيب الظهور</label>
        <input type="number" name="order_index" defaultValue={faq?.order_index ?? 0} className={inputClass} />
      </div>

      <label className="flex items-center gap-2 justify-end mb-8 text-sm font-semibold text-slate">
        ظاهر في الموقع
        <input type="checkbox" name="is_active" defaultChecked={faq?.is_active ?? true} className="w-4 h-4" />
      </label>

      <button
        type="submit"
        className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
      >
        حفظ السؤال
      </button>
    </form>
  );
}