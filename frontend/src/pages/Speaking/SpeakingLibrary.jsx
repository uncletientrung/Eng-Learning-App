import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/SpeakingHeader'
import SpeakingTopicFilters from '../../components/sections/speaking/SpeakingTopicFilters'
import SpeakingTestList from '../../components/sections/speaking/SpeakingTestList'
import MainLayout from '../../components/layout/MainLayout'

import WritingPagination from '../../components/sections/writing/WritingPagination'
import { getSpeakingExercisesWithQuestions } from '../../services/speakingAPI.js'
import { getTopicByModule } from '../../services/topicAPI';

const PAGE_SIZE = 6

function SpeakingLibrary() {
  const [activeTopicGroup, setActiveTopicGroup] = useState('ALL')
  const [activePart, setActivePart] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const [tests, setTests] = useState([]);
  const [topics, setTopics] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          setError('');
          const [exerciseData, topicData] = await Promise.all([
            getSpeakingExercisesWithQuestions(),
            getTopicByModule('SPEAKING'),
          ]);
  
          const safeExercises = Array.isArray(exerciseData) ? exerciseData.reverse() : [];
          const safeTopics = Array.isArray(topicData) ? topicData : [];
  
          setTests(safeExercises);
          setTopics(safeTopics);
        } catch (err) {
            console.error('Lỗi tải dữ liệu:', err);
            setError('Không thể tải dữ liệu Writing.');
        } finally {
            setLoading(false);
          }
        }
  
      fetchData();
  }, []);

  // Lọc bộ câu hỏi theo nhóm chủ đề và Part
  const filteredTests = useMemo(() => {
    let result = tests

    if (activeTopicGroup !== 'ALL') {
      result = result.filter(
        (test) => Number(test.topicId) === Number(activeTopicGroup)
      )
    }

    if (activePart !== 'ALL') {
      result = result.filter(
        (test) => test.speakingType == activePart
      )
    }

    return result
  }, [activeTopicGroup, activePart, tests])

  // Tính số trang
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTests.length / PAGE_SIZE)
  )

  // Lấy dữ liệu của trang hiện tại
  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE

    return filteredTests.slice(
      startIndex,
      startIndex + PAGE_SIZE
    )
  }, [filteredTests, currentPage])

  const handleTopicGroupChange = (group) => {
    setActiveTopicGroup(group)
    setCurrentPage(1)
  }

  const handlePartChange = (part) => {
    setActivePart(part)
    setCurrentPage(1)
  }

  const partRoutes = {
    INTRODUCTION_INTERVIEW: 'p1',
    TOPIC: 'p2',
    TOPIC_DISCUSS: 'p3',
    }

  const handleTestClick = (test) => {
    const part = partRoutes[test.speakingType]
    if (!part) return

    navigate(`/speaking/${part}/${test.id}`, {
      state: { startNewAttempt: true },
    })
  }

  return (
    <MainLayout>
      <section className="relative flex min-h-[101vh] w-full flex-col overflow-hidden bg-brand">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(255,255,255) 1px, transparent 1px),
              linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
        <main
          className="
            relative z-10 mx-auto
            mt-32 w-[calc(100%-2rem)]
            max-w-[1400px]
            flex-grow
            rounded-[24px] bg-white
            px-6 pb-20 pt-8
            shadow-[0_18px_50px_rgba(31,41,55,0.10)]
            md:w-[calc(100%-3rem)]
            md:px-10
            lg:px-12
          "
        >
          <SpeakingHeader
            activePart={activePart}
            onPartChange={handlePartChange}
          />

          <SpeakingTopicFilters
            topics={topics}
            activeTopicGroup={activeTopicGroup}
            onTopicGroupChange={handleTopicGroupChange}
          />
          {loading ? (
            <p className="py-6 text-slate-500">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="py-6 text-red-600">{error}</p>
          ) : (
            <>
              <SpeakingTestList
                tests={paginatedTests}
                onTestClick={handleTestClick}
              />

              <WritingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                variant="green"
              />
            </>
          )}
        </main>
      </section>
    </MainLayout>
  )
}

export default SpeakingLibrary