import { ArrowLeft, ArrowRight, BookOpen, Check, Eye } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import useTranslationRequest from "../../hooks/useTranslationRequest";
import { getTranslationExerciseContent, setTranslationContentCompletion, submitTranslationAnswer } from "../../services/translationApi";

function TranslationPracticeLoader({ parentId, exerciseId }) {
    const loader = useCallback((signal) => getTranslationExerciseContent(exerciseId, signal), [exerciseId]);
    const { data, error, retry } = useTranslationRequest(loader);

    if (!data) return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            <Link to={`/translation/${parentId}`} className="inline-flex items-center gap-2 font-bold text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <ArrowLeft size={18} /> Danh sách bài tập
            </Link>
            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                    <p>{error}</p>
                    <button type="button" className="mt-3 font-bold underline" onClick={retry}>Thử tải lại</button>
                </div>
            ) : (
                <p className="py-10 text-center font-semibold text-white" role="status">Đang tải nội dung bài tập...</p>
            )}
        </main>
    );

    return <TranslationPractice parentId={parentId} exerciseId={exerciseId} data={data} />;
}

function TranslationPractice({ parentId, exerciseId, data }) {
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [revealedWords, setRevealedWords] = useState(() => new Set());
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [updatingCompletion, setUpdatingCompletion] = useState(false);
    const [passedContentIds, setPassedContentIds] = useState(
        () => new Set(data.content.filter((item) => item.completed).map((item) => item.id))
    );
    const navigate = useNavigate();

    const { exercise, content } = data;
    const current = content[index];
    const changeQuestion = (nextIndex) => {
        setIndex(nextIndex);
        setAnswer("");
        setRevealedWords(new Set());
        setSubmissionResult(null);
    };
    const answerWords = current?.answer.match(/\S+/g) ?? [];
    const typedWords = answer.trim().match(/\S+/g) ?? [];
    const normalized = (word) => word.toLocaleLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
    const correctCount = answerWords.reduce((count, word, wordIndex) =>
        count + (normalized(word) && normalized(word) === normalized(typedWords[wordIndex] ?? "") ? 1 : 0), 0);
    const allRevealed = answerWords.length > 0 && revealedWords.size >= answerWords.length;
    const revealWord = (wordIndex) => setRevealedWords((previous) => new Set(previous).add(wordIndex));
    const revealNextWord = () => {
        const nextWord = answerWords.findIndex((_, wordIndex) => !revealedWords.has(wordIndex));
        if (nextWord >= 0) revealWord(nextWord);
    };
    const submitAnswer = async () => {
        if (!current || submitting) return;
        setSubmitting(true);
        setSubmissionResult(null);
        try {
            const result = await submitTranslationAnswer(exerciseId, current.id, answer);
            setSubmissionResult(result);
            if (result.passed) {
                setPassedContentIds((previous) => new Set(previous).add(current.id));
            }
        } catch (submitError) {
            setSubmissionResult({ passed: false, message: submitError.message, error: true });
        } finally {
            setSubmitting(false);
        }
    };
    const markContentUnfinished = async (contentId) => {
        if (updatingCompletion || !passedContentIds.has(contentId)) return;
        setUpdatingCompletion(true);
        try {
            await setTranslationContentCompletion(exerciseId, contentId, false);
            setPassedContentIds((previous) => {
                const next = new Set(previous);
                next.delete(contentId);
                return next;
            });
        } catch (updateError) {
            setSubmissionResult({ passed: false, message: updateError.message, error: true });
        } finally {
            setUpdatingCompletion(false);
        }
    };
    const handleAnswerKeyDown = (event) => {
        if (event.ctrlKey && event.code === "Space") {
            event.preventDefault();
            revealNextWord();
        } else if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitAnswer();
        }
    };
    const maskedWord = (word) => {
        let firstLetter = true;
        return word.replace(/[\p{L}\p{N}]/gu, (character) => {
            if (firstLetter) {
                firstLetter = false;
                return character;
            }
            return "*";
        });
    };

    return (
        <main className="mx-auto min-h-screen max-w-[1400px] px-4 pb-10 pt-5 sm:px-6 lg:px-9">
                <header className="mb-6 flex flex-wrap items-center gap-4 text-white">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link to={`/translation/${parentId}`} aria-label="Trở về danh sách bài tập" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="min-w-0">
                            <h1 className="text-xl font-black tracking-tight sm:text-2xl">DỊCH CÂU</h1>
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">The IELTS Dictionary</span>
                        </div>
                    </div>
                    <div className="order-last h-2 w-full overflow-hidden rounded-full bg-white/25 sm:order-none sm:mx-auto sm:w-40 lg:w-64" role="progressbar" aria-label="Vị trí câu trong bài" aria-valuemin={0} aria-valuemax={Math.max(1, content.length)} aria-valuenow={content.length ? index + 1 : 0}>
                        <div className="h-full rounded-full bg-white transition-all" style={{ width: `${content.length ? ((index + 1) / content.length) * 100 : 0}%` }} />
                    </div>
                    <div className="ml-auto flex min-w-0 items-center gap-3">
                        <span className="hidden max-w-56 truncate text-sm font-bold text-white/90 lg:block" title={exercise.title}>{exercise.title}</span>
                        <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#3a4526]">Câu {content.length ? index + 1 : 0}/{content.length}</span>
                    </div>
                </header>

                {content.length === 0 ? (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><BookOpen /></div>
                        <h2 className="text-xl font-extrabold text-slate-800">Bài tập chưa có câu dịch</h2>
                        <p className="mx-auto mt-2 max-w-md text-slate-500">Bài này chưa có câu hỏi liên kết trong bảng nội dung.</p>
                    </section>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-y-0">
                        <section className="min-w-0 rounded-[22px] bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.12)] sm:p-8 lg:rounded-b-none lg:pb-0">
                            <div className="mb-6 rounded-2xl bg-[#f5f6ef] p-4 sm:p-5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[11px] font-extrabold tracking-[0.1em] text-[#667259]">ĐỀ BÀI</span>
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#4a5636]">{exercise.parentTitle}</span>
                                </div>
                                <h2 className="mt-2 break-words text-base font-bold text-[#1f2a1c]">{exercise.title}</h2>
                                <p className="mt-2 text-sm leading-relaxed text-[#667259]">Dịch các câu tiếng Việt sang tiếng Anh. Nhấn vào từ để xem gợi ý.</p>
                            </div>
                            <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-extrabold tracking-[0.1em] text-[#667259]">TIẾNG VIỆT <ArrowRight size={14} /> ENGLISH</div>
                            <p className="mb-7 whitespace-pre-wrap text-2xl font-bold leading-[1.45] text-[#1f2a1c]">{current.vi}</p>

                            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                                <span className="text-xs font-extrabold tracking-[0.08em] text-[#667259]">TỪ GỢI Ý · NHẤN TỪ ĐỂ MỞ</span>
                                <button type="button" onClick={() => setRevealedWords(allRevealed ? new Set() : new Set(answerWords.map((_, wordIndex) => wordIndex)))} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-[#a75a1e] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75a1e]"><Eye size={14} /> {allRevealed ? "Ẩn tất cả" : "Hiện tất cả"}</button>
                            </div>
                            <div className="mb-5 flex flex-wrap gap-2.5">
                                {answerWords.map((word, wordIndex) => {
                                    const isRevealed = revealedWords.has(wordIndex);
                                    return <button key={`${wordIndex}-${word}`} type="button" onClick={() => revealWord(wordIndex)} title={isRevealed ? "Từ đã mở" : "Nhấn để mở từ này"} className={`flex min-h-11 items-center rounded-[20px] border px-4 py-2 text-base font-bold transition ${isRevealed ? "border-[#d9e5cd] bg-[#f4f8ef] text-[#3a4526]" : "border-[#dce0eb] bg-[#f5f6fa] text-[#59627a] hover:border-[#aeb7ca]"}`} style={{ letterSpacing: "0.02em" }}>{isRevealed ? word : maskedWord(word)}</button>;
                                })}
                            </div>
                            <div className="mt-6 mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900"><span className="mr-1 font-extrabold">Lưu ý:</span>Từ gợi ý chỉ mang tính tham khảo. Bạn có thể tự viết bản dịch theo cách mình nghĩ phù hợp.</div>
                            <button type="button" onClick={revealNextWord} disabled={allRevealed} className="inline-flex flex-wrap items-center gap-1.5 text-sm font-bold text-[#a75a1e] hover:underline disabled:opacity-50"><Eye size={15} /> Mở từ gợi ý tiếp theo <span className="rounded bg-[#f7f3ec] px-1.5 py-0.5 text-[10px]">Ctrl + Space</span></button>
                        </section>

                        <aside className="flex min-w-0 flex-col rounded-[22px] bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.12)] sm:p-8 lg:sticky lg:top-4 lg:row-span-2 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
                            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-3"><label htmlFor="translation-answer" className="text-xs font-extrabold tracking-[0.08em] text-[#667259]">BÀI DỊCH CỦA EM</label><span className="whitespace-nowrap text-[11px] font-extrabold tabular-nums text-[#667259]">{correctCount}/{answerWords.length} từ khớp</span></div>
                            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#eef0e4]"><div className="h-full rounded-full bg-[#c47a35] transition-all" style={{ width: `${answerWords.length ? (correctCount / answerWords.length) * 100 : 0}%` }} /></div>
                            <textarea id="translation-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmissionResult(null); }} onKeyDown={handleAnswerKeyDown} placeholder="Gõ bản dịch của bạn tại đây..." rows={7} className="min-h-40 w-full resize-y rounded-2xl border-[1.5px] border-[#cfd6bd] bg-[#fbfcf8] px-5 py-4 text-[17px] leading-relaxed text-[#1f2a1c] outline-none transition-colors focus:border-[#a9b18c]" />
                            {submissionResult && <div className={`mt-4 rounded-2xl border p-4 text-sm ${submissionResult.passed ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`} role="status">
                                <p className="font-bold">{submissionResult.message}{Number.isFinite(submissionResult.score) ? ` · ${submissionResult.score}/100` : ""}</p>
                                {submissionResult.feedback && <p className="mt-2 leading-relaxed">{submissionResult.feedback}</p>}
                                {submissionResult.issues?.length > 0 && <ul className="mt-3 space-y-2">{submissionResult.issues.map((issue, issueIndex) => <li key={`${issueIndex}-${issue.originalText}`} className="rounded-xl bg-white/70 p-3"><p><span className="font-bold">Bạn viết:</span> {issue.originalText}</p><p><span className="font-bold">Gợi ý sửa:</span> {issue.correction}</p><p className="mt-1 text-xs leading-relaxed">{issue.explanation}</p></li>)}</ul>}
                                {submissionResult.improvedVersion && <div className="mt-3 rounded-xl bg-white/70 p-3"><p className="font-bold">Bản dịch gợi ý</p><p className="mt-1 whitespace-pre-wrap leading-relaxed">{submissionResult.improvedVersion}</p></div>}
                            </div>}
                            <div className="mt-5 flex flex-wrap gap-3">
                                <button type="button" onClick={() => { setAnswer(""); setSubmissionResult(null); }} className="rounded-[14px] bg-[#eef0e4] px-5 py-4 text-sm font-bold text-[#4a5636] transition-colors hover:bg-[#e4e7d6]">XOÁ HẾT</button>
                                <button type="button" onClick={submitAnswer} disabled={submitting} className="flex-1 rounded-[14px] bg-[#3a4526] px-5 py-4 text-sm font-extrabold tracking-[0.04em] text-white transition-colors hover:bg-[#4b5b30] disabled:cursor-wait disabled:opacity-60">{submitting ? "ĐANG KIỂM TRA..." : "NỘP (ENTER)"}</button>
                            </div>
                            <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#667259]"><span className="font-extrabold">Enter</span> nộp · <span className="font-extrabold">Shift+Enter</span> xuống dòng · <span className="font-extrabold">Ctrl+Space</span> mở từ tiếp theo</p>
                            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-[#eef0e4] pt-5">
                                <button type="button" disabled={index === 0} onClick={() => changeQuestion(index - 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#eef0e4] px-4 py-3 text-sm font-bold text-[#4a5636] disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={16} /> Câu trước</button>
                                {index < content.length - 1 ? <button type="button" onClick={() => changeQuestion(index + 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#3a4526] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#4b5b30]">Câu tiếp <ArrowRight size={16} /></button> : <button type="button" onClick={() => navigate(`/translation/${parentId}`)} className="inline-flex items-center gap-2 rounded-xl bg-[#3a4526] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#4b5b30]">Hoàn thành <Check size={16} /></button>}
                            </div>
                        </aside>
                        <section className="min-w-0 rounded-[22px] bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.12)] sm:p-8 lg:col-start-1 lg:rounded-t-none lg:pt-7">
                            <div className="border-t border-[#eef0e4] pt-5">
                                <div className="mb-3.5 text-[11px] font-extrabold tracking-[0.1em] text-[#667259]">CÁC CÂU TRONG BÀI</div>
                                <div className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto pb-3">
                                    {content.map((item, itemIndex) => {
                                        const isPassed = passedContentIds.has(item.id);
                                        const isCurrent = itemIndex === index;
                                        return <div key={item.id} className={`flex flex-wrap items-center gap-2 rounded-[14px] px-2 py-2 ${isPassed ? "bg-emerald-50" : isCurrent ? "bg-[#f7f8f2] ring-1 ring-[#e6e9db]" : "hover:bg-[#f7f8f2]"}`}>
                                            <button type="button" disabled={isCurrent} onClick={() => changeQuestion(itemIndex)} className="flex min-w-0 flex-1 items-start gap-3.5 rounded-xl px-2 py-1.5 text-left disabled:cursor-default">
                                                <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold ${isPassed ? "bg-emerald-600 text-white" : "bg-[#eef0e4] text-[#8a9179]"}`}>{isPassed ? <Check size={15} /> : itemIndex + 1}</span>
                                                <span className={`text-[15px] font-medium leading-[1.5] ${isPassed ? "text-emerald-900" : "text-[#4a5040]"}`}>{item.vi}{isPassed ? <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Đã hoàn thành</span> : isCurrent && <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#8a9179]">Đang làm</span>}</span>
                                            </button>
                                            {isPassed && <button type="button" onClick={() => markContentUnfinished(item.id)} disabled={updatingCompletion} className="shrink-0 rounded-lg border border-amber-200 bg-white px-2.5 py-2 text-[11px] font-bold text-amber-800 hover:bg-amber-50 disabled:opacity-50">Đánh dấu chưa xong</button>}
                                        </div>;
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                )}
        </main>
    );
}

export default function TranslationPracticePage() {
    const { parentId, exerciseId } = useParams();
    return (
        <MainLayout showNavbar={false}>
            <section className="relative flex min-h-[101vh] w-full flex-col overflow-clip bg-brand">
                <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgb(255,255,255) 1px, transparent 1px),
                            linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="relative z-10 w-full flex-1">
                    <TranslationPracticeLoader key={exerciseId} parentId={parentId} exerciseId={exerciseId} />
                </div>
            </section>
        </MainLayout>
    );
}
