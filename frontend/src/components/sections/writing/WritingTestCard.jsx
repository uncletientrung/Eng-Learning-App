function WritingTestCard({ test, onClick }) {
  return (
    <div
      onClick={() => onClick(test)}
      className="
        group flex cursor-pointer
        flex-row overflow-hidden
        rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all
        hover:border-indigo-300
        hover:shadow-md
      "
    >
      {/* Thumbnail */}
      <div
        className="
          relative flex w-[35%]
          flex-shrink-0
          items-center justify-center
          overflow-hidden
          border-r border-slate-100
          bg-slate-50
          p-3
        "
      >
        <img
          src={test.thumbnail}
          alt={test.title}
          className="
            h-full w-full
            object-contain
            opacity-90
            mix-blend-multiply
            transition-opacity
            group-hover:opacity-100
          "
        />

        {/* Category */}
        <div
          className="
            absolute left-0 top-0
            max-w-[90%]
            truncate
            rounded-br-lg
            bg-rose-500
            px-3 py-1
            text-[11px]
            font-bold
            text-white
            shadow-sm
          "
        >
          {test.category}
        </div>
      </div>

      {/* Content */}
      <div
        className="
          relative flex w-[65%]
          flex-col
          justify-start
          p-5
        "
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3
            className="
              line-clamp-2
              text-sm font-bold
              leading-snug
              text-blue-600
              transition-colors
              group-hover:text-blue-700
            "
          >
            {test.title}
          </h3>
        </div>

        <p
          className="
            line-clamp-3
            text-[13px]
            leading-relaxed
            text-slate-600
          "
        >
          {test.description}
        </p>

        <span
          className="
            mt-4 w-fit
            rounded-md
            bg-slate-100
            px-2 py-1
            text-xs font-bold
            text-slate-500
          "
        >
          {test.taskType}
        </span>
      </div>
    </div>
  )
}

export default WritingTestCard