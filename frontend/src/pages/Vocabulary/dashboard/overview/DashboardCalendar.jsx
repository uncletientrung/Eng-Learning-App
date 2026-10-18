import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarDecoration from "./CalendarDecoration";
import CalendarBadge from "./CalendarBadge";

export default function DashboardCalendar({ today }) {
  const [month, setMonth] = useState(() => today.slice(0, 7));
  const [selected, setSelected] = useState(today);
  const [year, monthNumber] = month.split("-").map(Number);
  const days = new Date(year, monthNumber, 0).getDate();
  const offset = (new Date(year, monthNumber - 1, 1).getDay() + 6) % 7;
  const moveMonth = (direction) => {
    const next = new Date(year, monthNumber - 1 + direction, 1);
    setMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`);
  };
  const label = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", timeZone: "Asia/Bangkok" }).format(new Date(`${selected}T12:00:00+07:00`));
  return (
    <section className="td-pop relative flex flex-col gap-3 rounded-[30px] bg-d-surf px-5 py-[22px] text-d-ink" style={{ gridArea: "cal" }}>
      <CalendarDecoration />
      <div className="flex flex-wrap items-end gap-3.5">
        <h2 className="m-0 text-[24px] font-bold leading-[1.05] tracking-[-0.03em]">Hoạt động học tập.<br /><span className="text-d-mute">Tháng {monthNumber} · {year}</span></h2>
        <span className="rounded-xl bg-[#ffc02e] px-3.5 py-2 text-sm font-extrabold leading-snug text-[#1b1d22]">{label}{selected === today ? " · Hôm nay" : ""} · chưa học</span>
      </div>
      <div className="flex justify-end gap-1">
        <button type="button" aria-label="Tháng trước" onClick={() => moveMonth(-1)} className="rounded-lg p-1 hover:bg-d-surf2"><ChevronLeft size={18} /></button>
        <button type="button" aria-label="Tháng sau" onClick={() => moveMonth(1)} className="rounded-lg p-1 hover:bg-d-surf2"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => <span key={day} className="text-center text-[12.5px] font-extrabold text-d-mute">{day}</span>)}
        {Array.from({ length: offset }, (_, index) => <span key={`space-${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const day = index + 1;
          const date = `${month}-${String(day).padStart(2, "0")}`;
          const active = selected === date;
          return <button key={date} type="button" aria-label={`Ngày ${day} tháng ${monthNumber} năm ${year}`} aria-pressed={active} onClick={() => setSelected(date)} className={`relative flex h-10 items-center justify-center transition-transform hover:scale-110 ${active ? "text-[#ffc02e]" : "text-d-surf2"}`}><CalendarBadge /><span className={`relative text-sm font-bold ${active ? "text-[#1b1d22]" : "text-d-ink"}`}>{day}</span>{date === today && <span className="absolute bottom-0.5 size-1 rounded-full bg-d-accent" />}</button>;
        })}
      </div>
    </section>
  );
}
