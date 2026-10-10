import { ArrowLeft, Check, Layers } from 'lucide-react';
import LinkButton from '../../ui/LinkButton';

const speakingParts = [
  { id: 'ALL', label: 'Tất cả' },
  { id: 'INTRODUCTION_INTERVIEW', label: 'Introduction & Interview' },
  { id: 'TOPIC', label: 'Topic' },
  { id: 'TOPIC_DISCUSS', label: 'Topic Discussion' },
];

function SpeakingHeader({ activePart, onPartChange }) {
  const baseButtonClass = `
    inline-flex shrink-0 items-center justify-center gap-1.5
    border-2 border-[#111] px-3.5 py-2
    text-sm font-bold text-[#111]
    shadow-[2px_2px_0_rgba(0,0,0,0.15)]
    transition-all duration-150
    hover:-translate-y-px
    hover:shadow-[3px_3px_0_rgba(0,0,0,0.15)]
    active:translate-y-0 active:shadow-none
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[#ffc926] focus-visible:ring-offset-2
  `;

  return (
    <header className="mb-8">
      <LinkButton
        to="/"
        backgroundColor = "bg-white"
        textColor = 'text-black'
        className="px-10 py-2"
      >
        <ArrowLeft size={16} />
        Trở về
      </LinkButton>

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: Page title */}
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-black tracking-tight text-[#111] sm:text-4xl">
            Thư viện{' '}
            <span className="underline decoration-[#ffc926] decoration-4 underline-offset-4">
              Speaking Practice
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Luyện nói tiếng Anh với bộ câu hỏi theo chủ đề,
            rèn luyện phản xạ và phát triển khả năng diễn đạt.
          </p>
        </div>

        {/* Right: Speaking type filters */}
        <section className="w-full lg:w-auto lg:max-w-[560px] lg:shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[#111] bg-[#ffc926]">
              <Layers size={16} />
            </div>

            <div>
              <h2 className="text-sm font-black text-[#111]">
                Loại bài luyện tập
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {speakingParts.map((part) => {
              const isActive = activePart === part.id;

              return (
                <button
                  key={part.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onPartChange(part.id)}
                  className={`
                    ${baseButtonClass}
                    ${
                      isActive
                        ? 'bg-[#ffc926]'
                        : 'bg-white hover:bg-[#fff8df]'
                    }
                  `}
                >
                  {isActive && (
                    <Check size={14} strokeWidth={3} />
                  )}
                  {part.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </header>
  );
}

export default SpeakingHeader;