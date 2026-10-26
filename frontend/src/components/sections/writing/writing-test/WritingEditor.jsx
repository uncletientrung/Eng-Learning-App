import { useState } from "react";
import WritingToolbar from "./WritingToolbar";
import {
  normalizeTopic,
  WRITING_TYPE_CONFIG,
} from "../../../../constant/writingConstant";
import { gradeWriting } from "../../../../services/writingGradingApi";

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
  const [result, setResult] = useState(null);

  const topicKey = normalizeTopic(test?.topic?.name ?? "");
  const recommend = WRITING_TYPE_CONFIG[topicKey];

  const minimumWords = recommend?.minimumWords ?? 50;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = wordCount >= minimumWords && !loading;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sticky top-6 h-[calc(100vh-3rem)] z-10">
      <div className="bg-[#fdfcf9] rounded-2xl shadow-sm border border-[#e5e0d5] flex flex-col relative overflow-hidden flex-1 min-h-0">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-y-2 px-8 py-5 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            Bài làm
          </h2>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span
              className={
                wordCount >= minimumWords
                  ? "font-bold text-emerald-500"
                  : "font-bold text-rose-500"
              }
            >
              {wordCount} / {minimumWords} từ
            </span>

            <button
              type="button"
              onClick={onFullscreen}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
            >
              {isFullscreen
                ? "Thoát toàn màn hình"
                : "Toàn màn hình"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <WritingToolbar
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          fontFamily={fontFamily}
          onFontFamilyChange={setFontFamily}
        />

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here..."
          className="flex-1 w-full resize-none outline-none border-0 bg-[#fdfcf9] px-8 py-6 text-slate-800 leading-relaxed"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily,
          }}
        />

        {/* Submit */}
        <div className="mt-4 flex items-center justify-between gap-4 px-8 pb-5 shrink-0">
          <p
            className={
              canSubmit
                ? "text-brand text-[11px] font-bold"
                : "text-rose-500 text-[11px] font-bold"
            }
          >
            {canSubmit
              ? "Kiểm tra kỹ trước khi nộp bài"
              : `Cần ít nhất ${minimumWords} từ để chấm bài (${wordCount}/${minimumWords})`}
          </p>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleGrade}
            className="bg-brand text-white font-bold px-8 py-3 rounded-xl hover:bg-brand/90 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Đang chấm bài..." : "Chấm bài"}
          </button>
        </div>
      </div>

      {/* Lỗi khi gọi API */}
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Kết quả chấm bài */}
      {result && (
        <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-y-auto">
          <div>
            <p className="text-sm text-slate-500">
              Điểm IELTS Writing ước lượng
            </p>
            <p className="mt-1 text-4xl font-bold text-brand">
              {result.overallScore}
            </p>
            <p className="mt-3 text-slate-700">
              {result.overallFeedback}
            </p>
          </div>

          <hr />

          <h3 className="text-lg font-bold text-slate-800">
            Đánh giá theo tiêu chí
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
      )}
    </div>
  );
}

export default WritingEditor;