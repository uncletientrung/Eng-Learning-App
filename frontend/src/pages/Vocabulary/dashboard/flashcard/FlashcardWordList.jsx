import { ArrowLeft, CircleCheck, CircleHelp, Play } from "lucide-react";
import PartOfSpeechBadge from "../notebook/PartOfSpeechBadge";
import "./FlashcardWordList.css";

export default function FlashcardWordList({ folderName, category, remembered, unremembered, onCategoryChange, onBack, onStudy }) {
  const isRemembered = category === "remembered";
  const words = isRemembered ? remembered : unremembered;
  return <section className="vf-word-list-page" aria-labelledby="vf-word-list-title">
    <button type="button" className="vf-list-back" onClick={onBack}><ArrowLeft size={18} />Quay lại lật thẻ</button>
    <header className="vf-list-heading"><div><span className="vf-list-eyebrow">DANH SÁCH TỪ VỰNG</span><h1 id="vf-word-list-title">{isRemembered ? "Đã nhớ" : "Chưa nhớ"}</h1><p>{isRemembered ? "Những từ bạn đã nắm vững" : "Những từ bạn cần xem lại"}</p></div>{!isRemembered && words.length > 0 && <button type="button" className="vf-list-study" onClick={onStudy}><Play size={20} />Học tập ngay</button>}</header>
    <div className="vf-list-filters" aria-label="Lọc theo mức nhớ">
      <button type="button" aria-pressed={isRemembered} onClick={() => onCategoryChange("remembered")}><CircleCheck size={20} />Đã nhớ<span>{remembered.length}</span></button>
      <button type="button" aria-pressed={!isRemembered} onClick={() => onCategoryChange("unremembered")}><CircleHelp size={20} />Chưa nhớ<span>{unremembered.length}</span></button>
    </div>
    <div className="vf-list-table-wrap"><table className="vf-list-table" aria-label={`Từ vựng ${isRemembered ? "đã nhớ" : "chưa nhớ"} trong ${folderName}`}><thead><tr><th scope="col">TỪ VỰNG</th><th scope="col">NGHĨA</th><th scope="col">LOẠI TỪ</th></tr></thead><tbody>{words.map((word) => <tr key={word.id}><td><strong>{word.word}</strong>{word.phonetic && <span className="vf-list-phonetic">{word.phonetic}</span>}</td><td>{word.meaning}</td><td><PartOfSpeechBadge type={word.type} /></td></tr>)}</tbody></table>{!words.length && <p className="vf-list-empty">{isRemembered ? "Chưa có từ nào được đánh dấu đã nhớ." : "Bạn đã nhớ hết các từ trong bộ này!"}</p>}</div>
  </section>;
}
