import {useState, useEffect, useMemo} from "react";
import ListeningHeader from "../../components/sections/listening/ListeningHeader.jsx";
import NoteCompletionTable from "../../components/sections/listening/NoteCompletionTable";
import MultipleChoiceGroup from "../../components/sections/listening/MultipleChoiceGroup";
import NoteCompletionPart4 from "../../components/sections/listening/NoteCompletionPart4.jsx";
import SubmitDialog from "../../components/sections/listening/SubmitDialog.jsx";

const PARTS_CONFIG = [
    { id: 1, questionCount: 10, startQ: 1 },
    { id: 2, questionCount: 10, startQ: 11 },
    { id: 3, questionCount: 6, startQ: 21 },
    { id: 4, questionCount: 10, startQ: 27 },
];

const PART_2_DATA = {
    title: "ADELMAN POTTERY",
    groups: [
        {
            title: "Questions 11 – 16",
            instructions: "Choose the correct letter A, B or C.",
            maxSelect: 1,
            questions: [
                { id: 11, text: "Heather says pottery differs from other art forms because", options: [{ label: "A", text: "It lasts longer in the ground." }, { label: "B", text: "It is practiced by more people." }, { label: "C", text: "It can be repaired more easily." }] },
                { id: 12, text: "Archaeologists sometimes identify the use of ancient pottery from", options: [{ label: "A", text: "The clay it was made with." }, { label: "B", text: "The marks that are on it." }, { label: "C", text: "The basic shape of it." }] },
                { id: 13, text: "Some people join Heather's pottery class because they want to", options: [{ label: "A", text: "Create an item that looks very old." }, { label: "B", text: "Find something that they are good at." }, { label: "C", text: "Make something that will outlive them." }] },
                { id: 14, text: "What does Heather value most about being a potter?", options: [{ label: "A", text: "Its calming effect." }, { label: "B", text: "Its messy nature." }, { label: "C", text: "Its physical benefits." }] },
                { id: 15, text: "Most of the visitors to Adelman Pottery", options: [{ label: "A", text: "Bring friends to join courses." }, { label: "B", text: "Have never made a pot before." }, { label: "C", text: "Try to learn techniques too quickly." }] },
                { id: 16, text: "Heather reminds her visitors that they should", options: [{ label: "A", text: "Put on their aprons." }, { label: "B", text: "Change their clothes." }, { label: "C", text: "Take off their jewellery." }] },
            ],
        },
        {
            title: "Questions 17 – 18",
            instructions: "Choose TWO letters A–E.",
            maxSelect: 2,
            questions: [
                {
                    id: 17,
                    qNumbers: "17–18",
                    text: "Which TWO things does Heather explain about kilns?",
                    options: [
                        { label: "A", text: "What their function is." },
                        { label: "B", text: "When they were invented." },
                        { label: "C", text: "Ways of keeping them safe." },
                        { label: "D", text: "Where to put one in your home." },
                        { label: "E", text: "What some people use instead of one." },
                    ],
                },
            ],
        },
        {
            title: "Questions 19 – 20",
            instructions: "Choose TWO letters A–E.",
            maxSelect: 2,
            questions: [
                {
                    id: 19,
                    qNumbers: "19–20",
                    text: "Which TWO points does Heather make about a potter's tools?",
                    options: [
                        { label: "A", text: "Some are hard to hold." },
                        { label: "B", text: "Some are worth buying." },
                        { label: "C", text: "Some are essential items." },
                        { label: "D", text: "Some have memorable names." },
                        { label: "E", text: "Some are available for use by participants." },
                    ],
                },
            ],
        },
    ],
};

