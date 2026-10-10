import { Mic } from 'lucide-react'

export default function SpeakingFooter({
  answer,
  setAnswer,
  recording,
  onMicClick,
  onSubmit,
}) {
  return (
    <footer className="mt-2 flex-none rounded-2xl border-[4px] border-[#111] bg-white px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.15)] md:px-4 md:py-3">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          {/* Nút microphone */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onMicClick}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#111] text-white shadow-[3px_3px_0_#111] transition-all ${
                recording
                  ? 'animate-pulse bg-red-600'
                  : 'bg-[#6f8f4b]'
              }`}
            >
              <Mic size={19} />
            </button>

            <span className="text-center text-[9px] font-bold uppercase tracking-wide text-[#8a8672]">
              {recording ? 'Đang nghe...' : 'Bấm để nói'}
            </span>

            <span className="flex items-center gap-1 text-[9px] font-bold text-[#5f6a45]">
              hoặc nhấn
              <kbd className="rounded-md border border-[#111] bg-[#f4f1e6] px-1 py-0.5 font-mono text-[9px] text-[#111]">
                Space
              </kbd>
            </span>
          </div>

          {/* Ô nhập câu trả lời */}
          <div className="relative min-w-0 flex-1">
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Nhập câu trả lời hoặc bấm Mic..."
              rows={1}
              className="block w-full resize-none rounded-xl border-[3px] border-[#111] bg-[#fffdf5] px-3 py-2 text-sm font-medium leading-5 text-[#111] outline-none transition-all focus:shadow-[3px_3px_0_#ffc926] md:px-4"
            />
          </div>

          {/* Nút gửi */}
          <button
            onClick={onSubmit}
            disabled={!answer.trim()}
            className="h-[44px] shrink-0 self-center rounded-lg border-[3px] border-[#111] bg-[#ffc926] px-5 text-sm font-extrabold text-[#111] shadow-[3px_3px_0_#111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gửi
          </button>
        </div>
      </div>
    </footer>
  )
}