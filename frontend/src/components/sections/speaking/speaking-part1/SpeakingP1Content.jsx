import { Volume2, Quote } from 'lucide-react'
import { useEffect } from 'react'


export default function SpeakingP1Content({ question, answer, onSpeak}) {
  useEffect(() => {
    if (question) {
      onSpeak(question)
    }
  }, [question, onSpeak])
  return (
    <>
      <div className="flex animate-in flex-col items-start fade-in slide-in-from-left-2 duration-500">
        <div className="max-w-[90%] text-left md:max-w-[75%]">
          <div className="relative inline-block rounded-2xl rounded-tl-none border-2 border-[#111] bg-[#fffdf5] p-3 text-[#222] shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
            <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#111] bg-[#111] text-[#ffc926]">
              <Quote size={12} fill="currentColor" />
            </div>

            <p className="mb-1.5 text-[13px] font-medium leading-relaxed md:text-[15px]">
              {question}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => onSpeak(question)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#5f6a45] hover:text-[#111] hover:underline"
              >
                <Volume2 size={12} />
                Nghe lại
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Chỉ hiển thị câu trả lời khi đã có nội dung */}
      {answer?.trim() && (
        <div className="flex animate-in flex-col items-end fade-in slide-in-from-left-2 duration-500">
          <div className="max-w-[90%] text-right md:max-w-[75%]">
            <div className="inline-block rounded-2xl rounded-tr-none border-2 border-[#111] bg-[#e8f0c9] p-3 text-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
              <p className="text-[13px] font-medium leading-relaxed md:text-[15px]">
                {answer}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}