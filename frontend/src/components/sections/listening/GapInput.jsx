const GapInput = ({ qid, answers, onChange }) => {
    const val = answers[qid] || "";

    return (
        <span className="inline-flex items-center gap-1 mx-1 max-w-full align-middle">
      <span className="flex items-center justify-center min-w-[20px] h-[18px] px-1 text-[11px] font-bold border-2 border-[#1a1a12] bg-white rounded-[6px] select-none">
        {qid}
      </span>
      <span
          className="relative inline-grid border-b-2 border-[#1a1a12] transition-colors focus-within:border-[#e8b13a] min-w-[80px]"
          data-value={val}
      >
        <input
            type="text"
            value={val}
            onChange={(e) => onChange(qid, e.target.value)}
            className="w-full min-w-0 bg-transparent px-1 py-0.5 text-[15px] font-semibold outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label={`Question ${qid}`}
        />
      </span>
    </span>
    );
};

export default GapInput;