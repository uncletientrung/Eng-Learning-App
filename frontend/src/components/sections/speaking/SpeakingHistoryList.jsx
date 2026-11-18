import { Eye, Mic, Trash2 } from 'lucide-react'

const partLabels = {
  INTRODUCTION_INTERVIEW: 'Introduction & Interview',
  TOPIC: 'Topic',
  TOPIC_DISCUSS: 'Topic Discussion',
}

function formatCompletedAt(value) {
  if (!value) return 'Chưa rõ thời gian nộp'

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function getAttemptStatus(attempt) {
  if (attempt.status === 'GRADED' && attempt.overallScore != null) {
    return `Band ${Number(attempt.overallScore).toFixed(1)}`
  }
  if (attempt.status === 'GRADING_FAILED') return 'Chấm điểm thất bại'
  return 'Đang chấm'
}

export default function SpeakingHistoryList({
  attempts,
  loading,
  error,
  deleteError,
  deletingAttemptId,
  onAttemptClick,
  onDeleteAttempt,
}) {
  if (loading) {
    return <p className="py-8 text-center text-slate-500">Đang tải lịch sử...</p>
  }

  if (error) {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    )
  }

  if (attempts.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-600">
          Chưa có lượt Speaking nào đã nộp.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Các bài đã nộp sẽ xuất hiện tại đây.
        </p>
      </div>
    )
  }

  return (
    <>
      {deleteError && (
        <p role="alert" className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {deleteError}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4">
        {attempts.map((attempt) => (
          <article
            key={attempt.attemptId}
            className="relative overflow-hidden border-2 border-[#111] bg-white shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
          >
            <div className="absolute left-0 top-0 z-10 max-w-[90%] truncate rounded-br-lg border-b-2 border-r-2 border-[#111] bg-[#ffc926] px-3 py-1 text-[11px] font-bold shadow-sm">
              {partLabels[attempt.speakingType] ?? 'Speaking'}
            </div>

            <div className="relative flex min-h-[132px] flex-col justify-center gap-3 bg-[#f8f9fa] p-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
              {attempt.overallScore != null && (
                <span
                  aria-label={`Band ${Number(attempt.overallScore).toFixed(1)}`}
                  className="absolute right-0 top-0 flex min-h-8 min-w-12 items-center justify-center rounded-bl-lg border-b-2 border-l-2 border-[#111] bg-[#d6f5e8] px-2 text-sm font-black text-[#111] shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
                >
                  {Number(attempt.overallScore).toFixed(1)}
                </span>
              )}

              <div className="flex min-w-0 flex-1 items-center gap-3 pr-14 sm:pr-16">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center border-2 border-[#111] bg-white sm:flex">
                  <Mic size={19} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black leading-snug text-[#111] sm:text-base">
                    {attempt.exerciseTitle}
                  </h3>
                  <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                    {attempt.topicName}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                    <span>Nộp lúc: {formatCompletedAt(attempt.completedAt)}</span>
                    {attempt.overallScore == null && (
                      <span className="font-black text-[#405622]">
                        {getAttemptStatus(attempt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:ml-4">
                <button
                  type="button"
                  onClick={() => onAttemptClick(attempt)}
                  className="flex items-center gap-1.5 rounded-xl border-2 border-[#111] bg-[#ffc926] px-3 py-2 text-xs font-bold text-[#111] shadow-[2px_2px_0_rgba(0,0,0,0.15)] transition hover:-translate-y-px hover:bg-[#ffd84d]"
                >
                  <Eye size={14} />
                  Xem kết quả
                </button>
                <button
                  type="button"
                  disabled={deletingAttemptId !== null}
                  onClick={() => onDeleteAttempt(attempt)}
                  aria-label={`Xóa lượt làm ${attempt.attemptId}`}
                  className="flex items-center gap-1.5 rounded-xl border-2 border-[#111] bg-white px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {deletingAttemptId === attempt.attemptId ? 'Đang xóa...' : 'Xóa'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
