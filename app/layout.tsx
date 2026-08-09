import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "عبد الله النشار | المحاماة والاستشارات القانونية",
  description:
    "مكتب الأستاذ عبد الله النشار للمحاماة والاستشارات القانونية بمدينة دمنهور، محافظة البحيرة. استشارات قانونية احترافية مع متابعة تضع مصلحة العميل في مقدمة الأولويات.",
  keywords: [
    "عبد الله النشار",
    "محامي في دمنهور",
    "محامي دمنهور",
    "محامي البحيرة",
    "محاماة واستشارات قانونية",
    "استشارات قانونية",
  ],
  openGraph: {
    title: "عبد الله النشار | المحاماة والاستشارات القانونية",
    description:
      "خبرة قانونية تبدأ بفهم قضيتك — مكتب الأستاذ عبد الله النشار للمحاماة والاستشارات القانونية.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="font-cairo bg-cream text-slate">{children}</body>
    </html>
  );
}