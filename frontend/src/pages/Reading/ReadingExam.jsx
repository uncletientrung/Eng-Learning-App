import  { useState } from 'react';
import PassageViewer from '../../components/sections/reading/reading-test/PassageViewer.jsx';
import QuestionTFNG from '../../components/sections/reading/reading-test/QuestionTFNG.jsx';
import QuestionNotesCompletion from '../../components/sections/reading/reading-test/QuestionNotesCompletion.jsx';

// Sửa lại đường dẫn này cho đúng với file data hiện tại của mày nhé
import ExamData from "../../data/ExamData.js";

const ReadingExam = () => {
    const [answers, setAnswers] = useState({});

    const handleAnswerChange = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

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
                            <a className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                            </a>

                            <div className="order-last w-full lg:order-none lg:w-auto lg:flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto py-[3px]">
                                <div className="flex items-center gap-1 shrink-0">
                                    <button className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] bg-[#1a1a12] text-[#faf7ee]">Part 1</button>
                                    <div className="flex items-center gap-[3px]">
                                        {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(num => (
                                            <button key={num} className="shrink-0 rounded-[7px] flex items-center justify-center font-bold select-none transition-transform hover:-translate-y-[2px] w-[22px] h-[22px] text-[11px] border-2 border-[#1a1a12] bg-white text-[#1a1a12]">{num}</button>
                                        ))}
                                    </div>
                                </div>
                                <span className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full bg-[#1a1a12]/30"></span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] transition-colors opacity-75 hover:opacity-100 bg-[#1a1a12]/[0.07] text-[#1a1a12]">Part 2<span className="tabular-nums font-semibold opacity-75">0/13</span></button>
                                </div>
                                <span className="shrink-0 w-[2px] h-[22px] mx-0.5 rounded-full bg-[#1a1a12]/30"></span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] transition-colors opacity-75 hover:opacity-100 bg-[#1a1a12]/[0.07] text-[#1a1a12]">Part 3<span className="tabular-nums font-semibold opacity-75">0/14</span></button>
                                </div>
                            </div>

                            <div className="flex flex-1 lg:flex-none min-w-0 items-center gap-2 overflow-x-auto">
                                <div className="hidden sm:flex lg:hidden xl:flex gap-1.5 shrink-0">
                                    <button className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-white border-[2.5px] border-[#1a1a12]"></button>
                                    <button className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-[#faf7ee] border-2 border-[#1a1a12]/30"></button>
                                    <button className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-[#f2ead8] border-2 border-[#1a1a12]/30"></button>
                                    <button className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-[#fdf6e3] border-2 border-[#1a1a12]/30"></button>
                                    <button className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-[#eef3e2] border-2 border-[#1a1a12]/30"></button>
                                </div>

                                <select className="shrink-0 max-w-[108px] text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] px-1.5 py-[5px] font-['Space_Grotesk'] text-[11px] font-semibold focus:outline-2 focus:outline-[#e8b13a] focus:outline-offset-1">
                                    <option>Source Serif</option>
                                    <option>Lora</option>
                                </select>
                                <select className="shrink-0 max-w-[64px] text-[#1a1a12] border-2 border-[#1a1a12] cursor-pointer bg-white rounded-[7px] px-1.5 py-[5px] font-['Space_Grotesk'] text-[11px] font-semibold focus:outline-2 focus:outline-[#e8b13a] focus:outline-offset-1">
                                    <option>16px</option>
                                    <option>18px</option>
                                </select>

                                <button className="hidden md:flex w-[32px] h-[32px] shrink-0 items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors border-[2.5px] border-[#1a1a12]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path><path d="M9 21H3v-6"></path></svg>
                                </button>

                                <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-semibold bg-white rounded-[9px] px-2.5 py-[5px] whitespace-nowrap border-[2.5px] border-[#1a1a12]">
                                    <span className="w-[7px] h-[7px] rounded-full bg-[#3f6b2c]"></span>0:25
                                </div>

                                <button className="shrink-0 rounded-[9px] px-4 py-[7px] font-bold text-[13px] whitespace-nowrap transition-transform hover:-translate-y-[1px] bg-[#e8b13a] text-[#1a1a12] border-[2.5px] border-[#1a1a12]">Kiểm Tra</button>
                            </div>
                        </div>
                    </header>

                    {/* BODY */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 gap-3 md:gap-0">
                        <PassageViewer paragraphs={ExamData.passage} />

                        <div className="hidden md:flex w-[14px] shrink-0 items-center justify-center cursor-col-resize">
                            <div className="w-[6px] rounded-[6px] transition-[height,background] duration-150 bg-[#a8c05f]" style={{ height: '64px' }}></div>
                        </div>

                        <div className="flex flex-col overflow-hidden min-w-0 relative flex-[50_1_0px]">
                            <div className="flex-1 w-full relative overflow-hidden bg-white border-[3px] border-[#1a1a12] rounded-[18px] shadow-[rgba(0,0,0,0.15)_0px_4px_0px]">
                                <div className="overflow-y-auto min-h-0 absolute top-0 left-0 w-full h-full px-5 md:px-9 py-7" style={{ scrollbarGutter: 'stable', fontFamily: '"Source Serif 4", serif' }}>
                                    <div className="relative cursor-note select-text">
                                        <div className="flex flex-col gap-10 ml-0.5">
                                            <QuestionTFNG questions={ExamData.tfngQuestions} answers={answers} onChange={handleAnswerChange} />
                                            <QuestionNotesCompletion answers={answers} onChange={handleAnswerChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ReadingExam;