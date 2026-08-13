import { createClient } from "@/lib/supabase/server";
import { Video, Article } from "@/lib/types";

export async function getPublishedVideos(): Promise<Video[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("slug, title, category, description, video_url, video_type, thumbnail, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (data ?? []).map((v) => ({
    slug: v.slug,
    title: v.title,
    category: v.category,
    description: v.description,
    videoUrl: v.video_url,
    videoType: (v.video_type as "embed" | "upload") ?? "embed",
    thumbnail: v.thumbnail ?? undefined,
    publishedAt: v.published_at,
  }));
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("slug, title, category, description, video_url, video_type, thumbnail, published_at")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;
  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    description: data.description,
    videoUrl: data.video_url,
    videoType: (data.video_type as "embed" | "upload") ?? "embed",
    thumbnail: data.thumbnail ?? undefined,
    publishedAt: data.published_at,
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "slug, title, category, excerpt, content, cover_image, author, published_at, reading_time_minutes, seo_title, seo_description"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (data ?? []).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
    content: a.content,
    coverImage: a.cover_image ?? undefined,
    author: a.author,
    publishedAt: a.published_at,
    readingTimeMinutes: a.reading_time_minutes,
    seoTitle: a.seo_title ?? undefined,
    seoDescription: a.seo_description ?? undefined,
  }));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "slug, title, category, excerpt, content, cover_image, author, published_at, reading_time_minutes, seo_title, seo_description"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;
  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.cover_image ?? undefined,
    author: data.author,
    publishedAt: data.published_at,
    readingTimeMinutes: data.reading_time_minutes,
    seoTitle: data.seo_title ?? undefined,
    seoDescription: data.seo_description ?? undefined,
  };
}

export async function getActiveServices() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, icon, title, description")
    .eq("is_active", true)
    .order("order_index", { ascending: true });
  return data ?? [];
}

export async function getActiveFaqs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .eq("is_active", true)
    .order("order_index", { ascending: true });
  return data ?? [];
}