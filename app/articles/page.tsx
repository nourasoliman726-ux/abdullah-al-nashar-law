"use client";

import { useMemo, useState } from "react";
import { Search, FileX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import ArticleCard from "@/components/ArticleCard";
import { ARTICLES } from "@/lib/content-data";
import { VIDEO_CATEGORIES } from "@/lib/constants";

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    let list = [...ARTICLES];
    if (category !== "الكل") list = list.filter((a) => a.category === category);
    if (query.trim()) {
      const q = query.trim();
      list = list.filter((a) => a.title.includes(q) || a.excerpt.includes(q));
    }
    list.sort((a, b) =>
      sort === "newest"
        ? +new Date(b.publishedAt) - +new Date(a.publishedAt)
        : +new Date(a.publishedAt) - +new Date(b.publishedAt)
    );
    return list;
  }, [query, category, sort]);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <a href="/" className="hover:text-gold">الرئيسية</a> <span className="mx-1">/</span> المقالات
            </div>
            <div className="text-sm font-semibold text-gold mb-3">المقالات</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              المقالات القانونية
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              مقالات توعوية مبسطة تساعدك على فهم حقوقك والإجراءات القانونية المختلفة.
            </p>
          </div>
        </section>

        <section className="bg-cream py-10">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className="flex-1 flex items-center gap-2 rounded-lg border border-[#E3DECF] bg-white px-4 py-3">
                <Search size={16} className="text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث في المقالات..."
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
                <FileX size={32} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">
                  لا توجد مقالات منشورة في هذا التصنيف حاليًا. سيتم إضافة مقالات جديدة قريبًا.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}