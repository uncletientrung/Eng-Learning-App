
import { Volume2, Quote } from 'lucide-react'
import { useEffect, useCallback } from 'react'

export default function SpeakingP2Content({
  question,
  onSpeak,
}) {
  
  const handleReadCueCard = useCallback(() => {
    if (!question) return

    const speechText = [
      question.questionText,
      'You should say:',
      ...(question.cues ?? []),
      question.closing ?? '',
    ]
      .filter(Boolean)
      .join('. ')

    onSpeak(speechText)
  }, [question, onSpeak])

  
  
  

  // Tự động đọc đề khi dữ liệu câu hỏi được tải
  useEffect(() => {
    if (question) {
      handleReadCueCard()
    }
  }, [question, handleReadCueCard])
  

  if (!question) {
    return null
  }

  return (
    <div className="flex animate-in flex-col items-start fade-in slide-in-from-left-2 duration-500">
      <div className="max-w-[90%] text-left md:max-w-[75%]">
        <div className="relative inline-block rounded-2xl rounded-tl-none border-2 border-[#111] bg-[#ffc926] p-5 text-[#111] shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111] bg-[#111] text-[#ffc926]">
            <Quote size={12} fill="currentColor" />
          </div>

          <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
            {question.questionText}
          </p>

          <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
            You should say:
          </p>

          <ul className="my-2 list-disc space-y-1.5 pl-5 text-sm font-medium leading-relaxed md:text-[17px]">
            {(question.cues ?? []).map((cuePoint, index) => (
              <li key={`${index}-${cuePoint}`}>{cuePoint}</li>
            ))}
          </ul>

          {question.closing && (
            <p className="mb-2 text-sm font-medium leading-relaxed md:text-[17px]">
              {question.closing}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleReadCueCard}
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#5f6a45] hover:text-[#111] hover:underline"
            >
              <Volume2 size={13} />
              Nghe lại
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
