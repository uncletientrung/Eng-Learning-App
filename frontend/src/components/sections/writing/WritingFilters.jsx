const filters = [
  {
    id: 'ALL',
    label: 'Tất cả',
  },
  {
    id: 'TASK_1',
    label: 'Task 1',
  },
  {
    id: 'TASK_2',
    label: 'Task 2',
  },
  {
    id: 'BUILDER',
    label: 'Writing Builder',
  },
]

function WritingFilters({ activeFilter, onFilterChange }) {
  return (
    <div
      className="
        flex flex-wrap
        rounded-xl
        border border-slate-200
        bg-white
        p-1
        shadow-sm
      "
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={`
              rounded-lg
              px-6 py-2
              text-sm font-bold
              transition-all

              ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-500 hover:text-slate-700'
              }

              ${
                filter.id === 'BUILDER'
                  ? 'text-amber-600 hover:bg-amber-50'
                  : ''
              }
            `}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

export default WritingFilters