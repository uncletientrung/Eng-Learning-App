const CAM_TABS = ['Tất cả', 'Cam 20', 'Cam 19', 'Cam 18', 'Cam 17', 'Cam 16', 'Cam 15', 'Cam 14', 'Cam 13', 'Cam 12', 'Cam 11', 'Cam 10'];

const QuestionTabs = () => {
    return (
        <>


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