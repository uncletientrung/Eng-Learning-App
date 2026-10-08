function WritingPrompt({ test }) {
  return (
    <div className="bg-[#fdfcf9] rounded-2xl p-6 shadow-sm border border-[#e5e0d5]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Đề bài
        </h2>
        <span className="font-medium text-slate-500">
            {test.title}
        </span>
      </div>

      <span className="text-[10px] font-bold text-slate-400 tracking-widest block mb-2">
        PROMPT
      </span>

      <div className="text-slate-800 leading-relaxed text-[15px] mb-4">
        <p>
          {test.prompt}
        </p>
      </div>

      {test.image && (
        <img
          alt="Task image"
          className="
            w-full
            rounded-xl
            border border-slate-200
            mb-4
            object-cover
          "
          src={test.image}
        />
      )}

      <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] text-slate-900">
        <span>
          Tối thiểu{' '}
          <strong className="text-slate-700">
            {test.minimumWords} từ
          </strong>
        </span>

        <span>
          Gợi ý{' '}
          <strong className="text-slate-700">
            {test.suggestedMinutes} phút
          </strong>
        </span>

      </div>
    </div>
  )
}

export default WritingPrompt