
const StickyTabs = () => {
    return (
        <div className="sticky top-0 z-[90] bg-white border-y-2 border-black shadow-[0_3px_0_rgba(0,0,0,1)]">
            <div className="max-w-full flex">
                <button className="flex items-center gap-2 px-6 py-4 text-sm font-black uppercase tracking-wider border-r-2 border-black transition-colors flex-1 justify-center md:flex-none md:justify-start bg-[#6a8042] text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M12 7v14"></path>
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                    <span>Bài Giải Chi Tiết</span>
                </button>
            </div>
        </div>
    );
};

export default StickyTabs;