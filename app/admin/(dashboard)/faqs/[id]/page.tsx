import { notFound } from "next/navigation";
import FaqForm from "@/components/admin/FaqForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: faq } = await supabase.from("faqs").select("*").eq("id", id).single();

  if (!faq) notFound();

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">تعديل السؤال</h1>
      <FaqForm faq={faq} />
    </div>
  );
}