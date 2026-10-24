const TypePill = ({ variant, value }) => {
    const variants = {
        ok: "bg-slate-100 text-slate-400",
        correct: "bg-emerald-50 text-emerald-700",
        wrong: "bg-red-50 text-red-600",
        skipped: "bg-amber-50 text-amber-700",
    };
    return (
        <span
            className={`inline-flex items-center justify-center min-w-[28px] h-[28px] sm:min-w-[34px] sm:h-[34px] px-1.5 sm:px-2 rounded-full text-[13px] sm:text-[14px] font-black tabular-nums ${variants[variant] || variants.ok}`}
        >
      {value}
    </span>
    );
};

const QuestionTypeTable = ({ rows }) => (
    <div className="relative z-10">
        <div
            className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden"
            style={{ color: "#1e3006" }}
        >
            <h2 className="px-5 py-4 text-[17px] font-black border-b-2 border-black">
                Chi tiết theo dạng câu hỏi
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                    <tr className="bg-[#f9f5ed] text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest text-slate-500">
                        <th className="pl-4 pr-2 sm:px-5 py-3 font-black">Dạng câu hỏi</th>
                        <th className="px-1 sm:px-3 py-3 text-center font-black">Số câu</th>
                        <th className="px-1 sm:px-3 py-3 text-center font-black text-emerald-700">Đúng</th>
                        <th className="px-1 sm:px-3 py-3 text-center font-black text-red-600">Sai</th>
                        <th className="pl-1 pr-3 sm:px-3 py-3 text-center font-black text-amber-700">Bỏ qua</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-t border-black/10">
                            <td className="pl-4 pr-2 sm:px-5 py-3 text-[13px] sm:text-[15px] font-bold leading-snug">
                                {r.type}
                            </td>
                            <td className="px-1 sm:px-3 py-3 text-center text-[14px] sm:text-[15px] font-black tabular-nums">
                                {r.total}
                            </td>
                            <td className="px-1 sm:px-3 py-3 text-center">
                                <TypePill variant={r.correct ? "correct" : "ok"} value={r.correct} />
                            </td>
                            <td className="px-1 sm:px-3 py-3 text-center">
                                <TypePill variant={r.wrong ? "wrong" : "ok"} value={r.wrong} />
                            </td>
                            <td className="pl-1 pr-3 sm:px-3 py-3 text-center">
                                <TypePill variant={r.skipped ? "skipped" : "ok"} value={r.skipped} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default QuestionTypeTable;