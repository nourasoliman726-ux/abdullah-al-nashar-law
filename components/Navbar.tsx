"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Logo from "./ui/Logo";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EEE9DF]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-semibold px-3 py-1.5 rounded-full border border-[#E3DECF] text-slate">
            English
          </button>
          <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="فيسبوك">
            <FacebookIcon size={18} className="text-slate" />
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="انستجرام">
            <InstagramIcon size={18} className="text-slate" />
          </a>
          <button aria-label="بحث">
            <Search size={18} className="text-slate" />
          </button>
          <Link
            href="/book-consultation"
            className="text-sm font-bold px-5 py-2.5 rounded-lg bg-navy text-white hover:bg-navyDeep transition-colors"
          >
            احجز استشارة
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="القائمة">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-3 border-t border-[#EEE9DF]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold py-1 text-slate"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-consultation"
            className="text-sm font-bold px-5 py-2.5 rounded-lg bg-navy text-white text-center mt-1"
          >
            احجز استشارة
          </Link>
        </div>
      )}
    </header>
  );
}