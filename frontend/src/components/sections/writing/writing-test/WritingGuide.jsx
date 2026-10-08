import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

function WritingGuide({ test }) {
  const [isOpen, setIsOpen] = useState(false)
  const guide = test.guide
  return (
    <div className="
      bg-[#fdfcf9]
      rounded-2xl
      shadow-sm
      border border-[#e5e0d5]
      overflow-hidden
    ">

      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full
          p-5
          flex
          justify-between
          items-center
          text-left
          hover:bg-slate-50
          transition-colors
        "
      >

        <span className="font-bold text-slate-800">
          {guide.title}
        </span>

        <div className="flex items-center gap-2">

          <span className="
            text-[10px]
            font-bold
            bg-[#f1f5f9]
            text-slate-600
            px-2 py-1
            rounded
          ">
            {test.taskType === 'TASK_1'
              ? 'TASK 1'
              : 'TASK 2'}
          </span>

          {isOpen ? (
            <ChevronUp
              size={16}
              className="text-slate-400"
            />
          ) : (
            <ChevronDown
              size={16}
              className="text-slate-400"
            />
          )}

        </div>

      </button>

      {/* Content */}
      {isOpen && (
        <div className="
          px-5
          pb-5
          border-t
          border-slate-100
        ">

          <div className="
            prose
            prose-sm
            text-slate-700
            text-[14px]
            leading-relaxed
            mt-4
          ">

            {/* 1. Giải thích đề */}
            <h3>
              <strong>HƯỚNG DẪN VIẾT BÀI</strong>
            </h3>

            <h5>
              <strong>{test.title}</strong>
            </h5>

            <hr />

            <h5>
              <strong>1. Giải thích đề</strong>
            </h5>

            <p>
              {guide.content.explanation}
            </p>

            <p>
              → Dạng: {guide.content.type}
            </p>

            <hr />

            {/* 2. Introduction */}
            <h5>
              <strong>2. Introduction (paraphrase)</strong>
            </h5>

            <p>
              {guide.content.introduction.description}
            </p>

            <p>
              <strong>Mẫu:</strong>{' '}
              {guide.content.introduction.sample}
            </p>

            <hr />

            {/* 3. Overview */}
            <h5>
              <strong>3. Overview (ý chính)</strong>
            </h5>

            <ul>
              {guide.content.overview.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <hr />

            {/* 4. Body */}
            <h5>
              <strong>4. Chia BODY</strong>
            </h5>

            {guide.content.body.map(
              (section, index) => (
                <div key={index}>

                  <h5>
                    <strong>
                      {section.title}
                    </strong>
                  </h5>

                  <ul>
                    {section.items.map(
                      (item, itemIndex) => (
                        <li key={itemIndex}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>

                </div>
              )
            )}

            <hr />

            {/* Vocabulary */}
            <h5>
              <strong>5. Gợi ý từ vựng</strong>
            </h5>

            <ul>
              {guide.content.vocabulary.map(
                (word, index) => (
                  <li key={index}>
                    {word}
                  </li>
                )
              )}
            </ul>

            <hr />

            {/* Sample */}
            <h5>
              <strong>Sample 8.0</strong>
            </h5>

            {guide.content.sample.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default WritingGuide