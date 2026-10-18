export default function DashboardCountdown({ dateInputRef, onChooseDate, examDate, onExamDateChange, today, todayLabel, daysRemaining, quote, onNextQuote }) {
return (
<section className="td-pop relative isolate rounded-[30px] overflow-hidden text-white min-h-[380px] flex flex-col" style={{"gridArea": "count", "background": "linear-gradient(170deg, rgb(255, 154, 118), rgb(240, 81, 45) 60%, rgb(229, 72, 42))"}}>
<div className="relative isolate h-[130px] flex items-center justify-center gap-[22px] overflow-hidden" style={{"background": "linear-gradient(rgb(255, 196, 174), rgb(255, 171, 142))"}}>
<span aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-full" style={{"width": "260px", "height": "260px", "background": "rgba(255, 255, 255, 0.35)", "right": "-40px", "top": "-40px"}} />
<span aria-hidden="true" className="pointer-events-none inline-block td-float absolute left-[5%] top-[14px] z-[2]" style={{"width": "76px", "height": "47.12px"}}>
<svg viewBox="0 0 82 50" width="100%" height="100%" overflow="visible">
<g transform="translate(0 3)" fill="rgba(27,29,34,.12)">
<circle cx="24" cy="30" r="14" />
<circle cx="41" cy="22" r="17" />
<circle cx="58" cy="30" r="13" />
<rect x="11" y="28" width="60" height="17" rx="8.5" />
</g>
<g transform="translate(0 0)" fill="#ffffff">
<circle cx="24" cy="30" r="14" />
<circle cx="41" cy="22" r="17" />
<circle cx="58" cy="30" r="13" />
<rect x="11" y="28" width="60" height="17" rx="8.5" />
</g>
<circle cx="35" cy="31" r="2" fill="#1b1d22" />
<circle cx="48" cy="31" r="2" fill="#1b1d22" />
<ellipse cx="30" cy="36" rx="3" ry="1.7" fill="#ff8f7a" opacity="0.55" />
<ellipse cx="53" cy="36" rx="3" ry="1.7" fill="#ff8f7a" opacity="0.55" />
<path d="M38.5 35.5 q3 2.6 6 0" stroke="#1b1d22" strokeWidth="1.5" strokeLinecap="round" fill="none" />
</svg>
</span>
<span aria-hidden="true" className="pointer-events-none inline-block td-bob absolute right-[7%] bottom-2 z-[2] drop-shadow-[0_10px_12px_rgba(160,50,20,.3)]" style={{"width": "54px", "height": "54px", "animationDelay": "-500ms"}}>
<svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
<path d="M21 54 L17 60 M43 54 L47 60" stroke="#1b1d22" strokeWidth="2.4" strokeLinecap="round" />
<circle cx="17" cy="14" r="7" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.6" />
<circle cx="47" cy="14" r="7" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.6" />
<circle cx="32" cy="36" r="21" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.6" />
<circle cx="32" cy="36" r="15.5" fill="#fff" stroke="#1b1d22" strokeWidth="1.3" />
<path d="M8 22 L4 19 M56 22 L60 19" stroke="#1b1d22" strokeWidth="1.6" strokeLinecap="round" />
<circle cx="27.5" cy="33" r="1.8" fill="#1b1d22" />
<circle cx="36.5" cy="33" r="1.8" fill="#1b1d22" />
<ellipse cx="32" cy="41" rx="2.3" ry="2.8" fill="#1b1d22" />
<ellipse cx="23.5" cy="38" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
<ellipse cx="40.5" cy="38" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
</svg>
</span>
<span aria-hidden="true" className="absolute pointer-events-none rounded-full td-float " style={{"width": "9px", "height": "9px", "background": "rgb(255, 255, 255)", "opacity": "0.9", "animationDelay": "0ms", "left": "22%", "bottom": "26px"}} />
<span aria-hidden="true" className="absolute pointer-events-none rounded-full td-float " style={{"width": "14px", "height": "14px", "background": "transparent", "border": "2.57143px solid rgb(255, 255, 255)", "opacity": "0.9", "animationDelay": "-700ms", "right": "20%", "top": "22px"}} />
<button type="button" title="Đặt ngày thi" onClick={onChooseDate} className="relative z-[3] w-[112px] h-[96px] shrink-0 rounded-[18px] bg-white text-[#1b1d22] shadow-[0_18px_30px_-12px_rgba(160,50,20,.45)] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.8,.5,1)] hover:-translate-y-0.5 hover:-rotate-2">
<span aria-hidden="true" className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#ffb99f]" />
<span aria-hidden="true" className="absolute -right-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#ffb99f]" />
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil absolute right-2.5 top-2.5 w-3 h-3 text-[#b3b7c0]" aria-hidden="true">
<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
<path d="m15 5 4 4" />
</svg>
<span className="text-[10px] font-extrabold tracking-[0.16em] text-[#f0512d]">{"NGÀY THI"}</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-plus w-7 h-7 text-[#f0512d] mt-1" aria-hidden="true">
<path d="M16 19h6" />
<path d="M16 2v4" />
<path d="M19 16v6" />
<path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" />
<path d="M3 10h18" />
<path d="M8 2v4" />
</svg>
<span className="text-[12px] font-extrabold mt-1">{examDate ? examDate.split("-").reverse().join("/") : "Đặt ngày"}</span>
</button>
<input ref={dateInputRef} type="date" aria-label="Đặt ngày thi" className="vd-date-input" value={examDate} min={today} onChange={(event) => onExamDateChange(event.target.value)} />
<span aria-hidden="true" className="relative z-[3] flex items-center gap-1.5 shrink-0">
<span className="w-2 h-2 rounded-full bg-white" style={{"opacity": "0.45"}} />
<span className="w-2 h-2 rounded-full bg-white" style={{"opacity": "0.6"}} />
<span className="w-2 h-2 rounded-full bg-white" style={{"opacity": "0.75"}} />
<span className="w-2 h-2 rounded-full bg-white" style={{"opacity": "0.9"}} />
<span aria-hidden="true" className="pointer-events-none inline-block -ml-0.5 -mt-3" style={{"width": "34px", "height": "34px"}}>
<svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
<path d="M16 60 V6" stroke="#1b1d22" strokeWidth="2.6" strokeLinecap="round" />
<path d="M16 8 C26 3 34 13 50 7 V31 C34 37 26 27 16 32 Z" fill="#fff" stroke="#1b1d22" strokeWidth="1.6" />
<path d="M16 8 C19.5 6.3 22.5 6.6 25 7.8 V19.6 C22.5 18.4 19.5 18.1 16 19.8 Z M25 19.6 C28 21 31 21.9 34 21.4 V33 C31 33.5 28 32.6 25 31.3 Z M34 9.8 C38.5 10.3 43.5 9.3 50 7 V19 C43.5 21.3 38.5 22.3 34 21.4 Z" fill="#1b1d22" />
<circle cx="16" cy="5" r="2.6" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.2" />
</svg>
</span>
</span>
<div className="relative z-[3] w-24 h-24 shrink-0 rounded-full bg-[#f0512d] shadow-[0_18px_30px_-12px_rgba(160,50,20,.6)] flex flex-col items-center justify-center text-center px-1">
<span className="text-[34px] font-bold leading-none">
{daysRemaining ?? "?"}
</span>
<span className="text-[11.5px] font-extrabold leading-tight mt-0.5">{examDate ? "ngày nữa" : "chưa đặt"}</span>
</div>
</div>
<div className="relative px-[30px] pt-[22px] pb-7 flex flex-col gap-3 flex-1">
<span aria-hidden="true" className="absolute pointer-events-none rounded-full td-float " style={{"width": "18px", "height": "18px", "background": "transparent", "border": "3.14286px solid rgb(255, 192, 46)", "opacity": "0.9", "animationDelay": "0ms", "right": "30px", "bottom": "34px"}} />
<h2 className="relative m-0 text-[clamp(32px,3.6vw,44px)] leading-[0.95] font-bold tracking-[-0.04em]">
{examDate ? <>Sẵn sàng cho<br />ngày thi.</> : <>Chưa đặt ngày thi,<br />bấm lịch để chọn.</>}
</h2>
<button type="button" onClick={onChooseDate} className="self-start flex items-center gap-2 bg-white text-[#f0512d] text-[14px] font-extrabold px-4 py-2.5 rounded-[14px] cursor-pointer transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.8,.5,1)] hover:-translate-y-0.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4" aria-hidden="true">
<path d="M8 2v4" />
<path d="M16 2v4" />
<rect width="18" height="18" x="3" y="4" rx="2" />
<path d="M3 10h18" />
</svg>
{"Đặt ngày thi"}
</button>
<button type="button" title="bấm để đổi câu" onClick={onNextQuote} className="relative mt-auto text-left bg-white text-[#1b1d22] rounded-[22px] pt-4 pb-4 pr-5 pl-[58px] cursor-pointer shadow-[0_18px_30px_-18px_rgba(120,30,10,.6)] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.8,.5,1)] hover:-translate-y-[3px] hover:-rotate-[.5deg]">
<span className="absolute left-4 top-4 w-[30px] h-[30px] rounded-[10px] bg-[#f0512d] text-white flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote w-[15px] h-[15px]" aria-hidden="true">
<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
<path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
</svg>
</span>
<span className="block text-[10.5px] font-extrabold tracking-[0.14em] text-[#f0512d] mb-1">CÂU HÔM NAY · {todayLabel}</span>
<p className="m-0 leading-[1.4] font-bold [text-wrap:pretty]" style={{"fontSize": "17px"}}>{quote}</p>
<span className="block mt-1.5 text-[13px] font-bold text-[#8b909b]">{"— TID · bấm để đổi câu"}</span>
</button>
</div>
</section>
);
}
