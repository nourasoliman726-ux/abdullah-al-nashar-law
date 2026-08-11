import { notFound } from "next/navigation";
import VideoForm from "@/components/admin/VideoForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: video } = await supabase.from("videos").select("*").eq("id", id).single();

  if (!video) notFound();

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">تعديل الفيديو</h1>
      <VideoForm video={video} />
    </div>
  );
}