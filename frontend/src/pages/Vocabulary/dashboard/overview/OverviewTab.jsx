import { useRef, useState } from "react";
import DashboardHero from "./DashboardHero";
import DashboardStreak from "./DashboardStreak";
import DashboardVocabulary from "./DashboardVocabulary";
import DashboardCountdown from "./DashboardCountdown";
import DashboardCalendar from "./DashboardCalendar";
import DashboardSkills from "./DashboardSkills";

const quotes = [
  "Hít thở sâu trước khi bắt đầu — bình tĩnh cũng là một kỹ năng.",
  "Học từ vựng mỗi ngày — tiến bộ hơn mỗi ngày!",
  "Tích lũy từng từ, tiến bộ mỗi ngày.",
];

export default function OverviewTab({ preferences, onBandChange, onExamDateChange, today }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const dateInputRef = useRef(null);
  const daysRemaining = preferences.examDate ? Math.max(0, Math.round((Date.parse(`${preferences.examDate}T00:00:00+07:00`) - Date.parse(`${today}T00:00:00+07:00`)) / 86_400_000)) : null;
  const chooseExamDate = () => {
    const input = dateInputRef.current;
    try { input.showPicker(); } catch { input.focus(); input.click(); }
  };
  return <div className="td-overview"><div className="td-ov-grid">
    <DashboardHero band={preferences.band ?? 6.5} onBandChange={onBandChange} hasGoal={preferences.band !== null} />
    <DashboardStreak today={today} />
    <DashboardVocabulary />
    <DashboardCountdown dateInputRef={dateInputRef} onChooseDate={chooseExamDate} examDate={preferences.examDate} onExamDateChange={onExamDateChange} today={today} todayLabel={today.slice(5).split("-").reverse().join("/")} daysRemaining={daysRemaining} quote={quotes[quoteIndex]} onNextQuote={() => setQuoteIndex((value) => (value + 1) % quotes.length)} />
    <DashboardCalendar today={today} />
    <DashboardSkills />
  </div></div>;
}
