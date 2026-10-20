const StatsGrid = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[#5a6d38] bg-[#fffadd]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-5 h-5" aria-hidden="true">
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                        <path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bộ Cambridge</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">20 → 10</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-blue-600 bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-5 h-5" aria-hidden="true">
                        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                        <path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng bài thi</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">44 Tests</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-amber-600 bg-amber-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers w-5 h-5" aria-hidden="true">
                        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                        <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                        <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Essential Words</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">30 Passages</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-purple-600 bg-purple-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check w-5 h-5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dạng câu hỏi</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">11 Dạng bài</p>
                </div>
            </div>
        </div>
    );
};

export default StatsGrid;