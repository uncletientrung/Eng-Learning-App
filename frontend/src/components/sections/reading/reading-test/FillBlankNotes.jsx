// FillBlankNotes.jsx

const Gap = ({
                 num,
                 questionId,
                 answers = {},
                 onAnswerChange,
                 fontFamily,
                 fontSize
             }) => {
    const value = answers[questionId] ?? "";

    return (
        <span
            className="inline align-middle leading-normal mx-1 max-w-full"
            id={`question-${num}`}
            style={{ scrollMarginTop: 80 }}
        >
            <label className="inline-flex items-center gap-1 max-w-full">
                <span
                    className="border-2 border-[#1a1a12] min-w-[20px] text-[#1a1a12] select-none bg-white rounded-[6px] flex-none flex justify-center items-center px-1 font-['Space_Grotesk'] text-[11px] font-bold leading-[18px] transition-colors"
                    aria-hidden="true"
                >
                    {num}
                </span>

                <span
                    className="inline-flex items-center w-[150px] max-w-full border-b-2 border-[#1a1a12] focus-within:border-b-[#e8b13a]"
                >
                    <input
                        aria-label={`Question ${num}`}
                        data-gap=""
                        data-gap-qid={questionId}
                        type="text"
                        value={value}
                        onChange={(e) =>
                            onAnswerChange(questionId, e.target.value)
                        }
                        className="w-full min-w-0 bg-transparent border-0 outline-none px-1 py-0.5 font-semibold text-[#1a1a12]"
                        style={{
                            fontFamily: `"${fontFamily}", serif`,
                            fontSize: `${fontSize}px`
                        }}
                    />
                </span>
            </label>
        </span>
    );
};

const FillBlanksNotes = ({
                             question,
                             answers = {},
                             onAnswerChange,
                             fontFamily,
                             fontSize
                         }) => {
    if (!question.length) return null;

    const sortedQuestions = [...question].sort(
        (a, b) => a.questionNumber - b.questionNumber
    );

    const start = sortedQuestions[0].questionNumber;
    const end = sortedQuestions[sortedQuestions.length - 1].questionNumber;

    return (
        <div className="anchor-hl-note">
            <div className="border-[2.5px] border-[#1a1a12] bg-white rounded-[14px] px-6 py-[22px] relative">

                {/* Question heading */}
                <div className="mb-2">
                    <div className="text-[#1a1a12] font-['Space_Grotesk'] text-[22px] font-bold leading-tight [&_*]:!my-0">
                        <p>
                            <strong>Questions {start}–{end}</strong>
                        </p>
                    </div>
                </div>

                {/* Instructions */}
                <div
                    className="text-[#1a1a12]/70 leading-[1.55] mb-5 [&_p]:!my-2 [&_strong]:text-[#1a1a12]"
                    style={{
                        fontFamily: `"${fontFamily}", serif`,
                        fontSize: `${fontSize}px`
                    }}
                >
                    <p>Complete the notes below.</p>
                    <p>
                        Choose{" "}
                        <strong className="text-black font-semibold">
                            ONE WORD AND/OR A NUMBER
                        </strong>{" "}
                        from the passage for each answer.
                    </p>
                </div>

                {/* Questions */}
                <div
                    className="leading-8 text-[#1a1a12]"
                    style={{
                        fontFamily: `"${fontFamily}", serif`,
                        fontSize: `${fontSize}px`
                    }}
                >
                    {sortedQuestions.map((q) => {
                        const num = q.questionNumber;
                        const content = q.questionText ?? "";

                        const marker = /(_+|\{\{blank\}\})/i;
                        const parts = content.split(marker);

                        let blankIndex = 0;

                        return (
                            <p key={q.id} className="my-2">
                                – {parts.map((part, index) => {
                                if (/^(_+|\{\{blank\}\})$/i.test(part)) {
                                    blankIndex++;

                                    return (
                                        <Gap
                                            key={index}
                                            num={q.questionNumber + blankIndex - 1}
                                            questionId={q.id}
                                            answers={answers}
                                            onAnswerChange={onAnswerChange}
                                            fontFamily={fontFamily}
                                            fontSize={fontSize}
                                        />
                                    );
                                }

                                return (
                                    <span key={index}>
                                            {part}
                                        </span>
                                );
                            })}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FillBlanksNotes;