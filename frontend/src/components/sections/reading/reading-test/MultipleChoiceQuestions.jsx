// ============================================================
// MultipleChoiceQuestions.jsx — Questions 23–24 & 25–26
// ============================================================

const MC_GROUPS = [
    {
        id: 'q23-24',
        range: '23–24',
        question: 'Which TWO comparisons between employees who often procrastinate and those who do not are mentioned in the text?',
        options: [
            'A. Their salaries are lower.',
            'B. The quality of their work is inferior.',
            'C. They don’t keep their jobs for as long.',
            'D. They don’t enjoy their working lives as much',
            'E. They have poorer relationships with colleagues.',
        ],
    },
    {
        id: 'q25-26',
        range: '25–26',
        question: 'Which TWO recommendations for getting out of a cycle of procrastination does the writer give?',
        options: [
            'A. not judging ourselves harshly',
            'B. setting ourselves manageable aims',
            'C. rewarding ourselves for tasks achieved',
            'D. prioritising tasks according to their importance',
            'E. avoiding things that stop us concentrating on our tasks',
        ],
    },
];

const MultipleChoiceQuestions = () => {
    return (
        <>
            {MC_GROUPS.map((group) => (
                <div key={group.id} id={`question-set-group-${group.id}`} className="anchor-hl-note">
                    {/* Heading */}
                    <div className="mb-1.5 text-[#1a1a12] font-['Space_Grotesk'] text-[22px] font-bold leading-tight [&_*]:!my-0">
                        <p>
                            <strong>Questions {group.range}</strong>
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="mb-5 text-[14px] leading-[1.55] text-[#1a1a12]/70 [&_strong]:text-[#1a1a12]">
                        <p>
                            Choose <strong className="text-black font-semibold">TWO</strong> correct answers, A–E.
                        </p>
                    </div>

                    {/* Question & Options */}
                    <div id={`question-${group.range.split('–')[0]}`} className="group" style={{ scrollMarginTop: 80 }}>
                        <div className="flex gap-2.5 mb-2.5">
                            {/* Question Number Box */}
                            <div className="shrink-0 flex items-center justify-center min-w-[26px] h-[26px] border-[2.5px] border-[#1a1a12] bg-white rounded-[7px] font-['Space_Grotesk'] text-[13px] font-bold text-[#1a1a12] whitespace-nowrap px-1">
                                {group.range}
                            </div>

                            {/* Question Text */}
                            <div className="flex-1 text-[15px] leading-[1.5] text-[#1a1a12] pt-0.5">
                                {group.question}
                            </div>
                        </div>

                        {/* Options List */}
                        <ul className="ml-0 flex flex-col list-none md:ml-9 gap-1">
                            {group.options.map((opt, index) => (
                                <li key={index}>
                                    <label className="cursor-pointer select-text text-[#1a1a12] rounded-[10px] items-center gap-[9px] px-2.5 py-1.5 transition-colors flex hover:bg-[#1a1a12]/10">
                                        <input
                                            type="checkbox"
                                            value="on"
                                            className="appearance-none border-[2.5px] border-[#1a1a12] cursor-pointer bg-[#faf7ee] rounded-[6px] flex-none w-[20px] h-[20px] m-0 relative checked:bg-[#1a1a12] checked:after:content-[''] checked:after:absolute checked:after:inset-[4px] checked:after:bg-[#e8b13a] checked:after:rounded-[2px]"
                                        />
                                        <span className="text-[15px] leading-[1.5]">{opt}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MultipleChoiceQuestions;