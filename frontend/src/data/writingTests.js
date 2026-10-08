import testImage from '../assets/test.png'

export const writingTests = [
  {
    id: 1,
    title: 'Volunteers by Organizations',
    description:
      'Traffic congestion in cities around the world is increasing. What are the causes of this? What solutions can be suggested?',
    taskType: 'TASK_1',
    testType: 'ACADEMIC',
    category: 'Pie Chart',
    chartType: 'PIE_CHART',
    thumbnail: testImage,
    minimumWords: 150,
    suggestedMinutes: 20,
    prompt:
      'The charts below show the percentage of volunteers by organizations in 2008 and 2014. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    image:
      'https://pub-c71988294a9b45099e83dad66bb73426.r2.dev/images/migrated/ielts-writing/pie-chart/pc-025.webp',

    guide: {
      title: 'Hướng dẫn viết bài + Sample 8.0',

      content: {
        explanation: `
          Hai biểu đồ tròn cho thấy tỷ lệ người tình nguyện trong sáu lĩnh vực
          (Environmental, Art, Sport, Health Care, Educational, Others)
          vào năm 2008 và 2014.
        `,

        type: 'pie charts – so sánh 2 mốc thời gian',

        introduction: {
          description:
            'Giữ: participation / different organisations / two years.',

          sample:
            'The pie charts illustrate the proportions of volunteers working in six different sectors in 2008 and 2014.'
        },

        overview: [
          'Environmental và Sport tăng đáng kể, trở thành hai nhóm lớn nhất vào 2014',
          'Educational giảm rõ rệt',
          'Art và Others giảm nhẹ',
          'Health Care tăng nhẹ, gần như ổn định'
        ],

        body: [
          {
            title: 'BODY 1 – Nhóm tăng',
            items: [
              'Environmental: 21% → 29% → tăng mạnh nhất, trở thành lớn nhất',
              'Sport: 15% → 25% → tăng đáng kể',
              'Health Care: 7% → 8% → tăng nhẹ'
            ]
          },
          {
            title: 'BODY 2 – Nhóm giảm',
            items: [
              'Educational: 24% → 17% → giảm rõ rệt',
              'Art: 18% → 12% → giảm',
              'Others: 15% → 9% → giảm'
            ]
          }
        ],

        vocabulary: [
          'account for',
          'make up',
          'increase significantly',
          'decline noticeably',
          'rise steadily',
          'remain relatively stable',
          'overtake'
        ],

        sample: {
          paragraphs: [
            'The two pie charts compare the proportions of volunteers working in six different sectors in 2008 and 2014.',

            'Overall, environmental and sports-related volunteering increased over the period, while participation in educational activities, art, and "other" categories declined. The most notable change was the rise of environmental work, which became the largest sector by 2014.',

            'In 2008, educational volunteering accounted for the largest share at 24%, followed by environmental work at 21% and art at 18%. Sport and "other" activities each represented 15%, while health care was the least common sector at just 7%.',

            'By 2014, environmental volunteering had grown significantly to 29%, overtaking all other categories. Sport also increased markedly to 25%, becoming the second most popular sector. In contrast, art saw a noticeable decline to 12%, and educational activities fell to 17%. Health care rose slightly from 7% to 8%, whereas the proportion of volunteers in other activities dropped considerably to 9%.'
          ]
        }
      }
    }
  },
  {
    id: 7,
    title: 'Causes and Solutions for Traffic Congestion',
    description:
      'Traffic congestion in cities around the world is increasing. What are the causes of this? What solutions can be suggested?',
    category: 'Problem & Solution',
    taskType: 'Task 2',
    thumbnail: testImage,
  },
  {
    id: 2,
    title: 'The Advantages and Disadvantages of Online Learning',
    description:
      'More and more students are choosing online learning instead of attending traditional classes. Discuss the advantages and disadvantages.',
    category: 'Advantages & Disadvantages',
    taskType: 'Task 2',
    thumbnail: testImage,
  },
  {
    id: 3,
    title: 'The Importance of Public Transportation',
    description:
      'Some people believe that governments should invest more in public transportation. To what extent do you agree or disagree?',
    category: 'Opinion',
    taskType: 'Task 2',
    thumbnail: testImage,
  },

  // Task 1
  {
    id: 4,
    title: 'Changes in Household Spending',
    description:
      'The chart shows changes in household spending in different categories over a period of time.',
    category: 'Bar Chart',
    chartType: 'BAR_CHART',
    taskType: 'Task 1',
    thumbnail: testImage,
  },
  {
    id: 5,
    title: 'Population Changes in Three Cities',
    description:
      'The graph illustrates population changes in three different cities between 2000 and 2020.',
    category: 'Line Graph',
    chartType: 'LINE_GRAPH',
    taskType: 'Task 1',
    thumbnail: testImage,
  },
  {
    id: 6,
    title: 'The Process of Producing Recycled Paper',
    description:
      'The diagram illustrates the process used to produce recycled paper from used materials.',
    category: 'Process',
    chartType: 'PROCESS',
    taskType: 'Task 1',
    thumbnail: testImage,
  },
]