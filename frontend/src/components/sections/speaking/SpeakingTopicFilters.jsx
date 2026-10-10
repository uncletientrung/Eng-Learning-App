import { speakingTopicGroups } from '../../../data/speakingTests';
import { Layers, Check } from 'lucide-react';

function SpeakingTopicFilters({
  activeTopicGroup,
  onTopicGroupChange,
}) {
  const isAllActive = activeTopicGroup === 'ALL';

  const baseClass = `
    inline-flex shrink-0 items-center gap-1.5
    border-2 border-[#111] px-3.5 py-2
    text-sm font-bold transition-all duration-150
    shadow-[2px_2px_0_rgba(0,0,0,0.15)]
    hover:-translate-y-px hover:shadow-[3px_3px_0_rgba(0,0,0,0.15)]
    active:translate-y-0 active:shadow-none
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[#ffc926] focus-visible:ring-offset-2
  `;

  return (
    <section className="mb-6">
      {/* Section heading */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center border-2 border-[#111] bg-[#ffc926]">
          <Layers size={16} />
        </div>

        <div>
          <h2 className="text-sm font-black text-[#111] sm:text-base">
            Chủ đề luyện tập
          </h2>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          aria-pressed={isAllActive}
          onClick={() => onTopicGroupChange('ALL')}
          className={`
            ${baseClass}
            ${
              isAllActive
                ? 'bg-[#ffc926] text-[#111]'
                : 'bg-white text-[#111] hover:bg-[#fff8df]'
            }
          `}
        >
          {isAllActive && <Check size={14} strokeWidth={3} />}
          Tất cả
        </button>

        {speakingTopicGroups.map((group) => {
          const isActive = activeTopicGroup === group.id;

          return (
            <button
              key={group.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onTopicGroupChange(group.id)}
              className={`
                ${baseClass}
                ${
                  isActive
                    ? 'bg-[#ffc926] text-[#111]'
                    : 'bg-white text-[#111] hover:bg-[#fff8df]'
                }
              `}
            >
              {isActive && <Check size={14} strokeWidth={3} />}
              {group.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default SpeakingTopicFilters;