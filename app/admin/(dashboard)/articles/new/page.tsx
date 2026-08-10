import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">مقال جديد</h1>
      <ArticleForm />
    </div>
  );
}