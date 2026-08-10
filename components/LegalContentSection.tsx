import Link from "next/link";
import { Info } from "lucide-react";
import { Video, Article } from "@/lib/types";
import { LEGAL_DISCLAIMER } from "@/lib/constants";
import VideoCard from "./VideoCard";
import ArticleCard from "./ArticleCard";

function EmptyStateCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#E3DECF] bg-white p-10 text-center text-sm text-grayText">
      {text}
    </div>
  );
}

export default function LegalContentSection({
  videos,
  articles,
}: {
  videos: Video[];
  articles: Article[];
}) {
  const latestVideos = videos.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <section id="legal-content" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold mb-3 text-gold">المحتوى القانوني</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate">
            محتوى توعوي يشرح لك موقفك القانوني
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-500">
            فيديوهات ومقالات وشروحات مبسطة تساعدك على فهم حقوقك والإجراءات القانونية.
          </p>
        </div>

        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <Link href="/videos" className="text-sm font-semibold text-gold">
              عرض الكل
            </Link>
            <h3 className="text-xl font-extrabold text-slate">أحدث الفيديوهات</h3>
          </div>
          {latestVideos.length === 0 ? (
            <EmptyStateCard text="سيتم نشر الفيديوهات القانونية هنا فور إضافتها من لوحة التحكم." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestVideos.map((v) => (
                <VideoCard key={v.slug} video={v} />
              ))}
            </div>
          )}
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <Link href="/articles" className="text-sm font-semibold text-gold">
              عرض الكل
            </Link>
            <h3 className="text-xl font-extrabold text-slate">أحدث المقالات</h3>
          </div>
          {latestArticles.length === 0 ? (
            <EmptyStateCard text="سيتم نشر المقالات القانونية هنا فور إضافتها من لوحة التحكم." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <Link href="/know-your-rights" className="text-sm font-semibold text-gold">
              عرض الكل
            </Link>
            <h3 className="text-xl font-extrabold text-slate">اعرف حقك</h3>
          </div>
          <EmptyStateCard text="نبذات قانونية مختصرة سيتم نشرها تباعًا لمساعدتك على فهم حقوقك الأساسية." />
        </div>

        <div
          className="flex items-start gap-3 rounded-lg border px-5 py-4"
          style={{ backgroundColor: "rgba(205,165,71,0.06)", borderColor: "rgba(205,165,71,0.25)" }}
        >
          <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm leading-relaxed text-right text-gray-600">
            {LEGAL_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}