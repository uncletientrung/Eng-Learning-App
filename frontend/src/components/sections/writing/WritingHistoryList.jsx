import { getTopicColors } from "../../../constant/writingConstant";
import { getImageUrl } from "../../../utils/imageUtils";

function formatCompletedAt(value) {
  if (!value) return "Chưa rõ thời gian";

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function WritingHistoryList({
  attempts,
  loading,
  error,
  deleteError,
  deletingAttemptId,
  onAttemptClick,
  onDeleteAttempt,
}) {
  if (loading) {
    return <p className="py-8 text-center text-slate-500">Đang tải lịch sử...</p>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-semibold text-slate-600">
          Bạn chưa có bài Writing nào được chấm.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Các lượt làm đã chấm sẽ xuất hiện tại đây.
        </p>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <p role="alert" className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {deleteError}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {attempts.map((attempt) => {
          const imageSrc = getImageUrl(attempt.imageUrl);
          const colors = getTopicColors(attempt.topicName);

          return (
            <article
              key={attempt.attemptId}
              className="group flex h-[270px] w-full flex-row overflow-hidden border-2 border-[#111] bg-white text-left shadow-[3px_3px_0_rgba(0,0,0,0.15)] transition-all duration-150 hover:-translate-y-px hover:bg-[#fffdf5] hover:shadow-[4px_4px_0_rgba(0,0,0,0.18)]"
            >
              <div className="relative flex w-[35%] shrink-0 items-center justify-center overflow-hidden border-r-2 border-slate-200 bg-[#f8f9fa] p-3">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={attempt.exerciseTitle}
                    className="h-full w-full object-contain opacity-90 mix-blend-multiply transition-opacity group-hover:opacity-100"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <span className="text-3xl font-black">W</span>
                    <span className="text-xs font-bold">Writing Practice</span>
                  </div>
                )}

                {attempt.topicName && (
                  <div
                    className={`absolute left-0 top-0 max-w-[90%] truncate rounded-br-lg border-b-2 border-r-2 border-[#111] px-3 py-1 text-[11px] font-bold shadow-sm ${colors.badge}`}
                  >
                    {attempt.topicName}
                  </div>
                )}
              </div>

              <div className="flex w-[65%] min-w-0 flex-col justify-start p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => onAttemptClick(attempt)}
                  aria-label={`Xem bài viết và kết quả: ${attempt.exerciseTitle}, lượt ${attempt.attemptId}`}
                  className="flex min-h-0 flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ffc926]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-blue-600 transition-colors group-hover:text-blue-700">
                      {attempt.exerciseTitle}
                    </h3>
                    <span className="shrink-0 border-2 border-[#111] bg-emerald-100 px-2 py-1 text-sm font-black text-emerald-800">
                      {Number(attempt.overallScore).toFixed(1)}
                    </span>
                  </div>

                  {attempt.questionText && (
                    <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600">
                      {attempt.questionText}
                    </p>
                  )}
                  <span className="mt-auto pt-2 text-[11px] font-bold text-indigo-600">
                    Lượt #{attempt.attemptId} · Xem kết quả
                  </span>
                </button>

                <div className="mt-2 flex flex-wrap items-end justify-between gap-2 border-t border-slate-100 pt-2">
                  <span className="text-[11px] font-medium text-slate-500">
                    {formatCompletedAt(attempt.completedAt)}
                  </span>
                  <button
                    type="button"
                    disabled={deletingAttemptId !== null}
                    onClick={() => onDeleteAttempt(attempt)}
                    aria-label={`Xóa lượt làm ${attempt.attemptId}`}
                    className="shrink-0 border-2 border-[#111] px-2.5 py-1 text-[11px] font-bold text-black-700 transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-wait disabled:opacity-50"
                  >
                    {deletingAttemptId === attempt.attemptId ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default WritingHistoryList;
