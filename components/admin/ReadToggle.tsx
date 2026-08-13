"use client";

import { useState, useTransition } from "react";
import { Circle, CheckCircle2 } from "lucide-react";
import { toggleMessageRead } from "@/lib/actions/contact-messages";

export default function ReadToggle({ id, isRead }: { id: string; isRead: boolean }) {
  const [read, setRead] = useState(isRead);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const next = !read;
    setRead(next);
    startTransition(() => {
      toggleMessageRead(id, next);
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full transition-colors ${
        read ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
      } ${isPending ? "opacity-50" : ""}`}
    >
      {read ? <CheckCircle2 size={13} /> : <Circle size={13} />}
      {read ? "تم القراءة" : "غير مقروءة"}
    </button>
  );
}