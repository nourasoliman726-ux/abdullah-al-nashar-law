"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, VolumeX, Volume2 } from "lucide-react";
import { Video } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function AutoplayVideoCard({ video }: { video: Video }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // للفيديو المرفوع من الجهاز بس: شغّليه أوتوماتيك لما يدخل نص الشاشة تقريبًا، ووقّفيه لما يخرج
  useEffect(() => {
    if (video.videoType !== "upload" || !containerRef.current) return;
    const el = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [video.videoType]);

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 w-[85vw] sm:w-[380px] rounded-xl overflow-hidden bg-white border border-[#EEE9DF] snap-center"
    >
      <div className="relative aspect-video bg-navy">
        {video.videoType === "upload" ? (
          <>
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.thumbnail}
              muted={muted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {playing && (
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 text-white"
                aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
          </>
        ) : (
          <Link
            href={`/videos/${video.slug}`}
            className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
            style={{
              background: video.thumbnail
                ? `url(${video.thumbnail}) center/cover no-repeat`
                : "linear-gradient(135deg, #0B1428 0%, #151D2F 100%)",
            }}
          >
            <div className="absolute inset-0 bg-black/25" />
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-gold/90">
              <Play size={22} className="text-navy fill-navy" />
            </div>
          </Link>
        )}
        <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-navy/80 text-gold">
          {video.category}
        </span>
      </div>

      <div className="p-5 text-right">
        <span className="text-xs text-gray-400 mb-2 block">{formatDate(video.publishedAt)}</span>
        <h3 className="text-base font-bold mb-2 text-slate line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{video.description}</p>
        <Link
          href={`/videos/${video.slug}`}
          className="inline-block text-sm font-bold px-4 py-2 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
        >
          مشاهدة الفيديو كامل
        </Link>
      </div>
    </div>
  );
}