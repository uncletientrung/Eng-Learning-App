import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Award,
    ChevronRight,
    Layers,
    PenLine,
    Sparkles,
    Target,
} from "lucide-react";
import MainLayout from "../../components/layout/MainLayout";
import { getTranslationParents } from "../../services/translationApi";

const cardStyles = [
    { icon: PenLine, iconBg: "bg-blue-50 text-blue-500 border-blue-100", hoverBorder: "hover:border-blue-300 hover:shadow-blue-100" },
    { icon: Sparkles, iconBg: "bg-rose-50 text-rose-500 border-rose-100", hoverBorder: "hover:border-rose-300 hover:shadow-rose-100" },
    { icon: Target, iconBg: "bg-amber-50 text-amber-500 border-amber-100", hoverBorder: "hover:border-amber-300 hover:shadow-amber-100" },
    { icon: Award, iconBg: "bg-indigo-50 text-indigo-500 border-indigo-100", hoverBorder: "hover:border-indigo-300 hover:shadow-indigo-100" },
    { icon: Layers, iconBg: "bg-purple-50 text-purple-500 border-purple-100", hoverBorder: "hover:border-purple-300 hover:shadow-purple-100" },
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
            <main className="mx-auto mt-20 max-w-5xl px-6 py-12">
                <div className="mb-10">
                    <a className="mb-6 inline-flex items-center text-slate-500 transition-colors hover:text-indigo-600 font-medium" href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Trở về trang chủ
                    </a>
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold text-pink-500">
                        <PenLine size={16} />
                        <span className="uppercase tracking-widest">Translation Hub</span>
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
                        Tập dịch <span className="text-pink-500">IELTS</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-500">
                        Luyện tập dịch từ Việt sang Anh giúp bạn củng cố ngữ pháp, từ vựng và tư duy viết chuẩn học thuật.
                    </p>
                </div>

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700" role="alert">
                        <p>{error}</p>
                        <button className="mt-3 font-bold underline" type="button" onClick={() => { setError(""); setAttempt((value) => value + 1); }}>
                            Thử tải lại
                        </button>
                    </div>
                ) : items === null ? (
                    <p className="py-8 text-center font-semibold text-slate-500" role="status">Đang tải chủ đề dịch...</p>
                ) : items.length === 0 ? (
                    <p className="py-8 text-center font-semibold text-slate-500">Chưa có chủ đề dịch nào.</p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item, index) => {
                            const style = cardStyles[index % cardStyles.length];
                            const Icon = style.icon;
                            return (
                                <a key={item.id} href={`/translation/${encodeURIComponent(item.id)}`} className="group block">
                                    <div className={`flex cursor-pointer flex-col gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-6 shadow-sm transition-all duration-200 hover:bg-violet-50 hover:shadow-md ${style.hoverBorder}`}>
                                        <div className="flex w-full items-center justify-between gap-4">
                                            <div className="flex min-w-0 w-full items-center gap-5">
                                                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-200 group-hover:scale-105 ${style.iconBg}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <div className="min-w-0 flex flex-col w-1/2">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Bước {index + 1}</span>
                                                    </div>
                                                    <h2 className="text-lg font-bold tracking-tight text-slate-800 transition-colors group-hover:text-slate-900">{item.title}</h2>
                                                    <div className="flex w-full items-center justify-between text-[11px] font-bold tabular-nums text-violet-700 mt-1 mb-1">
                                                        <span>Hoàn thành {item.completedExerciseCount ?? 0}/{item.exerciseCount} bài</span>
                                                        <span>{item.completionPercent ?? 0}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-violet-100" aria-label={`Tiến độ ${item.title}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.completionPercent ?? 0}>
                                                        <div className="h-full rounded-full bg-violet-500 transition-all duration-500" style={{ width: `${item.completionPercent ?? 0}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors group-hover:text-slate-600">
                                                <span>{item.exerciseCount} mục</span>
                                                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </main>
        </MainLayout>
    );
}
