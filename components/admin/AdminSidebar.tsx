"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Video,
  Briefcase,
  HelpCircle,
  Inbox,
  MessageSquare,
  Settings,
  LogOut,
  Scale,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const LINKS = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/articles", label: "المقالات", icon: FileText },
  { href: "/admin/videos", label: "الفيديوهات", icon: Video },
  { href: "/admin/services", label: "الخدمات", icon: Briefcase },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { href: "/admin/consultation-requests", label: "طلبات الاستشارة", icon: Inbox },
  { href: "/admin/contact-messages", label: "رسائل التواصل", icon: MessageSquare },
  { href: "/admin/settings", label: "إعدادات الموقع", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-navy min-h-screen flex flex-col">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card border border-gold">
          <Scale size={18} className="text-gold" />
        </div>
        <div className="text-right leading-tight">
          <div className="text-sm font-bold text-white">لوحة التحكم</div>
          <div className="text-xs text-grayText">عبد الله النشار</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                active ? "bg-card text-gold" : "text-grayText hover:bg-card/60 hover:text-white"
              }`}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-grayText hover:bg-card/60 hover:text-white transition-colors"
        >
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}