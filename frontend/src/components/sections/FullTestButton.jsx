import React from 'react';
import { IconChevronRight, IconBookOpen } from './listening/icons.jsx';

const FullTestButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between bg-slate-900 text-white rounded-2xl px-6 py-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                    <IconBookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                    <p className="font-black text-sm uppercase tracking-wider">Toàn bài (Full test)</p>
                    <p className="text-slate-400 text-[11px] font-medium">Part 1 → 4 · 40 câu</p>
                </div>
            </div>
            <IconChevronRight className="w-5 h-5 text-white/60" />
        </button>
    );
};

export default FullTestButton;