"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    phone: formData.get("phone") as string,
    whatsapp: formData.get("whatsapp") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    facebook: formData.get("facebook") as string,
    instagram: formData.get("instagram") as string,
    google_maps: formData.get("google_maps") as string,
    seo_title: formData.get("seo_title") as string,
    seo_description: formData.get("seo_description") as string,
    updated_at: new Date().toISOString(),
  };

  await supabase.from("site_settings").update(payload).eq("id", 1);

  revalidatePath("/admin/settings");
  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}