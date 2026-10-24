// ============================================================
// EmptyAnswerDialog.jsx
// ============================================================
const EmptyAnswerDialog = ({ isOpen, onClose }) => {
    // Nếu không mở thì không render gì cả
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Bạn chưa trả lời câu nào"
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
                    <h2 className="text-lg font-bold tracking-tight">Bạn chưa trả lời câu nào</h2>
                </div>

                {/* Body */}
                <div
                    className="px-6 py-5 text-[14px] leading-relaxed space-y-2"
                    style={{ color: 'rgb(38,38,28)' }}
                >
                    <p >Hãy trả lời ít nhất một câu trước khi kiểm tra.</p>
                </div>

                {/* Footer */}
                <div
                    className="px-6 py-4 flex flex-wrap items-center justify-end gap-2"
                    style={{ borderTop: '3px solid rgb(26,26,18)' }}
                >
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-[10px] font-bold text-[13px] transition-transform hover:-translate-y-[1px]"
                        style={{
                            background: 'rgb(250,247,238)',
                            color: 'rgb(26,26,18)',
                            border: '2.5px solid rgb(26,26,18)',
                        }}
                    >
                        Làm tiếp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyAnswerDialog;