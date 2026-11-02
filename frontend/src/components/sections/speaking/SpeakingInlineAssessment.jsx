import { useState } from 'react'
import { Bot } from 'lucide-react'
import SpeakingScoreSummary from './SpeakingScoreSummary'

export default function SpeakingInlineAssessment({
  attempt,
  questionId,
  isFinalAnswer,
  onRetry,
  onRetryError,
}) {
  const [isRetrying, setIsRetrying] = useState(false)
  const status = attempt?.status
  const result = attempt?.result
  const answerFeedback = result?.answerFeedback?.find(
    (item) => item.questionId === questionId
  )?.feedback

  const handleRetry = async () => {
    setIsRetrying(true)
    onRetryError?.('')
    try {
      await onRetry()
    } catch (error) {
      onRetryError?.(error.message || 'Không thể gửi lại yêu cầu chấm bài.')
    } finally {
      setIsRetrying(false)
    }
  }

  if (!status || status === 'IN_PROGRESS') return null

  if (status === 'SUBMITTED' || status === 'GRADING') {
    if (!isFinalAnswer) return null
    return (
      <div className="my-3 flex w-full justify-center">
        <div className="flex w-full max-w-4xl items-center gap-3 rounded-2xl border-2 border-[#111] bg-white px-4 py-3 shadow-[3px_3px_0_rgba(0,0,0,0.12)]">
          <Bot size={20} className="shrink-0 text-[#6f8f4b]" />
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#d6dfc2] border-t-[#6f8f4b]" />
          <p className="text-xs font-bold text-[#56673d]">
            Gemini đang chấm bài của bạn...
          </p>
        </div>
      </div>
    )
  }

  if (status === 'GRADING_FAILED') {
    if (!isFinalAnswer) return null
    return (
      <div className="my-3 flex w-full justify-center">
        <div className="w-full max-w-4xl rounded-2xl border-2 border-[#111] bg-red-50 p-4 text-left shadow-[3px_3px_0_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-2">
            <Bot size={20} className="shrink-0 text-red-700" />
            <p className="text-sm font-extrabold text-red-700">
              Chấm bài chưa thành công. Bài làm vẫn được lưu.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="mt-2 rounded-lg border-2 border-[#111] bg-[#ffc926] px-3 py-1.5 text-xs font-extrabold disabled:opacity-60"
          >
            {isRetrying ? 'ĐANG GỬI...' : 'THỬ CHẤM LẠI'}
          </button>
        </div>
      </div>
    )
  }

  if (status !== 'GRADED' || !result) return null

  return (
    <div className="my-3 flex w-full justify-center">
      <div className="w-full max-w-4xl space-y-3 rounded-2xl border-2 border-[#111] bg-[#fffdf5] p-4 text-left shadow-[3px_3px_0_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2 border-b border-[#e5e0d5] pb-2">
          <Bot size={20} className="text-[#6f8f4b]" />
          <p className="text-[10px] font-black uppercase tracking-wide text-[#6f8f4b]">
            Nhận xét từ giám khảo AI
          </p>
        </div>
        {answerFeedback && (
          <div className="rounded-xl border border-[#d6dfc2] bg-white p-3">
          <p className="text-[10px] font-black uppercase tracking-wide text-[#6f8f4b]">
            Nhận xét câu trả lời
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#45443e]">
            {answerFeedback}
          </p>
          </div>
        )}

        {isFinalAnswer && (
          <>
            <SpeakingScoreSummary result={result} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="rounded-lg border border-[#111] bg-white px-3 py-1.5 text-[10px] font-extrabold disabled:opacity-60"
              >
                {isRetrying ? 'ĐANG GỬI...' : 'CHẤM LẠI BÀI NÀY'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
