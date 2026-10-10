import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SpeakingHeader from './components/SpeakingHeader';
import SpeakingTopicFilters from './components/SpeakingTopicFilters';
import SpeakingTestList from './components/SpeakingTestList';

import { speakingTests } from './data/speakingTests';
import WritingPagination from '../writing/WritingPagination';

const PAGE_SIZE = 6;

function SpeakingPage() {
  const navigate = useNavigate();

  const [activePart, setActivePart] = useState('ALL');
  const [activeTopicGroup, setActiveTopicGroup] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTests = useMemo(() => {
    return speakingTests.filter((test) => {
      const matchPart =
        activePart === 'ALL' || test.part === activePart;

      const matchTopicGroup =
        activeTopicGroup === 'ALL' ||
        test.category ===
          ({
            PERSONAL_FAMILY: 'Bản thân & Gia đình',
            EDUCATION_CAREER: 'Học tập & Nghề nghiệp',
            ENTERTAINMENT_HOBBIES: 'Giải trí & Sở thích',
            TECHNOLOGY_SOCIETY: 'Công nghệ & Xã hội',
            LIFESTYLE_HEALTH: 'Lối sống & Sức khỏe',
            ENVIRONMENT_TRAVEL: 'Môi trường & Du lịch',
            IDEAS_LIFE: 'Ý tưởng & Cuộc sống',
          })[activeTopicGroup];

      return matchPart && matchTopicGroup;
    });
  }, [activePart, activeTopicGroup]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTests.length / PAGE_SIZE),
  );

  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handlePartChange = (part) => {
    setActivePart(part);
    setCurrentPage(1);
  };

  const handleTopicGroupChange = (group) => {
    setActiveTopicGroup(group);
    setCurrentPage(1);
  };

  const handleTestClick = (test) => {
    navigate(`/speaking/${test.id}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <SpeakingHeader
        activePart={activePart}
        onPartChange={handlePartChange}
        onOpenPractice={() => navigate('/speaking/practice')}
      />

      <SpeakingTopicFilters
        activeTopicGroup={activeTopicGroup}
        onTopicGroupChange={handleTopicGroupChange}
      />

      <SpeakingTestList
        tests={paginatedTests}
        onTestClick={handleTestClick}
      />

      <WritingPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default SpeakingPage;