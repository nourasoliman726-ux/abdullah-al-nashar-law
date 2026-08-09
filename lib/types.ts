export interface Video {
  slug: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string; // رابط يوتيوب / فيسبوك / انستجرام
  thumbnail?: string;
  publishedAt: string; // "2026-08-01"
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string; // نص المقال (HTML أو Markdown مبسط)
  coverImage?: string;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
}