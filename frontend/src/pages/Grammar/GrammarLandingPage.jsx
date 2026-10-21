import React from "react";
import { ArrowRight, Clock, Zap, RotateCcw, Hash, FileText, MapPin } from "lucide-react";

export default function GrammarReferencePage() {
    // 1. Data array for "Toàn tập" (General Grammar Topics 1-25)
    const mainGrammarTopics = [
        { id: 1, title: "Word Forms — Dạng thức từ", href: "index.htmlpractice/grammar/grm-word-forms" },
        { id: 2, title: "Tenses — Các thì", href: "index.htmlpractice/grammar/grm-tenses" },
        { id: 3, title: "Passive Voice — Câu bị động", href: "index.htmlpractice/grammar/grm-passive" },
        { id: 4, title: "Relative Clauses — Mệnh đề quan hệ", href: "index.htmlpractice/grammar/grm-relative-clauses" },
        { id: 5, title: "Comparatives & Superlatives — So sánh", href: "index.htmlpractice/grammar/grm-comparatives" },
        { id: 6, title: "Complex Sentences — Câu phức", href: "index.htmlpractice/grammar/grm-complex-sentences" },
        { id: 7, title: "Nouns — Danh từ", href: "index.htmlpractice/grammar/grm-nouns" },
        { id: 8, title: "Advanced Grammar — Ngữ pháp nâng cao", href: "index.htmlpractice/grammar/grm-advanced" },
        { id: 9, title: "Câu Điều Kiện (Conditionals)", href: "index.htmlpractice/grammar/grm-conditionals" },
        { id: 10, title: "Modal Verbs — Động từ khiếm khuyết", href: "index.htmlpractice/grammar/grm-modals" },
        { id: 11, title: "Reported Speech — Câu tường thuật", href: "index.htmlpractice/grammar/grm-reported-speech" },
        { id: 12, title: "Question Forms — Các dạng câu hỏi", href: "index.htmlpractice/grammar/grm-questions" },
        { id: 13, title: "Participle Clauses — Mệnh đề phân từ", href: "index.htmlpractice/grammar/grm-participle-clauses" },
        { id: 14, title: "Linking Words & Discourse Markers — Từ nối & liên kết", href: "index.htmlpractice/grammar/grm-linking-words" },
        { id: 15, title: "Pronouns — Đại từ", href: "index.htmlpractice/grammar/grm-pronouns" },
        { id: 16, title: "Determiners — Từ hạn định", href: "index.htmlpractice/grammar/grm-determiners" },
        { id: 17, title: "Subject–Verb Agreement — Hoà hợp chủ vị", href: "index.htmlpractice/grammar/grm-sv-agreement" },
        { id: 18, title: "Imperatives — Câu mệnh lệnh", href: "index.htmlpractice/grammar/grm-imperatives" },
        { id: 19, title: "Cleft Sentences & Emphasis — Câu chẻ & nhấn mạnh", href: "index.htmlpractice/grammar/grm-cleft-emphasis" },
        { id: 20, title: "Parallelism & Ellipsis — Song song & tỉnh lược", href: "index.htmlpractice/grammar/grm-parallelism-ellipsis" },
        { id: 21, title: "Punctuation — Dấu câu", href: "index.htmlpractice/grammar/grm-punctuation" },
        { id: 22, title: "Common Grammar Mistakes — Lỗi ngữ pháp thường gặp", href: "index.htmlpractice/grammar/grm-common-mistakes" },
        { id: 23, title: "Sentence Transformation — Biến đổi câu", href: "index.htmlpractice/grammar/grm-sentence-transformation" },
        { id: 24, title: "Common IELTS Grammar Structures — Cấu trúc IELTS thường gặp", href: "index.htmlpractice/grammar/grm-ielts-structures" },
        { id: 25, title: "Collocations & Fixed Expressions — Collocations & cụm cố định", href: "index.htmlpractice/grammar/grm-collocations" },
    ];

    // 2. Data array for "Nâng cao" (Advanced Grammar sections)
    const advancedGrammarTopics = [
        {
            badge: "B2",
            title: "Tenses — Advanced",
            desc: "Luyện tập chuyên sâu 12 thì tiếng Anh qua bài tập đa dạng và tình huống thực tế IELTS.",
            href: "index.htmlpractice/grammar/b2-tenses-v2",
            icon: <Clock size={20} />,
            iconBg: "#efe7ff",
            iconColor: "#6d28d9",
        },
        {
            badge: "B7",
            title: "Gerunds & Infinitives",
            desc: "Phân biệt và sử dụng đúng động danh từ (V-ing) và động từ nguyên mẫu (to + V) trong văn phong học thuật.",
            href: "index.htmlpractice/grammar/b7-gerund-infinitive",
            icon: <Zap size={20} />,
            iconBg: "#dcf5e6",
            iconColor: "#18542a",
        },
        {
            badge: "B8",
            title: "Inversion",
            desc: "Nắm vững cấu trúc đảo ngữ để tạo câu nhấn mạnh, chuyên nghiệp và đặc trưng của IELTS Band 7–8.",
            href: "index.htmlpractice/grammar/b8-inversion",
            icon: <RotateCcw size={20} />,
            iconBg: "#dbeafe",
            iconColor: "#2f5fa8",
        },
        {
            badge: "B9",
            title: "Quantifiers",
            desc: "Sử dụng chính xác các từ chỉ số lượng (some, any, much, many, few, little...) trong ngữ cảnh học thuật.",
            href: "index.htmlpractice/grammar/b9-quantifiers",
            icon: <Hash size={20} />,
            iconBg: "#ffe9d1",
            iconColor: "#c2490d",
        },
        {
            badge: "B10",
            title: "Nominalization",
            desc: "Chuyển động từ và tính từ thành danh từ để viết văn học thuật chặt chẽ, súc tích theo chuẩn IELTS.",
            href: "index.htmlpractice/grammar/b10-nominalization",
            icon: <FileText size={20} />,
            iconBg: "#ffdfe9",
            iconColor: "#a3335a",
        },
        {
            badge: "B11",
            title: "Prepositions",
            desc: "Làm chủ các giới từ thông dụng và cụm giới từ hay gặp trong IELTS Writing & Reading.",
            href: "index.htmlpractice/grammar/b11-prepositions",
            icon: <MapPin size={20} />,
            iconBg: "#fff0c2",
            iconColor: "#8a6100",
        },
    ];

    return (
        <main
            className="min-h-screen bg-[#6f8f4b]"
            style={{
                fontFamily: "var(--font-nunito), sans-serif",
                backgroundImage: "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }}
        >
            <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-28 md:px-6">

                {/* Top Header Card */}
                <div className="mb-6 rounded-[20px] border-4 border-[#111] bg-white px-6 py-6 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:px-8 md:py-7">
                    <p className="font-[family-name:var(--font-quicksand)] text-[13px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                        Ngữ pháp IELTS
                    </p>
                    <h1 className="mt-1 font-[family-name:var(--font-quicksand)] text-[28px] font-extrabold leading-tight text-[#111] md:text-[36px]">
                        GRAMMAR REFERENCE
                    </h1>
                    <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-[#444]">
                        25 chủ đề ngữ pháp cho IELTS, từ dạng thức từ tới các cấu trúc Band 7+. Mỗi mục có lý thuyết chi tiết và bài tập trắc nghiệm giải thích từng câu.
                    </p>
                </div>

                {/* Section 1: Toàn Tập (General Grammar Grid) */}
                <div className="mb-12 rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[8px_8px_0_rgba(0,0,0,0.12)] md:p-7">
                    <p className="font-[family-name:var(--font-quicksand)] text-[12px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                        Toàn tập
                    </p>
                    <h2 className="mt-1 font-[family-name:var(--font-quicksand)] text-[22px] font-extrabold text-[#111]">
                        NGỮ PHÁP TOÀN TẬP
                    </h2>
                    <p className="mb-5 mt-2 max-w-2xl text-[14px] leading-[1.7] text-[#555]">
                        Mỗi chủ đề gồm nhiều mục nhỏ có lý thuyết chi tiết và bài tập riêng — kể cả bài tổng hợp trộn tất cả các mục.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                        {mainGrammarTopics.map((item) => (
                            <a
                                key={item.id}
                                className="group flex items-center gap-3.5 rounded-2xl border-2 border-[#111] bg-[#fffdf5] px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:bg-[#ffd6e0] hover:shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
                                href={item.href}
                            >
                                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border-2 border-[#111] bg-[#e8f0c9] font-[family-name:var(--font-quicksand)] text-[13px] font-extrabold text-[#111]">
                                    {item.id}
                                </span>
                                <span className="min-w-0 flex-1 font-[family-name:var(--font-quicksand)] text-[14px] font-bold text-[#111]">
                                    {item.title}
                                </span>
                                <ArrowRight
                                    size={15}
                                    className="flex-none text-[#5f6a45] transition-transform group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section 2: Nâng Cao (Advanced Grammar Cards) */}
                <div className="rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[8px_8px_0_rgba(0,0,0,0.12)] md:p-7">
                    <p className="font-[family-name:var(--font-quicksand)] text-[12px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                        Nâng cao
                    </p>
                    <h2 className="mb-5 mt-1 font-[family-name:var(--font-quicksand)] text-[22px] font-extrabold text-[#111]">
                        ADVANCED GRAMMAR
                    </h2>

                    <div className="flex flex-col gap-3">
                        {advancedGrammarTopics.map((adv, index) => (
                            <a
                                key={index}
                                className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#111] bg-[#fffdf5] px-4 py-4 transition-all hover:-translate-y-0.5 hover:bg-[#ffd6e0] hover:shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
                                href={adv.href}
                            >
                                <div className="flex min-w-0 items-start gap-4">
                                    <span
                                        className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border-2 border-[#111]"
                                        style={{ background: adv.iconBg, color: adv.iconColor }}
                                    >
                                        {adv.icon}
                                    </span>
                                    <div className="min-w-0">
                                        <span className="inline-block rounded-full border-2 border-[#111] bg-white px-2 py-px text-[10px] font-extrabold tracking-wider text-[#111]">
                                            {adv.badge}
                                        </span>
                                        <h3 className="mt-1 font-[family-name:var(--font-quicksand)] text-[16px] font-extrabold text-[#111]">
                                            {adv.title}
                                        </h3>
                                        <p className="mt-0.5 max-w-xl text-[13px] leading-[1.6] text-[#555]">
                                            {adv.desc}
                                        </p>
                                    </div>
                                </div>
                                <span className="flex flex-none items-center gap-1.5 text-[13px] font-bold text-[#5f6a45]">
                                    Học ngay
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}