import { ArrowLeft, CircleCheck, CircleHelp, Play, TrendingUp } from "lucide-react";
import PartOfSpeechBadge from "../notebook/PartOfSpeechBadge";
import "./FlashcardWordList.css";

export default function FlashcardWordList({ folderName, category, remembered, unremembered, due, onCategoryChange, onBack, onStudy }) {
  const isRemembered = category === "remembered";
  const isDue = category === "due";
  const title = isDue ? "Cần ôn tập" : isRemembered ? "Đã nhớ" : "Chưa nhớ";
  const words = isDue ? due : isRemembered ? remembered : unremembered;
  return <section className="vf-word-list-page" aria-labelledby="vf-word-list-title">
    <button type="button" className="vf-list-back" onClick={onBack}><ArrowLeft size={18} />Quay lại lật thẻ</button>
    <header className="vf-list-heading"><div><span className="vf-list-eyebrow">DANH SÁCH TỪ VỰNG</span><h1 id="vf-word-list-title">{title}</h1><p>{isDue ? "Các từ đến hạn cần ôn lại để không quên" : isRemembered ? "Những từ bạn đã nắm vững" : "Những từ bạn cần xem lại"}</p></div><button type="button" className="vf-list-study" disabled={!words.length} onClick={onStudy}><Play size={20} />Luyện tập ngay</button></header>
    <div className="vf-list-filters" aria-label="Lọc theo mức nhớ">
      <button type="button" aria-pressed={isRemembered} onClick={() => onCategoryChange("remembered")}><CircleCheck size={20} />Đã nhớ<span>{remembered.length}</span></button>
      <button type="button" aria-pressed={category === "unremembered"} onClick={() => onCategoryChange("unremembered")}><CircleHelp size={20} />Chưa nhớ<span>{unremembered.length}</span></button>
      <button type="button" aria-pressed={isDue} onClick={() => onCategoryChange("due")}><TrendingUp size={20} />Cần ôn tập<span>{due.length}</span></button>
    </div>
    <div className="vf-list-table-wrap"><table className="vf-list-table" aria-label={`${title} trong ${folderName}`}><thead><tr><th scope="col">TỪ VỰNG</th><th scope="col">NGHĨA</th><th scope="col">LOẠI TỪ</th></tr></thead><tbody>{words.map((word) => <tr key={word.id}><td><strong>{word.word}</strong>{word.phonetic && <span className="vf-list-phonetic">{word.phonetic}</span>}</td><td>{word.meaning}</td><td><PartOfSpeechBadge type={word.type} /></td></tr>)}</tbody></table>{!words.length && <p className="vf-list-empty">{isDue ? "Kh\u00f4ng c\u00f3 t\u1eeb n\u00e0o \u0111\u1ebfn h\u1ea1n \u00f4n t\u1eadp." : isRemembered ? "Chưa có từ nào được đánh dấu đã nhớ." : "Bạn đã nhớ hết các từ trong bộ này!"}</p>}</div>
  </section>;
}
