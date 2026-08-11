import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import VideoCard from "@/components/VideoCard";
import { getVideoBySlug, getPublishedVideos } from "@/lib/queries";
import { whatsappUrl } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  if (!video) notFound();

  const allVideos = await getPublishedVideos();
  const related = allVideos.filter((v) => v.category === video.category && v.slug !== video.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-cream">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-14">
          <div className="text-xs text-gray-400 mb-4 text-right">
            <Link href="/" className="hover:text-gold">الرئيسية</Link> <span className="mx-1">/</span>
            <Link href="/videos" className="hover:text-gold">الفيديوهات</Link> <span className="mx-1">/</span>
            {video.title}
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-navy mb-6">
            <iframe
              src={video.videoUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gold">
              <Share2 size={16} /> مشاركة
            </button>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy text-gold">
              {video.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate text-right mb-4">
            {video.title}
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-gray-600 text-right mb-8">
            {video.description}
          </p>

          <a
            href={whatsappUrl(`مرحبًا أستاذ عبد الله، عندي استفسار بخصوص فيديو "${video.title}"`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors"
          >
            <MessageCircle size={16} /> أحتاج استشارة بخصوص هذا الموضوع
          </a>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-extrabold text-slate text-right mb-6">فيديوهات ذات صلة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((v) => (
                  <VideoCard key={v.slug} video={v} />
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