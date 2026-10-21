import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import WritingHeader from '../../components/sections/writing/WritingHeader'
import WritingChartFilters from '../../components/sections/writing/WritingChartFilters'
import WritingTestList from '../../components/sections/writing/WritingTestList'
import WritingPagination from '../../components/sections/writing/WritingPagination'
import MainLayout from '../../components/layout/MainLayout'

import { getWritingExercises } from '../../services/writingAPI.js';
import { getTopicByModule } from '../../services/topicAPI';

function WritingLibrary() {
  const [activeChartFilter, setActiveChartFilter] =useState('ALL')
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
          getWritingExercises(),
          getTopicByModule('WRITING'),
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

  const filteredTests = useMemo(() => {
    if (activeChartFilter === 'ALL') {
      return tests;
    }

    return tests.filter(
      (test) => Number(test.topicId) === Number(activeChartFilter)
    );
  }, [tests, activeChartFilter]);


  const handleChartFilterChange = (filter) => {
    setActiveChartFilter(filter)
    setCurrentPage(1)
  }

  const handleTestClick = (test) => {
    navigate(`/writing/${test.id}`)
  }

  return (
      <MainLayout>
        <main
          className="
            z-10 mx-auto
            w-full max-w-7xl
            flex-grow
            px-6 pb-25 pt-25
            lg:px-8
          "
        >
          <WritingHeader />

          <WritingChartFilters
            topics={topics}
            activeChartFilter={activeChartFilter}
            onChartFilterChange={handleChartFilterChange}
          />

          {loading ? (
            <p className="py-6 text-slate-500">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="py-6 text-red-600">{error}</p>
          ) : (
            <>
              <WritingTestList
                tests={filteredTests}
                onTestClick={handleTestClick}
              />

              <WritingPagination
                currentPage={currentPage}
                totalPages={Math.max(
                  1,
                  Math.ceil(filteredTests.length / 10)
                )}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </MainLayout>
    )
}

export default WritingLibrary