import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BarChart3, Frown, Meh, Moon, Pencil, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { useNotebookFolders } from "../notebook/notebookStorage";
import { speak } from "../../../../utils/speech";
import PartOfSpeechBadge from "../notebook/PartOfSpeechBadge";
import WordActionDialog from "../notebook/WordActionDialog";
import FlashcardStatsDialog from "./FlashcardStatsDialog";
import FlashcardCompletion from "./FlashcardCompletion";
import FlashcardWordList from "./FlashcardWordList";
import { readProgress, saveProgress, scheduleReview, isReviewDue, groupFlashcardWords, useReviewUpdates } from "./flashcardStorage";
import "./NotebookFlashcards.css";

const grades = [
  { value: 1, label: "Quên", icon: Frown, color: "#a8482a" },
  { value: 2, label: "Mơ hồ", icon: Meh, color: "#8a6410" },
  { value: 4, label: "Nhớ rồi", icon: Sparkles, color: "#2e607f" },
];

export default function NotebookFlashcards({ folderId }) {
  const folder = useNotebookFolders().find((item) => item.id === folderId);
  if (!folder || !folder.words.length) return <section className="vf-unavailable"><h1>{folder ? "Thư mục chưa có từ vựng" : "Không tìm thấy thư mục"}</h1><p>{folder ? "Thêm từ vào thư mục để bắt đầu luyện flashcard." : "Thư mục có thể đã được xóa hoặc chưa được lưu trên trình duyệt này."}</p><Link to={folder ? `/vocabulary/dashboard?tab=notebook&folder=${encodeURIComponent(folderId)}` : "/vocabulary/dashboard?tab=notebook"}><ArrowLeft size={18} />Về thư mục của bạn</Link></section>;
  return <FlashcardSession key={`${folder.id}:${folder.words.map((word) => word.id).join(",")}`} folder={folder} />;
}

