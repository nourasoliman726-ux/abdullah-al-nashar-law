import { createClient } from "@/lib/supabase/client";

// بيرفع الملف المرفق (لو موجود) لمساحة تخزين Supabase الخاصة، وبيرجّع المسار المخزّن
// المسار ده بيتحفظ بعدين في العمود file_url، ومحدش يقدر يشوفه غير الأدمن من لوحة التحكم
export async function uploadAttachment(file: File | null, folder: string): Promise<string | null> {
  if (!file) return null;

  const supabase = createClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from("attachments").upload(path, file);
  if (error) {
    console.error("فشل رفع الملف:", error.message);
    return null;
  }
  return path;
}