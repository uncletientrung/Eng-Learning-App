
const ReadingPanel = ({ exercise, fontFamily, fontSize }) => {
    if (!exercise) {
        return (
            <div className="flex flex-col overflow-hidden min-w-0 flex-[50_1_0px]">
                <div className="flex-1 w-full flex items-center justify-center bg-white border-[3px] border-[#1a1a12] rounded-[18px]">
                    <p className="text-gray-500">
                        Không tìm thấy bài đọc cho Part này
                    </p>
                </div>
            </div>
        );
    }

    // Chỉ ngắt đoạn khi gặp dòng trống
    const paragraphs = Array.isArray(exercise.content)
        ? exercise.content
        : typeof exercise.content === "string"
            ? exercise.content
                .trim()
                .split(/\n\s*\n/)
                .map(p => p.replace(/\s*\n\s*/g, " ").trim())
                .filter(Boolean)
            : [];

    const title = exercise.title ?? `Reading Passage ${exercise.passage}`;

    return (
        <div className="flex flex-col overflow-hidden min-w-0 flex-[50_1_0px]">
            <div
                className="flex-1 w-full relative overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[rgba(0,0,0,0.15)_0px_4px_0px]"
                style={{
                    fontFamily: `"${fontFamily}", serif`,
                    fontSize: `${fontSize}px`
                }}
            >
                {/* SCROLL CONTENT */}
                <div
                    className="absolute inset-0 overflow-y-auto min-h-0 px-5 md:px-10 select-text"
                    style={{ scrollbarGutter: "stable" }}
                >
                    <article className="pt-10 pb-20">

                        {/* TITLE */}
                        <h2
                            className="text-center text-[36px] font-black leading-tight mb-8 text-[#001333]"
                            style={{
                                fontFamily: "var(--reading-font-family)"
                            }}
                        >
                            {title}
                        </h2>

                        {/* PARAGRAPHS */}
                        <div
                            className="text-[#192b50] text-justify"
                            style={{
                                fontFamily: "var(--reading-font-family)",
                                fontSize: "var(--reading-font-size)"
                            }}
                        >
                            {paragraphs.map((p, idx) => (
                                <p
                                    key={idx}
                                    className="leading-[1.7] mb-6 last:mb-0"
                                >
                                    {p}
                                </p>
                            ))}
                        </div>
                    </article>
                </div>

                {/* PASSAGE LABEL */}
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none px-5 md:px-10 pt-3 pb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[rgba(26,26,18,0.45)]"
                    style={{
                        background: "linear-gradient(white 68%, transparent)"
                    }}
                >
                    Reading Passage {exercise.passage}
                    {exercise.questions?.length
                        ? ` · Questions 1–${exercise.questions.length}`
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default ReadingPanel;
