const CAM_TABS = ['Tất cả', 'Cam 20', 'Cam 19', 'Cam 18', 'Cam 17', 'Cam 16', 'Cam 15', 'Cam 14', 'Cam 13', 'Cam 12', 'Cam 11', 'Cam 10'];

const QuestionTabs = () => {
    return (
        <>
            <div className="flex gap-3 mb-8">
                <button className="flex items-center px-7 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all bg-[#5a6d38] text-white shadow-xl shadow-[#5a6d38]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-[18px] h-[18px] mr-2" aria-hidden="true">
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                        <path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                    </svg>
                    Cambridge 20 – 10
                </button>
                <button className="relative flex items-center px-7 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all bg-white text-slate-400 border border-slate-100 hover:border-amber-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-[18px] h-[18px] mr-2" aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Essential Words
                </button>
                <button className="relative flex items-center px-7 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all bg-white text-slate-400 border border-slate-100 hover:border-emerald-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-[18px] h-[18px] mr-2" aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    TID Workbook
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                    {CAM_TABS.map((tab, i) => (
                        <button key={tab}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                                    i === 0
                                        ? 'bg-[#5a6d38] text-white shadow-md'
                                        : 'bg-white text-slate-400 border border-slate-100 hover:border-[#d1d590]'
                                }`}>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-56 shrink-0 z-20">
                    <button className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:border-[#d1d590] transition-all shadow-sm">
                        <span className="flex items-center gap-2"><span className="text-slate-400 font-normal">Sắp xếp:</span>Cam 20 → 9</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4 text-slate-400 transition-transform duration-200" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="relative w-full md:w-72 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" aria-hidden="true">
                        <path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
                    </svg>
                    <input type="text" placeholder="Tìm bài reading..." defaultValue=""
                           className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#d1d590] focus:ring-2 focus:ring-[#fffadd] transition-all" />
                </div>
            </div>
        </>
    );
};

export default QuestionTabs;