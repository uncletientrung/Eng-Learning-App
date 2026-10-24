import { IconArrowLeft, IconMaximize } from "./icons";
import AudioPlayer from "./AudioPlayer";
import PartNavigation from "../../sections/reading/reading-test/PartNavigation.jsx";

const ListeningHeader = ({
                    answers,
                    fontSize,
                    setFontSize,
                    timeSeconds,
                    audioSrc,
                    currentPart,
                    onPartChange, onSubmit,
                    parts = [] // Mảng cấu hình các part
                }) => {
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <header className="flex flex-col shrink-0 z-30 overflow-hidden bg-[#faf7ee] border-[3px] border-[#1a1a12] rounded-[18px] shadow-[0_4px_0_rgba(0,0,0,0.15)]">
            {/* Top Row */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 px-3 md:px-4 py-2">
                <a
                    href="#"
                    className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]"
                    title="Quay lại danh sách"
                >
                    <IconArrowLeft />
                </a>

                {/* SỬ DỤNG PARTNAVIGATION Ở ĐÂY */}
                <div className="order-last w-full lg:order-none lg:w-auto lg:flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto py-[3px]">
                    {parts.map((part, index) => {
                        // Tính xem part này đã làm được bao nhiêu câu
                        let answeredCount = 0;
                        for (let i = 0; i < part.questionCount; i++) {
                            const qId = part.startQ + i;
                            const ans = answers[qId];
                            // Hỗ trợ cả String (Part 1) và Array (Part 2 Multiple Choice)
                            if (Array.isArray(ans) ? ans.length > 0 : (ans && String(ans).trim())) {
                                answeredCount++;
                            }
                        }

                        return (
                            <div key={part.id} className="flex items-center gap-1 shrink-0">
                                {/* Vạch ngăn cách giữa các part */}
                                {index > 0 && (
                                    <span className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full bg-[rgba(26,26,18,0.3)]"></span>
                                )}

                                <PartNavigation
                                    partNumber={part.id}
                                    questionCount={part.questionCount}
                                    startNumber={part.startQ} // Truyền số bắt đầu (VD: Part 2 là 11)
                                    answeredCount={answeredCount}
                                    isActive={currentPart === part.id}
                                    onPartClick={() => onPartChange(part.id)}
                                    onQuestionClick={(n) => {
                                        // Cuộn xuống đúng câu hỏi khi bấm vào số
                                        const el = document.getElementById(`question-${n}`);
                                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Tools (Cỡ chữ, đồng hồ, kiểm tra) */}
                <div className="flex flex-1 lg:flex-none min-w-0 items-center gap-2 overflow-x-auto ml-auto">
                    <select
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="shrink-0 max-w-[64px] text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] p-1 text-[11px] font-semibold outline-none"
                    >
                        {[14, 15, 16, 17, 18, 19, 21, 23].map((s) => (
                            <option key={s} value={s}>{s}px</option>
                        ))}
                    </select>

                    <button className="hidden md:flex w-[32px] h-[32px] shrink-0 items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]">
                        <IconMaximize />
                    </button>

                    <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold bg-white rounded-[9px] px-2.5 py-[5px] whitespace-nowrap border-[2.5px] border-[#1a1a12]">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#3f6b2c]"></span>
                        {formatTime(timeSeconds)}
                    </div>

                    <button className="shrink-0 rounded-[9px] px-4 py-[7px] font-bold text-[13px] whitespace-nowrap bg-[#e8b13a] text-[#1a1a12] border-[2.5px] border-[#1a1a12]" onClick={onSubmit}>
                        Kiểm Tra
                    </button>
                </div>
            </div>

            <AudioPlayer src={audioSrc} />
        </header>
    );
};

export default ListeningHeader;