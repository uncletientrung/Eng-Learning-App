import ExamHeader from './ExamHeader';
import ReadingPanel from './ReadingPanel';
import TrueFalseNGQuestions from './TrueFalseNGQuestions';
import FillBlanksNotes from './FillBlankNotes';
import YesNoNGQuestions from "./YesNoNGQuestions.jsx";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions.jsx";

const Divider = () => (
    <div className="hidden md:flex w-[14px] shrink-0 items-center justify-center cursor-col-resize">
        <div className="w-[6px] rounded-[6px] transition-[height,background] duration-150 h-[64px] bg-[#a8c05f]" />
    </div>
);

const ExamPage = () => {
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
                    <ExamHeader />

                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 gap-3 md:gap-0">
                        <ReadingPanel />
                        <Divider />

                        {/* Questions Column */}
                        <div className="flex flex-col overflow-hidden min-w-0 relative flex-[50_1_0px]">
                            <div className="flex-1 w-full relative overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[0px_4px_0px_rgba(0,0,0,0.15)]">
                                <div
                                    id="list_question_cam-20-1"
                                    className="overflow-y-auto min-h-0 absolute top-0 left-0 w-full h-full px-5 md:px-9 py-7 font-['Source_Serif_4'] [scrollbar-gutter:stable]"
                                >
                                    <div className="relative cursor-note select-text">
                                        <div className="flex flex-col gap-10 ml-0.5">
                                            <MultipleChoiceQuestions/>
                                            <TrueFalseNGQuestions />
                                            <FillBlanksNotes />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ExamPage;