const ListeningExam = () => {
    const [answers, setAnswers] = useState({});
    const [fontSize, setFontSize] = useState(19);
    const [timeSeconds, setTimeSeconds] = useState(19);
    const [currentPart, setCurrentPart] = useState(1);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);

    useEffect(() => {
        const t = setInterval(() => setTimeSeconds((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, []);


    const handleAnswerChange = (qid, value) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };
    const answeredCount = useMemo(() => {
        let count = 0;
        Object.values(answers).forEach((v) => {
            if (Array.isArray(v)) {
                count += v.filter(Boolean).length;
            } else if (v != null && String(v).trim() !== "") {
                count += 1;
            }
        });
        return count;
    }, [answers]);

    const totalQuestions = useMemo(
        () => PARTS_CONFIG.reduce((sum, p) => sum + p.questionCount, 0),
        []
    );

    const handleOpenSubmit = () => setShowSubmitDialog(true);
    const handleCloseSubmit = () => setShowSubmitDialog(false);

    const handleConfirmSubmit = () => {
        // TODO: gọi API nộp bài / chuyển sang trang kết quả
        console.log("Submit answers:", answers);
        setShowSubmitDialog(false);
    };

    return (
        <div
            className="fixed inset-0 flex flex-col overflow-hidden text-[#1a1a12] leading-[1.5em] p-3 md:p-5 gap-3 md:gap-3.5 box-border font-['Space_Grotesk',ui-sans-serif,system-ui,sans-serif]"
            style={{
                backgroundColor: "rgb(111,149,82)",
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }}
        >
            <ListeningHeader
                answers={answers}
                fontSize={fontSize}
                setFontSize={setFontSize}
                timeSeconds={timeSeconds}
                audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                currentPart={currentPart}
                onPartChange={setCurrentPart}
                parts={PARTS_CONFIG}
                onSubmit={handleOpenSubmit}

            />

            <main className="flex-1 flex flex-col overflow-hidden min-h-0 relative bg-[#faf7ee] border-[3px] border-[#1a1a12] rounded-[18px] shadow-[0_4px_0_rgba(0,0,0,0.15)]">
                <div className="shrink-0 flex items-center justify-between gap-3 px-4 md:px-5 py-2.5 border-b-2 border-[rgba(26,26,18,0.12)]">
                    <div className="min-w-0">
                        <div className="font-bold text-[15px]">
                            Part {currentPart}
                        </div>
                        <div className="text-[12px] text-[rgba(26,26,18,0.6)] truncate">
                            {currentPart === 1
                                ? "RESTAURANT RECOMMENDATIONS"
                                : currentPart === 2
                                    ? PART_2_DATA.title
                                    : "Cambridge Test"}
                        </div>
                    </div>
                    <div className="hidden md:block truncate max-w-[16rem] text-[11px] font-semibold uppercase tracking-wide text-[rgba(26,26,18,0.45)]">
                        Cambridge IELTS 20 – Test 1
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 relative w-full h-full px-6 pr-3">
                    <div className="max-w-6xl mx-auto space-y-6 py-8" style={{ zoom: 1.05 }}>

                        {currentPart === 1 && (
                            <>
                                <div>
                                    <h3 className="text-[22px] font-bold leading-tight text-[#1a1a12]">
                                        Questions 1 - 10
                                    </h3>
                                </div>
                                <div className="space-y-12">
                                    <section className="space-y-3">
                                        <div style={{ fontSize: `${fontSize}px` }}>
                                            <p className="text-[rgba(26,26,18,0.7)] mb-4 whitespace-pre-wrap">
                                                Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.
                                            </p>
                                            <NoteCompletionTable answers={answers} onChange={handleAnswerChange} />
                                        </div>
                                    </section>
                                </div>
                            </>
                        )}

                        {currentPart === 2 && (
                            <>
                                <div>
                                    <h3 className="text-[22px] font-bold leading-tight text-[#1a1a12]">
                                        Questions 11 - 20
                                    </h3>
                                </div>
                                <div className="space-y-12">
                                    {PART_2_DATA.groups.map((group, idx) => (
                                        <MultipleChoiceGroup
                                            key={idx}
                                            title={group.title}
                                            instructions={group.instructions}
                                            questions={group.questions}
                                            maxSelect={group.maxSelect}
                                            answers={answers}
                                            onChange={handleAnswerChange}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {(currentPart === 3) && (
                            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
                                <p className="text-xl font-bold">Part {currentPart}</p>
                                <p>(Đang phát triển)</p>
                            </div>
                        )}

                        {/* ================= PART 4 ================= */}
                        {currentPart === 4 && (
                            <>
                                <div>
                                    <h3 className="text-[22px] font-bold leading-tight text-[#1a1a12]">
                                        Questions 31 - 40
                                    </h3>
                                </div>

                                <div className="space-y-12">
                                    {/* Gọi component NoteCompletionPart4 ở đây */}
                                    <NoteCompletionPart4 answers={answers} onChange={handleAnswerChange} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <SubmitDialog
                isOpen={showSubmitDialog}
                answered={answeredCount}
                total={totalQuestions}
                onBack={handleCloseSubmit}
                onSubmit={handleConfirmSubmit}
            />
        </div>
    );
};

export default ListeningExam;