export const speakingTopicGroups = [
  {
    id: 'PERSONAL_FAMILY',
    label: 'Bản thân & Gia đình',
    topics: [
      'Hometown',
      'Family',
      'Friends',
      'Neighbours',
      'Childhood',
      'Pets',
    ],
  },
  {
    id: 'EDUCATION_CAREER',
    label: 'Học tập & Nghề nghiệp',
    topics: [
      'Work or Study',
      'Education',
      'Languages',
      'Reading',
      'Newspapers',
    ],
  },
  {
    id: 'ENTERTAINMENT_HOBBIES',
    label: 'Giải trí & Sở thích',
    topics: [
      'Hobbies',
      'Music',
      'Sport',
      'Films',
      'Television',
      'Art',
      'Photography',
    ],
  },
  {
    id: 'TECHNOLOGY_SOCIETY',
    label: 'Công nghệ & Xã hội',
    topics: [
      'Technology',
      'Social Media',
      'Robots',
      'Emails',
    ],
  },
  {
    id: 'LIFESTYLE_HEALTH',
    label: 'Lối sống & Sức khỏe',
    topics: [
      'Food',
      'Cooking',
      'Shopping',
      'Clothes',
      'Health',
      'Daily Routines',
      'Morning Routines',
      'Weekends',
    ],
  },
  {
    id: 'ENVIRONMENT_TRAVEL',
    label: 'Môi trường & Du lịch',
    topics: [
      'Travel',
      'Environment',
      'Recycling',
      'Weather',
      'Public Transport',
      'Bicycles',
      'Vehicles',
      'Maps',
      'Plants',
    ],
  },
  {
    id: 'IDEAS_LIFE',
    label: 'Ý tưởng & Cuộc sống',
    topics: [
      'Future Plans',
      'Dreams',
      'Money',
      'Gifts',
      'Birthdays',
      'Colours',
      'Stars',
      'Noise',
    ],
  },
];

// Dữ liệu mẫu để thiết kế giao diện.
// Sau này có thể thay bằng dữ liệu lấy từ API.
export const speakingTests = [
  {
    id: 1,
    title: 'Hometown',
    description:
      'Where is your hometown? What do you like most about it? Would you like to live there in the future?',
    category: 'Bản thân & Gia đình',
    topic: 'Hometown',
    part: 'INTRODUCTION_INTERVIEW',
    questionCount: 8,
  },
  {
    id: 2,
    title: 'Education',
    description:
      'Talk about your studies, your favourite subjects, and the importance of education.',
    category: 'Học tập & Nghề nghiệp',
    topic: 'Education',
    part: 'INTRODUCTION_INTERVIEW',
    questionCount: 10,
  },
  {
    id: 3,
    title: 'Describe a memorable trip',
    description:
      'Describe a trip you remember well. Explain where you went, who you went with, and why it was memorable.',
    category: 'Môi trường & Du lịch',
    topic: 'Travel',
    part: 'TOPIC',
    questionCount: 1,
  },
  {
    id: 4,
    title: 'Technology in daily life',
    description:
      'How has technology changed the way people communicate and work?',
    category: 'Công nghệ & Xã hội',
    topic: 'Technology',
    part: 'TOPIC_DISCUSS',
    questionCount: 6,
  },
];