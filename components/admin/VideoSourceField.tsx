"use client";

import { useState } from "react";
import { Loader2, UploadCloud, Link2 } from "lucide-react";
import { uploadMedia, getYoutubeThumbnail } from "@/lib/uploadMedia";

const inputClass =
  "w-full rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right outline-none focus:border-gold transition-colors";

export default function VideoSourceField({
  defaultType,
  defaultUrl,
  onThumbnailDetected,
}: {
  defaultType?: string;
  defaultUrl?: string;
  onThumbnailDetected?: (url: string) => void;
}) {
  const [mode, setMode] = useState<"embed" | "upload">(
    (defaultType as "embed" | "upload") ?? "embed"
  );
  const [embedUrl, setEmbedUrl] = useState(defaultUrl ?? "");
  const [uploadedUrl, setUploadedUrl] = useState(mode === "upload" ? defaultUrl ?? "" : "");
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  async function handleFile(file: File | null) {
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    const url = await uploadMedia(file, "videos");
    if (url) setUploadedUrl(url);
    setUploading(false);
  }

  function handleEmbedChange(value: string) {
    setEmbedUrl(value);
    const thumb = getYoutubeThumbnail(value);
    if (thumb && onThumbnailDetected) onThumbnailDetected(thumb);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate mb-2 text-right">مصدر الفيديو *</label>

      {/* الحقول الفعلية اللي بتتبعت مع الفورم */}
      <input type="hidden" name="video_type" value={mode} />
      <input type="hidden" name="video_url" value={mode === "embed" ? embedUrl : uploadedUrl} />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setMode("embed")}
          className={`flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg border transition-colors ${
            mode === "embed" ? "bg-navy border-navy text-white" : "border-[#E3DECF] text-slate"
          }`}
        >
          <Link2 size={15} /> رابط خارجي (يوتيوب/فيسبوك)
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg border transition-colors ${
            mode === "upload" ? "bg-navy border-navy text-white" : "border-[#E3DECF] text-slate"
          }`}
        >
          <UploadCloud size={15} /> رفع من الجهاز
        </button>
      </div>

      {mode === "embed" ? (
        <div>
          <input
            dir="ltr"
            value={embedUrl}
            onChange={(e) => handleEmbedChange(e.target.value)}
            placeholder="https://www.youtube.com/embed/xxxxxxxx"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-2 text-right">
            من يوتيوب: مشاركة ← تضمين، وانسخي رابط src بس. من فيسبوك: لازم يكون الفيديو عام (Public).
          </p>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#E3DECF] bg-cream px-4 py-6 text-sm text-gray-500 cursor-pointer hover:border-gold transition-colors">
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> جاري رفع الفيديو... ده ممكن ياخد شوية وقت حسب حجمه
            </>
          ) : (
            <>
              <UploadCloud size={16} />
              {uploadedUrl ? `تم رفع: ${fileName || "الفيديو"}` : "اضغطي لرفع فيديو من جهازك (MP4)"}
            </>
          )}
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}