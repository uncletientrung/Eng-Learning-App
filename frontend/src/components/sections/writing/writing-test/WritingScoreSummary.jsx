const CRITERION_LABELS = {
  TASK_RESPONSE: "Task Response",
  COHERENCE_COHESION: "Coherence & Cohesion",
  LEXICAL_RESOURCE: "Lexical Resource",
  GRAMMAR: "Grammatical Range & Accuracy",
};

const SCORE_MILESTONES = [
  { score: 0, label: "0", title: "Mới bắt đầu" },
  { score: 3, label: "3", title: "Cần củng cố" },
  { score: 5, label: "5", title: "Đang tiến bộ" },
  { score: 7, label: "7", title: "Vững vàng" },
  { score: 9, label: "9", title: "Xuất sắc" },
];

function getScoreLevel(score) {
  if (score <= 3) return "Cần củng cố nền tảng";
  if (score <= 5) return "Đang tiến bộ";
  if (score <= 7) return "Vững vàng";
  return "Xuất sắc";
}

function ScoreMeter({ score, compact = false }) {
  const percentage = Math.min(100, Math.max(0, (score / 9) * 100));

  return (
    <div
      className={`relative ${compact ? "pt-1" : "pt-2"}`}
      role="img"
      aria-label={`Điểm ${score} trên 9`}
    >
      <div
        className={`relative overflow-hidden rounded-full bg-white/15 ${
          compact ? "h-2" : "h-3"
        }`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-200 transition-[width] duration-700"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 grid grid-cols-9">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className="border-r border-white/50 last:border-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WritingScoreSummary({ result }) {
  const score = Number(result.overallScore);
  const markerPosition = Math.min(100, Math.max(0, (score / 9) * 100));

  return (
    <section
      aria-labelledby="writing-score-title"
      className="overflow-hidden rounded-3xl border border-[#e7e5d8] bg-white shadow-[0_18px_50px_rgba(35,48,20,0.10)]"
    >
      <div className="bg-gradient-to-br from-[#1e3006] via-[#344b1a] to-[#536b32] p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200/80">
              Writing assessment
            </p>
            <h3
              id="writing-score-title"
              className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
            >
              Kết quả chấm bài
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Điểm IELTS Writing ước lượng
            </p>
          </div>

          <div className="flex min-w-[120px] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Overall band
              </p>
              <p className="text-4xl font-black leading-none text-lime-200">
                {score.toFixed(1)}
              </p>
            </div>
            <span className="text-xs font-semibold text-white/50">/ 9.0</span>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-white">
                Mốc hiện tại: {getScoreLevel(score)}
              </p>
              <p className="mt-1 text-xs text-white/60">
                Thang điểm IELTS từ 0 đến 9
              </p>
            </div>
          </div>

          <div className="relative mt-8 px-1">
            <div
              className="absolute -top-7 transition-[left] duration-700"
              style={{ left: `${markerPosition}%` }}
            >
              <span
                className="block rounded-lg bg-lime-200 px-2 py-1 text-xs font-black text-[#1e3006] shadow-lg"
                style={{
                  transform: `translateX(${
                    score <= 0 ? "0" : score >= 9 ? "-100%" : "-50%"
                  })`,
                }}
              >
                {score.toFixed(1)}
              </span>
              <span
                className="block h-2 w-0.5 bg-lime-200"
                style={{
                  marginLeft:
                    score <= 0 ? "0" : score >= 9 ? "auto" : "calc(50% - 1px)",
                }}
              />
            </div>
            <ScoreMeter score={score} />
            <div className="relative mt-3 h-9">
              {SCORE_MILESTONES.map((milestone) => (
                <div
                  key={milestone.score}
                  className="absolute text-center"
                  style={{ left: `${(milestone.score / 9) * 100}%` }}
                >
                  <span
                    className="block text-[11px] font-black text-white"
                    style={{
                      transform: `translateX(${
                        milestone.score === 0
                          ? "0"
                          : milestone.score === 9
                            ? "-100%"
                            : "-50%"
                      })`,
                    }}
                  >
                    {milestone.label}
                  </span>
                  <span
                    className="mt-0.5 block whitespace-nowrap text-[9px] text-white/50"
                    style={{
                      transform: `translateX(${
                        milestone.score === 0
                          ? "0"
                          : milestone.score === 9
                            ? "-100%"
                            : "-50%"
                      })`,
                    }}
                  >
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#829064]">
              IELTS criteria
            </p>
            <h4 className="mt-1 text-lg font-black text-slate-800">
              Điểm theo từng tiêu chí
            </h4>
          </div>
          <span className="text-xs font-semibold text-slate-400">/ 9.0</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {result.criteria?.map((criterion, index) => (
            <article
              key={criterion.criterionCode}
              className="rounded-2xl border border-slate-100 bg-[#fbfcf8] p-4 transition hover:-translate-y-0.5 hover:border-[#cbd6b6] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#9aa582]">
                    Criterion 0{index + 1}
                  </span>
                  <h5 className="mt-1 text-sm font-extrabold text-slate-700">
                    {CRITERION_LABELS[criterion.criterionCode] ??
                      criterion.criterionCode.replaceAll("_", " ")}
                  </h5>
                </div>
                <span className="rounded-xl bg-[#eaf0df] px-3 py-1.5 text-lg font-black leading-none text-[#405622]">
                  {Number(criterion.score).toFixed(1)}
                </span>
              </div>

              <div className="mt-4">
                <ScoreMeter score={Number(criterion.score)} compact />
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-400">
                  <span>0</span>
                  <span>{getScoreLevel(Number(criterion.score))}</span>
                  <span>9</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WritingScoreSummary;
