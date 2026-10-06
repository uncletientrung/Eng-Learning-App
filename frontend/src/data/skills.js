import {
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  BookMarked,
  GraduationCap,
} from 'lucide-react'

export const skills = [
  {
    title: 'Listening',
    description:
      'Luyện nghe mỗi ngày với 100+ đoạn hội thoại thực tế.',
    image: '/assets/listening-card.webp',
    icon: Headphones,
    path: '/listening',
    badge: '100+ ĐỀ',
  },
  {
    title: 'Reading',
    description:
      'Luyện đọc với hệ thống bài đọc IELTS đa dạng.',
    image: '/assets/reading-card.webp',
    icon: BookOpen,
    path: '/reading',
    badge: '100+ BÀI',
  },
  {
    title: 'Writing',
    description:
      'Luyện viết và cải thiện khả năng diễn đạt.',
    image: '/assets/writing-card.webp',
    icon: PenLine,
    path: '/writing',
    badge: '100+ BÀI',
  },
  {
    title: 'Speaking',
    description:
      'Luyện nói và cải thiện khả năng giao tiếp.',
    image: '/assets/speaking-card.webp',
    icon: Mic,
    path: '/speaking',
    badge: '100+ ĐỀ',
  },
  {
    title: 'Vocabulary',
    description:
      'Xây dựng vốn từ vựng IELTS hiệu quả.',
    image: '/assets/vocabulary-card.webp',
    icon: BookMarked,
    path: '/vocabulary',
    badge: 'FREE',
  },
  {
    title: 'Grammar',
    description:
      'Nắm vững ngữ pháp tiếng Anh.',
    image: '/assets/grammar-card.webp',
    icon: GraduationCap,
    path: '/grammar',
    badge: 'FREE',
  },
]
