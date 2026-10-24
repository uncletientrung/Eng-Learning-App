
const QuestionChip = ({ number, isAnswered = false, onClick }) => {
    return (
        <button
            title={`Câu ${number}`}
            onClick={onClick}
            className="shrink-0 rounded-[7px] flex items-center justify-center font-bold select-none transition-transform hover:-translate-y-[2px] w-[22px] h-[22px] text-[11px]"
            style={{
                border: '2px solid rgb(26,26,18)',
                background: isAnswered ? 'rgb(26,26,18)' : 'rgb(255,255,255)',
                color: isAnswered ? 'rgb(250,247,238)' : 'rgb(26,26,18)',
                opacity: 1,
            }}
        >
            {number}
        </button>
    );
};

export default QuestionChip;