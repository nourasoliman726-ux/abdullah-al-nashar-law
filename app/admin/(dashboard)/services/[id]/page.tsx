import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", id).single();

  if (!service) notFound();

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">تعديل الخدمة</h1>
      <ServiceForm service={service} />
    </div>
  );
}