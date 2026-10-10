function WritingTestCard({ test, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(test)}
      className="
        group flex w-full cursor-pointer
        flex-row overflow-hidden
        border-2 border-[#111]
        bg-white text-left
        shadow-[3px_3px_0_rgba(0,0,0,0.15)]
        transition-all duration-150
        hover:-translate-y-px
        hover:bg-[#fffdf5]
        hover:shadow-[4px_4px_0_rgba(0,0,0,0.18)]
        active:translate-y-0
        active:shadow-none
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#ffc926]
        focus-visible:ring-offset-2
      "
    >
      {/* Thumbnail */}
      <div
        className="
          relative flex w-[35%] shrink-0
          items-center justify-center
          overflow-hidden border-r-2 border-[#111]
          bg-[#f8f9fa] p-3
        "
      >
        {test.thumbnail ? (
          <img
            src={test.thumbnail}
            alt={test.title}
            className="
              h-full w-full object-contain
              opacity-90 mix-blend-multiply
              transition-opacity group-hover:opacity-100
            "
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-3xl font-black">W</span>
            <span className="text-xs font-bold">
              Writing Practice
            </span>
          </div>
        )}

        {/* Category */}
        {test.category && (
          <div
            className="
              absolute left-0 top-0 max-w-[90%]
              truncate border-b-2 border-r-2 border-[#111]
              bg-[#ffc926] px-3 py-1
              text-[11px] font-black text-[#111]
            "
          >
            {test.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex w-[65%] flex-col justify-start p-4 sm:p-5">
        <h3
          className="
            mb-2 line-clamp-2 text-sm font-black
            leading-snug text-[#111]
            transition-colors group-hover:text-indigo-700
          "
        >
          {test.title}
        </h3>

        {test.description && (
          <p
            className="
              line-clamp-3 text-[13px]
              leading-relaxed text-slate-600
            "
          >
            {test.description}
          </p>
        )}

        {test.taskType && (
          <span
            className="
              mt-4 w-fit border-2 border-[#111]
              bg-white px-2 py-1
              text-xs font-bold text-[#111]
            "
          >
            {test.taskType}
          </span>
        )}
      </div>
    </button>
  );
}

export default WritingTestCard;