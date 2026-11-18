import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Check,
    ChevronRight,
    Eye,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { getAuthenticatedToken } from "../../services/authApi";
import { getTranslationExerciseContent, getTranslationExercises, setTranslationContentCompletion, submitTranslationAnswer } from "../../services/translationApi";

function useRequest(loader, key) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setData(null);
        setError("");
        loader(controller.signal)
            .then((result) => {
                if (!controller.signal.aborted) setData(result);
            })
            .catch((requestError) => {
                if (!controller.signal.aborted) setError(requestError.message);
            });
        return () => controller.abort();
    }, [loader, key, retry]);

    return { data, error, retry: () => setRetry((value) => value + 1) };
}

function RequestState({ error, retry, label }) {
    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                <p>{error}</p>
                <button type="button" className="mt-3 font-bold underline" onClick={retry}>Thử tải lại</button>
            </div>
        );
    }
    return <p className="py-10 text-center font-semibold text-slate-500" role="status">{label}</p>;
}

function ExerciseList({ parentId }) {
    const loader = useCallback((signal) => getTranslationExercises(parentId, signal), [parentId]);
    const { data, error, retry } = useRequest(loader, parentId);
    const navigate = useNavigate();

    const openExercise = (event, exerciseId) => {
        if (getAuthenticatedToken()) return;
        event.preventDefault();
        const destination = `/translation/${parentId}/exercises/${exerciseId}`;
        navigate("/login", {
            state: {
                from: destination,
                toast: "Vui lòng đăng nhập để bắt đầu bài tập dịch.",
            },
        });
    };

    if (!data) return <RequestState error={error} retry={retry} label="Đang tải danh sách bài tập..." />;
    const { parent, exercises, progress } = data;

    return (
        <MainLayout>
            <main className="mx-auto mt-20 min-h-[75vh] max-w-5xl px-6 py-12">
                <Link to="/translation" className="mb-7 inline-flex items-center font-semibold text-slate-500 transition-colors hover:text-emerald-600">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Tất cả chủ đề
                </Link>
                <div className="mb-9">
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-600"><BookOpen size={16} /><span className="uppercase tracking-widest">Translation · {parent.title}</span></div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{parent.title}</h1>
                    <p className="mt-4 max-w-2xl leading-relaxed text-slate-500">{exercises.length} bài tập trong chủ đề này. Chọn một bài để dịch từng câu và xem bản dịch tham khảo.</p>
                    <div className="mt-4 max-w-sm" aria-label="Tiến độ chủ đề">
                        <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-slate-600">
                            <span>Tiến độ chủ đề</span>
                            <span className="tabular-nums">{progress?.completedExercises ?? 0}/{progress?.totalExercises ?? exercises.length} bài · {progress?.percentage ?? 0}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-indigo-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress?.percentage ?? 0}>
                            <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress?.percentage ?? 0}%` }} />
                        </div>
                    </div>
                </div>
                {exercises.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Nhóm này chưa có bài tập.</div>
                ) : (
                    <div>
                        {exercises.map((exercise, index) => (
                            <Link key={exercise.id} to={`/translation/${parentId}/exercises/${exercise.id}`} onClick={(event) => openExercise(event, exercise.id)} className="group mb-4 flex items-center justify-between rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[6px_6px_0_rgba(0,0,0,1)]">
                                <div className="flex items-center gap-4 w-full">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-sm font-black text-slate-500">{index + 1}</span>
                                    <div className="min-w-0 flex-1 w-4/5">
                                        <span className="block text-[15px] font-bold leading-snug text-slate-800">{exercise.title}</span>
                                        <span className="mt-1.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-500">Bài {index + 1} · {exercise.completedContentCount}/{exercise.itemCount} câu</span>
                                        <div className="mt-2 flex w-1/2 items-center gap-2.5">
                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-indigo-100" role="progressbar" aria-label={`Tiến độ ${exercise.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={exercise.completionPercent}>
                                                <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${exercise.completionPercent}%` }} />
                                            </div>
                                            <span className="w-9 shrink-0 text-right text-[10px] font-bold tabular-nums text-indigo-700">{exercise.completionPercent}%</span>
                                        </div>
                                    </div>
                                </div>
                                {exercise.completed && <span className="ml-auto mr-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Hoàn thành</span>}
                                <ChevronRight className="ml-4 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-500" />
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </MainLayout>
    );
}

function TranslationPractice({ parentId, exerciseId }) {
    const loader = useCallback((signal) => getTranslationExerciseContent(exerciseId, signal), [exerciseId]);
    const { data, error, retry } = useRequest(loader, exerciseId);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [revealedWords, setRevealedWords] = useState(() => new Set());
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [updatingCompletion, setUpdatingCompletion] = useState(false);
    const [passedContentIds, setPassedContentIds] = useState(() => new Set());
    const navigate = useNavigate();

    useEffect(() => {
        setIndex(0);
        setAnswer("");
        setRevealedWords(new Set());
        setSubmissionResult(null);
        setPassedContentIds(new Set());
    }, [exerciseId]);

    useEffect(() => {
        if (data) setPassedContentIds(new Set(data.content.filter((item) => item.completed).map((item) => item.id)));
    }, [data, exerciseId]);

    if (!data) return <main className="mx-auto mt-20 max-w-5xl px-6 py-12"><RequestState error={error} retry={retry} label="Đang tải nội dung bài tập..." /></main>;

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
        <MainLayout>
            <main className="mx-auto mt-20 min-h-[75vh] max-w-7xl px-4 py-8 md:px-6">
                <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link to={`/translation/${parentId}`} className="mb-3 inline-flex items-center text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700"><ArrowLeft className="mr-2 h-4 w-4" /> Danh sách bài tập</Link>
                        <div className="flex flex-wrap items-center gap-2 text-sm font-extrabold text-[#5c6650]">
                            <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{exercise.parentTitle}</span><ChevronRight size={15} /><span>{exercise.title}</span><ChevronRight size={15} /><span className="rounded-full bg-[#e9ecdF] px-3 py-1.5">Bài dịch</span>
                        </div>
                    </div>
                </header>

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8eadf] bg-white px-5 py-3 shadow-sm">
                    <span className="font-extrabold text-[#3a4526]">Câu {index + 1}/{content.length}</span>
                    <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-[#eef0e4]"><div className="h-full rounded-full bg-[#c47a35] transition-all" style={{ width: `${((index + 1) / content.length) * 100}%` }} /></div>
                </div>

                {content.length === 0 ? (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><BookOpen /></div>
                        <h2 className="text-xl font-extrabold text-slate-800">Bài tập chưa có câu dịch</h2>
                        <p className="mx-auto mt-2 max-w-md text-slate-500">Bài này chưa có câu hỏi liên kết trong bảng nội dung.</p>
                    </section>
                ) : (
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] md:items-start">
                        <section className="min-w-0 rounded-[22px] bg-white px-5 pb-7 pt-7 shadow-[0_16px_36px_rgba(0,0,0,0.12)] md:px-8">
                            <div className="mb-3.5 flex items-center gap-2.5 text-[11px] font-extrabold tracking-[0.1em] text-[#8a9179]">TIẾNG VIỆT <ArrowRight size={14} /> ENGLISH</div>
                            <p className="mb-7 whitespace-pre-wrap text-2xl font-bold leading-[1.45] text-[#1f2a1c]">{current.vi}</p>

                            <div className="mb-3.5 flex items-center justify-between gap-3">
                                <span className="text-xs font-extrabold tracking-[0.08em] text-[#8a9179]">TỪ GỢI Ý · NHẤN TỪ ĐỂ MỞ</span>
                                <button type="button" onClick={() => setRevealedWords(allRevealed ? new Set() : new Set(answerWords.map((_, wordIndex) => wordIndex)))} className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-[#c47a35]"><Eye size={14} /> {allRevealed ? "Ẩn tất cả" : "Hiện tất cả"}</button>
                            </div>
                            <div className="mb-5 flex flex-wrap gap-2.5">
                                {answerWords.map((word, wordIndex) => {
                                    const isRevealed = revealedWords.has(wordIndex);
                                    return <button key={`${wordIndex}-${word}`} type="button" onClick={() => revealWord(wordIndex)} title={isRevealed ? "Từ đã mở" : "Nhấn để mở từ này"} className={`flex min-h-11 items-center rounded-[20px] border px-4 py-2 text-base font-bold transition ${isRevealed ? "border-[#d9e5cd] bg-[#f4f8ef] text-[#3a4526]" : "border-[#e4e7f2] bg-[#f5f6fa] text-[#8c91a5] hover:border-[#cfd5e3]"}`} style={{ letterSpacing: "0.02em" }}>{isRevealed ? word : maskedWord(word)}</button>;
                                })}
                            </div>
                            <div className="mt-6 mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900"><span className="mr-1 font-extrabold">Lưu ý:</span>Từ gợi ý chỉ mang tính tham khảo. Bạn có thể tự viết bản dịch theo cách mình nghĩ phù hợp.</div>
                            <button type="button" onClick={revealNextWord} disabled={allRevealed} className="mb-7 inline-flex items-center gap-1.5 text-sm font-bold text-[#c47a35] disabled:opacity-50"><Eye size={15} /> Mở từ gợi ý tiếp theo <span className="rounded bg-[#f7f3ec] px-1.5 py-0.5 text-[10px]">Ctrl + Space</span></button>

                            <div className="border-t border-[#eef0e4] pt-5">
                                <div className="mb-3.5 text-[11px] font-extrabold tracking-[0.1em] text-[#8a9179]">CÁC CÂU TRONG BÀI</div>
                                <div className="flex max-h-[360px] flex-col gap-1.5 overflow-y-auto pb-3">
                                    {content.map((item, itemIndex) => {
                                        const isPassed = passedContentIds.has(item.id);
                                        const isCurrent = itemIndex === index;
                                        return <div key={item.id} className={`flex items-center gap-2 rounded-[14px] px-2 py-2 ${isPassed ? "bg-emerald-50" : isCurrent ? "bg-[#f7f8f2] ring-1 ring-[#e6e9db]" : "hover:bg-[#f7f8f2]"}`}>
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

                        <aside className="sticky top-4 flex max-h-[calc(100vh-2rem)] min-w-0 flex-col overflow-y-auto rounded-[22px] bg-white px-5 pb-6 pt-6 shadow-[0_16px_36px_rgba(0,0,0,0.12)] md:px-8">
                            <div className="mb-2.5 flex items-baseline justify-between gap-3"><label htmlFor="translation-answer" className="text-xs font-extrabold tracking-[0.08em] text-[#8a9179]">BÀI DỊCH CỦA EM</label><span className="whitespace-nowrap text-[11px] font-extrabold tabular-nums text-[#8a9179]">{correctCount}/{answerWords.length} từ khớp</span></div>
                            <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#eef0e4]"><div className="h-full rounded-full bg-[#c47a35] transition-all" style={{ width: `${answerWords.length ? (correctCount / answerWords.length) * 100 : 0}%` }} /></div>
                            <textarea id="translation-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmissionResult(null); }} onKeyDown={handleAnswerKeyDown} placeholder="Gõ bản dịch của bạn tại đây..." rows={7} className="min-h-40 w-full resize-y rounded-2xl border-[1.5px] border-[#cfd6bd] bg-[#fbfcf8] px-5 py-4 text-[17px] leading-relaxed text-[#1f2a1c] outline-none transition-colors focus:border-[#a9b18c]" />
                            {submissionResult && <div className={`mt-4 rounded-2xl border p-4 text-sm ${submissionResult.passed ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`} role="status">
                                <p className="font-bold">{submissionResult.message}{Number.isFinite(submissionResult.score) ? ` · ${submissionResult.score}/100` : ""}</p>
                                {submissionResult.feedback && <p className="mt-2 leading-relaxed">{submissionResult.feedback}</p>}
                                {submissionResult.issues?.length > 0 && <ul className="mt-3 space-y-2">{submissionResult.issues.map((issue, issueIndex) => <li key={`${issueIndex}-${issue.originalText}`} className="rounded-xl bg-white/70 p-3"><p><span className="font-bold">Bạn viết:</span> {issue.originalText}</p><p><span className="font-bold">Gợi ý sửa:</span> {issue.correction}</p><p className="mt-1 text-xs leading-relaxed">{issue.explanation}</p></li>)}</ul>}
                                {submissionResult.improvedVersion && <div className="mt-3 rounded-xl bg-white/70 p-3"><p className="font-bold">Bản dịch gợi ý</p><p className="mt-1 whitespace-pre-wrap leading-relaxed">{submissionResult.improvedVersion}</p></div>}
                            </div>}
                            <div className="mt-5 flex gap-3">
                                <button type="button" onClick={() => { setAnswer(""); setSubmissionResult(null); }} className="rounded-[14px] bg-[#eef0e4] px-5 py-4 text-sm font-bold text-[#4a5636] transition-colors hover:bg-[#e4e7d6]">XOÁ HẾT</button>
                                <button type="button" onClick={submitAnswer} disabled={submitting} className="flex-1 rounded-[14px] bg-[#3a4526] px-5 py-4 text-sm font-extrabold tracking-[0.04em] text-white transition-colors hover:bg-[#4b5b30] disabled:cursor-wait disabled:opacity-60">{submitting ? "ĐANG KIỂM TRA..." : "NỘP (ENTER)"}</button>
                            </div>
                            <p className="mt-3 text-[11px] font-medium leading-relaxed text-[#a8ae9c]"><span className="font-extrabold text-[#8a9179]">Enter</span> nộp · <span className="font-extrabold text-[#8a9179]">Shift+Enter</span> xuống dòng · <span className="font-extrabold text-[#8a9179]">Ctrl+Space</span> mở từ tiếp theo</p>
                            <div className="mt-6 flex justify-between gap-3 border-t border-[#eef0e4] pt-5">
                                <button type="button" disabled={index === 0} onClick={() => changeQuestion(index - 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#eef0e4] px-4 py-3 text-sm font-bold text-[#4a5636] disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={16} /> Câu trước</button>
                                {index < content.length - 1 ? <button type="button" onClick={() => changeQuestion(index + 1)} className="inline-flex items-center gap-2 rounded-xl bg-[#3a4526] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#4b5b30]">Câu tiếp <ArrowRight size={16} /></button> : <button type="button" onClick={() => navigate(`/translation/${parentId}`)} className="inline-flex items-center gap-2 rounded-xl bg-[#3a4526] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#4b5b30]">Hoàn thành <Check size={16} /></button>}
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </MainLayout>
    );
}

export default function TranslationExercisePage() {
    const { parentId, exerciseId } = useParams();
    return exerciseId
        ? <TranslationPractice key={exerciseId} parentId={parentId} exerciseId={exerciseId} />
        : <ExerciseList key={parentId} parentId={parentId} />;
}
