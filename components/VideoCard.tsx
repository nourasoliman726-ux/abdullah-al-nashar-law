import Link from "next/link";
import { Play, Share2 } from "lucide-react";
import { Video } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function VideoCard({ video }: { video: Video }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-[#EEE9DF] flex flex-col">
      <Link
        href={`/videos/${video.slug}`}
        className="relative aspect-video flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0B1428 0%, #151D2F 100%)" }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gold/90">
          <Play size={22} className="text-navy fill-navy" />
        </div>
        <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-navy/80 text-gold">
          {video.category}
        </span>
      </Link>

      <div className="p-5 text-right flex-1 flex flex-col">
        <span className="text-xs text-gray-400 mb-2">{formatDate(video.publishedAt)}</span>
        <h3 className="text-base font-bold mb-2 text-slate line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <button aria-label="مشاركة" className="text-gray-400 hover:text-gold transition-colors">
            <Share2 size={16} />
          </button>
          <Link
            href={`/videos/${video.slug}`}
            className="text-sm font-bold px-4 py-2 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
          >
            مشاهدة
          </Link>
        </div>
      </div>
    </div>
  );
}