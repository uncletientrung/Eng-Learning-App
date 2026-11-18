function WritingPagination({ currentPage, totalPages, onPageChange, variant = 'default' }) {
  const isGreen = variant === 'green'

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={isGreen
          ? 'rounded-xl border border-slate-200 bg-white px-4 py-2 font-bold text-xs text-slate-500 transition-all hover:border-[#d1d590] hover:text-[#5a6d38] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500'
          : 'rounded-lg border border-slate-200 px-4 py-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'}
      >
        {isGreen ? 'Trước' : 'Trang trước'}
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={isGreen
            ? `flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black transition-all ${
                page === currentPage
                  ? 'bg-[#5a6d38] text-white shadow-md shadow-[#5a6d38]/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-[#d1d590] hover:text-[#5a6d38]'
              }`
            : `flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-all ${
                page === currentPage
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={isGreen
          ? 'rounded-xl border border-slate-200 bg-white px-4 py-2 font-bold text-xs text-slate-500 transition-all hover:border-[#d1d590] hover:text-[#5a6d38] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500'
          : 'rounded-lg border border-slate-200 px-4 py-2 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'}
      >
        {isGreen ? 'Sau' : 'Trang sau'}
      </button>

    </div>
  )
}

export default WritingPagination