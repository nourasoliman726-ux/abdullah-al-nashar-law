"use client";

import { Video } from "@/lib/types";
import AutoplayVideoCard from "./AutoplayVideoCard";

export default function VideosSlider({ videos }: { videos: Video[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
      {videos.map((v) => (
        <AutoplayVideoCard key={v.slug} video={v} />
      ))}
    </div>
  );
}