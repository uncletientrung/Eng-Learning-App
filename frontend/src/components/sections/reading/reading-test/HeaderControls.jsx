// ============================================================
// HeaderControls.jsx
// ============================================================
import { useState } from "react";
import PartNavigation from "./PartNavigation.jsx";
import EmptyAnswerDialog from "./EmptyAnswerDialog.jsx";

const FONT_SIZES = [14, 15, 16, 17, 18, 19, 21, 23];

const partsData = [
    { part: 1, questionCount: 13, answeredCount: 0 },
    { part: 2, questionCount: 13, answeredCount: 0 },
    { part: 3, questionCount: 14, answeredCount: 0 },
];

const HeaderControls = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleCheckAnswers = () => {
        // Logic kiểm tra xem đã làm được câu nào chưa
        const hasAnswered = false; // Giả sử chưa làm câu nào

        if (!hasAnswered) {
            setIsDialogOpen(true); // Bật Dialog lên
            return;
        }
    }
    const [activePart, setActivePart] = useState(1);

    const selectClass = "text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] px-1.5 py-[5px] font-['Space_Grotesk'] text-[11px] font-semibold focus:outline focus:outline-2 focus:outline-[#e8b13a] focus:outline-offset-1";

    return (
        // Thêm justify-between để đẩy 2 khối về 2 bên
        <div className="flex flex-1 w-full min-w-0 items-center justify-between gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] [scrollbar-width:none]">

            {/* ================= KHỐI BÊN TRÁI: PART NAVIGATION ================= */}
            <div className="flex items-center gap-1.5 shrink-0">
                {partsData.map((data, index) => (
                    <div key={data.part} className="flex items-center">
                        <PartNavigation
                            partNumber={data.part}
                            questionCount={data.questionCount}
                            answeredCount={data.answeredCount}
                            isActive={activePart === data.part}
                            onPartClick={() => setActivePart(data.part)}
                            onQuestionClick={(qNum) => {
                                console.log(`Đang ở Part ${data.part}, Câu ${qNum}`);
                            }}
                        />

                        {/* Vạch ngăn cách */}
                        {index < partsData.length - 1 && (
                            <span
                                aria-hidden={true}
                                className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full"
                                style={{ background: 'rgba(26,26,18,0.3)' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* ================= KHỐI BÊN PHẢI: CÁC NÚT ĐIỀU KHIỂN ================= */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Cỡ chữ (Font Size) */}
                <select aria-label="Cỡ chữ" className={`${selectClass} shrink-0 max-w-[64px]`} defaultValue={16}>
                    {FONT_SIZES.map((sz) => (
                        <option key={sz} value={sz}>{sz}px</option>
                    ))}
                </select>

                {/* Toàn màn hình */}
                <button title="Toàn màn hình" className="hidden md:flex w-[32px] h-[32px] shrink-0 items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M15 3h6v6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /><path d="M9 21H3v-6" />
                    </svg>
                </button>

                {/* Đồng hồ đếm ngược */}
                <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold bg-white rounded-[9px] px-2.5 py-[5px] whitespace-nowrap border-[2.5px] border-[#1a1a12]">
                    <span className="w-[7px] h-[7px] rounded-full bg-[#3f6b2c]" />
                    0:25
                </div>

                {/* Nút Kiểm Tra */}
                <button className="shrink-0 rounded-[9px] px-4 py-[7px] font-bold text-[13px] whitespace-nowrap transition-transform hover:-translate-y-[1px] disabled:opacity-50 disabled:hover:translate-y-0 bg-[#e8b13a] text-[#1a1a12] border-[2.5px] border-[#1a1a12]" onClick= {()=>{handleCheckAnswers()}}>
                    Kiểm Tra
                </button>
            </div>
            <EmptyAnswerDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default HeaderControls;