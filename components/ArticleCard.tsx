import Link from "next/link";
import { Clock } from "lucide-react";
import { Article } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="rounded-xl overflow-hidden bg-white border border-[#EEE9DF] flex flex-col hover:border-gold transition-colors"
    >
      <div
        className="aspect-[16/10]"
        style={{ background: "linear-gradient(135deg, #0B1428 0%, #151D2F 100%)" }}
      />
      <div className="p-5 text-right flex-1 flex flex-col">
        <span className="text-xs font-bold text-gold mb-2">{article.category}</span>
        <h3 className="text-base font-bold mb-2 text-slate line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {article.readingTimeMinutes} دقائق قراءة
          </span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}