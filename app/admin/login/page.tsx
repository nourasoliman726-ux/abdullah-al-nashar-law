"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("بيانات الدخول غير صحيحة. تأكد من البريد وكلمة المرور.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-navy px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-card border border-gold mb-4">
            <Scale size={26} className="text-gold" strokeWidth={1.75} />
          </div>
          <h1 className="text-xl font-extrabold text-white">لوحة تحكم المكتب</h1>
          <p className="text-sm text-grayText mt-1">تسجيل دخول الأدمن</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-cardBorder rounded-xl p-6">
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <label className="block text-sm font-semibold text-white mb-2 text-right">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-navy border border-white/10 px-4 py-3 text-sm text-white text-right outline-none focus:border-gold mb-5"
            placeholder="admin@example.com"
          />

          <label className="block text-sm font-semibold text-white mb-2 text-right">
            كلمة المرور
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-navy border border-white/10 px-4 py-3 text-sm text-white text-right outline-none focus:border-gold mb-6"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm font-bold px-6 py-3 rounded-lg bg-gold text-navy hover:bg-goldSoft transition-colors disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}