import { ArrowLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TranslationRequestState } from "../../components/layout/TranslationPageLayout";
import useTranslationRequest from "../../hooks/useTranslationRequest";
import { getAuthenticatedToken } from "../../services/authApi";
import { getTranslationExercises } from "../../services/translationApi";

function ExerciseList({ parentId }) {
    const loader = useCallback((signal) => getTranslationExercises(parentId, signal), [parentId]);
    const { data, error, retry } = useTranslationRequest(loader);
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

    if (!data) return <TranslationRequestState error={error} retry={retry} label="Đang tải danh sách bài tập..." />;
    const { parent, exercises, progress } = data;

    return (
        <>
                <Link to="/translation" className="inline-flex items-center text-sm font-bold text-[#526b36] hover:underline">
                    <ArrowLeft size={16} aria-hidden="true" /> Tất cả chủ đề
                </Link>
                <div className="mb-8 ">
                    <h1 className="text-3xl font-black leading-tight tracking-tight text-[#1e3006] md:text-5xl" style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}>{parent.title}</h1>
                    <p className="mt-3 max-w-2xl text-lg font-medium leading-relaxed text-slate-500" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>{exercises.length} bài tập trong chủ đề này. Chọn một bài để dịch từng câu và xem bản dịch tham khảo.</p>
                    <div className="mt-4 max-w-sm" aria-label="Tiến độ chủ đề">
                        <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold text-slate-600">
                            <span>Tiến độ chủ đề</span>
                            <span className="tabular-nums">{progress?.completedExercises ?? 0}/{progress?.totalExercises ?? exercises.length} bài · {progress?.percentage ?? 0}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#e7eedf]" role="progressbar" aria-label="Tiến độ chủ đề" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress?.percentage ?? 0}>
                            <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${progress?.percentage ?? 0}%` }} />
                        </div>
                    </div>
                </div>
                {exercises.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center font-semibold text-slate-500">Nhóm này chưa có bài tập.</div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {exercises.map((exercise, index) => (
                            <Link key={exercise.id} to={`/translation/${parentId}/exercises/${exercise.id}`} onClick={(event) => openExercise(event, exercise.id)} className="group flex min-w-0 flex-col border-2 border-[#111] bg-white p-5 text-left shadow-[3px_3px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-1 hover:bg-[#fffdf5] hover:shadow-[6px_6px_0_rgba(0,0,0,0.18)] active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc926] focus-visible:ring-offset-2">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-[#dcebc4] px-3 py-1 text-xs font-bold text-[#3d5622]">Bài {index + 1}</span>
                                        {exercise.completed && <span className="rounded-full bg-[#fce9ae] px-3 py-1 text-xs font-bold text-[#795413]">Hoàn thành</span>}
                                    </div>
                                    <ChevronRight className="h-5 w-5 shrink-0 text-brand-dark transition-transform group-hover:translate-x-1" />
                                </div>
                                <h2 className="mt-4 break-words text-lg font-bold leading-snug text-[#1e3006] group-hover:text-brand-dark">{exercise.title}</h2>
                                <div className="mt-auto pt-5">
                                    <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold tabular-nums text-slate-600">
                                        <span>{exercise.completedContentCount}/{exercise.itemCount} câu</span>
                                        <span className="text-brand-dark">{exercise.completionPercent}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-[#e7eedf]" role="progressbar" aria-label={`Tiến độ ${exercise.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={exercise.completionPercent}>
                                        <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${exercise.completionPercent}%` }} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
        </>
    );
}

export default function TranslationExerciseListPage() {
    const { parentId } = useParams();
    return <ExerciseList key={parentId} parentId={parentId} />;
}
