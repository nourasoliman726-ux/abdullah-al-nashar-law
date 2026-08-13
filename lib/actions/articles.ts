"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { plainTextToHtml } from "@/lib/textToHtml";

export async function saveArticle(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string | null;

  const payload = {
    slug: (formData.get("slug") as string).trim(),
    title: (formData.get("title") as string).trim(),
    excerpt: (formData.get("excerpt") as string).trim(),
    content: plainTextToHtml((formData.get("content") as string).trim()),
    cover_image: (formData.get("cover_image") as string) || null,
    category: formData.get("category") as string,
    author: (formData.get("author") as string).trim() || "عبد الله النشار",
    reading_time_minutes: Number(formData.get("reading_time_minutes")) || 3,
    status: formData.get("status") as string,
    published_at: formData.get("status") === "published" ? new Date().toISOString() : null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("articles").update(payload).eq("id", id);
  } else {
    await supabase.from("articles").insert(payload);
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}