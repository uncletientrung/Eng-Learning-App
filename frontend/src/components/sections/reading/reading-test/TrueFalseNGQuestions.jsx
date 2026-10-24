const QUESTIONS = [
    "There are other parrots that share the kākāpō's inability to fly.",
    'Adult kākāpō produce chicks every year.',
    'Adult male kākāpō bring food back to nesting females.',
    'The Polynesian rat was a greater threat to the kākāpō than Polynesian settlers.',
    'Kākāpō were transferred from Rakiura Island to other locations because they were at risk from feral cats.',
    'One Recovery Plan initiative that helped increase the kākāpō population size was caring for struggling young birds.',
];

const OPTIONS = ['TRUE', 'FALSE', 'NOT GIVEN'];

const TrueFalseNGQuestions = () => {
    return (
        <div className="anchor-hl-note">
            <div className="mb-1.5 text-[#1a1a12] font-['Space_Grotesk'] text-[22px] font-bold leading-tight [&_*]:!my-0">
                <p><strong>Questions 1–6</strong></p>
            </div>

            <div className="mb-5 text-[14px] leading-[1.55] text-[#1a1a12]/70 [&_strong]:text-[#1a1a12]">
                <p className="my-[1.14em]">Do the following statements agree with the information given in the Reading Passage?</p>
                <p className="my-[1.14em]">
                    In boxes 1–6 on your answer sheet, write<br />
                    <strong className="text-black font-semibold">TRUE</strong>&nbsp;&nbsp;if the statement agrees with the information<br />
                    <strong className="text-black font-semibold">FALSE</strong>&nbsp;&nbsp;if the statement contradicts the information<br />
                    <strong className="text-black font-semibold">NOT GIVEN</strong>&nbsp;&nbsp;if there is no information on this
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {QUESTIONS.map((text, idx) => {
                    const num = idx + 1;
                    return (
                        <div key={num} id={`question-${num}`} className="group" style={{ scrollMarginTop: 80 }}>
                            <div className="flex gap-2.5 mb-2.5">
                                {/* Number box */}
                                <div className="shrink-0 flex items-center justify-center min-w-[26px] h-[26px] border-[2.5px] border-[#1a1a12] bg-white rounded-[7px] font-['Space_Grotesk'] text-[13px] font-bold text-[#1a1a12]">
                                    {num}
                                </div>

                                <div className="flex-1 text-[15px] leading-[1.5] text-[#1a1a12] pt-0.5">
                                    {text}
                                </div>

                                <button className="ml-auto h-fit opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                                        <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                                    </svg>
                                </button>
                            </div>

                            <div>
                                <ul className="ml-0 md:ml-9 flex flex-wrap gap-x-4 gap-y-1 list-none">
                                    {OPTIONS.map((opt) => (
                                        <li key={opt}>
                                            <label className="cursor-pointer select-text text-[#1a1a12] rounded-[10px] items-center gap-[9px] px-2.5 py-1.5 transition-colors flex hover:bg-[#1a1a12]/10">
                                                <input
                                                    type="radio"
                                                    name={`q-exam-${num}`}
                                                    value="on"
                                                    className="appearance-none border-[2.5px] border-[#1a1a12] cursor-pointer bg-[#faf7ee] rounded-full flex-none w-[20px] h-[20px] m-0 relative checked:bg-[#1a1a12] checked:after:content-[''] checked:after:absolute checked:after:inset-[4px] checked:after:bg-[#e8b13a] checked:after:rounded-full"
                                                />
                                                <span className="text-[14px] font-semibold leading-[1.5]">{opt}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrueFalseNGQuestions;