
const ScoreCard = ({onReload}) => {
    return (
        <div className="relative z-20 -mt-[52px] mb-8" style={{ opacity: 1, transform: 'none' }}>
            <div className="bg-white text-[#1e3006] rounded-[28px] border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] px-6 py-7 md:px-10 md:py-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-12">

                    {/* Vòng tròn điểm */}
                    <div className="relative shrink-0" style={{ width: 176, height: 176 }}>
                        <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90" aria-hidden="true">
                            <circle cx="64" cy="64" r="52" fill="none" stroke="#ece8dc" strokeWidth="13"></circle>
                            <circle cx="64" cy="64" r="52" fill="none" stroke="#3f9142" strokeWidth="13" strokeDashoffset="0" strokeDasharray="318.55 8.16"></circle>
                            <circle cx="64" cy="64" r="52" fill="none" stroke="#d64545" strokeWidth="13" strokeDashoffset="-318.55" strokeDasharray="8.16 318.55"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-black leading-none text-[#1e3006] tabular-nums" style={{ fontSize: 37 }}>
                39<span className="text-slate-400" style={{ fontSize: 21 }}>/40</span>
              </span>
                            <span className="mt-1.5 font-bold uppercase tracking-widest text-slate-500" style={{ fontSize: 12 }}>câu đúng</span>
                        </div>
                    </div>

                    {/* Thống kê & Band Score */}
                    <div className="flex flex-col items-center sm:items-start gap-5">
                        <ul className="grid grid-cols-3 sm:grid-cols-1 gap-x-6 gap-y-3.5">
                            <li className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: 'rgb(63,145,66)' }}></span>
                  <span className="text-[13px] font-semibold text-slate-500 sm:w-14 whitespace-nowrap">Đúng</span>
                </span>
                                <span className="text-[18px] font-black tabular-nums whitespace-nowrap">39 câu</span>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: 'rgb(214,69,69)' }}></span>
                  <span className="text-[13px] font-semibold text-slate-500 sm:w-14 whitespace-nowrap">Sai</span>
                </span>
                                <span className="text-[18px] font-black tabular-nums whitespace-nowrap">1 câu</span>
                            </li>
                            <li className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: 'rgb(224,165,38)' }}></span>
                  <span className="text-[13px] font-semibold text-slate-500 sm:w-14 whitespace-nowrap">Bỏ qua</span>
                </span>
                                <span className="text-[18px] font-black tabular-nums whitespace-nowrap">0 câu</span>
                            </li>
                        </ul>
                        <div className="inline-flex items-baseline gap-2.5 rounded-full border-2 border-black bg-[#FFE787] px-4 py-1.5">
                            <span className="text-[11px] font-black uppercase tracking-widest">Band IELTS</span>
                            <span className="text-[24px] font-black tabular-nums leading-none">9.0</span>
                        </div>
                    </div>
                </div>

                {/* Nút bấm */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3 max-w-[560px] mx-auto">
                    <button className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-[#ED7A13] text-white font-black text-[15px] py-3.5 px-6 border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                        Xem lại & chữa từng bước
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                    <button className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-white text-[#1e3006] font-black text-[15px] py-3.5 px-6 border-2 border-black hover:bg-[#f9f5ed] transition-colors" onClick={onReload}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                            <path d="M3 3v5h5"></path>
                        </svg>
                        Làm lại bài
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;