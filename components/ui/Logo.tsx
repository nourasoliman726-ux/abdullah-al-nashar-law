import { Scale } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center rounded-lg w-11 h-11 bg-navy border border-gold">
        <Scale size={22} className="text-gold" strokeWidth={1.75} />
      </div>
      <div className="text-right leading-tight">
        <div className={`font-extrabold text-lg ${light ? "text-white" : "text-slate"}`}>
          {SITE.nameAr}
        </div>
        <div className="text-xs text-gold">{SITE.taglineAr}</div>
      </div>
    </div>
  );
}