import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MessageCircle, Share2, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getPublishedArticles } from "@/lib/queries";
import { whatsappUrl, LEGAL_DISCLAIMER } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      type: "article",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = await getPublishedArticles();
  const related = allArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
          <div className="text-xs text-gray-400 mb-4 text-right">
            <Link href="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span>
            <Link href="/articles" className="hover:text-gold">المقالات</Link> <span className="mx-1">/</span>
            {article.title}
          </div>

          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-navy text-gold mb-4">
            {article.category}
          </span>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate text-right mb-4 leading-snug">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-8 border-b border-[#E3DECF] pb-6">
            <button className="flex items-center gap-2 hover:text-gold">
              <Share2 size={14} /> مشاركة
            </button>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {article.readingTimeMinutes} دقائق قراءة
              </span>
              <span>{article.author}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <article
            className="prose prose-slate max-w-none text-right leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div
            className="flex items-start gap-3 rounded-lg border px-5 py-4 mt-10"
            style={{ backgroundColor: "rgba(205,165,71,0.06)", borderColor: "rgba(205,165,71,0.25)" }}
          >
            <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm leading-relaxed text-right text-gray-600">
              {LEGAL_DISCLAIMER}
            </p>
          </div>

          <a
            href={whatsappUrl(`مرحبًا أستاذ عبد الله، عندي استفسار بخصوص مقال "${article.title}"`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors mt-8"
          >
            <MessageCircle size={16} /> أحتاج استشارة بخصوص هذا الموضوع
          </a>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-extrabold text-slate text-right mb-6">مقالات ذات صلة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}