export interface Video {
  slug: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string; // رابط تضمين خارجي، أو رابط فيديو مرفوع من الجهاز
  videoType: "embed" | "upload";
  thumbnail?: string;
  publishedAt: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  readingTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
}