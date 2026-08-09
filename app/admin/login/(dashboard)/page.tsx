import { FileText, Video, Inbox, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();

  const [articles, videos, requests, messages, newRequests, unreadMessages] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("videos").select("id", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("consultation_requests").select("id", { count: "exact", head: true }).eq("status", "جديد"),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  return {
    articles: articles.count ?? 0,
    videos: videos.count ?? 0,
    requests: requests.count ?? 0,
    messages: messages.count ?? 0,
    newRequests: newRequests.count ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { label: "طلبات استشارة جديدة", value: counts.newRequests, icon: Inbox, href: "/admin/consultation-requests" },
    { label: "رسائل غير مقروءة", value: counts.unreadMessages, icon: MessageSquare, href: "/admin/contact-messages" },
    { label: "إجمالي المقالات", value: counts.articles, icon: FileText, href: "/admin/articles" },
    { label: "إجمالي الفيديوهات", value: counts.videos, icon: Video, href: "/admin/videos" },
  ];

  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-1">نظرة عامة</h1>
      <p className="text-sm text-gray-500 mb-8">ملخص سريع لحالة الموقع.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="bg-white rounded-xl border border-[#EEE9DF] p-6 hover:border-gold transition-colors block"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-navy mb-4 mr-auto ml-0">
              <c.icon size={18} className="text-gold" />
            </div>
            <div className="text-3xl font-extrabold text-slate mb-1">{c.value}</div>
            <div className="text-sm text-gray-500">{c.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}