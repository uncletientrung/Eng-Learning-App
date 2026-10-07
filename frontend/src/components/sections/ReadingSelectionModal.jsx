import { BookText, PenLine, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function ReadingSelectionModal({ onClose }) {
  const navigate = useNavigate()
  useEffect(() => { // Chặn cuộn khi modal mở
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleNavigate = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm p-4 animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-2xl
          rounded-[12px]
          border-[4px] border-black
          bg-white
          p-6 md:p-8
          shadow-[8px_8px_0_rgba(0,0,0,1)]
          animate-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute right-4 top-4
            rounded-full
            border-2 border-black
            bg-white
            p-1.5
            text-black
            shadow-[2px_2px_0_rgba(0,0,0,1)]
            transition-all
            hover:-translate-y-0.5
            hover:shadow-[3px_3px_0_rgba(0,0,0,1)]
            active:translate-y-0
            active:shadow-[1px_1px_0_rgba(0,0,0,1)]
            cursor-pointer
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="mb-2 text-2xl font-black uppercase tracking-tight text-slate-900 md:text-3xl">
          Chọn phần học tiếp theo
        </h2>

        <p className="mb-6 text-sm font-semibold text-slate-500">
          Chọn một phần học để tiếp tục ôn tập:
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Translation */}
          <LearningOption
            icon={BookText}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            title="Translation"
            titleColor="text-[#0b5a37]"
            description="Luyện dịch Anh - Việt và Việt - Anh thông qua các bài tập phù hợp với trình độ."
            buttonColor="bg-[#0b5a37]"
            onClick={() => handleNavigate('/translation')}
          />

          {/* Writing */}
          <LearningOption
            icon={PenLine}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
            title="Writing"
            titleColor="text-[#7c3aed]"
            description="Luyện viết tiếng Anh với các bài viết và tiêu chí đánh giá phù hợp."
            buttonColor="bg-[#7c3aed]"
            onClick={() => handleNavigate('/writing')}
          />

        </div>
      </div>
    </div>
  )
}

function LearningOption({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  titleColor,
  description,
  buttonColor,
  onClick,
}) {
  return (
    <div
      className="
        group flex flex-col justify-between
        rounded-[8px]
        border-[3px] border-black
        bg-white
        p-5
        shadow-[4px_4px_0_rgba(0,0,0,1)]
        transition-all
        hover:-translate-y-1
        hover:shadow-[6px_6px_0_rgba(0,0,0,1)]
      "
    >
      <div>
        <div
          className={`
            mb-4 flex h-12 w-12
            items-center justify-center
            rounded-[8px]
            border-2 border-black
            ${iconBg}
            ${iconColor}
            shadow-[2px_2px_0_rgba(0,0,0,1)]
          `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className={`mb-2 text-xl font-black ${titleColor}`}>
          {title}
        </h3>

        <p className="mb-6 text-xs font-semibold leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`
          inline-flex w-full
          items-center justify-center
          rounded-[6px]
          border-2 border-black
          ${buttonColor}
          py-2.5
          text-xs font-black text-white
          shadow-[2px_2px_0_rgba(0,0,0,1)]
          transition-all
          group-hover:-translate-y-0.5
          group-hover:shadow-[3px_3px_0_rgba(0,0,0,1)]
          cursor-pointer
        `}
      >
        Vào học ngay
      </button>
    </div>
  )
}

export default ReadingSelectionModal