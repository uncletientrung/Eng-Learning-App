import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'


function parseInstruction(text = '') {
  const lines = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

  const findSection = (pattern) =>
    lines.findIndex(line => pattern.test(line))

  const explanationIndex = findSection(
    /^1\.\s*Giải thích đề/i
  )
  const introductionIndex = findSection(
    /^2\.\s*Introduction/i
  )
  const overviewIndex = findSection(
    /^3\.\s*Overview/i
  )
  const bodyIndex = findSection(
    /^4\.\s*Chia BODY/i
  )
  const vocabularyIndex = findSection(
    /^5\.\s*Gợi ý từ vựng/i
  )
  const sampleIndex = findSection(/^Sample\s*8\.0/i)

  const sectionText = (start, end) =>
    start < 0
      ? []
      : lines.slice(
          start + 1,
          end < 0 ? lines.length : end
        )

  const explanationLines = sectionText(
    explanationIndex,
    introductionIndex
  )

  const introLines = sectionText(
    introductionIndex,
    overviewIndex
  )

  const overviewLines = sectionText(
    overviewIndex,
    bodyIndex
  )

  const bodyLines = sectionText(
    bodyIndex,
    vocabularyIndex
  )

  const vocabulary = sectionText(
    vocabularyIndex,
    sampleIndex
  )

  const sampleParagraphs = sectionText(
    sampleIndex,
    -1
  ).join('\n').split(/\n{2,}/).map(s => s.trim()).filter(Boolean)

  // Hỗ trợ cả dữ liệu xuống dòng đơn giữa các đoạn sample.
  const sampleStart = sampleIndex < 0
    ? -1
    : lines.findIndex(
        (line, i) =>
          i > sampleIndex &&
          /^The two pie charts|^The chart|^The graph/i.test(line)
      )

  const actualSample = sampleStart >= 0
    ? lines.slice(sampleStart).join('\n').split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : sampleParagraphs

  const typeLine = explanationLines.find(
    line => line.startsWith('→ Dạng:')
  ) || ''

  const introductionSampleIndex = introLines.findIndex(
    line => /^Mẫu:/i.test(line)
  )

  const bodySections = []
  let currentSection = null

  for (const line of bodyLines) {
    if (/^BODY\s*\d+/i.test(line)) {
      currentSection = {
        title: line,
        items: []
      }
      bodySections.push(currentSection)
    } else if (currentSection) {
      currentSection.items.push(line)
    }
  }

  return {
    title: lines[1] || '',
    content: {
      explanation: explanationLines
        .filter(line => !line.startsWith('→ Dạng:'))
        .join(' '),

      type: typeLine.replace('→ Dạng:', '').trim(),

      introduction: {
        description: introLines
          .filter(line => !/^Mẫu:/i.test(line))
          .join(' '),

        sample: introductionSampleIndex >= 0
          ? introLines
              .slice(introductionSampleIndex)
              .join(' ')
              .replace(/^Mẫu:\s*/i, '')
          : ''
      },

      overview: overviewLines,

      body: bodySections,

      vocabulary,

      sample: {
        paragraphs: actualSample
      }
    }
  }
}


function WritingGuide({ test }) {
  const [isOpen, setIsOpen] = useState(false)
  const guide = parseInstruction(
    test.instruction || ''
  )
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
          Hướng dẫn viết bài + sample 8.0
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
            Gợi
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