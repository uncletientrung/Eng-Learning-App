import QuestionChip from './QuestionChip';

const PartNavigation = ({
                            partNumber = 1,
                            questionCount = 13,
                            answeredCount = 0,
                            isActive = false,
                            onPartClick,
                            onQuestionClick,
                            startNumber = 1 // <-- THÊM DÒNG NÀY
                        }) => {
    const partLabel = `Part ${partNumber}`;

    return (
        <div className="flex items-center gap-1 shrink-0" data-kk-part-active={isActive}>
            <button
                title={isActive ? partLabel : `Mở ${partLabel}`}
                onClick={onPartClick}
                className={`flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wide whitespace-nowrap rounded-[7px] px-2 py-[3px] transition-colors ${
                    isActive ? '' : 'opacity-75 hover:opacity-100'
                }`}
                style={{
                    background: isActive ? 'rgb(26,26,18)' : 'rgba(26,26,18,0.07)',
                    color: isActive ? 'rgb(250,247,238)' : 'rgb(26,26,18)',
                }}
            >
                {partLabel}
                {!isActive && (
                    <span className="tabular-nums font-semibold opacity-75">
                        {answeredCount}/{questionCount}
                    </span>
                )}
            </button>

            {isActive && (
                <div className="kk-chips-in flex items-center gap-[3px]">
                    {/* SỬA DÒNG DƯỚI ĐÂY ĐỂ CỘNG VỚI startNumber */}
                    {Array.from({ length: questionCount }, (_, i) => i + startNumber).map((n) => (
                        <QuestionChip
                            key={n}
                            number={n}
                            onClick={() => onQuestionClick?.(n)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PartNavigation;