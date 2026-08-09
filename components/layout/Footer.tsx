// src/components/layout/Footer.tsx

import { CONTACT_INFO, SITE_INFO, NAV_LINKS } from '@/lib/constants'
import { getTelUrl, getWhatsAppUrl } from '@/lib/utils'
import Link from 'next/link'
import { Container } from '../ui'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* عن المكتب */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-500">
                {SITE_INFO.name}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                خبرة قانونية تبدأ بفهم قضيتك - حلول قانونية احترافية ومتابعة تضع مصلحة العميل في مقدمة الأولويات.
              </p>
            </div>

            {/* روابط سريعة */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-500">
                روابط سريعة
              </h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* التواصل */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-500">
                تواصل معنا
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a 
                    href={getTelUrl(CONTACT_INFO.phone)}
                    className="hover:text-gold-500 transition-colors flex items-center gap-2"
                  >
                    📞 {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <a 
                    href={getWhatsAppUrl(CONTACT_INFO.whatsapp)}
                    className="hover:text-gold-500 transition-colors flex items-center gap-2"
                    target="_blank"
                  >
                    💬 واتساب
                  </a>
                </li>
                <li>
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="hover:text-gold-500 transition-colors flex items-center gap-2"
                  >
                    ✉️ {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* العنوان */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-500">
                موقع المكتب
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {CONTACT_INFO.address}
              </p>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:text-gold-400 transition-colors inline-flex items-center gap-2"
              >
                📍 فتح الخريطة
              </a>
            </div>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-gray-800 py-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} {SITE_INFO.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </Container>
    </footer>
  )
}