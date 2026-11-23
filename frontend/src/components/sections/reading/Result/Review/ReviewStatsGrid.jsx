
const StatCell = ({ icon, iconBg, value, label, percent, percentColor }) => (
    <div className="flex flex-col items-center gap-1 text-center">
        <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-white text-xl shadow-md`}>
            {icon}
        </div>
        <span className="text-white font-black text-2xl leading-tight">{value}</span>
        <span className="text-white/80 text-xs font-semibold leading-tight">{label}</span>
        <span className={`text-xs font-bold ${percentColor}`}>{percent}</span>
    </div>
);

const ReviewStatsGrid = ({ correct, band, total }) => {
    const pct = (n) => total > 0
        ? `${Math.round((n / total) * 100)}%`
        : "0%";
    const wrong = total - correct
    return (
        <div className="relative z-20 -mt-32">
            <div className="bg-[#5b6e4e]/90 backdrop-blur-md rounded-2xl p-6 grid grid-cols-4 gap-4 mb-8 shadow-xl border border-white/10">

                <StatCell
                    icon={<span className="font-black text-lg">Σ</span>}
                    iconBg="bg-amber-400"
                    value={total}
                    label="Tổng số câu"
                    percent="100%"
                    percentColor="text-amber-300"
                />

                <StatCell
                    icon={<span className="font-black text-lg">✓</span>}
                    iconBg="bg-emerald-400"
                    value={correct}
                    label="Câu đúng"
                    percent={pct(correct)}
                    percentColor="text-emerald-300"
                />

                <StatCell
                    icon={<span className="font-black text-lg">✕</span>}
                    iconBg="bg-rose-400"
                    value={wrong}
                    label="Câu sai"
                    percent={pct(wrong)}
                    percentColor="text-rose-300"
                />

                <StatCell
                    icon={<span className="text-lg">★</span>}
                    iconBg="bg-blue-400"
                    value={Number(band ?? 0).toFixed(1)}
                    label="Band IELTS"
                    percent="Điểm số"
                    percentColor="text-blue-300"
                />

            </div>
        </div>
    );
};

export default ReviewStatsGrid;
