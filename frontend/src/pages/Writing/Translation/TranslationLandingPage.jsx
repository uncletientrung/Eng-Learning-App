import {
    ArrowLeft,
    PenLine,
    Sparkles,
    Target,
    Award,
    Layers,
    BookMarked,
    BookOpen,
    ChevronRight,
    ArrowRight,
    Lock
} from "lucide-react";

export default function TranslationLandingPage () {
    // Data for the translation categories/steps
    const translationItems = [
        {
            step: "Bước 1",
            badge: null,
            badgeColor: "",
            title: "Cấu trúc câu cơ bản",
            desc: "Luyện dịch các câu đơn từ Việt sang Anh. Tập trung vào việc sử dụng đúng thì, mạo từ và cấu trúc câu S-V-O cơ bản.",
            count: "8 mục",
            icon: <PenLine size={24} />,
            iconBg: "bg-blue-50 text-blue-500 border-blue-100",
            hoverBorder: "hover:border-blue-300 hover:shadow-blue-100",
            href: "#",
        },
        {
            step: "Bước 2",
            badge: "VOCAB",
            badgeColor: "bg-red-50 text-red-500 border-red-100",
            title: "Collocations & Vocab",
            desc: "Dịch từ Anh sang Việt để nắm vững các cụm từ (collocations) và từ vựng học thuật theo ngữ cảnh thực tế.",
            count: "15 mục",
            icon: <Sparkles size={24} />,
            iconBg: "bg-rose-50 text-rose-500 border-rose-100",
            hoverBorder: "hover:border-rose-300 hover:shadow-rose-100",
            href: "#",
        },
        {
            step: "Bước 3",
            badge: "BAND 6.5",
            badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
            title: "Dịch đoạn văn Band 6.5",
            desc: "Luyện dịch các đoạn văn ngắn từ Việt sang Anh với mục tiêu đạt độ chính xác và mạch lạc ở mức Band 6.5.",
            count: "15 mục",
            icon: <Target size={24} />,
            iconBg: "bg-amber-50 text-amber-500 border-amber-100",
            hoverBorder: "hover:border-amber-300 hover:shadow-amber-100",
            href: "#",
        },
        {
            step: "Bước 4",
            badge: "BAND 8.0",
            badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
            title: "Dịch đoạn văn Band 8.0",
            desc: "Thử thách dịch các đoạn văn phức tạp, yêu cầu sử dụng từ vựng ít phổ biến và cấu trúc câu linh hoạt của Band 8.0.",
            count: "10 mục",
            icon: <Award size={24} />,
            iconBg: "bg-indigo-50 text-indigo-500 border-indigo-100",
            hoverBorder: "hover:border-indigo-300 hover:shadow-indigo-100",
            href: "#",
        },
        {
            step: "Bước 5",
            badge: "PREMIUM",
            badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
            title: "Dịch Essay hoàn chỉnh",
            desc: "Luyện dịch nguyên một bài Essay từ dàn ý tiếng Việt sang bài viết tiếng Anh học thuật hoàn chỉnh.",
            count: "15 mục",
            icon: <Layers size={24} />,
            iconBg: "bg-purple-50 text-purple-500 border-purple-100",
            hoverBorder: "hover:border-purple-300 hover:shadow-purple-100",
            href: "#",
        },
        {
            step: "Band 8",
            badge: "BAND 8",
            badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
            title: "Dịch Essay Band 8 theo chủ đề",
            desc: "150 bài mẫu Band 8 chia theo 15 chủ đề Task 2 — bước đệm trước khi lên Band 9. Dịch từng câu từ Việt sang Anh, xong bài tự chuyển sang bài kế tiếp.",
            count: "Học ngay",
            icon: <BookMarked size={24} />,
            iconBg: "bg-indigo-50 text-indigo-500 border-indigo-100",
            hoverBorder: "hover:border-indigo-300 hover:shadow-indigo-100",
            href: "practice/writing/translation/band8",
            isActionArrow: true,
        },
        {
            step: "Band 9",
            badge: "BAND 9",
            badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
            title: "Dịch Essay Band 9 theo chủ đề",
            desc: "150 bài mẫu Band 9 chia theo 15 chủ đề Task 2. Dịch từng câu từ Việt sang Anh, xong bài tự chuyển sang bài kế tiếp.",
            count: "Học ngay",
            icon: <BookOpen size={24} />,
            iconBg: "bg-emerald-50 text-emerald-500 border-emerald-100",
            hoverBorder: "hover:border-emerald-300 hover:shadow-emerald-100",
            href: "practice/writing/translation/band9",
            isActionArrow: true,
        },
    ];

    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            {/* Top Header Section */}
            <div className="mb-10">
                <a
                    className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
                    href="practice/writing"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Trở về Luyện Writing
                </a>

                <div className="flex items-center gap-2 text-sm font-bold text-pink-500 mb-3">
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

            {/* Translation Module Cards List */}
            <div className="space-y-4">
                {translationItems.map((item, index) => (
                    <a key={index} href={item.href} className="block group">
                        <div className={`bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer ${item.hoverBorder}`}>

                            <div className="flex items-center gap-5">
                                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-transform group-hover:scale-105 duration-200 ${item.iconBg}`}>
                                    {item.icon}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                                            {item.step}
                                        </span>
                                        {item.badge && (
                                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-black tracking-wider border ${item.badgeColor}`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-slate-400 max-w-xl leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors shrink-0">
                                <span>{item.count}</span>
                                {item.isActionArrow ? (
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                ) : (
                                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                )}
                            </div>

                        </div>
                    </a>
                ))}
            </div>
        </main>
    );
}