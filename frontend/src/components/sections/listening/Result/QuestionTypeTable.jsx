import { QUESTION_TYPES } from '../../../../data/ListeningResultData.js';

const QuestionTypeTable = () => {
    return (
        <div className="relative z-10 -mt-2 mb-8" style={{ opacity: 1, transform: 'none' }}>
            <div className="bg-white text-[#1e3006] rounded-2xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden">
                <h2 className="px-5 py-4 text-[17px] font-black border-b-2 border-black">Chi tiết theo dạng câu hỏi</h2>
                <div>
                    <table className="w-full border-collapse text-left">
                        <thead>
                        <tr className="bg-[#f9f5ed] text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
                            <th className="pl-4 pr-2 sm:px-5 py-3 font-black">Dạng câu hỏi</th>
                            <th className="px-1 sm:px-3 py-3 text-center font-black">Số câu</th>
                            <th className="px-1 sm:px-3 py-3 text-center font-black text-emerald-700">Đúng</th>
                            <th className="px-1 sm:px-3 py-3 text-center font-black text-red-600">Sai</th>
                            <th className="pl-1 pr-3 sm:px-3 py-3 text-center font-black text-amber-700">Bỏ qua</th>
                        </tr>
                        </thead>
                        <tbody>
                        {QUESTION_TYPES.map((row, idx) => (
                            <tr key={idx} className="border-t border-black/10">
                                <td className="pl-4 pr-2 sm:px-5 py-3 text-[13px] sm:text-[15px] font-bold leading-snug">{row.type}</td>
                                <td className="px-1 sm:px-3 py-3 text-center text-[14px] sm:text-[15px] font-black tabular-nums">{row.total}</td>
                                <td className="px-1 sm:px-3 py-3 text-center">
                                    <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-1.5 rounded-full text-[13px] font-black tabular-nums bg-emerald-50 text-emerald-700">{row.correct}</span>
                                </td>
                                <td className="px-1 sm:px-3 py-3 text-center">
                                    <span className={`inline-flex items-center justify-center min-w-[28px] h-[28px] px-1.5 rounded-full text-[13px] font-black tabular-nums ${row.wrong > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'}`}>{row.wrong}</span>
                                </td>
                                <td className="pl-1 pr-3 sm:px-3 py-3 text-center">
                                    <span className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-1.5 rounded-full text-[13px] font-black tabular-nums bg-slate-100 text-slate-400">{row.skipped}</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QuestionTypeTable;