import { useState } from "react";
import { Link } from "react-router-dom";
import WritingToolbar from "./WritingToolbar";
import {
  normalizeTopic,
  WRITING_TYPE_CONFIG,
} from "../../../../constant/writingConstant";
import { gradeWriting } from "../../../../services/writingGradingApi";
import WritingScoreSummary from "./WritingScoreSummary";

function WritingEditor({
  test,
  isFullscreen,
  onFullscreen,
  token,
}) {
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Inter");

  // Trạng thái chấm bài
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [result, setResult] = useState(null);
  const [showEssay, setShowEssay] = useState(false);

  const topicKey = normalizeTopic(test?.topic?.name ?? "");
  const recommend = WRITING_TYPE_CONFIG[topicKey];

  const minimumWords = recommend?.minimumWords ?? 50;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const meetsMinimumWords = wordCount >= minimumWords;
  const canSubmit = meetsMinimumWords && !loading;

  // Xử lý khi người dùng nhấn Chấm bài
  const handleGrade = async () => {
    if (!test?.id) {
      setError("Không xác định được ID đề Writing.");
      return;
    }

    if (!content.trim()) {
      setError("Vui lòng nhập bài viết.");
      return;
    }

    if (!token) {
      setError("Bạn cần đăng nhập để sử dụng chức năng chấm bài.");
      return;
    }

    setLoading(true);
    setError("");
    setNeedsLogin(false);
    setResult(null);

    try {
      const data = await gradeWriting(
        test.id,
        content.trim(),
        token
      );

      setResult(data);
    } catch (err) {
      setError(err.message || "Không thể chấm bài. Vui lòng thử lại.");
      setNeedsLogin(err.status === 401);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sticky top-6 h-[calc(100vh-3rem)] z-10">
      {result && !showEssay ? (
        <div className="flex-1 min-h-0 space-y-5 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <button
            type="button"
            onClick={() => setShowEssay(true)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            Quay lại bài viết
          </button>

          <WritingScoreSummary result={result} />

          <div className="rounded-2xl border border-slate-200 bg-[#fbfcf8] p-5">
            <h3 className="text-lg font-bold text-slate-800">
              Nhận xét tổng quan
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {result.overallFeedback}
            </p>
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            Phân tích chi tiết từng tiêu chí
          </h3>

          {result.criteria?.map((criterion) => (
            <article
              key={criterion.criterionCode}
              className="rounded-xl border border-slate-200 p-4 space-y-3"
            >
              <div className="flex justify-between items-center gap-3">
                <h4 className="font-bold text-slate-800">
                  {criterion.criterionCode.replaceAll("_", " ")}
                </h4>

                <span className="text-xl font-bold text-brand">
                  {criterion.score}
                </span>
              </div>

              <p className="text-sm text-slate-700">
                {criterion.feedback}
              </p>

              <div>
                <p className="font-semibold text-emerald-700">
                  Điểm mạnh
                </p>
                <p className="text-sm text-slate-600">
                  {criterion.strengths}
                </p>
              </div>

              <div>
                <p className="font-semibold text-rose-700">
                  Điểm cần cải thiện
                </p>
                <p className="text-sm text-slate-600">
                  {criterion.weaknesses}
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-700">
                  Gợi ý
                </p>
                <p className="text-sm text-slate-600">
                  {criterion.suggestions}
                </p>
              </div>

              {criterion.issues?.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h5 className="font-bold text-slate-800">
                    Lỗi chi tiết ({criterion.issues.length})
                  </h5>

                  {criterion.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-slate-50 p-3 text-sm space-y-2"
                    >
                      <p className="text-rose-700">
                        <strong>Bản gốc:</strong>{" "}
                        {issue.originalText}
                      </p>

                      <p className="text-emerald-700">
                        <strong>Sửa thành:</strong>{" "}
                        {issue.correction}
                      </p>

                      <p className="text-slate-600">
                        <strong>Giải thích:</strong>{" "}
                        {issue.explanation}
                      </p>

                      <p className="text-slate-500">
                        <strong>Loại lỗi:</strong>{" "}
                        {issue.category}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}

          {result.improvedVersion && (
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Bài viết tham khảo đã cải thiện
              </h3>

              <div className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                {result.improvedVersion}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-500">
            Đây là điểm đánh giá tham khảo từ AI, không phải điểm IELTS
            chính thức.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-[#e5e0d5] bg-[#fdfcf9] shadow-sm">
          <div className="flex flex-wrap justify-between items-center gap-y-2 border-b border-slate-100 px-8 py-5">
            <h2 className="text-xl font-bold text-slate-800">
              {showEssay ? "Bài viết của bạn" : "Bài làm"}
            </h2>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span
                className={
                  meetsMinimumWords
                    ? "font-bold text-emerald-500"
                    : "font-bold text-rose-500"
                }
              >
                {wordCount} / {minimumWords} từ
              </span>

              <button
                type="button"
                onClick={onFullscreen}
                className="rounded-lg bg-slate-800 px-3 py-1.5 font-bold text-white hover:bg-slate-700"
              >
                {isFullscreen
                  ? "Thoát toàn màn hình"
                  : "Toàn màn hình"}
              </button>
            </div>
          </div>

          {showEssay ? (
            <>
              <div
                aria-label="Bài viết đã nộp, chỉ đọc"
                className="flex-1 overflow-y-auto whitespace-pre-wrap bg-[#fdfcf9] px-8 py-6 leading-relaxed text-slate-800"
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily,
                }}
              >
                {content}
              </div>
              <div className="flex justify-end border-t border-slate-100 px-8 py-5">
                <button
                  type="button"
                  onClick={() => setShowEssay(false)}
                  className="rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-md transition hover:bg-brand/90"
                >
                  Quay lại kết quả
                </button>
              </div>
            </>
          ) : (
            <>
              <WritingToolbar
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                fontFamily={fontFamily}
                onFontFamilyChange={setFontFamily}
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your answer here..."
                className="flex-1 w-full resize-none border-0 bg-[#fdfcf9] px-8 py-6 leading-relaxed text-slate-800 outline-none"
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily,
                }}
              />

              <div className="flex shrink-0 items-center justify-between gap-4 px-8 pb-5 pt-4">
                <p
                  className={
                    meetsMinimumWords
                      ? "text-brand text-[11px] font-bold"
                      : "text-rose-500 text-[11px] font-bold"
                  }
                >
                  {!meetsMinimumWords
                    ? `Cần ít nhất ${minimumWords} từ để chấm bài (${wordCount}/${minimumWords})`
                    : loading
                      ? "Đang chấm bài, vui lòng chờ..."
                      : "Kiểm tra kỹ trước khi nộp bài"}
                </p>

                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={handleGrade}
                  className="whitespace-nowrap rounded-xl bg-brand px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "Đang chấm bài..." : "Chấm bài"}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Lỗi khi gọi API */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
          {(!token || needsLogin) && (
            <Link to="/login" className="ml-2 font-bold underline">
              Đăng nhập
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default WritingEditor;