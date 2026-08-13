"use client";

import { useState, useTransition } from "react";
import { updateRequestStatus } from "@/lib/actions/consultation-requests";

const STATUSES = ["جديد", "قيد المراجعة", "تم التواصل", "مكتمل", "ملغي"];

const STATUS_COLORS: Record<string, string> = {
  "جديد": "bg-blue-100 text-blue-700",
  "قيد المراجعة": "bg-yellow-100 text-yellow-700",
  "تم التواصل": "bg-purple-100 text-purple-700",
  "مكتمل": "bg-green-100 text-green-700",
  "ملغي": "bg-gray-100 text-gray-500",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [current, setCurrent] = useState(status);
  const [isPending, startTransition] = useTransition();

  function handleChange(newStatus: string) {
    setCurrent(newStatus);
    startTransition(() => {
      updateRequestStatus(id, newStatus);
    });
  }

  return (
    <select
      value={current}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value)}
      className={`text-xs font-bold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[current]} ${
        isPending ? "opacity-50" : ""
      }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}