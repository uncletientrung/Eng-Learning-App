    import {Fragment, useEffect, useState} from 'react';
    import ReadingPanel from "./ReadingPanel.jsx";
    import TrueFalseNGQuestions from "./TrueFalseNGQuestions.jsx";
    import FillBlankNotes from "./FillBlankNotes.jsx";
    import MultipleChoiceQuestions from "./MultipleChoiceQuestions.jsx";
    import YesNoNGQuestions from "./YesNoNGQuestions.jsx";
    import {Link, useNavigate} from "react-router-dom";
    import EmptyAnswerDialog from "./EmptyAnswerDialog.jsx";
    import { gradeReading } from "../../../../utils/readingGrader.js";
    const ReadingExam = ({ReadingTest,part}) => {
        const [dialogbox, setDialogbox] = useState(false);
        const [dataquestion,SetDataquestion] = useState(null);
        const [answers, setAnswers] = useState({});
        const [timeLeft, setTimeLeft] = useState(60 * 60);
        const [activePart, setActivePart] = useState(part ?? 1);
        const [submitting, setSubmitting] = useState(false);
        const [fontFamily, setFontFamily] = useState("Source Serif 4");
        const [fontSize, setFontSize] = useState(16);

        const handleFullscreen = async () => {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        };

        const activeExercise = ReadingTest?.readingExercises?.find(
            (e) => String(e.passage) === String(activePart)
        );
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        const currentquestion = (dataquestion ?? []).filter(
            q=> q.exerciseId === activeExercise?.id
        )
        const navigate = useNavigate();

        const handleAnswerChange = (questionId, value) => {
            setAnswers(prev => ({
                ...prev,
                [questionId]: value
            }));
        };
        const openSubmit = () =>{
           setDialogbox(true)
        }
        const HandleSubmit = async () => {
            if (!dataquestion) return;

            const questionsToGrade =
                part == null
                    ? dataquestion
                    : dataquestion.filter(
                        q => q.exerciseId === activeExercise?.id
                    );

            const result = gradeReading(questionsToGrade, answers);
            const readingAnswers = result.details.map(detail => ({
                questionId: detail.questionId,
                userAnswer: Array.isArray(detail.userAnswer)
                    ? JSON.stringify(detail.userAnswer)
                    : String(detail.userAnswer ?? ""),
                isCorrect: detail.isCorrect
            }));
            const completedAt = new Date();
            const durationSeconds = 3600 - timeLeft;

            const startedAt = new Date(
                completedAt.getTime() - durationSeconds * 1000
            );

            const payload = {
                testId: ReadingTest.id,
                score: result.correctCount,
                totalQuestions: result.totalQuestions,
                correctAnswersNum: result.correctCount,
                startedAt: startedAt.toISOString(),
                completedAt: completedAt.toISOString(),
                userid:1,
                userReadingAnswers: readingAnswers
            };

            try {
                const response = await fetch(
                    "http://localhost:5167/api/users/1/reading-attempts",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    }
                );

                if (!response.ok) {
                    throw new Error("Không thể lưu kết quả Reading");
                }

                const savedResult = await response.json();

                console.log("Đã lưu kết quả:", savedResult);
                navigate(`/reading/result/${savedResult.id}`)
                setDialogbox(false);

            } catch (error) {
                console.error("Lỗi submit Reading:", error);
                console.log(JSON.stringify(payload))
            }
        };
        useEffect(() => {
            if (!activeExercise?.id) return;

            const fetchdata = async () => {
                try {
                    if (part == null) {
                        // Full Test
                        const results = await Promise.all(
                            ReadingTest.readingExercises.map(async (exercise) => {
                                const response = await fetch(
                                    `http://localhost:5167/api/reading-exercises/${exercise.id}/reading-questions`
                                );

                                if (!response.ok) {
                                    throw new Error("Không lấy được câu hỏi");
                                }

                                return response.json();
                            })
                        );

                        SetDataquestion(results.flat());
                    } else {
                        // Practice
                        const response = await fetch(
                            `http://localhost:5167/api/reading-exercises/${activeExercise.id}/reading-questions`
                        );

                        if (!response.ok) {
                            throw new Error("Không lấy được câu hỏi");
                        }

                        SetDataquestion(await response.json());
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchdata();
        }, [part == null ? ReadingTest?.id : activeExercise?.id, part]);
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }, []);
        const groupedQuestions = currentquestion.reduce((acc, question) => {
            const type = question.questionType;

            if (!acc[type]) {
                acc[type] = [];
            }

            acc[type].push(question);

            return acc;
        }, {});

        const renderQuestionGroup = (type, questions) => {
            switch (type) {
                case "True-False":
                    return (
                        <TrueFalseNGQuestions
                            question={questions}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />
                    );

                case "Fill-in-Blank":
                    return (
                        <FillBlankNotes
                            question={questions}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />
                    );

                case "Yes-No":
                    return (
                        <YesNoNGQuestions
                            question={questions}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />
                    );
                case "Multiple-Choice":
                    return(
                        <MultipleChoiceQuestions
                            question={questions}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />

                    )
                default:
                    return null;
            }
        };

        if (!ReadingTest?.readingExercises) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-lg font-semibold">Đang tải đề...</div>
                </div>
            );
        }
        return (
            <div className="min-h-screen flex flex-col font-sans">
                <main className="flex-1">
                    <div
                        className="flex flex-col h-screen overflow-hidden text-[#1a1a12] leading-[1.5em] select-none p-3 md:p-6 gap-3 md:gap-4 box-border font-['Space_Grotesk']"
                        style={{ backgroundColor: 'rgb(111,149,82)', backgroundImage: 'linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)', backgroundSize: '20px 20px' }}
                    >

                        {/* HEADER */}
                        <header className="flex flex-col shrink-0 z-30 overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[rgba(0,0,0,0.15)_0px_4px_0px]">
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 px-3 md:px-4 py-2">
                                <Link to={`/reading/exam/${ReadingTest.id}`}className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                                </Link>


                                <div className="order-last w-full lg:order-none lg:w-auto lg:flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto py-[3px]">
                                    <div className="flex items-center gap-1 shrink-0">
                                        <div className="flex items-center gap-[3px]">
                                            {
                                                part ==null?
                                                ReadingTest.readingExercises.map(e =>{
                                                return (
                                                    <Fragment key={e.id}>
                                                        <span className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full bg-[#1a1a12]/30"></span>
                                                        <div className="flex items-center gap-1 shrink-0">
                                                            <button className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] transition-colors opacity-75 hover:opacity-100 bg-[#1a1a12]/[0.07] text-[#1a1a12]"  onClick={() => {
                                                                console.log("Clicked Part:", e.passage);
                                                                setActivePart(e.passage);
                                                            }}>
                                                                Part {e.passage}
                                                            </button>
                                                        </div>

                                            {String(activePart) === String(e.passage) && (
                                                <div className="flex items-center gap-[3px]">
                                            {(currentquestion).map(q => (
                                                <button key={q.id} className={`shrink-0 rounded-[7px] flex items-center justify-center
        font-bold select-none transition-transform hover:-translate-y-[2px]
        w-[22px] h-[22px] text-[11px] border-2 border-[#1a1a12]
        ${
                                                    answers[q.id] !== undefined &&
                                                    answers[q.id] !== null &&
                                                    answers[q.id] !== ""
                                                        ? "bg-[#e8b13a] text-[#1a1a12]"
                                                        : "bg-white text-[#1a1a12]"
                                                }
    `} onClick={() => {
                                                    const element = document.getElementById(`question-${q.questionNumber}`);
                                                    if (element) {
                                                        element.scrollIntoView({
                                                            behavior: "smooth",
                                                            block: "center"
                                                        });
                                                        element.classList.add("bg-[#f8e5bd]", "transition-colors", "duration-500");
                                                        setTimeout(() => {
                                                            element.classList.remove("bg-[#f8e5bd]");
                                                        }, 1500);
                                                    }
                                                }}>
                                                    {q.questionNumber}
                                                </button>
                                            ))}
                                                </div> )}
                                                    </Fragment>)}

                                        ):
                                            <Fragment >
                                                <span className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full bg-[#1a1a12]/30"></span>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <button className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] transition-colors opacity-75 hover:opacity-100 bg-[#1a1a12]/[0.07] text-[#1a1a12]"  onClick={() => {
                                                        console.log("Clicked Part:", part)
                                                        setActivePart(part);
                                                    }}>
                                                        Part {part}
                                                    </button>
                                                </div>
                                                {String(activePart) === String(part) && (
                                                    <div className="flex items-center gap-[3px]">
                                                        {(dataquestion ?? []).map(q => (
                                                            <button key={q.id} className={`shrink-0 rounded-[7px] flex items-center justify-center
        font-bold select-none transition-transform hover:-translate-y-[2px]
        w-[22px] h-[22px] text-[11px] border-2 border-[#1a1a12]
        ${
                                                                answers[q.id] != null &&
                                                                String(answers[q.id]).trim() !== ""
                                                                    ? "bg-[#e8b13a] text-[#1a1a12]"
                                                                    : "bg-white text-[#1a1a12]"
                                                            }
    `} onClick={() => {
                                                                const element = document.getElementById(`question-${q.questionNumber}`);
                                                                if (element) {
                                                                    element.scrollIntoView({
                                                                        behavior: "smooth",
                                                                        block: "center"
                                                                    });
                                                                    element.classList.add("bg-[#f8e5bd]", "transition-colors", "duration-500");
                                                                    setTimeout(() => {
                                                                        element.classList.remove("bg-[#f8e5bd]");
                                                                    }, 1500);
                                                                }
                                                            }}>
                                                                {q.questionNumber}
                                                            </button>
                                                        ))}
                                                    </div> )}
                                            </Fragment>
                                }

                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 lg:flex-none min-w-0 items-center gap-2 overflow-x-auto">
                                    <select
                                        value={fontFamily}
                                        onChange={(e) => setFontFamily(e.target.value)}
                                        className="shrink-0 max-w-[108px] text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] px-1.5 py-[5px] font-['Space_Grotesk'] text-[11px] font-semibold focus:outline-2 focus:outline-[#e8b13a] focus:outline-offset-1"
                                    >
                                        <option value="Source Serif 4">Source Serif</option>
                                        <option value="Lora">Lora</option>
                                    </select>
                                    <select
                                        value={fontSize}
                                        onChange={(e) => setFontSize(Number(e.target.value))}
                                        className="shrink-0 max-w-[64px] text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] px-1.5 py-[5px] font-['Space_Grotesk'] text-[11px] font-semibold focus:outline-2 focus:outline-[#e8b13a] focus:outline-offset-1"
                                    >
                                        <option value={16}>16px</option>
                                        <option value={18}>18px</option>
                                    </select>

                                    <button
                                        onClick={handleFullscreen}
                                        className="hidden md:flex w-[32px] h-[32px] shrink-0 items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path><path d="M9 21H3v-6"></path></svg>
                                    </button>

                                    <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold bg-white rounded-[9px] px-2.5 py-[5px] whitespace-nowrap border-[2.5px] border-[#1a1a12]">
                                        <span className="w-[7px] h-[7px] rounded-full bg-[#3f6b2c]"></span>{formattedTime}
                                    </div>

                                    <button className="shrink-0 rounded-[9px] px-4 py-[7px] font-bold text-[13px] whitespace-nowrap transition-transform hover:-translate-y-[1px] bg-[#e8b13a] text-[#1a1a12] border-[2.5px] border-[#1a1a12]" onClick={() =>{openSubmit()}} >Kiểm Tra</button>
                                </div>
                            </div>
                        </header>

                        {/* BODY */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 gap-3 md:gap-0">

                            <ReadingPanel exercise={activeExercise}    fontFamily={fontFamily} fontSize={fontSize} />

                            <div className="hidden md:flex w-[14px] shrink-0 items-center justify-center cursor-col-resize">
                                <div className="w-[6px] rounded-[6px] transition-[height,background] duration-150 bg-[#a8c05f]" style={{ height: '64px' }}>
                                </div>
                            </div>

                            <div className="flex flex-col overflow-hidden min-w-0 relative flex-[50_1_0px]">
                                <div className="flex-1 w-full relative overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[rgba(0,0,0,0.15)_0px_4px_0px]">
                                    <div className="overflow-y-auto min-h-0 absolute top-0 left-0 w-full h-full px-5 md:px-9 py-7" style={{ scrollbarGutter: 'stable', fontFamily: `"${fontFamily}", serif`,
                                        fontSize: `${fontSize}px`}}>
                                        <div className="relative cursor-note select-text">
                                            <div className="flex flex-col gap-10 ml-0.5">
                                                {Object.entries(groupedQuestions).map(([type, questions]) => (
                                                    <div key={type}>
                                                        {renderQuestionGroup(type, questions)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
                {dialogbox && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <EmptyAnswerDialog
                            isOpen={dialogbox}
                            questions={dataquestion ?? []}
                            answers={answers}
                            onClose={() => setDialogbox(false)}
                            onConfirm={HandleSubmit}
                            onGoToQuestion={(q) => {
                                document.getElementById(
                                    `question-${q.questionNumber}`
                                )?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center"
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    export default ReadingExam;