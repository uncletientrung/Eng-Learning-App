import { Volume2, Lightbulb, Quote } from 'lucide-react'

export default function SpeakingP2Content({
  question,
  showHint,
  setShowHint,
  onSpeak,
}) {
  return (
    <div className="flex animate-in flex-col items-start fade-in slide-in-from-left-2 duration-500">
      <div className="max-w-[90%] text-left md:max-w-[75%]">
        <div className="relative inline-block rounded-2xl rounded-tl-none border-2 border-[#111] bg-[#ffc926] p-5 text-[#111] shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111] bg-[#111] text-[#ffc926]">
            <Quote size={12} fill="currentColor" />
          </div>

          <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
            {question.title}
          </p>

          <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
            You should say:
          </p>

          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm font-medium leading-relaxed md:text-[17px]">
            {question.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {question.followUp && (
            <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
              {question.followUp}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() =>
                onSpeak([
                  question.title,
                  'You should say:',
                  ...question.points,
                  question.followUp || '',
                ].join('. '))
              }
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#5f6a45] hover:text-[#111] hover:underline"
            >
              <Volume2 size={13} />
              Nghe lại
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#5f6a45] hover:text-[#111] hover:underline"
            >
              <Lightbulb size={13} />
              Gợi ý
            </button>
          </div>

          {showHint && (
            <p className="mt-3 rounded-xl border border-[#111]/20 bg-white/60 p-3 text-sm text-[#5f6a45]">
              Hãy giới thiệu chủ đề, lần lượt phát triển từng ý trong cue card,
              thêm ví dụ hoặc trải nghiệm cá nhân và kết thúc bằng cảm nhận của bạn.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}