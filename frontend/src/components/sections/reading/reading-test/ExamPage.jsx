// ============================================================
// ExamPage.jsx
// ============================================================
import { useState, useEffect, useMemo } from 'react';
import ExamHeader from './ExamHeader';
import ReadingPanel from './ReadingPanel';
import TrueFalseNGQuestions from './TrueFalseNGQuestions';
import FillBlanksNotes from './FillBlankNotes';
import YesNoNGQuestions from './YesNoNGQuestions.jsx';
import MultipleChoiceQuestions from './MultipleChoiceQuestions.jsx';
import EmptyAnswerDialog from './EmptyAnswerDialog.jsx';

// Cấu hình các Part (Cambridge 20 – Test 1 Reading)
const PARTS_CONFIG = [
    { id: 1, questionCount: 13, startQ: 1, title: 'Passage 1' },
    { id: 2, questionCount: 13, startQ: 14, title: 'Passage 2' },
    { id: 3, questionCount: 14, startQ: 27, title: 'Passage 3' },
];

const Divider = () => (
    <div className="hidden md:flex w-[14px] shrink-0 items-center justify-center cursor-col-resize">
        <div className="w-[6px] rounded-[6px] transition-[height,background] duration-150 h-[64px] bg-[#a8c05f]" />
    </div>
);

const ExamPage = () => {
    const [answers, setAnswers] = useState({});
    const [fontSize, setFontSize] = useState(19);
    const [timeSeconds, setTimeSeconds] = useState(0);
    const [currentPart, setCurrentPart] = useState(1);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);

    // Timer
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
            if (Array.isArray(v)) count += v.filter(Boolean).length;
            else if (v != null && String(v).trim() !== '') count += 1;
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
        console.log('Submit answers:', answers);
        setShowSubmitDialog(false);
        // TODO: gọi API nộp bài
    };

    return (
        <>
            <main className="flex-1 font-['Space_Grotesk']">
                <div
                    className="flex flex-col h-screen h-[100dvh] overflow-hidden text-[#1a1a12] leading-[1.5em] select-none p-3 md:p-6 gap-3 md:gap-4 box-border"
                    style={{
                        backgroundColor: 'rgb(111, 149, 82)',
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                >
                    <ExamHeader
                        answers={answers}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        timeSeconds={timeSeconds}
                        currentPart={currentPart}
                        onPartChange={setCurrentPart}
                        parts={PARTS_CONFIG}
                        onSubmit={handleOpenSubmit}
                    />

                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 gap-3 md:gap-0">
                        {/* Passage – truyền part để ReadingPanel đổi nội dung */}
                        <ReadingPanel part={currentPart} />
                        <Divider />

                        {/* Questions Column */}
                        <div className="flex flex-col overflow-hidden min-w-0 relative flex-[50_1_0px]">
                            <div className="flex-1 w-full relative overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[0px_4px_0px_rgba(0,0,0,0.15)]">
                                <div
                                    id="list_question_cam-20-1"
                                    key={currentPart} // reset scroll khi đổi part
                                    className="overflow-y-auto min-h-0 absolute top-0 left-0 w-full h-full px-5 md:px-9 py-7 font-['Source_Serif_4'] [scrollbar-gutter:stable]"
                                >
                                    <div className="relative cursor-note select-text">
                                        <div
                                            className="flex flex-col gap-10 ml-0.5"
                                            style={{ fontSize: `${fontSize}px` }}
                                        >
                                            {currentPart === 1 && (
                                                <>
                                                    <MultipleChoiceQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                    <TrueFalseNGQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                    <FillBlanksNotes
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                </>
                                            )}

                                            {currentPart === 2 && (
                                                <>
                                                    <YesNoNGQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                    <MultipleChoiceQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                </>
                                            )}

                                            {currentPart === 3 && (
                                                <>
                                                    <MultipleChoiceQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                    <TrueFalseNGQuestions
                                                        answers={answers}
                                                        onChange={handleAnswerChange}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <EmptyAnswerDialog
                isOpen={showSubmitDialog}
                answered={answeredCount}
                total={totalQuestions}
                onClose={handleCloseSubmit}
                onSubmit={handleConfirmSubmit}
            />
        </>
    );
};

export default ExamPage;