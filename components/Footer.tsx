import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Logo from "./ui/Logo";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navyDeep">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-right">
        <div>
          <Logo light />
          <p className="text-sm leading-relaxed mt-5 text-grayText">
            مكتب الأستاذ عبد الله النشار للمحاماة والاستشارات القانونية — خدمات قانونية احترافية
            بمدينة دمنهور، محافظة البحيرة، مع متابعة واضحة تضع مصلحة العميل في مقدمة الأولويات.
          </p>
          <div className="flex items-center justify-end gap-3 mt-5">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gold"
              aria-label="انستجرام"
            >
              <InstagramIcon size={16} className="text-gold" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gold"
              aria-label="فيسبوك"
            >
              <FacebookIcon size={16} className="text-gold" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold">روابط الموقع</h4>
          <ul className="space-y-3 text-sm text-grayText">
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/about">من نحن</Link></li>
            <li><Link href="/#services">خدماتنا</Link></li>
            <li><Link href="/#faq">الأسئلة الشائعة</Link></li>
            <li><Link href="/book-consultation">احجز استشارة</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold">المحتوى القانوني</h4>
          <ul className="space-y-3 text-sm text-grayText">
            <li><Link href="/#legal-content">المحتوى القانوني</Link></li>
            <li><Link href="/videos">الفيديوهات</Link></li>
            <li><Link href="/articles">المقالات</Link></li>
            <li><Link href="/know-your-rights">اعرف حقك</Link></li>
            <li><Link href="/media">الإعلام</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-gold">التواصل</h4>
          <ul className="space-y-3 text-sm text-grayText">
            <li className="flex items-center justify-end gap-2">
              <a href={SITE.phoneHref} dir="ltr">{SITE.phone}</a> <Phone size={14} className="text-gold" />
            </li>
            <li className="flex items-center justify-end gap-2">
              <span>واتساب</span> <MessageCircle size={14} className="text-gold" />
            </li>
            <li className="flex items-center justify-end gap-2">
              <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a> <Mail size={14} className="text-gold" />
            </li>
            <li className="flex items-start justify-end gap-2">
              <span>{SITE.address}</span>
              <MapPin size={14} className="text-gold flex-shrink-0 mt-1" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-grayText">
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy">سياسة الخصوصية</Link>
            <Link href="/terms">الشروط والأحكام</Link>
          </div>
          <span>© 2026 مكتب الأستاذ عبد الله النشار للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  );
}