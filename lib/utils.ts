// src/lib/utils.ts

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 180 // للعربي
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const formattedPhone = cleanPhone.startsWith('20') ? cleanPhone : `20${cleanPhone}`
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}

export function getTelUrl(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  return `tel:+${cleanPhone.startsWith('20') ? cleanPhone : `20${cleanPhone}`}`
}