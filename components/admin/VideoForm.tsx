"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { saveVideo } from "@/lib/actions/videos";
import { uploadMedia } from "@/lib/uploadMedia";
import { VIDEO_CATEGORIES } from "@/lib/constants";
import VideoSourceField from "./VideoSourceField";

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
  video_type?: string;
  thumbnail?: string;
  category?: string;
  status?: string;
};

export default function VideoForm({ video }: { video?: VideoRow }) {
  const [thumbnail, setThumbnail] = useState(video?.thumbnail ?? "");
  const [uploadingThumb, setUploadingThumb] = useState(false);

  async function handleThumbFile(file: File | null) {
    if (!file) return;
    setUploadingThumb(true);
    const url = await uploadMedia(file, "thumbnails");
    if (url) setThumbnail(url);
    setUploadingThumb(false);
  }

  return (
    <form action={saveVideo} className="bg-white rounded-xl border border-[#EEE9DF] p-8 max-w-3xl space-y-6">
      {video?.id && <input type="hidden" name="id" value={video.id} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div>
        <label className={labelClass}>وصف الفيديو *</label>
        <textarea required name="description" rows={3} defaultValue={video?.description} className={inputClass} />
      </div>

      <VideoSourceField
        defaultType={video?.video_type}
        defaultUrl={video?.video_url}
        onThumbnailDetected={(url) => setThumbnail((prev) => prev || url)}
      />

      <div>
        <label className={labelClass}>الصورة المصغّرة (Thumbnail)</label>
        <input type="hidden" name="thumbnail" value={thumbnail} />
        <div className="flex items-center gap-3">
          {thumbnail && (
            <img src={thumbnail} alt="" className="w-24 h-16 rounded-lg object-cover border border-[#E3DECF]" />
          )}
          <label className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#E3DECF] bg-cream px-4 py-5 text-sm text-gray-500 cursor-pointer hover:border-gold transition-colors">
            {uploadingThumb ? (
              <>
                <Loader2 size={16} className="animate-spin" /> جاري الرفع...
              </>
            ) : (
              <>
                <ImagePlus size={16} />
                {thumbnail ? "استبدال الصورة" : "ارفعي صورة (أو هتتحدد أوتوماتيك لو الرابط يوتيوب)"}
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingThumb}
              onChange={(e) => handleThumbFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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