import { Link } from "react-router-dom";
import { useDueFolders, dueFolderLink } from "./useDueFolders";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock3, Layers, LibraryBig, RefreshCw, Sparkles } from "lucide-react";
import VocabularySun from "../../../../components/sections/vocabulary/VocabularySun";
import { getFolderColor } from "../notebook/folderColors";
import "./FlashcardTab.css";

const badgePoints = Array.from({ length: 32 }, (_, index) => {
  const angle = index * Math.PI / 16 - Math.PI / 2;
  const radius = index % 2 === 0 ? 35 : 30;
  return `${40 + Math.cos(angle) * radius},${40 + Math.sin(angle) * radius}`;
}).join(" ");

export default function FlashcardTab({ onChooseSet }) {
  const dueFolders = useDueFolders();
  const totalDue = dueFolders.reduce((total, folder) => total + folder.dueWords.length, 0);
  return (
    <div className={`vd-flashcard-layout${dueFolders.length ? " has-due" : ""}`}>
      {dueFolders.length > 0 && <section className="vd-review-page td-pop" aria-labelledby="vd-review-title">
        <header className="vd-review-header">
          <div>
            <span className="vd-review-eyebrow"><Layers size={15} aria-hidden="true" /> FLASHCARD</span>
            <h1 id="vd-review-title">Ôn tập hôm nay</h1>
            <p>Giữ những từ đã học ở lại lâu hơn.</p>
          </div>
          <button type="button" className="vd-review-browse" onClick={onChooseSet}><LibraryBig size={18} aria-hidden="true" />Tất cả bộ từ<ArrowUpRight size={16} aria-hidden="true" /></button>
        </header>

        <div className="vd-review-hero">
          <div className="vd-review-hero-copy">
            <span className="vd-review-kicker"><span aria-hidden="true" />MỖI NGÀY MỘT CHÚT</span>
            <h2>Nhắc lại một chút.<br /><span>Nhớ lâu hơn.</span></h2>
            <p>Có <strong>{totalDue} từ đến hạn</strong> trong {dueFolders.length} bộ từ đang chờ bạn ôn lại.</p>
            <Link className="vd-review-start" to={dueFolderLink(dueFolders[0].id)}>Bắt đầu ôn tập<ArrowRight size={19} aria-hidden="true" /></Link>
            <span className="vd-review-first-set" title={dueFolders[0].name}>Bắt đầu với “{dueFolders[0].name}”</span>
          </div>
          <div className="vd-review-illustration" aria-hidden="true">
            <span className="vd-review-orbit" />
            <Sparkles className="vd-review-spark vd-review-spark-top" size={25} strokeWidth={1.5} />
            <Sparkles className="vd-review-spark vd-review-spark-bottom" size={18} strokeWidth={1.5} />
            <div className="vd-review-paper vd-review-paper-back"><span>hello!</span></div>
            <div className="vd-review-paper vd-review-paper-middle" />
            <div className="vd-review-paper vd-review-paper-front">
              <span className="vd-review-paper-label"><RefreshCw size={14} />ĐẾN GIỜ ÔN RỒI</span>
              <strong>{totalDue}</strong>
              <span>từ cần ôn lại</span>
              <div className="vd-review-paper-bottom"><span /><span /><span /></div>
            </div>
            <span className="vd-review-illustration-badge"><BookOpen size={24} strokeWidth={1.8} /></span>
          </div>
        </div>

        <section className="vd-review-decks" aria-labelledby="vd-review-decks-title">
          <div className="vd-review-section-heading">
            <div><h2 id="vd-review-decks-title">Bộ từ cần ôn</h2><p>Chọn một bộ để tiếp tục hành trình ghi nhớ.</p></div>
            <span className="vd-review-set-count">{dueFolders.length} bộ từ</span>
          </div>
          <div className="vd-review-grid">
            {dueFolders.map((folder) => <Link key={folder.id} to={dueFolderLink(folder.id)} className="vd-review-deck"
              style={{ "--review-accent": getFolderColor(folder) }} aria-label={`Ôn ${folder.dueWords.length} từ đến hạn trong bộ ${folder.name}`}>
              <div className="vd-review-deck-top">
                <span className="vd-review-deck-icon"><Layers size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className="vd-review-due-badge"><Clock3 size={13} aria-hidden="true" />{folder.dueWords.length} từ đến hạn</span>
              </div>
              <h3>{folder.name}</h3>
              <p className="vd-review-deck-size">{folder.words.length} từ trong bộ</p>
              <div className="vd-review-word-preview" aria-hidden="true">
                {folder.dueWords.slice(0, 3).map((word) => <span key={word.id}>{word.word}</span>)}
                {folder.dueWords.length > 3 && <span>+{folder.dueWords.length - 3}</span>}
              </div>
              <div className="vd-review-deck-footer"><span>Ôn bộ từ này</span><span className="vd-review-deck-arrow"><ArrowUpRight size={19} aria-hidden="true" /></span></div>
            </Link>)}
          </div>
        </section>
        <p className="vd-review-note"><Sparkles size={15} aria-hidden="true" />Mỗi lần nhớ lại là một lần ghi nhớ sâu hơn.</p>
      </section>}
      {dueFolders.length === 0 && <section className="td-pop vd-flashcard-empty" aria-labelledby="vd-flashcard-title">
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
      </section>}
    </div>
  );
}
