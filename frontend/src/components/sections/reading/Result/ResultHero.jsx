import ResultMascot from "./ResultMascot";

const ResultHero = ({ timeLabel, tip }) => (
    <div className="relative space-y-10">
        <div className="relative">
            <div className="max-w-xl relative z-20">
                <h1 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tight mb-1">
                    Kết quả bài
                </h1>
                <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
          <span className="relative inline-block">
            Reading
            <span className="absolute inset-x-0 bottom-2 h-1/2 bg-white/20 -z-10 rounded-lg transform -skew-x-12" />
          </span>
                </h1>
                <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                    Dưới đây là tổng kết kết quả làm bài của bạn.
                </p>
                <div className="mt-5">
                    <p className="text-white font-medium text-lg md:text-xl">
                        Thời gian làm bài:{" "}
                        <span className="font-black" style={{ color: "#a6d189" }}>
              {timeLabel}
            </span>
                    </p>
                </div>
            </div>
            <ResultMascot tip={tip} />
        </div>
    </div>
);

export default ResultHero;