import CircularProgress from "./CircularProgress";
import { IconChevronRight, IconRotateCCW } from "./icons";

const BreakdownRow = ({ color, label, count }) => (
    <li className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
    <span className="flex items-center gap-2">
      <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[13px] font-semibold text-slate-500 sm:w-14 whitespace-nowrap">
        {label}
      </span>
    </span>
        <span className="text-[18px] font-black tabular-nums whitespace-nowrap">
      {count} câu
    </span>
    </li>
);

const ActionButtons = ({ onViewExplanation, onRetry }) => (
    <div className="mt-7 flex flex-col sm:flex-row gap-3 max-w-[560px] mx-auto">
        <button
            type="button"
            onClick={onViewExplanation}
            className="group flex-1 flex items-center justify-center gap-2 rounded-full text-white font-black text-[15px] py-3.5 px-6 border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            style={{ backgroundColor: "#ED7A13" }}
        >
            Xem giải thích chi tiết
            <IconChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
            type="button"
            onClick={onRetry}
            className="group flex-1 flex items-center justify-center gap-2 rounded-full bg-white font-black text-[15px] py-3.5 px-6 border-2 border-black hover:bg-[#f9f5ed] transition-colors"
            style={{ color: "#1e3006" }}
        >
            <IconRotateCCW className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
            Làm lại bài
        </button>
    </div>
);

const ScoreCard = ({ correct, wrong, skipped, total, band, onViewExplanation, onRetry }) => (
    <div className="relative z-10">
        <div
            className="bg-white rounded-[28px] border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] px-6 py-7 md:px-10 md:py-8"
            style={{ color: "#1e3006" }}
        >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-7 sm:gap-12">
                <CircularProgress correct={correct} wrong={wrong} skipped={skipped} total={total} />
                <div className="flex flex-col items-center sm:items-start gap-5">
                    <ul className="grid grid-cols-3 sm:grid-cols-1 gap-x-6 gap-y-3.5">
                        <BreakdownRow color="rgb(63,145,66)" label="Đúng" count={correct} />
                        <BreakdownRow color="rgb(214,69,69)" label="Sai" count={wrong} />
                        <BreakdownRow color="rgb(224,165,38)" label="Bỏ qua" count={skipped} />
                    </ul>
                    <div className="inline-flex items-baseline gap-2.5 rounded-full border-2 border-black bg-[#FFE787] px-4 py-1.5">
                        <span className="text-[11px] font-black uppercase tracking-widest">Band IELTS</span>
                        <span className="text-[24px] font-black tabular-nums leading-none">{band.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            <ActionButtons onViewExplanation={onViewExplanation} onRetry={onRetry} />
        </div>
    </div>
);

export default ScoreCard;