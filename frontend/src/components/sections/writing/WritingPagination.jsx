function WritingPagination({currentPage, totalPages,onPageChange,}) {
  return (
    <div className="mt-12 flex items-center justify-center space-x-2">

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          rounded-lg
          border border-slate-200
          px-4 py-2
          text-slate-600
          transition-colors
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Trang trước
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-lg
            font-medium
            transition-all

            ${
              page === currentPage
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          rounded-lg
          border border-slate-200
          px-4 py-2
          text-slate-600
          transition-colors
          hover:bg-slate-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Trang sau
      </button>

    </div>
  )
}

export default WritingPagination