// src/types/index.ts

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  cover_image?: string
  published_at: string
  reading_time: number
}

export interface Video {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url?: string
  published_at: string
}

export interface ConsultationRequest {
  full_name: string
  phone: string
  email?: string
  consultation_type?: string
  description: string
  preferred_date?: string
  preferred_time?: string
  consultation_method?: 'office' | 'phone' | 'whatsapp' | 'online'
}

export interface ContactMessage {
  full_name: string
  phone?: string
  email?: string
  subject?: string
  message: string
}