function FlashcardSession({ folder }) {
  const progress = readProgress(folder.id);
  const [params] = useSearchParams();
  useReviewUpdates();
  const [wordList, setWordList] = useState(() => params.get("review") === "due" ? "due" : null);
  const [studyIds, setStudyIds] = useState(() => folder.words.filter((word) => !progress[word.id] || isReviewDue(progress[word.id])).map((word) => word.id));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const touchStart = useRef(null);
  const [audioError, setAudioError] = useState("");
  const wordsById = new Map(folder.words.map((word) => [word.id, word]));
  const ids = studyIds.filter((id) => wordsById.has(id));
  const index = Math.min(position, ids.length - 1);
  const word = wordsById.get(ids[index]) || folder.words[0];
  const seen = reviewed.filter((id) => wordsById.has(id));
  const { remembered, due, unremembered: unseen } = groupFlashcardWords(folder.words, progress);
  const folderLink = `/vocabulary/dashboard?tab=notebook&folder=${encodeURIComponent(folder.id)}`;
  const showingWordList = Boolean(wordList);

  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playAudio = useCallback(() => {
    setAudioError("");
    if (!("speechSynthesis" in window)) {
      setAudioError("Trình duyệt chưa hỗ trợ đọc văn bản thành giọng nói.");
      return;
    }
    try {
      speak(word.word, "US", false);
    } catch {
      setAudioError("Không đọc được từ. Bạn bấm nút loa để thử lại nhé.");
    }
  }, [word.word, setAudioError]);

  useEffect(() => {
    if (completed || showingWordList || !ids.length) return;
    // Defer playback so StrictMode's initial cleanup cannot play the word twice.
    const timer = window.setTimeout(playAudio, 0);
    return () => { window.clearTimeout(timer); stopAudio(); };
  }, [word.id, completed, showingWordList, ids.length, playAudio, stopAudio]);

  const speakerButton = <button type="button" className="vf-audio" aria-label={`Nghe phát âm ${word.word}`} title="Nghe phát âm" onClick={playAudio}><Volume2 size={19} aria-hidden="true" /></button>;

  const go = (step) => {
    setPosition((index + step + ids.length) % ids.length);
    setFlipped(false);
    setCompleted(false);
  };
  const rate = (grade) => {
    const nextProgress = { ...progress, [word.id]: { id: word.id, ...scheduleReview(progress[word.id], grade) } };
    try { saveProgress(folder.id, nextProgress); }
    catch { setMessage("Chưa lưu được mức nhớ. Vui lòng thử lại trước khi chuyển thẻ."); return; }
    const nextReviewed = [...new Set([...seen, word.id])];
    setReviewed(nextReviewed);
    setMessage("");
    setFlipped(false);
    if (nextReviewed.length === ids.length) { setCompleted(true); return; }
    for (let offset = 1; offset <= ids.length; offset++) {
      const nextIndex = (index + offset) % ids.length;
      if (!nextReviewed.includes(ids[nextIndex])) { setPosition(nextIndex); break; }
    }
  };

  useEffect(() => {
    const keyboard = (event) => {
      if (!ids.length || wordList || editing || stats || document.querySelector("dialog[open]") || event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (event.code === "Space" && !completed && !event.target.closest("button, a")) { event.preventDefault(); setFlipped((value) => !value); }
      if (event.key === "ArrowLeft" && !completed) { event.preventDefault(); go(-1); }
      if (event.key === "ArrowRight" && !completed) { event.preventDefault(); go(1); }
      if (/^[1-3]$/.test(event.key) && !completed) { event.preventDefault(); rate(grades[Number(event.key) - 1].value); }
    };
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  });

  const statsWords = stats === "Đã nhớ" ? remembered : stats === "Chưa nhớ" ? unseen : folder.words;
  const sessionRemembered = seen.filter((id) => progress[id]?.grade >= 3);
  const sessionUnremembered = seen.filter((id) => !(progress[id]?.grade >= 3));
  const reviewUnremembered = () => {
    if (!sessionUnremembered.length) return;
    setStudyIds(sessionUnremembered);
    setPosition(0); setFlipped(false); setCompleted(false); setReviewed([]); setMessage("");
  };

  if (wordList) return <FlashcardWordList folderName={folder.name} category={wordList} remembered={remembered} unremembered={unseen} due={due} onCategoryChange={setWordList} onBack={() => setWordList(null)} onStudy={() => {
    const selected = wordList === "due" ? due : wordList === "remembered" ? remembered : unseen;
    if (!selected.length) return;
    setStudyIds(selected.map((item) => item.id));
    setPosition(0); setFlipped(false); setReviewed([]); setCompleted(false); setMessage(""); setWordList(null);
  }} />;

  if (!ids.length) return <section className="vf-unavailable"><h1>Chưa có từ đến hạn ôn tập</h1><p>{folder.name}</p><button type="button" className="vf-list-back" onClick={() => setWordList("due")}>Xem danh sách từ vựng</button><Link to={folderLink}><ArrowLeft size={18} />Về bộ từ</Link></section>;

  return <div className="vf-study" style={{ "--fc-bg": "#ffc02e" }}>
    <div className="vf-top-grid">
      <section className={`vf-stage td-pop${completed ? " vf-stage-finished" : ""}`} aria-label={`Flashcard thư mục ${folder.name}`}>
        <span className="vf-halo" aria-hidden="true" /><span className="vf-dots" aria-hidden="true" /><span className="vf-ring td-float" aria-hidden="true" /><span className="vf-tape" aria-hidden="true" />{!completed && <span className="vf-moon td-bob" aria-hidden="true"><Moon size={32} fill="#f7e9a2" /></span>}
        {completed ? <FlashcardCompletion folder={folder} folderLink={folderLink} rememberedCount={sessionRemembered.length} reviewCount={sessionUnremembered.length} onReview={reviewUnremembered} /> : <>
          <div className="vf-mobile-title"><strong>Lật thẻ.</strong><Link to={folderLink}>{folder.name}</Link><span>{index + 1}/{ids.length}</span></div>
          <div className="vf-card-area" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current !== null) { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 65) go(distance < 0 ? 1 : -1); } touchStart.current = null; }}>
            <span className="vf-paper vf-paper-one" aria-hidden="true" /><span className="vf-paper vf-paper-two" aria-hidden="true" />
            <div className={`vf-card ${flipped ? "is-flipped" : ""}`}>
              <div className="vf-card-face vf-card-front" inert={flipped} aria-hidden={flipped} onClick={(event) => { if (!event.target.closest("button")) setFlipped(true); }}>
                <div className="vf-card-face-heading"><span>TIẾNG ANH</span>{speakerButton}</div>
                <button type="button" className="vf-card-flip-target" aria-label="Lật thẻ để xem đáp án" onClick={() => setFlipped(true)}><strong>{word.word}</strong>{word.phonetic && <span className="vf-ipa">{word.phonetic}</span>}<small><RotateCcw size={15} />Bấm thẻ hoặc Space để lật</small></button>
                <div className="vf-card-tags"><span>{folder.name}</span><PartOfSpeechBadge type={word.type} /></div><span className="vf-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="vf-card-face vf-card-back" inert={!flipped} aria-hidden={!flipped} onClick={(event) => { if (!event.target.closest("button")) setFlipped(false); }}>
                <div className="vf-card-face-heading"><span>NGHĨA TIẾNG VIỆT</span><button type="button" className="vf-edit" onClick={() => setEditing(true)}><Pencil size={15} />Sửa</button>{speakerButton}</div>
                <button type="button" className="vf-card-flip-target is-definition" aria-label="Lật lại mặt trước" onClick={() => setFlipped(false)}><strong>{word.meaning}</strong>{word.example && <span className="vf-example"><small>VÍ DỤ</small><em>“{word.example}”</em></span>}<small>↺ Chạm để lật lại</small></button>
              </div>
            </div>
          </div>
          <div className="vf-review-panel">
            <div className="vf-deck-heading"><Link to={folderLink} title="Về bộ từ đang học">{folder.name} ({ids.length}) <ArrowRight size={13} /></Link><span>Thẻ {index + 1}/{ids.length}</span></div>
            <div className="vf-title-row"><h1>Lật thẻ.</h1><span>Còn {ids.length - seen.length} từ nữa nè!</span></div><p className="vf-subtitle">Tự nhớ nghĩa rồi lật thẻ, chấm mức độ nhớ.</p>
            <div className="vf-progress" role="progressbar" aria-label="Tiến độ phiên học" aria-valuemin={0} aria-valuemax={ids.length} aria-valuenow={seen.length}><span style={{ width: `${seen.length / ids.length * 100}%` }} /></div>
            <div className="vf-counts">{[["Đã nhớ", remembered.length, "remembered"], ["C\u1ea7n \u00f4n t\u1eadp", due.length, "due"], ["Chưa nhớ", unseen.length, "unremembered"]].map(([label, count, category]) => <button key={label} type="button" onClick={() => setWordList(category)}>{label} <span>{count}</span></button>)}<button type="button" onClick={() => setStats("Thống kê")}><BarChart3 size={13} />Thống kê</button></div>
            <div className="vf-grades">{grades.map(({ value, label, icon: Icon, color }, gradeIndex) => <button type="button" key={label} style={{ "--grade-color": color }} onClick={() => rate(value)} title={`${label} (phím ${gradeIndex + 1})`}><span style={{ background: color }}><Icon size={22} /></span><strong>{label}</strong><small>{gradeIndex + 1}</small></button>)}</div>
            <div className="vf-navigation"><button type="button" aria-label="Thẻ trước" onClick={() => go(-1)}><ArrowLeft size={18} /></button><button type="button" className="vf-flip-button" onClick={() => setFlipped(!flipped)}><RotateCcw size={17} />Lật thẻ <kbd>Space</kbd></button><button type="button" aria-label="Thẻ tiếp" onClick={() => go(1)}><ArrowRight size={18} /></button></div>
          </div>
        </>}
      </section>
    </div>
    {message && !completed && <p className="vf-message" role="status">{message}</p>}
    {audioError && !completed && <p className="vf-message" role="status">{audioError}</p>}
    {editing && <WordActionDialog mode="edit" word={word} folderId={folder.id} onClose={() => setEditing(false)} onSuccess={setMessage} />}
    {stats && <FlashcardStatsDialog title={stats} words={statsWords} onClose={() => setStats(null)} onSelect={(id) => { if (!ids.includes(id)) { setStudyIds(folder.words.map((item) => item.id)); setReviewed([]); setPosition(folder.words.findIndex((item) => item.id === id)); } else setPosition(ids.indexOf(id)); setFlipped(false); setCompleted(false); }} />}
  </div>;
}
