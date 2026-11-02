import { ANSWERS } from '../../../../data/ListeningResultData.js';

const AnswerItem = ({ item }) => {
    return (
        <div data-aq={item.q}>
            <div className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all bg-white ${item.isCorrect ? 'border-emerald-100 hover:border-emerald-200' : 'border-red-100 hover:border-red-200'}`}>
                <div className="flex items-center gap-3">
                    <div className="shrink-0">
                        {item.isCorrect ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-500">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m15 9-6 6"></path>
                                <path d="m9 9 6 6"></path>
                            </svg>
                        )}
                    </div>
                    <span className="text-xs font-black text-slate-400 w-6 shrink-0">Q{item.q}</span>
                    <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
            <span className="shrink-0 text-[9px] font-black uppercase tracking-wider leading-none text-slate-500 bg-slate-100 border border-slate-200 rounded px-1.5 py-1">
              {item.type}
            </span>

                        {item.isCorrect ? (
                            <span className="text-xs font-bold text-emerald-600">{item.correctAns}</span>
                        ) : (
                            <>
                                <span className="text-xs text-red-500 line-through font-medium">{item.userAns}</span>
                                <span className="text-slate-300 text-xs">→</span>
                                <span className="text-xs font-bold text-emerald-700">{item.correctAns}</span>
                            </>
                        )}
                    </div>
                    <button className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-emerald-100 text-emerald-700 hover:bg-emerald-200" title="Nghe đoạn audio">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
                        </svg>
                    </button>
                </div>
                <p className="mt-1.5 pl-8 text-[13px] leading-snug text-slate-500">{item.context}</p>
            </div>
        </div>
    );
};

const AnswersPane = () => {
    // Group by Part
    const part1 = ANSWERS.filter(a => a.q >= 1 && a.q <= 10);
    const part2 = ANSWERS.filter(a => a.q >= 11 && a.q <= 20);
    const part3 = ANSWERS.filter(a => a.q >= 21 && a.q <= 30);
    const part4 = ANSWERS.filter(a => a.q >= 31 && a.q <= 40);

    const renderPart = (title, items) => (
        <div>
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-black text-white font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest">{title}</div>
                <div className="flex-1 h-px bg-black/10"></div>
            </div>
            <div className="space-y-2">
                {items.map(item => <AnswerItem key={item.q} item={item} />)}
            </div>
        </div>
    );

    return (
        <div className="block flex-1 min-w-0 overflow-y-auto bg-slate-50 px-4 md:px-6 py-6 md:py-8 space-y-8">
            {renderPart('Part 1', part1)}
            {renderPart('Part 2', part2)}
            {renderPart('Part 3', part3)}
            {renderPart('Part 4', part4)}
        </div>
    );
};

export default AnswersPane;