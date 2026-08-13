"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getYoutubeThumbnail } from "@/lib/uploadMedia";

export async function saveVideo(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string | null;

  const videoType = (formData.get("video_type") as string) || "embed";
  const videoUrl = (formData.get("video_url") as string).trim();
  let thumbnail = (formData.get("thumbnail") as string) || null;

  // لو مفيش صورة مصغّرة متحطة يدويًا، وكان الفيديو رابط يوتيوب، جيبي صورته تلقائيًا
  if (!thumbnail && videoType === "embed") {
    thumbnail = getYoutubeThumbnail(videoUrl);
  }

  const payload = {
    slug: (formData.get("slug") as string).trim(),
    title: (formData.get("title") as string).trim(),
    description: (formData.get("description") as string).trim(),
    video_url: videoUrl,
    video_type: videoType,
    thumbnail,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("videos").update(payload).eq("id", id);
  } else {
    await supabase.from("videos").insert(payload);
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");
  redirect("/admin/videos");
}

export async function deleteVideo(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  await supabase.from("videos").delete().eq("id", id);
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}