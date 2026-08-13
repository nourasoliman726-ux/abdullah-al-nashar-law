"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadMedia } from "@/lib/uploadMedia";

export default function ImageUploadField({
  name,
  label,
  folder,
  defaultValue,
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    const uploadedUrl = await uploadMedia(file, folder);
    if (uploadedUrl) setUrl(uploadedUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate mb-2 text-right">{label}</label>

      {/* الرابط الفعلي اللي بيتبعت مع الفورم */}
      <input type="hidden" name={name} value={url} />

      <div className="flex items-center gap-3">
        {url && (
          <img
            src={url}
            alt=""
            className="w-16 h-16 rounded-lg object-cover border border-[#E3DECF]"
          />
        )}
        <label className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#E3DECF] bg-cream px-4 py-5 text-sm text-gray-500 cursor-pointer hover:border-gold transition-colors">
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> جاري الرفع...
            </>
          ) : (
            <>
              <ImagePlus size={16} />
              {url ? "استبدال الصورة" : "اضغطي لرفع صورة من جهازك"}
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>
    </div>
  );
}