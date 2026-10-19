import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import VocabularySun from "../../../../components/sections/vocabulary/VocabularySun";
import "./FlashcardCompletion.css";

const confettiColors = ["#5c78ff", "#39b98e", "#ff7199", "#ffffff", "#e98036", "#9b63d8"];
const confetti = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  "--confetti-color": confettiColors[index % confettiColors.length],
  "--confetti-drift": `${(index * 29) % 180 - 90}px`,
  "--confetti-turn": `${(index % 2 ? -1 : 1) * (360 + index * 21)}deg`,
  "--confetti-delay": `${(index % 9) * .075}s`,
  "--confetti-duration": `${2.7 + (index % 7) * .22}s`,
}));

export default function FlashcardCompletion({ folder, rememberedCount, reviewCount, onReview, folderLink }) {
  const total = rememberedCount + reviewCount;
  const percent = total ? Math.round(rememberedCount / total * 100) : 0;
  return <>
    <div className="vf-finish-confetti" aria-hidden="true">{confetti.map((style, index) => <span key={index} style={style} />)}</div>
    <div className="vf-finish-sun" aria-hidden="true"><VocabularySun /></div>
    <section className="vf-finish-card" aria-labelledby="vf-finish-title">
      <span className="vf-finish-badge" aria-hidden="true"><PartyPopper size={30} /></span>
      <h1 id="vf-finish-title">Hoàn thành!</h1>
      <p>Thống kê phiên học của bạn</p>
      <div className="vf-finish-stats">
        <div className="vf-finish-ratio"><div className="vf-finish-ring vf-finish-ring-animated" style={{ "--vf-result-offset": 100 - percent }} role="img" aria-label={`${percent}% từ đã nhớ`}><svg viewBox="0 0 68 68" aria-hidden="true"><circle className="vf-result-track" cx="34" cy="34" r="29" /><circle className="vf-result-fill" cx="34" cy="34" r="29" pathLength="100" /></svg><strong>{percent}%</strong></div><span>Tỷ lệ đã nhớ</span></div>
        <div className="vf-finish-legend"><span><i />{rememberedCount} Đã nhớ</span><span><i />{reviewCount} Cần ôn lại</span></div>
      </div>
      <div className="vf-finish-actions"><button type="button" disabled={!reviewCount} onClick={onReview}>Ôn những từ chưa nhớ</button><Link to={folderLink}>Về thư mục</Link></div>
      {!reviewCount && <p className="vf-finish-all-known">Bạn đã nhớ tất cả từ trong phiên này!</p>}
    </section>
    <section className="vf-finish-message" aria-label="Kết quả phiên học">
      <div className="vf-deck-heading"><Link to={folderLink}>{folder.name} ({total})</Link><span>Hoàn thành</span></div>
      <div className="vf-finish-congrats"><h2>Tuyệt vời.</h2><span>Giỏi quá!</span></div>
      <p>{reviewCount ? "Ôn lại những từ chưa nhớ để ghi nhớ tốt hơn nhé." : "Bạn đã hoàn thành phiên học. Hẹn bạn ở lần ôn tập tiếp theo!"}</p>
      <div className="vf-finish-progress" aria-hidden="true"><svg viewBox="0 0 140 25"><path d="M2 14 Q12 -1 24 14 T48 14 T72 14 T96 14 T120 14 T138 7" /></svg></div>
    </section>
  </>;
}
