import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // صفحة اللوجن مش عايزة الحماية دي (بتتعرض من غير سايدبار)
  // الميدل وير بيمنع أي حد مش مسجل دخول من الوصول لأي صفحة تانية جوه /admin
  if (!user) {
    redirect("/admin/login");
  }

  // تأكيد إضافي: هل المستخدم موجود فعلاً في جدول admins؟
  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    redirect("/admin/login");
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}