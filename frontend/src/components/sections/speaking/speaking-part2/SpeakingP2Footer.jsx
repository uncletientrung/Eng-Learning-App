
import { useEffect } from 'react'
import { Mic, Clock } from 'lucide-react'

export default function SpeakingP2Footer({
  currentAnswer,
  setCurrentAnswer,
  isRecording,
  onMicrophoneToggle,
  onAnswerSubmit,
  preparationTimeRemaining,
  setPreparationTimeRemaining,
  isPreparationStarted,
  setIsPreparationStarted,
}) {
  useEffect(() => {
    if (!isPreparationStarted || preparationTimeRemaining <= 0) {
      return
    }

    const timerId = window.setInterval(() => {
      setPreparationTimeRemaining((previousTime) =>
        Math.max(0, previousTime - 1)
      )
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [
    isPreparationStarted,
    preparationTimeRemaining,
    setPreparationTimeRemaining,
  ])

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  const handleStartPreparation = () => {
    if (!isPreparationStarted) {
      setIsPreparationStarted(true)
    }
  }

  const isAnsweringEnabled =
    isPreparationStarted && preparationTimeRemaining === 0

  return (
    <footer className="mt-2 flex-none rounded-2xl border-[4px] border-[#111] bg-white px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.15)] md:px-4 md:py-3">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center">
          {!isPreparationStarted ? (
            <button
              type="button"
              onClick={handleStartPreparation}
              className="flex items-center gap-2 rounded-xl border-2 border-[#111] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5"
            >
              <Clock size={14} />
              1 phút chuẩn bị
            </button>
          ) : preparationTimeRemaining > 0 ? (
            <div className="flex items-center gap-4 rounded-xl border-2 border-[#111] bg-white px-5 py-2.5 shadow-[3px_3px_0_rgba(0,0,0,1)]">
              <span className="font-[family-name:var(--font-quicksand)] text-2xl font-extrabold tabular-nums tracking-wider text-[#111]">
                {formatTime(preparationTimeRemaining)}
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                Chuẩn bị ý tưởng…
              </span>

              <button
                type="button"
                onClick={() => setPreparationTimeRemaining(0)}
                className="whitespace-nowrap text-xs font-bold text-[#5f6a45] underline underline-offset-2 hover:text-[#111]"
              >
                Bỏ qua — nói luôn
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onMicrophoneToggle}
              disabled={!isAnsweringEnabled}
              aria-label={isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#111] text-white shadow-[3px_3px_0_#111] transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                isRecording
                  ? 'animate-pulse bg-red-600'
                  : 'bg-[#6f8f4b]'
              }`}
            >
              <Mic size={19} />
            </button>

            <span className="text-center text-[9px] font-bold uppercase tracking-wide text-[#8a8672]">
              {isRecording
                ? 'Đang nghe...'
                : !isPreparationStarted
                  ? 'Chuẩn bị trước'
                  : preparationTimeRemaining > 0
                    ? 'Đang chuẩn bị'
                    : 'Bấm để nói'}
            </span>

            <span className="flex items-center gap-1 text-[9px] font-bold text-[#5f6a45]">
              hoặc nhấn
              <kbd className="rounded-md border border-[#111] bg-[#f4f1e6] px-1 py-0.5 font-mono text-[9px] text-[#111]">
                Space
              </kbd>
            </span>
          </div>

          <div className="relative min-w-0 flex-1">
            <textarea
              value={currentAnswer}
              onChange={(event) => setCurrentAnswer(event.target.value)}
              disabled={!isAnsweringEnabled}
              placeholder={
                !isPreparationStarted
                  ? 'Bấm 1 phút chuẩn bị để bắt đầu...'
                  : preparationTimeRemaining > 0
                    ? 'Bạn đang trong thời gian chuẩn bị...'
                    : 'Nhập câu trả lời hoặc bấm Mic...'
              }
              rows={1}
              className="block w-full resize-none rounded-xl border-[3px] border-[#111] bg-[#fffdf5] px-3 py-2 text-sm font-medium leading-5 text-[#111] outline-none transition-all focus:shadow-[3px_3px_0_#ffc926] disabled:cursor-not-allowed disabled:opacity-60 md:px-4"
            />
          </div>

          <button
            onClick={onAnswerSubmit}
            disabled={!isAnsweringEnabled || !currentAnswer.trim()}
            className="h-[44px] shrink-0 self-center rounded-lg border-[3px] border-[#111] bg-[#ffc926] px-5 text-sm font-extrabold text-[#111] shadow-[3px_3px_0_#111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gửi
          </button>
        </div>
      </div>
    </footer>
  )
}
