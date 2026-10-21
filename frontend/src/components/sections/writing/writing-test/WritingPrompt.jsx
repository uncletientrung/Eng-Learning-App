import { getImageUrl } from "../../../../utils/imageUtils";
import {normalizeTopic, WRITING_TYPE_CONFIG } from "../../../../constant/writingConstant";

function WritingPrompt({ test }) {
  const imageSrc = getImageUrl(test.imageUrl);
  const topicKey = normalizeTopic(test.topic.name);
  const recommend = WRITING_TYPE_CONFIG[topicKey];

  return (
    <div className="bg-[#fdfcf9] rounded-2xl p-6 shadow-sm border border-[#e5e0d5]">
      <div className="flex justify-between items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-800 whitespace-nowrap shrink-0">
          Tiêu đề
        </h2>
        <span className="font-medium text-slate-500 text-xs text-right min-w-0 ">
            {test.title}
        </span>
      </div>  

      <span className="text-[10px] font-bold text-slate-400 tracking-widest block mb-2">
        PROMPT
      </span>

      <div className="text-slate-900 leading-relaxed text-[15px] mb-4 font-bold">
        <p>
          {test.questionText}
        </p>
      </div>

      {imageSrc && (
        <img
          alt="Task image"
          className="
            w-full
            rounded-xl
            border border-slate-200
            mb-4
            object-cover
          "
          src={imageSrc}
        />
      )}

      <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] text-slate-900">
        <span>
          Tối thiểu{' '}
          <strong className="text-slate-700">
            {recommend?.minimumWords ?? 200} từ
          </strong>
        </span>

        <span>
          Gợi ý{' '}
          <strong className="text-slate-700">
            {recommend?.suggestedMinutes ?? 30} phút
          </strong>
        </span>

      </div>
    </div>
  )
}

export default WritingPrompt