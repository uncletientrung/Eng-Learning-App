import { useState } from 'react'

const criterionNames = {
  FLUENCY_COHERENCE: 'Độ trôi chảy và mạch lạc',
  LEXICAL_RESOURCE: 'Vốn từ vựng',
  GRAMMAR_ACCURACY: 'Ngữ pháp và độ chính xác',
  PRONUNCIATION: 'Phát âm',
}

export default function SpeakingAssessmentResult({
  attempt,
  onRetry,
  onRetryError,
}) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    onRetryError('')
    try {
      await onRetry()
    } catch (error) {
      onRetryError(error.message || 'Không thể gửi lại yêu cầu chấm bài.')
    } finally {
      setIsRetrying(false)
    }
  }

  if (attempt.status === 'SUBMITTED' || attempt.status === 'GRADING') {
    return (
      <div className="rounded-2xl border-2 border-[#111] bg-white p-6 text-center shadow-[4px_4px_0_#111]">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#e8f0c9] border-t-[#6f8f4b]" />
        <h2 className="text-xl font-extrabold">Đang chấm bài Speaking</h2>
        <p className="mt-2 text-sm text-[#67645a]">
          Bài đã được lưu. Kết quả sẽ tự động hiển thị sau khi Gemini hoàn tất.
        </p>
      </div>
    )
  }

  if (attempt.status === 'GRADING_FAILED') {
    return (
      <div className="rounded-2xl border-2 border-[#111] bg-white p-6 text-center shadow-[4px_4px_0_#111]">
        <h2 className="text-xl font-extrabold text-[#b42318]">
          Chấm bài chưa thành công
        </h2>
        <p className="mt-2 text-sm text-[#67645a]">
          Bài và file ghi âm vẫn được lưu. Bạn có thể thử chấm lại.
        </p>
        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="mt-4 rounded-xl border-2 border-[#111] bg-[#ffc926] px-5 py-2 font-extrabold disabled:opacity-50"
        >
          {isRetrying ? 'Đang gửi...' : 'Thử chấm lại'}
        </button>
      </div>
    )
  }

  if (attempt.status !== 'GRADED' || !attempt.result) return null

  const answerFeedback = new Map(
    attempt.result.answerFeedback.map((item) => [item.questionId, item.feedback])
  )

  return (
    <section className="space-y-5 rounded-2xl border-2 border-[#111] bg-[#fdfcf9] p-5 shadow-[4px_4px_0_#111]">
      <div className="rounded-2xl bg-[#e8f0c9] p-5 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#56673d]">
          Điểm Speaking ước tính
        </p>
        <p className="mt-1 text-5xl font-black text-[#111]">
          {attempt.overallScore?.toFixed(1)}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {attempt.result.criteria.map((criterion) => (
          <article
            key={criterion.criterionCode}
            className="rounded-xl border border-[#e5e0d5] bg-white p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-extrabold">
                {criterionNames[criterion.criterionCode] ??
                  criterion.criterionCode}
              </h3>
              <span className="rounded-lg bg-[#ffc926] px-2 py-1 font-black">
                {criterion.score.toFixed(1)}
              </span>
            </div>
            <p className="mt-3 text-sm text-[#514f48]">{criterion.feedback}</p>
            <p className="mt-2 text-xs text-[#514f48]">
              <strong>Điểm mạnh:</strong> {criterion.strengths}
            </p>
            <p className="mt-1 text-xs text-[#514f48]">
              <strong>Cần cải thiện:</strong> {criterion.weaknesses}
            </p>
            <p className="mt-1 text-xs text-[#514f48]">
              <strong>Gợi ý:</strong> {criterion.suggestions}
            </p>
          </article>
        ))}
      </div>

      <article className="rounded-xl border border-[#e5e0d5] bg-white p-4">
        <h3 className="font-extrabold">Nhận xét tổng thể</h3>
        <p className="mt-2 text-sm leading-6 text-[#514f48]">
          {attempt.result.overallFeedback}
        </p>
      </article>

      <div className="space-y-3">
        <h3 className="font-extrabold">Nhận xét từng câu trả lời</h3>
        {attempt.answers.map((answer, index) => (
          <article
            key={answer.questionId}
            className="rounded-xl border border-[#e5e0d5] bg-white p-4"
          >
            <p className="text-xs font-bold uppercase text-[#6f8f4b]">
              Câu {index + 1}
            </p>
            <p className="mt-1 font-bold">{answer.question}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-[#514f48]">
              {answer.transcript}
            </p>
            <p className="mt-3 border-t border-[#eee9df] pt-3 text-sm text-[#514f48]">
              {answerFeedback.get(answer.questionId) ??
                'Chưa có nhận xét riêng cho câu này.'}
            </p>
          </article>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="rounded-xl border-2 border-[#111] bg-white px-4 py-2 text-sm font-extrabold shadow-[2px_2px_0_#111] disabled:opacity-50"
        >
          {isRetrying ? 'Đang gửi...' : 'Chấm lại bài này'}
        </button>
      </div>
    </section>
  )
}
