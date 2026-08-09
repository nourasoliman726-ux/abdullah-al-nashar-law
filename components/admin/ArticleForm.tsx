import { saveArticle } from "@/lib/actions/articles";
import { VIDEO_CATEGORIES } from "@/lib/constants";

const CATEGORIES = VIDEO_CATEGORIES.filter((c) => c !== "الكل");

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

type ArticleRow = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  reading_time_minutes?: number;
  status?: string;
  seo_title?: string;
  seo_description?: string;
};

export default function ArticleForm({ article }: { article?: ArticleRow }) {
  return (
    <form action={saveArticle} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-3xl">
      {article?.id && <input type="hidden" name="id" value={article.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClass}>العنوان *</label>
          <input required name="title" defaultValue={article?.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>الرابط (slug) *</label>
          <input
            required
            name="slug"
            dir="ltr"
            defaultValue={article?.slug}
            placeholder="haqq-al-hadana"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelClass}>ملخص قصير *</label>
        <textarea required name="excerpt" rows={2} defaultValue={article?.excerpt} className={inputClass} />
      </div>

      <div className="mb-6">
        <label className={labelClass}>محتوى المقال (HTML) *</label>
        <textarea
          required
          name="content"
          rows={12}
          dir="rtl"
          defaultValue={article?.content}
          className={inputClass + " font-mono text-xs"}
          placeholder="<p>نص المقال هنا...</p>"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className={labelClass}>التصنيف *</label>
          <select required name="category" defaultValue={article?.category ?? CATEGORIES[0]} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>الكاتب</label>
          <input name="author" defaultValue={article?.author ?? "عبد الله النشار"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>مدة القراءة (دقائق)</label>
          <input
            type="number"
            name="reading_time_minutes"
            min={1}
            defaultValue={article?.reading_time_minutes ?? 3}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelClass}>الحالة *</label>
        <select required name="status" defaultValue={article?.status ?? "draft"} className={inputClass}>
          <option value="draft">مسودة</option>
          <option value="published">منشور</option>
        </select>
      </div>

      <details className="mb-8">
        <summary className="text-sm font-semibold text-gold cursor-pointer mb-4">إعدادات SEO (اختياري)</summary>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
            <label className={labelClass}>عنوان SEO</label>
            <input name="seo_title" defaultValue={article?.seo_title} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>وصف SEO</label>
            <textarea name="seo_description" rows={2} defaultValue={article?.seo_description} className={inputClass} />
          </div>
        </div>
      </details>

      <button
        type="submit"
        className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
      >
        حفظ المقال
      </button>
    </form>
  );
}