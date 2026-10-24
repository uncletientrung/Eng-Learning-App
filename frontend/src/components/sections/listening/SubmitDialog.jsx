import { useEffect } from 'react';

const TargetIcon = ({ className = 'w-8 h-8' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <circle cx={12} cy={12} r={10} />
        <circle cx={12} cy={12} r={6} />
        <circle cx={12} cy={12} r={2} />
    </svg>
);

const SubmitDialog = ({ isOpen, answered, total, onBack, onSubmit }) => {
    const unanswered = total - answered;

    // Đóng bằng ESC
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onBack();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onBack]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-dialog-title"
            onClick={onBack}
        >
            <div
                className="max-w-md w-full p-8 text-center space-y-6"
                style={{
                    background: 'rgb(250,247,238)',
                    border: '3px solid rgb(26,26,18)',
                    borderRadius: '18px',
                    boxShadow: 'rgba(0,0,0,0.15) 0px 4px 0px',
                    fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
                    color: 'rgb(26,26,18)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{
                        background: 'rgb(232,177,58)',
                        border: '2.5px solid rgb(26,26,18)',
                    }}
                >
                    <TargetIcon />
                </div>

                <h2 id="submit-dialog-title" className="text-2xl font-bold">
                    Nộp bài và xem đáp án?
                </h2>

                <p className="text-[rgba(26,26,18,0.7)]">
                    You have answered{' '}
                    <span className="font-bold text-[#1a1a12]">{answered}</span> out of{' '}
                    <span className="font-bold text-[#1a1a12]">{total}</span> questions.
                    {unanswered > 0 && (
                        <span className="block mt-1 font-semibold text-[#8a5a12]">
              ⚠ {unanswered} questions are still unanswered.
            </span>
                    )}
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 px-6 py-3 rounded-[10px] font-bold bg-white transition-transform hover:-translate-y-[1px]"
                        style={{
                            border: '2.5px solid rgb(26,26,18)',
                            color: 'rgb(26,26,18)',
                        }}
                    >
                        Quay lại
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="flex-1 px-6 py-3 rounded-[10px] font-bold transition-transform hover:-translate-y-[1px]"
                        style={{
                            background: 'rgb(90,122,58)',
                            color: 'rgb(250,247,238)',
                            border: '2.5px solid rgb(26,26,18)',
                        }}
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmitDialog;