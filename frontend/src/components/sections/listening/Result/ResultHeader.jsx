
const ResultHeader = ({onBack}) => {
    return (
        <div className="flex items-center justify-between mb-3">
            <button className="inline-flex items-center text-white/70 hover:text-white text-sm font-bold transition-colors" onClick={onBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1.5">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
                Quay về
            </button>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                Báo Cáo Kết Quả
            </div>
        </div>
    );
};

export default ResultHeader;