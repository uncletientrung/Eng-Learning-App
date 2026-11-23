const MultipleChoiceQuestions = ({
                                     question = [],
                                     answers = {},
                                     onAnswerChange,
                                     fontFamily,
                                     fontSize
                                 }) => {
    if (!question.length) return null;

    const start = question[0].questionNumber;
    const end = question[question.length - 1].questionNumber;

    const textStyle = {
        fontFamily: `"${fontFamily || "Source Serif 4"}", serif`,
        fontSize: `${fontSize ?? 16}px`
    };

    // Old stored questions sometimes contain the answer choices in questionText.
    // Prefer options returned from the API; extract embedded options only as fallback.
    const getParts = (q) => {
        const text = q.questionText || '';
        const embeddedStart = text.search(/(?:^|\s)A\.\s/);
        const prompt = embeddedStart >= 0
            ? text.slice(0, embeddedStart).trim()
            : text;

        const apiOptions = q.readingQuestionOptions || [];

        if (apiOptions.length) {
            return {
                prompt,
                options: [...apiOptions].sort((a, b) =>
                    String(a.optionKey).localeCompare(String(b.optionKey))
                ),
            };
        }

        if (embeddedStart < 0) return { prompt, options: [] };

        const rest = text
            .slice(embeddedStart)
            .replace(/\s*\(Questions\s+\d+[–-]\d+\)\s*$/i, '');

        const matches = [
            ...rest.matchAll(
                /(?:^|\s)([A-E])\.\s*([\s\S]*?)(?=\s+[A-E]\.\s*|$)/g
            )
        ];

        return {
            prompt,
            options: matches.map((m) => ({
                optionKey: m[1],
                optionText: m[2].trim().replace(/[;.]$/, '')
            })),
        };
    };

    return (
        <div className="anchor-hl-note">

            {/* Question heading */}
            <div className="mb-1.5 text-[#1a1a12] font-['Space_Grotesk'] text-[22px] font-bold leading-tight">
                <p>
                    <strong>
                        Questions {start}{start !== end ? `–${end}` : ''}
                    </strong>
                </p>
            </div>

            {/* Instructions */}
            <div
                className="mb-5 leading-[1.55] text-[#1a1a12]/70"
                style={textStyle}
            >
                Choose the correct answer(s), A–D or A–E as indicated.
            </div>

            <div className="flex flex-col gap-4">
                {question.map((q) => {
                    const { prompt, options } = getParts(q);

                    const multiple = /\b(?:choose|select)\s+two\b/i.test(
                        q.questionText || ''
                    );

                    const selected = answers[q.id];

                    const selectedKeys = Array.isArray(selected)
                        ? selected
                        : selected ? [selected] : [];

                    const selectOption = (key) => {
                        if (!multiple) {
                            onAnswerChange(q.id, key);
                            return;
                        }

                        const next = selectedKeys.includes(key)
                            ? selectedKeys.filter((x) => x !== key)
                            : selectedKeys.length < 2
                                ? [...selectedKeys, key]
                                : selectedKeys;

                        onAnswerChange(q.id, next);
                    };

                    return (
                        <div
                            key={q.id}
                            id={`question-${q.questionNumber}`}
                            className="group"
                            style={{ scrollMarginTop: 80 }}
                        >
                            <div className="flex gap-2.5 mb-2.5">

                                {/* Number box */}
                                <div className="shrink-0 flex items-center justify-center min-w-[26px] h-[26px] border-[2.5px] border-[#1a1a12] bg-white rounded-[7px] font-['Space_Grotesk'] text-[13px] font-bold text-[#1a1a12] px-1">
                                    {q.questionNumber}
                                </div>

                                {/* Question Text */}
                                <div
                                    className="flex-1 leading-[1.5] text-[#1a1a12] pt-0.5"
                                    style={textStyle}
                                >
                                    {prompt}

                                    {multiple && (
                                        <p className="mt-1 text-[13px] font-semibold">
                                            Choose TWO answers (A–E).
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Answer Options */}
                            <ul className="ml-0 md:ml-9 flex flex-col list-none gap-1">
                                {options.map((opt) => {
                                    const key = opt.optionKey;
                                    const checked = selectedKeys.includes(key);

                                    return (
                                        <li key={key}>
                                            <label className="cursor-pointer select-text text-[#1a1a12] rounded-[10px] items-center gap-[9px] px-2.5 py-1.5 transition-colors flex hover:bg-[#1a1a12]/10">

                                                <input
                                                    type={multiple ? 'checkbox' : 'radio'}
                                                    name={`q-exam-${q.id}`}
                                                    value={key}
                                                    checked={checked}
                                                    onChange={() => selectOption(key)}
                                                    className={`appearance-none border-[2.5px] border-[#1a1a12] cursor-pointer bg-[#faf7ee] flex-none w-[20px] h-[20px] m-0 relative checked:bg-[#1a1a12] checked:after:content-[''] checked:after:absolute checked:after:inset-[4px] checked:after:bg-[#e8b13a] ${
                                                        multiple
                                                            ? 'rounded-[6px] checked:after:rounded-[2px]'
                                                            : 'rounded-full checked:after:rounded-full'
                                                    }`}
                                                />

                                                {/* Option Text */}
                                                <span
                                                    className="leading-[1.5]"
                                                    style={textStyle}
                                                >
                                                    <strong>{key}.</strong> {opt.optionText}
                                                </span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>

                            {!options.length && (
                                <p className="ml-9 text-sm text-red-600">
                                    Chưa có lựa chọn cho câu hỏi này.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MultipleChoiceQuestions;