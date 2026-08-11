import { notFound } from "next/navigation";
import ArticleForm from "@/components/admin/ArticleForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).single();

  if (!article) notFound();

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">تعديل المقال</h1>
      <ArticleForm article={article} />
    </div>
  );
}