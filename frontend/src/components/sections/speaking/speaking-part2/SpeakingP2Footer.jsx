import { useEffect } from 'react'
import { Mic, Clock } from 'lucide-react'

export default function SpeakingP2Footer({
  answer,
  setAnswer,
  recording,
  onMicClick,
  onSubmit,
  prepTime,
  setPrepTime,
  prepStarted,
  setPrepStarted,
}) {
  useEffect(() => {
    if (!prepStarted || prepTime <= 0) return

    const timer = window.setInterval(() => {
      setPrepTime((time) => Math.max(0, time - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [prepStarted, prepTime, setPrepTime])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <footer className="mt-3 flex-none rounded-[20px] border-4 border-[#111] bg-white px-5 py-4 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:px-7 md:py-5">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-center">
          <button
            onClick={() => {
              if (!prepStarted) setPrepStarted(true)
            }}
            disabled={prepStarted}
            className="flex items-center gap-2 rounded-xl border-2 border-[#111] bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#111] disabled:opacity-70"
          >
            <Clock size={16} />
            {prepStarted
              ? prepTime > 0
                ? `Chuẩn bị ${formatTime(prepTime)}`
                : 'Hết giờ chuẩn bị'
              : '1 phút chuẩn bị'}
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <button
              onClick={onMicClick}
              disabled={!prepStarted || prepTime > 0}
              className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#111] text-white shadow-[4px_4px_0_#111] transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                recording ? 'animate-pulse bg-red-600' : 'bg-[#6f8f4b]'
              }`}
            >
              <Mic size={24} />
            </button>

            <span className="text-center text-[11px] font-bold uppercase tracking-wide text-[#8a8672]">
              {recording
                ? 'Đang nghe...'
                : !prepStarted
                  ? 'Chuẩn bị trước'
                  : prepTime > 0
                    ? 'Đang chuẩn bị'
                    : 'Bấm để nói'}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-bold text-[#5f6a45]">
              hoặc nhấn
              <kbd className="rounded-lg border-2 border-[#111] bg-[#f4f1e6] px-1.5 py-0.5 font-mono text-[10px] text-[#111]">
                Space
              </kbd>
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={
                !prepStarted
                  ? 'Bấm 1 phút chuẩn bị để bắt đầu...'
                  : prepTime > 0
                    ? 'Bạn đang trong thời gian chuẩn bị...'
                    : 'Nhập câu trả lời hoặc bấm Mic để nói...'
              }
              rows={2}
              className="w-full resize-none rounded-2xl border-[3px] border-[#111] bg-[#fffdf5] px-4 py-3 text-base font-medium text-[#111] outline-none transition-all focus:shadow-[4px_4px_0_#ffc926] md:px-6"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={!answer.trim()}
            className="self-stretch rounded-xl border-[3px] border-[#111] bg-[#ffc926] px-4 text-sm font-extrabold text-[#111] shadow-[3px_3px_0_#111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gửi
          </button>
        </div>
      </div>
    </footer>
  )
}