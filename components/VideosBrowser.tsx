"use client";

import { useMemo, useState } from "react";
import { Search, VideoOff } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/lib/types";
import { VIDEO_CATEGORIES } from "@/lib/constants";

export default function VideosBrowser({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    let list = [...videos];
    if (category !== "الكل") list = list.filter((v) => v.category === category);
    if (query.trim()) {
      const q = query.trim();
      list = list.filter((v) => v.title.includes(q) || v.description.includes(q));
    }
    list.sort((a, b) =>
      sort === "newest"
        ? +new Date(b.publishedAt) - +new Date(a.publishedAt)
        : +new Date(a.publishedAt) - +new Date(b.publishedAt)
    );
    return list;
  }, [videos, query, category, sort]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 rounded-lg border border-[#E3DECF] bg-white px-4 py-3">
          <Search size={16} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في الفيديوهات..."
            className="flex-1 bg-transparent outline-none text-sm text-right"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
          className="rounded-lg border border-[#E3DECF] bg-white px-4 py-3 text-sm text-right"
        >
          <option value="newest">الأحدث أولاً</option>
          <option value="oldest">الأقدم أولاً</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {VIDEO_CATEGORIES.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                active ? "bg-navy border-navy text-white" : "border-[#E3DECF] text-slate"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E3DECF] bg-white p-16 text-center">
          <VideoOff size={32} className="mx-auto mb-4 text-gray-300" />
          <p className="text-sm text-gray-500">
            لا توجد فيديوهات منشورة في هذا التصنيف حاليًا. سيتم إضافة فيديوهات جديدة قريبًا.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      )}
    </>
  );
}