import { Link } from 'react-router-dom';

const QuestionTestCard = ({ camNumber, testNumber, bgColor, patternId, patternPath, patternTransform, patternWidth }) => {
    const basePath = `/practice/listening/cam-test/cam${camNumber}-test-${testNumber}`;

    return (
        <div className={`relative flex flex-col rounded-3xl p-5 ${bgColor} text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={patternId} width={patternWidth} height={patternWidth} patternUnits="userSpaceOnUse" patternTransform={patternTransform}>
                            <path d={patternPath} fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" opacity="0.6"></path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
                </svg>
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="text-[11px] font-medium opacity-90 tracking-widest">the | ielts | dictionary</div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones w-5 h-5 opacity-90" aria-hidden="true">
                        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                </div>
            </div>

            <h4 className="text-[3.25rem] font-black mb-2 relative z-10 tracking-tight drop-shadow-sm uppercase" style={{ fontFamily: '"Cooper Black", Fraunces, Georgia, serif' }}>
                TEST {testNumber}
            </h4>
            <div className="relative z-10 mb-4 min-h-[22px]"></div>

            <div className="flex items-center gap-4 text-[13px] font-medium mb-6 relative z-10 opacity-90">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 fill-current" aria-hidden="true">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                    <span>{45 + testNumber * 123}, {testNumber}46 lượt nghe</span>
                </div>
                <div className="w-px h-3 bg-white/40"></div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check w-4 h-4" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>80%</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto relative z-10">
                <Link to={`${basePath}?mode=practice`} className="flex items-center justify-between bg-[#fdfaf6] text-slate-800 rounded-xl px-2 py-3 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-sm">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil w-3 h-3" aria-hidden="true">
                                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                <path d="m15 5 4 4"></path>
                            </svg>
                        </div>
                        <span className="text-[11px] font-black whitespace-nowrap">Luyện tập</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </Link>
                <Link to={`${basePath}?mode=real_test`} className="flex items-center justify-between bg-[#fdfaf6] text-slate-800 rounded-xl px-2 py-3 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-sm">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-3 h-3" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                        </div>
                        <span className="text-[11px] font-black whitespace-nowrap">Thi thật</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default QuestionTestCard;