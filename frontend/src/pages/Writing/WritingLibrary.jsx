import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import WritingHeader from '../../components/sections/writing/WritingHeader'
import WritingChartFilters from '../../components/sections/writing/WritingChartFilters'
import WritingTestList from '../../components/sections/writing/WritingTestList'
import WritingPagination from '../../components/sections/writing/WritingPagination'
import WritingHistoryList from '../../components/sections/writing/WritingHistoryList'
import MainLayout from '../../components/layout/MainLayout'

import { getWritingExercises } from '../../services/writingAPI.js';
import { getTopicByModule } from '../../services/topicAPI';
import { getAccessToken } from '../../services/authApi.js'
import {
  getWritingTaskType,
  getWritingTaskTypeForTopic,
} from '../../constant/writingConstant.js'
import {
  deleteWritingHistoryAttempt,
  getUnattemptedWritingExerciseIds,
  getWritingHistory,
} from '../../services/writingGradingApi.js'

function WritingLibrary() {
  const [activeTaskFilter, setActiveTaskFilter] = useState('ALL')
  const [activeChartFilter, setActiveChartFilter] =useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams] = useSearchParams()
  const requestedStatus = searchParams.get('status')
  const practiceStatus = ['ALL', 'NOT_STARTED', 'PRACTICED'].includes(
    requestedStatus
  )
    ? requestedStatus
    : searchParams.get('view') === 'history'
      ? 'PRACTICED'
      : 'ALL'

  const [tests, setTests] = useState([]);
  const [topics, setTopics] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deletingAttemptId, setDeletingAttemptId] = useState(null);
  const [unattemptedExerciseIds, setUnattemptedExerciseIds] = useState([]);
  const [unattemptedLoading, setUnattemptedLoading] = useState(false);
  const [unattemptedError, setUnattemptedError] = useState('');

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

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return undefined;

    let cancelled = false;
    async function fetchHistory() {
      setHistoryLoading(true);
      setHistoryError('');
      try {
        const historyData = await getWritingHistory(token);
        if (!cancelled) {
          setHistory(Array.isArray(historyData) ? historyData : []);
        }
      } catch (requestError) {
        if (!cancelled) setHistoryError(requestError.message);
      } finally {
        if (!cancelled) setHistoryLoading(false);
      }
    }

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token || practiceStatus !== 'NOT_STARTED') return undefined;

    let cancelled = false;
    async function fetchUnattemptedExercises() {
      setUnattemptedLoading(true);
      setUnattemptedError('');
      try {
        const exerciseIds = await getUnattemptedWritingExerciseIds(token);
        if (!cancelled) {
          setUnattemptedExerciseIds(
            Array.isArray(exerciseIds) ? exerciseIds.map(Number) : []
          );
        }
      } catch (requestError) {
        if (!cancelled) setUnattemptedError(requestError.message);
      } finally {
        if (!cancelled) setUnattemptedLoading(false);
      }
    }

    fetchUnattemptedExercises();
    return () => {
      cancelled = true;
    };
  }, [practiceStatus]);

  const visibleTopics = useMemo(() => {
    if (activeTaskFilter === 'ALL') return topics
    return topics.filter(
      (topic) => getWritingTaskTypeForTopic(topic.name) === activeTaskFilter
    )
  }, [topics, activeTaskFilter])

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const topicTaskType = getWritingTaskTypeForTopic(test.topic?.name)
      const matchesTask = activeTaskFilter === 'ALL' ||
        (getWritingTaskType(test.writingType, test.topic?.name) === activeTaskFilter &&
          topicTaskType === activeTaskFilter)
      const matchesTopic = activeChartFilter === 'ALL' ||
        Number(test.topicId) === Number(activeChartFilter)
      const matchesStatus = practiceStatus !== 'NOT_STARTED' ||
        unattemptedExerciseIds.includes(Number(test.id))
      return matchesTask && matchesTopic && matchesStatus
    })
  }, [tests, unattemptedExerciseIds, activeTaskFilter, activeChartFilter, practiceStatus])

  const filteredHistory = useMemo(() => {
    return history.filter((attempt) => {
      const topicTaskType = getWritingTaskTypeForTopic(attempt.topicName)
      const matchesTask = activeTaskFilter === 'ALL' ||
        (getWritingTaskType(attempt.writingType, attempt.topicName) === activeTaskFilter &&
          topicTaskType === activeTaskFilter)
      const matchesTopic = activeChartFilter === 'ALL' ||
        Number(attempt.topicId) === Number(activeChartFilter)
      return matchesTask && matchesTopic
    })
  }, [history, activeTaskFilter, activeChartFilter])

  const handleTaskFilterChange = (filter) => {
    setActiveTaskFilter(filter)
    setActiveChartFilter('ALL')
    setCurrentPage(1)
  }


  const handleChartFilterChange = (filter) => {
    setActiveChartFilter(filter)
    setCurrentPage(1)
  }

  const handleTestClick = (test) => {
    navigate(`/writing/${test.id}`)
  }

  const handlePracticeStatusChange = (status) => {
    if (status !== 'ALL' && !getAccessToken()) {
      navigate('/login')
      return
    }

    setCurrentPage(1)
    navigate(status === 'ALL' ? '/writing' : `/writing?status=${status}`)
  }

  const handleAttemptClick = (attempt) => {
    navigate(`/writing/${attempt.exerciseId}?attemptId=${attempt.attemptId}`)
  }

  const handleDeleteAttempt = async (attempt) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa lượt làm bài "${attempt.exerciseTitle}" không? Thao tác này không thể hoàn tác.`
    )
    if (!confirmed) return

    const token = getAccessToken()
    if (!token) {
      navigate('/login')
      return
    }

    setDeletingAttemptId(attempt.attemptId)
    setDeleteError('')
    try {
      await deleteWritingHistoryAttempt(attempt.attemptId, token)
      const remainingHistory = history.filter(
        (item) => item.attemptId !== attempt.attemptId
      )
      setHistory(remainingHistory)

      const exerciseStillPracticed = remainingHistory.some(
        (item) => Number(item.exerciseId) === Number(attempt.exerciseId)
      )
      if (!exerciseStillPracticed) {
        setUnattemptedExerciseIds((ids) =>
          ids.includes(Number(attempt.exerciseId))
            ? ids
            : [...ids, Number(attempt.exerciseId)]
        )
      }
    } catch (requestError) {
      setDeleteError(requestError.message)
    } finally {
      setDeletingAttemptId(null)
    }
  }

  return (
      <MainLayout >
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
            mt-32 mb-10 w-[calc(100%-2rem)]
            max-w-[1400px]
            flex-grow
            rounded-[24px] bg-white
            px-6 pb-20 pt-8
            shadow-[0_18px_50px_rgba(31,41,55,0.10)]
            md:w-[calc(100%-3rem)]
            md:px-10
            lg:px-12
            border-4 border-[#111]
          "
        >
          <WritingHeader
            practiceStatus={practiceStatus}
            onPracticeStatusChange={handlePracticeStatusChange}
          />

          <WritingChartFilters
            topics={visibleTopics}
            activeTaskFilter={activeTaskFilter}
            onTaskFilterChange={handleTaskFilterChange}
            activeChartFilter={activeChartFilter}
            onChartFilterChange={handleChartFilterChange}
          />

          {loading ? (
            <p className="py-6 text-slate-500">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="py-6 text-red-600">{error}</p>
          ) : practiceStatus === 'PRACTICED' ? (
            <WritingHistoryList
              attempts={filteredHistory}
              loading={historyLoading}
              error={historyError}
              deleteError={deleteError}
              deletingAttemptId={deletingAttemptId}
              onAttemptClick={handleAttemptClick}
              onDeleteAttempt={handleDeleteAttempt}
            />
          ) : practiceStatus === 'NOT_STARTED' && unattemptedLoading ? (
            <p className="py-6 text-slate-500">Đang tải trạng thái bài luyện...</p>
          ) : practiceStatus === 'NOT_STARTED' && unattemptedError ? (
            <p className="py-6 text-red-600">{unattemptedError}</p>
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
                variant="green"
              />
            </>
          )}
        </main>
        </section>
      </MainLayout>
    )
}

export default WritingLibrary