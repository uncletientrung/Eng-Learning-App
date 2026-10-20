const TestCard = ({ cam, testNumber, passages }) => {
    const testId = `cam-${cam.replace('CAM ', '')}-${testNumber}`;

    return (
        <div className="group rounded-[32px] border transition-all p-7 md:p-8 relative overflow-hidden flex flex-col h-full shadow-sm bg-white border-slate-100 hover:border-[#4a5d23]/20">
            <div className="absolute top-0 right-0 bg-[#fffbe6] text-[#4a5d23] px-6 py-2.5 rounded-bl-[32px] text-[10px] font-black uppercase tracking-[0.2em] border-l border-b border-[#fff5c2]">
                {cam}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <a className="group/cover block shrink-0 relative" href={`index.htmlpractice/reading/${testId}?mode=practice`}>
                    <div className="w-28 md:w-36 aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-900 relative group-hover/cover:shadow-2xl group-hover/cover:scale-[1.02] transition-all duration-500">
                        <img alt={`Cambridge ${cam.replace('CAM ', '')} - Test ${testNumber}`} decoding="async" data-nimg="fill" className="object-cover opacity-90"
                             sizes="(max-width: 768px) 112px, 144px"
                             src="/_next/image?url=%2Fassets%2Fcambridge-reading-book.webp&w=3840&q=75"
                             style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-0 right-0 text-center">
                            <span className="text-[18px] font-black text-white tracking-widest drop-shadow-lg">{cam.replace('CAM ', '')}</span>
                        </div>
                    </div>
                </a>
                <div className="flex-1 min-w-0 flex flex-col justify-center pt-2">
                    <a href={`index.htmlpractice/reading/${testId}?mode=practice`}>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-[1.1] hover:text-[#5a6d38] transition-colors">
                            Cambridge {cam.replace('CAM ', '')} - Test {testNumber}
                        </h3>
                    </a>
                    <div className="flex flex-wrap gap-2.5 items-center mt-1 mb-2">
                        <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                            <span className="text-[12px] font-black text-amber-700 uppercase tracking-widest">Band 6.0-9.0</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#007e64] text-white px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] text-[10px] font-black tracking-wider uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-3.5 h-3.5 text-yellow-300 animate-pulse shrink-0" aria-hidden="true">
                                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                                <path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" />
                            </svg>
                            <span>Giao diện chuẩn thi thật 100%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-10 flex-grow">
                {passages.map((p) => (
                    <a key={p.num}
                       className="flex items-center gap-4 px-5 py-4 bg-[#f8fafc]/50 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all group/p"
                       href={`index.htmlpractice/reading/${testId}?mode=practice&passage=${p.num}`}>
            <span className="w-9 h-9 bg-[#e8f5e9] text-[#2e7d32] rounded-full flex items-center justify-center text-sm font-black shrink-0 border border-[#d4edda] group-hover/p:bg-[#4a5d23] group-hover/p:text-white transition-all duration-300">
              {p.num}
            </span>
                        <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-slate-700 truncate group-hover/p:text-slate-900 transition-colors">{p.title}</span>
            </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border shrink-0 transition-all group-hover/p:scale-105 shadow-sm ${p.categoryClass}`}>
              {p.category}
            </span>
                    </a>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <a className="flex items-center justify-center gap-3 bg-[#f0f9f7] text-[#007e64] border border-[#007e64]/10 py-[18px] rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#e6f4f1] transition-all active:scale-95 group/btn shadow-sm"
                   href={`index.htmlpractice/reading/${testId}?mode=practice`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book group-hover/btn:rotate-12 transition-transform" aria-hidden="true">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                    </svg>
                    Luyện tập
                </a>
                <a className="flex items-center justify-center gap-3 bg-[#007e64] text-white py-[18px] rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#006651] shadow-xl shadow-[#007e64]/20 transition-all active:scale-95 group/btn"
                   href={`index.htmlpractice/reading/${testId}?mode=exam`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock group-hover/btn:rotate-12 transition-transform" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    ĐI THI
                </a>
            </div>
        </div>
    );
};

export default TestCard;