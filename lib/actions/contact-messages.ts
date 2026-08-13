"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleMessageRead(id: string, isRead: boolean) {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ is_read: isRead }).eq("id", id);
  revalidatePath("/admin/contact-messages");
}

export async function deleteContactMessage(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/contact-messages");
}