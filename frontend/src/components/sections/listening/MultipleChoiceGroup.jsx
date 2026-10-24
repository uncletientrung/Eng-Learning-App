const MultipleChoiceGroup = ({
                                 title,
                                 instructions,
                                 questions = [],
                                 maxSelect = 1,
                                 answers = {},
                                 onChange,
                             }) => {
    const getAnswer = (qid) => answers[qid] || [];

    const handleSelect = (qid, label) => {
        const current = getAnswer(qid);

        if (maxSelect === 1) {
            // Nếu bấm lại đúng đáp án đang chọn -> Bỏ chọn
            if (current[0] === label) {
                onChange(qid, []);
            } else {
                onChange(qid, [label]);
            }
        } else {
            // Chọn nhiều: Toggle
            if (current.includes(label)) {
                onChange(qid, current.filter((a) => a !== label));
            } else if (current.length < maxSelect) {
                onChange(qid, [...current, label]);
            }
        }
    };

    return (
        <section className="space-y-3">
            {title && (
                <h4 className="text-[18px] font-bold text-[#1a1a12] leading-tight">
                    {title}
                </h4>
            )}

            {instructions && (
                <p className="text-[rgba(26,26,18,0.7)] text-[15px] mb-4">
                    {instructions}
                </p>
            )}

            <div className="space-y-6">
                {questions.map((q) => {
                    const current = getAnswer(q.id);

                    return (
                        <div key={q.id} className="space-y-2" id={`question-${q.id}`}>
                            {/* Tiêu đề câu hỏi */}
                            <p className="flex items-start gap-2 font-bold text-base text-[#1a1a12]">
                <span className="inline-flex items-center justify-center border-[2.5px] border-[#1a1a12] min-w-[26px] h-[26px] text-[#1a1a12] whitespace-nowrap select-none bg-white rounded-[7px] shrink-0 px-[5px] font-['Space_Grotesk'] text-[13px] font-bold leading-none">
                  {q.qNumbers || q.id}
                </span>
                                <span>{q.text}</span>
                            </p>

                            {/* Danh sách đáp án */}
                            <div className="ml-6 space-y-0.5">
                                {q.options.map((opt) => {
                                    const selected = current.includes(opt.label);
                                    const isDisabled =
                                        maxSelect > 1 && !selected && current.length >= maxSelect;

                                    return (
                                        <button
                                            key={opt.label}
                                            onClick={() => !isDisabled && handleSelect(q.id, opt.label)}
                                            className={`flex items-center gap-[9px] w-full text-left py-[7px] px-[10px] rounded-[10px] text-[15px] text-[#1a1a12] transition-colors ${
                                                isDisabled
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "cursor-pointer select-text hover:bg-[#1a1a120f]"
                                            } ${selected ? "bg-[#e8b13a33]" : ""}`}
                                        >
                                            {/* Icon luôn là hình tròn (Radio) */}
                                            <span
                                                className={`relative block shrink-0 w-5 h-5 rounded-full border-[2.5px] border-[#1a1a12] pointer-events-none ${
                                                    selected ? "bg-[#1a1a12]" : "bg-[#faf7ee]"
                                                }`}
                                            >
                        {selected && (
                            <span className="absolute inset-[3px] rounded-full bg-[#e8b13a]" />
                        )}
                      </span>

                                            {/* Nhãn chữ cái A, B, C... */}
                                            <span className="w-5 shrink-0 text-[#1a1a12] font-['Space_Grotesk'] font-bold">
                        {opt.label}.
                      </span>

                                            {/* Nội dung đáp án */}
                                            <span>{opt.text}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default MultipleChoiceGroup;