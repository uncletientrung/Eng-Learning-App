import {
  chartColors,
  defaultColors,
  getTopicConfig,
  writingTaskOptions,
} from '../../../constant/writingConstant.js';

function WritingChartFilters({
  topics = [],
  activeTaskFilter,
  onTaskFilterChange,
  activeChartFilter,
  onChartFilterChange,
}) {
  const displayFilters = [
    {
      id: 'ALL',
      label: 'Tất cả',
      icon: '◈',
    },
    ...topics.map((topic) => {
      const config = getTopicConfig(topic.name);

      return {
        id: topic.id,
        label: topic.name,
        icon: config?.icon ?? '◈',
        colorKey: config?.id,
      };
    }),
  ];

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-bold text-slate-500">
          Loại bài:
        </span>
        <button
          type="button"
          aria-pressed={activeTaskFilter === 'ALL'}
          onClick={() => onTaskFilterChange('ALL')}
          className={`
            inline-flex items-center gap-1.5 whitespace-nowrap
            rounded-full border px-4 py-1.5 text-sm font-bold transition-all
            ${activeTaskFilter === 'ALL'
              ? 'border-slate-800 bg-slate-800 text-white'
              : 'border-slate-300 text-slate-700 hover:bg-slate-50'}
          `}
        >
          Tất cả
        </button>
        {writingTaskOptions.map((filter) => {
          const isActive = activeTaskFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onTaskFilterChange(filter.id)}
              className={`
                inline-flex items-center gap-1.5 whitespace-nowrap
                rounded-full border px-4 py-1.5 text-sm font-bold transition-all
                ${isActive
                  ? 'border-slate-800 bg-slate-800 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'}
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-bold text-slate-500">
          Thể loại:
        </span>
        {displayFilters.map((filter) => {
          const isActive =
            Number(activeChartFilter) === Number(filter.id) ||
            activeChartFilter === filter.id;

          const colors =
            chartColors[filter.colorKey || filter.id] ||
            defaultColors;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChartFilterChange(filter.id)}
              className={`
                inline-flex items-center gap-1.5 whitespace-nowrap
                rounded-full border px-4 py-1.5
                text-sm font-bold transition-all
                ${colors.border}
                ${colors.text}
                ${isActive ? colors.active : colors.hover}
              `}
            >
              <span className="text-xs">{filter.icon}</span>
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WritingChartFilters;