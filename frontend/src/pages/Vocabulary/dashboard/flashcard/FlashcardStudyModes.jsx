import { AudioLines, Check, CircleHelp, Keyboard, Layers, MessageCircle, Puzzle, Rocket, Shuffle } from "lucide-react";

const modes = [
  { label: "Lật thẻ", description: "Tự nhớ nghĩa rồi lật thẻ, chấm mức độ nhớ.", icon: Layers, color: "#5b6ee0" },
  { label: "Quiz", description: "Trắc nghiệm nhanh, chọn 1 trong 4 đáp án (phím 1–4).", icon: CircleHelp, color: "#e8912d" },
  { label: "Listening", description: "Nghe phát âm rồi gõ lại từ.", icon: AudioLines, color: "#2c8a6e" },
  { label: "Điền vào chỗ trống", description: "Chọn từ phù hợp để điền vào câu ví dụ.", icon: Puzzle, color: "#d45b4a" },
  { label: "Tidians", description: "Đặt một câu có dùng từ này, gõ hoặc bấm mic để nói.", icon: MessageCircle, color: "#8f5bd0" },
  { label: "Card Blast", description: "Chữ rơi xuống — gõ đáp án để bắn hạ.", icon: Rocket, color: "#3f86e0" },
  { label: "Gõ từ", description: "Đọc nghĩa tiếng Việt, gõ lại từ tiếng Anh.", icon: Keyboard, color: "#1f9bb0" },
  { label: "Tổng hợp", description: "Mỗi thẻ một chế độ khác nhau.", icon: Shuffle, color: "#d4549c" },
];

export default function FlashcardStudyModes() {
  return <section className="vf-modes" aria-label="Chế độ học"><header><h2>Chế độ học.</h2><p>Chọn một chế độ để bắt đầu phiên mới</p></header><div className="vf-mode-grid">{modes.map(({ label, description, icon: Icon, color }, index) => <button type="button" key={label} aria-pressed={index === 0} disabled={index !== 0} title={index ? "Chế độ này chưa được mở" : "Lật thẻ"} style={{ "--mode-color": color }}><span className="vf-mode-top"><span className="vf-mode-icon"><Icon size={23} /></span><span className="vf-mode-check">{index === 0 && <Check size={13} />}</span></span><strong>{label}</strong><small>{description}</small></button>)}</div></section>;
}
