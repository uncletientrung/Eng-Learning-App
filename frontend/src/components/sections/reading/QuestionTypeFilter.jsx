const QUESTION_TYPES = [
    'True/False/Not Given', 'Yes/No/Not Given', 'Multiple Choice',
    'Matching Headings', 'Matching Information', 'Matching Features',
    'Matching Sentence Endings', 'Short Answer', 'Sentence Completion',
    'Note/Summary Completion', 'Flow Chart Completion', 'Diagram Labelling', 'Map Labelling',
];

const QuestionTypeFilter = () => {
    return (
        <div id="reading-qtype-filter" className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 scroll-mt-24">
            <button className="w-full flex items-center justify-between text-xs font-black text-slate-500 uppercase tracking-widest hover:text-[#5a6d38] transition-colors focus:outline-none">
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-funnel w-3.5 h-3.5" aria-hidden="true">
            <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
          </svg>
          Lọc theo tiêu chí
        </span>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 capitalize normal-case tracking-normal">Thu gọn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4 text-slate-400 transition-transform duration-300 rotate-180" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </button>
            <div className="overflow-hidden space-y-4 pt-4" style={{ height: 'auto', opacity: 1 }}>
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Dạng câu hỏi <span className="normal-case tracking-normal font-bold text-slate-300">— chọn nhiều dạng cùng lúc</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {QUESTION_TYPES.map((type) => (
                            <button key={type} className="px-3 py-1.5 rounded-full text-xs font-black border transition-all bg-white text-slate-600 border-slate-200 hover:border-slate-400">
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionTypeFilter;