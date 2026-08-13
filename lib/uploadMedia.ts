import { createClient } from "@/lib/supabase/client";

// رفع صورة أو فيديو لمساحة التخزين العامة، وإرجاع رابط عام دائم للملف
export async function uploadMedia(file: File, folder: string): Promise<string | null> {
  const supabase = createClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) {
    console.error("فشل رفع الملف:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

// استخراج معرّف فيديو يوتيوب من رابط embed عشان نجيب صورته المصغّرة تلقائيًا
export function getYoutubeThumbnail(embedUrl: string): string | null {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]{6,})/);
  if (!match) return null;
  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}