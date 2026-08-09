"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export default function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold shadow-lg bg-navyDeep text-white border border-gold animate-elnashar-pulse"
    >
      <MessageCircle size={18} className="text-gold" />
      استشارة عبر واتساب
    </a>
  );
}