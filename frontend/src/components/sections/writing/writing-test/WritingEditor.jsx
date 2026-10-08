import { useState } from 'react'
import WritingToolbar from './WritingToolbar'

function WritingEditor({ test, isFullscreen, onFullscreen }) {
    
  const [content, setContent] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('Inter')

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const canSubmit = wordCount >= 50
    

  return (
    <div className="
      flex flex-col
      sticky top-6
      h-[calc(100vh-3rem)]
      z-10
    ">

      <div className="
        bg-[#fdfcf9]
        rounded-2xl
        shadow-sm
        border border-[#e5e0d5]
        flex flex-col
        relative
        overflow-hidden
        flex-1
        min-h-0
      ">

        {/* Header */}
        <div className="
          flex flex-wrap
          justify-between
          items-center
          gap-y-2
          px-8 py-5
          border-b border-slate-100
          shrink-0
        ">

          <h2 className="text-xl font-bold text-slate-800">
            Bài làm
          </h2>

          <div className="flex items-center gap-4 text-xs font-medium">

            <span
              className={
                wordCount >= test.minimumWords
                  ? 'font-bold text-emerald-500'
                  : 'font-bold text-rose-500'
              }
            >
              {wordCount} / {test.minimumWords} từ
            </span>

            <button
              type="button"
              onClick={onFullscreen}
              className="
                px-3 py-1.5
                rounded-lg
                bg-slate-800
                text-white
                font-bold
                hover:bg-slate-700
              "
            >
              {isFullscreen ? 'Thoát toàn màn hình': 'Toàn màn hình'}
            </button>

          </div>
        </div>

        {/* Toolbar */}
        <WritingToolbar
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          fontFamily={fontFamily}
          onFontFamilyChange={setFontFamily}
        />

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here..."
          className="
            flex-1
            w-full
            resize-none
            outline-none
            border-0
            bg-[#fdfcf9]
            px-8 py-6
            text-slate-800
            leading-relaxed
          "
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
          }}
        />

        {/* Submit */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-4
            px-8
            pb-5
            shrink-0
          "
        >
          <p
            className={
              canSubmit
                ? 'text-brand text-[10px] font-bold'
                : 'text-rose-500 text-[11px] font-bold'
            }
          >
            {canSubmit
              ? `Kiểm tra kỹ trước khi nộp bài`
              : `Cần ít nhất 50 từ để chấm bài (${wordCount}/50)`
            }
          </p>

          <button
            type="button"
            disabled={!canSubmit}
            className="
              bg-brand
              text-white
              font-bold
              px-8 py-3
              rounded-xl
              hover:bg-brand/90
              transition-all
              shadow-md
              disabled:opacity-40
              disabled:cursor-not-allowed
              whitespace-nowrap
            "
            onClick={() => {
              console.log('Submit essay:', content)
            }}
          >
            Chấm bài
          </button>

        </div>

      </div>

    </div>
  )
}

export default WritingEditor