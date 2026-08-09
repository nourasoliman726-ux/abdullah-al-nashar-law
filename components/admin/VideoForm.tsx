import { saveVideo } from "@/lib/actions/videos";
import { VIDEO_CATEGORIES } from "@/lib/constants";

const CATEGORIES = VIDEO_CATEGORIES.filter((c) => c !== "الكل");

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";
const labelClass = "block text-sm font-semibold text-slate mb-2 text-right";

type VideoRow = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  video_url?: string;
  thumbnail?: string;
  category?: string;
  status?: string;
};

export default function VideoForm({ video }: { video?: VideoRow }) {
  return (
    <form action={saveVideo} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-3xl">
      {video?.id && <input type="hidden" name="id" value={video.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClass}>العنوان *</label>
          <input required name="title" defaultValue={video?.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>الرابط (slug) *</label>
          <input
            required
            name="slug"
            dir="ltr"
            defaultValue={video?.slug}
            placeholder="haqq-al-nafaqa"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelClass}>وصف الفيديو *</label>
        <textarea required name="description" rows={3} defaultValue={video?.description} className={inputClass} />
      </div>

      <div className="mb-6">
        <label className={labelClass}>رابط التضمين (Embed URL) *</label>
        <input
          required
          dir="ltr"
          name="video_url"
          defaultValue={video?.video_url}
          placeholder="https://www.youtube.com/embed/xxxxxxxx"
          className={inputClass}
        />
        <p className="text-xs text-gray-400 mt-2 text-right">
          من يوتيوب: افتح الفيديو → مشاركة → تضمين، وانسخ رابط src بس (اللي فيه /embed/)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={labelClass}>التصنيف *</label>
          <select required name="category" defaultValue={video?.category ?? CATEGORIES[0]} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>الحالة *</label>
          <select required name="status" defaultValue={video?.status ?? "draft"} className={inputClass}>
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-sm font-bold px-7 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
      >
        حفظ الفيديو
      </button>
    </form>
  );
}