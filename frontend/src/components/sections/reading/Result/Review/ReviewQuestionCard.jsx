import { IconCircleX, IconCircleCheck } from "./icons.jsx";

/**
 * Question shape:
 * {
 *   id: 1,
 *   prompt: "There are other parrots that share the kākāpō's inability to fly.",
 *   yourAnswer: "TRUE" | "",
 *   correctAnswer: "FALSE",
 *   isCorrect: false,
 *   explanation: [
 *     "FALSE",
 *     "Câu hỏi:",
 *     "“...”",
 *     { bold: "Bước 1: ", text: "xác định keyword" },
 *     "other parrots",
 *   ]
 * }
 */

const ExplanationItem = ({ item }) => (
    <li className="flex gap-2 text-blue-900 text-sm font-medium leading-relaxed">
        <span className="shrink-0 text-blue-400" aria-hidden="true">–</span>
        <span className="min-w-0">
      {typeof item === "string" ? (
          <span>{item}</span>
      ) : (
          <>
              <strong className="font-bold">{item.bold}</strong>
              <span>{item.text}</span>
          </>
      )}
    </span>
    </li>
);

const ReviewQuestionCard = ({ question }) => {
    const { id, prompt, yourAnswer, correctAnswer, explanation = [], isCorrect = false } = question;

    return (
        <div
            className={`bg-white rounded-2xl p-6 border-2 shadow-sm ${
                isCorrect ? "border-emerald-100" : "border-red-100"
            }`}
        >
            <div className="flex items-start justify-between mb-4">
                <p className="font-bold text-slate-800 text-lg">
          <span className="inline-flex items-center justify-center bg-slate-100 text-slate-600 px-3 h-7 rounded-full text-sm mr-3 whitespace-nowrap">
            {id}
          </span>
                    {prompt}
                </p>
                {isCorrect ? <IconCircleCheck /> : <IconCircleX />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
            Câu Trả Lời Của Bạn
          </span>
                    <span className={`font-medium ${isCorrect ? "text-emerald-700" : "text-red-600"}`}>
            {yourAnswer ? (
                yourAnswer
            ) : (
                <em className="text-slate-400">Không có câu trả lời</em>
            )}
          </span>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">
            Đáp Án Đúng
          </span>
                    <span className="font-bold text-emerald-800">{correctAnswer}</span>
                </div>
            </div>

            {explanation.length > 0 && (
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <span className="text-xs font-bold text-blue-600 uppercase block mb-1">
            Giải Thích
          </span>
                    <ul className="space-y-1.5">
                        {explanation.map((item, i) => (
                            <ExplanationItem key={i} item={item} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ReviewQuestionCard;