"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID_STATUSES = ["جديد", "قيد المراجعة", "تم التواصل", "مكتمل", "ملغي"];

// بتتنادى مباشرة من كومبوننت الحالة (مش فورم عادي) عشان تتحدث فورًا من غير إعادة تحميل
export async function updateRequestStatus(id: string, status: string) {
  if (!VALID_STATUSES.includes(status)) return;
  const supabase = await createClient();
  await supabase.from("consultation_requests").update({ status }).eq("id", id);
  revalidatePath("/admin/consultation-requests");
}

export async function deleteConsultationRequest(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  await supabase.from("consultation_requests").delete().eq("id", id);
  revalidatePath("/admin/consultation-requests");
}