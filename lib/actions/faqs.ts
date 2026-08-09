"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveFaq(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string | null;

  const payload = {
    question: (formData.get("question") as string).trim(),
    answer: (formData.get("answer") as string).trim(),
    order_index: Number(formData.get("order_index")) || 0,
    is_active: formData.get("is_active") === "on",
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("faqs").update(payload).eq("id", id);
  } else {
    await supabase.from("faqs").insert(payload);
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  await supabase.from("faqs").delete().eq("id", id);
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}