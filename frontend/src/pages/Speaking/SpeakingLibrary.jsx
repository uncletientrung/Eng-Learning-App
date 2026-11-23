import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/SpeakingHeader'
import SpeakingTopicFilters from '../../components/sections/speaking/SpeakingTopicFilters'
import SpeakingTestList from '../../components/sections/speaking/SpeakingTestList'
import SpeakingHistoryList from '../../components/sections/speaking/SpeakingHistoryList'
import MainLayout from '../../components/layout/MainLayout'

import WritingPagination from '../../components/sections/writing/WritingPagination'
import {
  deleteSpeakingAttemptHistory,
  getAttemptedSpeakingExerciseIds,
  getSpeakingAttemptHistory,
  getSpeakingExercisesWithQuestions,
} from '../../services/speakingAPI.js'
import { getTopicByModule } from '../../services/topicAPI';
import { getAuthenticatedToken } from '../../services/authApi.js'

const PAGE_SIZE = 6

function SpeakingLibrary() {
  const [activeTopicGroups, setActiveTopicGroups] = useState([])
  const [activePart, setActivePart] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedStatus = searchParams.get('status')
  const practiceStatus = ['ALL', 'NOT_STARTED', 'PRACTICED'].includes(requestedStatus)
    ? requestedStatus
    : 'ALL'

  const [tests, setTests] = useState([]);
  const [topics, setTopics] = useState([]);
  const [attemptedExerciseIds, setAttemptedExerciseIds] = useState([]);
  const [history, setHistory] = useState([]);
  const [deletingAttemptId, setDeletingAttemptId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [attemptStatusLoading, setAttemptStatusLoading] = useState(false);
  const [attemptStatusError, setAttemptStatusError] = useState('');

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
            setError('Không thể tải dữ liệu Speaking.');
        } finally {
            setLoading(false);
          }
        }
  
      fetchData();
  }, []);

  useEffect(() => {
    if (practiceStatus === 'ALL') return undefined;

    if (!getAuthenticatedToken()) {
      navigate('/login', {
        replace: true,
        state: { from: `/speaking?status=${practiceStatus}` },
      });
      return undefined;
    }

    let cancelled = false;
    async function fetchAttemptedExercises() {
      setAttemptStatusLoading(true);
      setAttemptStatusError('');
      try {
        if (practiceStatus === 'PRACTICED') {
          const attempts = await getSpeakingAttemptHistory();
          if (!cancelled) {
            setHistory(Array.isArray(attempts) ? attempts : []);
          }
        } else {
          const exerciseIds = await getAttemptedSpeakingExerciseIds();
          if (!cancelled) {
            setAttemptedExerciseIds(
              Array.isArray(exerciseIds) ? exerciseIds.map(Number) : []
            );
          }
        }
      } catch (requestError) {
        if (!cancelled) setAttemptStatusError(requestError.message);
      } finally {
        if (!cancelled) setAttemptStatusLoading(false);
      }
    }

    fetchAttemptedExercises();
    return () => {
      cancelled = true;
    };
  }, [practiceStatus, navigate]);

  // Lọc bộ câu hỏi theo nhóm chủ đề và Part
  const filteredTests = useMemo(() => {
    let result = tests

    if (activeTopicGroups.length > 0) {
      result = result.filter(
        (test) => activeTopicGroups.includes(Number(test.topicId))
      )
    }

    if (activePart !== 'ALL') {
      result = result.filter(
        (test) => test.speakingType === activePart
      )
    }

    if (practiceStatus === 'NOT_STARTED') {
      result = result.filter(
        (test) => !attemptedExerciseIds.includes(Number(test.id))
      )
    }

    return result
  }, [activeTopicGroups, activePart, attemptedExerciseIds, practiceStatus, tests])

  const filteredHistory = useMemo(
    () =>
      history.filter((attempt) => {
        if (
          activeTopicGroups.length > 0 &&
          !activeTopicGroups.includes(Number(attempt.topicId))
        ) {
          return false
        }
        return activePart === 'ALL' || attempt.speakingType === activePart
      }),
    [activePart, activeTopicGroups, history]
  )

  const displayedItems =
    practiceStatus === 'PRACTICED' ? filteredHistory : filteredTests

  // Tính số trang
  const totalPages = Math.max(
    1,
    Math.ceil(displayedItems.length / PAGE_SIZE)
  )

  // Lấy dữ liệu của trang hiện tại
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE

    return displayedItems.slice(
      startIndex,
      startIndex + PAGE_SIZE
    )
  }, [displayedItems, currentPage])

  const handleTopicGroupChange = (group) => {
    setActiveTopicGroups((selected) => {
      if (group === 'ALL') return []
      const topicId = Number(group)
      return selected.includes(topicId)
        ? selected.filter((id) => id !== topicId)
        : [...selected, topicId]
    })
    setCurrentPage(1)
  }

  const handlePartChange = (part) => {
    setActivePart(part)
    setCurrentPage(1)
  }

  const handlePracticeStatusChange = (status) => {
    setCurrentPage(1)
    if (status !== 'ALL' && !getAuthenticatedToken()) {
      navigate('/login', {
        state: { from: `/speaking?status=${status}` },
      })
      return
    }

    setSearchParams(status === 'ALL' ? {} : { status })
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

  const handleHistoryClick = (attempt) => {
    const part = partRoutes[attempt.speakingType]
    if (!part) return

    navigate(
      `/speaking/${part}/${attempt.exerciseId}?attemptId=${attempt.attemptId}&history=1`
    )
  }

  const handleDeleteAttempt = async (attempt) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa lượt làm Speaking "${attempt.exerciseTitle}" không?`
    )
    if (!confirmed) return

    setDeletingAttemptId(attempt.attemptId)
    setDeleteError('')
    try {
      await deleteSpeakingAttemptHistory(attempt.attemptId)
      setHistory((previousHistory) =>
        previousHistory.filter(
          (item) => item.attemptId !== attempt.attemptId
        )
      )
      setCurrentPage(
        Math.max(1, Math.ceil((filteredHistory.length - 1) / PAGE_SIZE))
      )
    } catch (requestError) {
      setDeleteError(requestError.message || 'Không thể xóa lượt làm Speaking.')
    } finally {
      setDeletingAttemptId(null)
    }
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
            mt-32 mb-10 w-[calc(100%-2rem)]
            max-w-350
            grow
            rounded-3xl bg-white
            px-6 pb-20 pt-8
            shadow-[0_18px_50px_rgba(31,41,55,0.10)]
            md:w-[calc(100%-3rem)]
            md:px-10
            lg:px-12
            border-4 border-[#111]
          "
        >
          <SpeakingHeader
            practiceStatus={practiceStatus}
            onPracticeStatusChange={handlePracticeStatusChange}
          />

          <SpeakingTopicFilters
            topics={topics}
            activePart={activePart}
            onPartChange={handlePartChange}
            activeTopicGroups={activeTopicGroups}
            onTopicGroupChange={handleTopicGroupChange}
          />
          {loading ? (
            <p className="py-6 text-slate-500">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="py-6 text-red-600">{error}</p>
          ) : practiceStatus !== 'ALL' && attemptStatusLoading ? (
            <p className="py-6 text-slate-500">
              {practiceStatus === 'PRACTICED'
                ? 'Đang tải lịch sử bài luyện...'
                : 'Đang tải trạng thái bài luyện...'}
            </p>
          ) : practiceStatus !== 'ALL' && attemptStatusError ? (
            <p className="py-6 text-red-600">{attemptStatusError}</p>
          ) : (
            <>
              {practiceStatus === 'PRACTICED' ? (
                <SpeakingHistoryList
                  attempts={paginatedItems}
                  loading={false}
                  error=""
                  deleteError={deleteError}
                  deletingAttemptId={deletingAttemptId}
                  onAttemptClick={handleHistoryClick}
                  onDeleteAttempt={handleDeleteAttempt}
                />
              ) : (
                <SpeakingTestList
                  tests={paginatedItems}
                  onTestClick={handleTestClick}
                />
              )}

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