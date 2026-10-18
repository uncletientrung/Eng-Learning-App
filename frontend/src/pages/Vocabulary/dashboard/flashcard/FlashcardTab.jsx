import { ArrowLeft, BookOpen } from "lucide-react";
import VocabularySun from "../../../../components/sections/vocabulary/VocabularySun";
import "./FlashcardTab.css";

const badgePoints = Array.from({ length: 32 }, (_, index) => {
  const angle = index * Math.PI / 16 - Math.PI / 2;
  const radius = index % 2 === 0 ? 35 : 30;
  return `${40 + Math.cos(angle) * radius},${40 + Math.sin(angle) * radius}`;
}).join(" ");

export default function FlashcardTab({ onChooseSet }) {
  return (
    <div className="vd-flashcard-layout">
    <section className="td-pop vd-flashcard-empty" aria-labelledby="vd-flashcard-title">
      <div className="vd-flashcard-halo" aria-hidden="true" />
      <div className="vd-flashcard-tape" aria-hidden="true" />
      <svg className="vd-flashcard-moon td-bob" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill="#f7e9a2" stroke="#686344" strokeWidth="1.5" />
        <circle cx="14" cy="15" r="3" fill="#dfd193" /><circle cx="32" cy="12" r="2" fill="#dfd193" />
        <circle cx="16" cy="24" r="1.7" fill="#292d2c" /><circle cx="30" cy="24" r="1.7" fill="#292d2c" />
        <ellipse cx="12" cy="29" rx="3" ry="1.7" fill="#eda987" /><ellipse cx="34" cy="29" rx="3" ry="1.7" fill="#eda987" />
        <path d="M20 29q4 4 8 0" fill="none" stroke="#292d2c" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="vd-flashcard-ring vd-flashcard-ring-top td-float" aria-hidden="true" />
      <span className="vd-flashcard-dot" aria-hidden="true" />
      <span className="vd-flashcard-ring vd-flashcard-ring-bottom td-float" aria-hidden="true" />
      <div className="vd-flashcard-dots" aria-hidden="true" />
      <div className="vd-flashcard-sun-scene" aria-hidden="true">
        <VocabularySun />
      </div>
      <div className="vd-flashcard-content">
        <div className="vd-flashcard-book" aria-hidden="true"><svg viewBox="0 0 80 80"><polygon points={badgePoints} fill="white" /></svg><BookOpen size={28} strokeWidth={2.2} /></div>
        <h1 id="vd-flashcard-title">Chưa chọn bộ từ vựng</h1>
        <p>Vui lòng chọn 1 bộ từ bạn muốn ôn tập ở trang cá nhân nhé</p>
        <button type="button" onClick={onChooseSet}><ArrowLeft size={18} />Chọn bộ từ</button>
      </div>
    </section>
    </div>
  );
}
