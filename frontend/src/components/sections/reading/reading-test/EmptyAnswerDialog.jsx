// EmptyAnswerDialog.jsx — gộp cảnh báo chưa làm câu nào và còn câu bỏ trống.
const EmptyAnswerDialog = ({
                               isOpen = false,
                               questions = [],
                               answers = {},
                               onClose = () => {},
                               onConfirm = () => {},
                               onGoToQuestion = () => {},
                           }) => {
    if (!isOpen) return null;

    const sorted = [...questions].sort((a, b) => a.questionNumber - b.questionNumber);
    const isAnswered = (q) => String(answers[q.id] ?? '').trim().length > 0;
    const unanswered = sorted.filter(q => !isAnswered(q));
    const answeredCount = sorted.length - unanswered.length;
    const hasNoAnswers = answeredCount === 0;
    const missingNumbers = [...new Set(unanswered.map(q => q.questionNumber))].sort((a, b) => a - b);

    const formatRanges = (numbers) => {
        if (!numbers.length) return 'Không có';
        const ranges = [];
        let start = numbers[0];
        let end = numbers[0];
        for (const num of numbers.slice(1)) {
            if (num === end + 1) {
                end = num;
            } else {
                ranges.push(start === end ? `${start}` : `${start}–${end}`);
                start = end = num;
            }
        }
        ranges.push(start === end ? `${start}` : `${start}–${end}`);
        return ranges.join(', ');
    };

    const goTo = (q) => {
        onClose();
        onGoToQuestion(q);
    };

    const heading = hasNoAnswers
        ? 'Bạn chưa trả lời câu nào'
        : unanswered.length > 0
            ? `Còn ${unanswered.length}/${sorted.length} câu chưa trả lời`
            : 'Bạn đã trả lời tất cả câu hỏi';

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={heading}
            style={{ fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif' }}
        >
            <div
                className="w-full max-w-md rounded-[18px] overflow-hidden"
                style={{
                    background: 'rgb(250,247,238)',
                    border: '3px solid rgb(26,26,18)',
                    boxShadow: 'rgba(0,0,0,0.25) 8px 8px 0px',
                }}
            >
                {/* Header */}
                <div
                    className="px-6 py-4"
                    style={{
                        background: 'rgb(232,177,58)',
                        color: 'rgb(26,26,18)',
                        borderBottom: '3px solid rgb(26,26,18)',
                    }}
                >
                    <h2 className="text-lg font-bold tracking-tight">{heading}</h2>
                </div>

                {/* Body */}
                <div
                    className="px-6 py-5 text-[14px] leading-relaxed space-y-2"
                    style={{ color: 'rgb(38,38,28)' }}
                >
                    {hasNoAnswers ? (
                        <p>Hãy trả lời ít nhất một câu trước khi kiểm tra.</p>
                    ) : unanswered.length > 0 ? (
                        <>
                            <p>
                                Câu chưa làm: <span className="font-bold">{formatRanges(missingNumbers)}</span>
                                <span className="opacity-70"> — bấm số để tới thẳng câu đó.</span>
                            </p>
                            <div className="flex flex-wrap gap-1.5 max-h-[30vh] overflow-y-auto pr-1">
                                {unanswered.map(q => (
                                    <button
                                        key={q.id}
                                        type="button"
                                        title={`Tới câu ${q.questionNumber}`}
                                        onClick={() => goTo(q)}
                                        className="min-w-[30px] h-[26px] px-1.5 rounded-[7px] text-[13px] font-bold transition-transform hover:-translate-y-[1px]"
                                        style={{ background: 'rgb(250,247,238)', color: 'rgb(26,26,18)', border: '2px solid rgb(26,26,18)' }}
                                    >
                                        {q.questionNumber}
                                    </button>
                                ))}
                            </div>
                            <p>Câu bỏ trống sẽ tính là sai. Bạn muốn kiểm tra ngay hay quay lại làm tiếp?</p>
                        </>
                    ) : (
                        <p>Bạn có muốn nộp bài để kiểm tra kết quả không?</p>
                    )}
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 flex flex-wrap items-center justify-end gap-2"
                    style={{ borderTop: '3px solid rgb(26,26,18)' }}
                >
                    {!hasNoAnswers && unanswered.length > 0 && (
                        <button
                            type="button"
                            onClick={() => goTo(unanswered[0])}
                            className="mr-auto px-4 py-2 rounded-[10px] font-bold text-[13px] transition-transform hover:-translate-y-[1px]"
                            style={{ background: 'rgb(232,177,58)', color: 'rgb(26,26,18)', border: '2.5px solid rgb(26,26,18)' }}
                        >
                            Tới câu {unanswered[0].questionNumber} →
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-[10px] font-bold text-[13px] transition-transform hover:-translate-y-[1px]"
                        style={{ background: 'rgb(250,247,238)', color: 'rgb(26,26,18)', border: '2.5px solid rgb(26,26,18)' }}
                    >
                        Làm tiếp
                    </button>
                    {!hasNoAnswers && (
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-5 py-2 rounded-[10px] font-bold text-[13px] transition-transform hover:-translate-y-[1px]"
                            style={{ background: 'rgb(90,122,58)', color: 'rgb(250,247,238)', border: '2.5px solid rgb(26,26,18)' }}
                        >
                            Kiểm tra
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmptyAnswerDialog;