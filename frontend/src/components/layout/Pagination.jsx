const Pagination = ({
                        currentPage,
                        totalItems,
                        pageSize,
                        onPageChange
                    }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:border-[#d1d590] hover:text-[#5a6d38] transition-all disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500"
            >
                Trước
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map(n => (
                <button
                    key={n}
                    onClick={() => onPageChange(n)}
                    className={`w-9 h-9 rounded-xl font-black text-xs transition-all ${
                        currentPage === n
                            ? "bg-[#5a6d38] text-white shadow-md shadow-[#5a6d38]/20"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-[#d1d590] hover:text-[#5a6d38]"
                    }`}
                >
                    {n}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:border-[#d1d590] hover:text-[#5a6d38] transition-all disabled:opacity-50"
            >
                Sau
            </button>
        </div>
    );
};

export default Pagination;