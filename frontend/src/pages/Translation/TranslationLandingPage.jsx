import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import LinkButton from "../../components/ui/LinkButton";
import { getTranslationParents } from "../../services/translationApi";

const cardAccents = [
    "bg-[#dcebc4] text-[#3d5622]",
    "bg-[#fce9ae] text-[#795413]",
    "bg-[#d7e9f4] text-[#285875]",
    "bg-[#f6dcce] text-[#86503b]",
];

export default function TranslationLandingPage() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState("");
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        getTranslationParents(controller.signal)
            .then((data) => {
                if (!controller.signal.aborted) {
                    setItems(data);
                    setError("");
                }
            })
            .catch((requestError) => {
                if (!controller.signal.aborted) setError(requestError.message);
            });
        return () => controller.abort();
    }, [attempt]);

    return (
        <MainLayout>
            <section className="relative flex min-h-[101vh] w-full flex-col overflow-hidden bg-brand">
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
                <main className="relative z-10 mx-auto mt-32 mb-10 w-[calc(100%-2rem)] max-w-[1400px] flex-grow rounded-[24px] border-4 border-[#111] bg-white px-6 pb-20 pt-8 shadow-[0_18px_50px_rgba(31,41,55,0.10)] md:w-[calc(100%-3rem)] md:px-10 lg:px-12">
                    <div className="mb-6">
                        <LinkButton to="/" backgroundColor="bg-white" textColor="text-black" className="px-10 py-2">
                            <ArrowLeft size={16} />
                            Trở về
                        </LinkButton>
                        <div className="mt-5">
                            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-[#1e3006] md:text-5xl" style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}>
                                IELTS <span className="text-brand-dark">Translation Practice</span>
                            </h1>
                            <p className="mt-3 text-lg font-medium text-slate-500" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>
                                Luyện tập dịch từ Việt sang Anh giúp bạn củng cố ngữ pháp, từ vựng và tư duy viết chuẩn học thuật.
                            </p>
                        </div>
                    </div>

                    {error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                            <p>{error}</p>
                            <button className="mt-3 rounded-full border-2 border-[#111] bg-white px-4 py-1.5 text-sm font-bold text-black shadow-[2px_2px_0_#1a1a1a] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc926] focus-visible:ring-offset-2" type="button" onClick={() => { setError(""); setAttempt((value) => value + 1); }}>
                                Thử tải lại
                            </button>
                        </div>
                    ) : items === null ? (
                        <p className="py-6 text-slate-500" role="status">Đang tải chủ đề dịch...</p>
                    ) : items.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                            <p className="font-semibold text-slate-500">Chưa có chủ đề dịch nào.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
                            {items.map((item, index) => (
                                <Link
                                    key={item.id}
                                    to={`/translation/${encodeURIComponent(item.id)}`}
                                    className="group flex min-w-0 overflow-hidden  border-2 border-[#111] bg-white text-left shadow-[3px_3px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-1 hover:bg-[#fffdf5] hover:shadow-[6px_6px_0_rgba(0,0,0,0.18)] active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc926] focus-visible:ring-offset-2"
                                >
                                    <div className={`relative flex w-20 shrink-0 flex-col items-center justify-center overflow-hidden border-r-2 border-[#111] sm:w-28 ${cardAccents[index % cardAccents.length]}`}>
                                        <div aria-hidden="true" className="absolute -left-6 -top-6 h-16 w-16 rounded-full border-2 border-current opacity-10" />
                                        <span className="text-[11px] font-bold uppercase tracking-widest">Bước</span>
                                        <span className="text-4xl font-black leading-none tabular-nums sm:text-5xl">{String(index + 1).padStart(2, "0")}</span>
                                        <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-14 w-14 rounded-full border-2 border-current opacity-10" />
                                    </div>
                                    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="inline-flex rounded-full bg-[#eef4e6] px-2.5 py-1 text-xs font-bold text-brand-dark">{item.exerciseCount} mục</span>
                                                <h2 className="mt-3 break-words text-base font-bold leading-snug text-[#1e3006] transition-colors group-hover:text-brand-dark sm:text-lg">{item.title}</h2>
                                            </div>
                                            <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#111] bg-white text-[#1e3006] transition-all group-hover:translate-x-1 group-hover:bg-[#dcebc4]">
                                                <ChevronRight className="h-5 w-5" />
                                            </span>
                                        </div>
                                        <div className="mt-auto pt-5">
                                            <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold tabular-nums text-slate-600">
                                                <span>Hoàn thành {item.completedExerciseCount ?? 0}/{item.exerciseCount} bài</span>
                                                <span className="text-brand-dark">{item.completionPercent ?? 0}%</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e7eedf]" aria-label={`Tiến độ ${item.title}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.completionPercent ?? 0}>
                                                <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${item.completionPercent ?? 0}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </section>
        </MainLayout>
    );
}
