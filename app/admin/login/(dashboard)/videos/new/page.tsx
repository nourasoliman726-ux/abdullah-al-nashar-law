import VideoForm from "@/components/admin/VideoForm";

export default function NewVideoPage() {
  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">فيديو جديد</h1>
      <VideoForm />
    </div>
  );
}