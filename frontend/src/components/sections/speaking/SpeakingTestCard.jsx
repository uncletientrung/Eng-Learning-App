import { useState } from 'react';
import {
  ChevronDown,
  Play,
  Mic,
} from 'lucide-react';

const partConfig = {
  INTRODUCTION_INTERVIEW: {
    label: 'Introduction & Interview',
    Icon: Mic,
  },
  TOPIC: {
    label: 'Topic',
    Icon: Mic,
  },
  TOPIC_DISCUSS: {
    label: 'Topic Discussion',
    Icon: Mic,
  },
};

function SpeakingTestCard({ test, onClick }) {
  const [expanded, setExpanded] = useState(false);

  const config = partConfig[test.part] ?? {
    label: test.part ?? 'Speaking Practice',
    Icon: Mic,
  };

  const Icon = config.Icon;

  const questions = Array.isArray(test.questions)
    ? test.questions
    : [];

  const handlePractice = (event) => {
    event.stopPropagation();
    onClick(test);
  };

  return (
    <div className="overflow-hidden border-2 border-[#111] bg-white">
      {/* Row header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        className="
          flex cursor-pointer items-center justify-between gap-4
          bg-[#f8f9fa] p-4 transition-colors
          hover:bg-[#f1f3f5]
        "
      >
        {/* Title */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center border-2 border-[#111] bg-white sm:flex">
            <Icon size={19} />
          </div>

          <div className="min-w-0">
            <h3 className="pr-2 text-sm font-black leading-snug text-[#111] sm:text-base">
              {test.title || 'Untitled Speaking Test'}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              {test.topic && <span>{test.topic}</span>}

              {test.topic && test.part && (
                <span className="text-slate-400">·</span>
              )}

              <span>{config.label}</span>

              {test.questionCount != null && (
                <>
                  <span className="text-slate-400">·</span>
                  <span>{test.questionCount} câu hỏi</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handlePractice}
            className="
              flex items-center gap-1.5 rounded-xl
              border-2 border-[#111] bg-[#ffc926]
              px-3 py-2 text-xs font-bold text-[#111]
              shadow-[2px_2px_0_rgba(0,0,0,0.15)]
              transition-all hover:-translate-y-px
              hover:bg-[#ffd84d]
            "
          >
            <Play size={13} className="fill-current" />
            <span className="hidden sm:inline">Luyện tập</span>
          </button>

          <ChevronDown
            size={20}
            className={`
              hidden shrink-0 transition-transform duration-200
              sm:block ${expanded ? 'rotate-180' : ''}
            `}
          />
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t-2 border-[#111] bg-white">
          {test.description && (
            <p className="border-b border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600">
              {test.description}
            </p>
          )}

          {questions.length > 0 ? (
            <ol className="divide-y divide-slate-200">
              {questions.map((question, index) => {
                const content =
                  typeof question === 'string'
                    ? question
                    : question.question ?? question.text ?? '';

                return (
                  <li
                    key={question.id ?? index}
                    className="flex gap-3 px-4 py-3 text-sm text-slate-700"
                  >
                    <span className="font-bold text-slate-400">
                      {index + 1}.
                    </span>
                    <span>{content}</span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="px-4 py-5 text-sm text-slate-500">
              Chưa có danh sách câu hỏi để hiển thị.
            </div>
          )}

          <div className="flex justify-end border-t border-slate-200 p-3">
            <button
              type="button"
              onClick={handlePractice}
              className="
                flex items-center gap-2 border-2 border-[#111]
                bg-[#ffc926] px-4 py-2 text-sm font-bold
                text-[#111] transition-colors hover:bg-[#ffd84d]
              "
            >
              <Play size={14} className="fill-current" />
              Bắt đầu luyện tập
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeakingTestCard;