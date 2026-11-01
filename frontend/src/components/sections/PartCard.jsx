import React from 'react';
import { IconChevronRight } from './listening/icons.jsx';

const THEMES = {
    amber: {
        border: 'border-amber-400',
        bg: 'bg-amber-50',
        shadow: 'shadow-[4px_4px_0_#f59e0b]',
        badge: 'bg-amber-400',
        text: 'text-amber-800',
    },
    sky: {
        border: 'border-sky-400',
        bg: 'bg-sky-50',
        shadow: 'shadow-[4px_4px_0_#38bdf8]',
        badge: 'bg-sky-400',
        text: 'text-sky-800',
    },
    rose: {
        border: 'border-rose-400',
        bg: 'bg-rose-50',
        shadow: 'shadow-[4px_4px_0_#fb7185]',
        badge: 'bg-rose-400',
        text: 'text-rose-800',
    },
    violet: {
        border: 'border-violet-400',
        bg: 'bg-violet-50',
        shadow: 'shadow-[4px_4px_0_#a78bfa]',
        badge: 'bg-violet-400',
        text: 'text-violet-800',
    },
};

const PartCard = ({ partNumber, title, questionRange, questionCount, theme = 'amber', onClick }) => {
    const t = THEMES[theme] || THEMES.amber;

    return (
        <button
            onClick={() => onClick(partNumber)}
            className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 ${t.border} ${t.bg} ${t.shadow} hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,0.8)] transition-all duration-200 text-left cursor-pointer`}
        >
      <span className={`${t.badge} text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3`}>
        PART {partNumber}
      </span>
            <p className={`text-[13px] font-bold ${t.text} leading-snug mb-1 line-clamp-2`}>
                {title}
            </p>
            <p className="text-slate-400 text-[11px] font-medium mt-auto pt-2">
                Q {questionRange} · {questionCount} câu
            </p>
            <IconChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${t.text} opacity-40 group-hover:opacity-80 group-hover:translate-x-1 transition-all`} />
        </button>
    );
};

export default PartCard;