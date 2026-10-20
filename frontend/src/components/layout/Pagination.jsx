const Pagination = () => {
    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button disabled className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:border-[#d1d590] hover:text-[#5a6d38] transition-all disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500">
                Trước
            </button>
            <button className="w-9 h-9 rounded-xl font-black text-xs transition-all bg-[#5a6d38] text-white shadow-md shadow-[#5a6d38]/20">1</button>
            {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <button key={n} className="w-9 h-9 rounded-xl font-black text-xs transition-all bg-white border border-slate-200 text-slate-600 hover:border-[#d1d590] hover:text-[#5a6d38]">
                    {n}
                </button>
            ))}
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-500 hover:border-[#d1d590] hover:text-[#5a6d38] transition-all disabled:opacity-50">
                Sau
            </button>
        </div>
    );
};

export default Pagination;