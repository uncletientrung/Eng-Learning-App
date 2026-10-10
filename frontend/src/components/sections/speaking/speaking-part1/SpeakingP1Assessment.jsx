import {
  Volume2,
  BookOpen,
  Info,
  Award,
  RotateCcw,
  Sparkles,
  Play,
  Mic,
} from 'lucide-react'

function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[3px] text-[#8a8672]">
      <Icon size={13} />
      {children}
    </div>
  )
}

function VocabularyChip({ item, onSpeak }) {
  return (
    <div className="max-w-full rounded-xl border-[3px] border-[#111] bg-white px-3.5 py-2.5 text-center">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSpeak(item.word)}
          title="Nghe cụm từ này"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#111] bg-[#ffc926]"
        >
          <Play size={11} fill="currentColor" />
        </button>

        <div className="min-w-0 flex-1 break-words text-sm font-extrabold text-[#111]">
          {item.word}
        </div>

        <button
          type="button"
          onClick={() => window.alert(`Đã chọn lưu từ: ${item.word}`)}
          title="Lưu vào sổ từ vựng"
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200"
        >
          <BookOpen size={14} />
        </button>
      </div>

      <div className="mt-1 break-words text-left text-xs font-medium text-[#222]">
        {item.meaning}
      </div>

      <button
        type="button"
        onClick={() => onSpeak(item.word)}
        className="mx-auto mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-[#5f6a45]"
      >
        <Mic size={12} />
        Luyện phát âm
      </button>
    </div>
  )
}

export default function SpeakingAssessment({
  sample,
  history,
  onSpeak,
  onRetry,
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border-[3px] border-[#111] bg-white text-left shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-between bg-[#111] px-6 py-3">
        <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[3px] text-[#ffc926]">
          <Sparkles size={13} />
          Examiner's Detailed Assessment
        </span>

        <span className="rounded-full border-2 border-[#111] bg-[#2f8f3f] px-3 py-1 text-xs font-extrabold text-white">
          BAND {sample.band}
        </span>
      </div>

      <div className="space-y-6 p-4 md:p-6">
        {/* Điểm 4 tiêu chí */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {sample.scores.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border-2 border-[#111] bg-[#f4f1e6] p-3 text-center"
            >
              <div className="mb-1 text-[10px] font-bold uppercase text-[#8a8672]">
                {item.label}
              </div>
              <div className="text-lg font-extrabold text-[#111]">
                {item.score}
              </div>
            </div>
          ))}
        </div>

        {/* Phát âm */}
        <div className="rounded-[20px] border-[3px] border-[#111] bg-[#faf9f2] p-4 shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <SectionLabel icon={Volume2}>Phát âm của bạn</SectionLabel>
            <span className="rounded-full border-2 border-[#111] bg-[#e3f5e8] px-2 py-0.5 text-[10px] font-black uppercase text-[#18542a]">
              Phát âm rõ ràng
            </span>
          </div>

          <div className="rounded-xl border-2 border-[#111] bg-white p-4 shadow-sm">
            <p className="text-[15px] leading-[2.1] tracking-tight">
              {sample.pronunciation}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t-2 border-[#111]/10 pt-3">
              <button
                onClick={() => onSpeak(sample.pronunciation)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#ffc926]"
              >
                <Play size={14} fill="currentColor" />
              </button>

              <div className="h-3 min-w-[100px] flex-1 rounded-full border-2 border-[#111] bg-[#e8f0c9]">
                <div className="h-full w-0 rounded-full bg-[#6f8f4b]" />
              </div>

              <span className="w-9 text-right text-[11px] font-bold text-[#8a8672]">
                0:00
              </span>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#8a8672]">
            Bôi đen cụm từ bất kỳ để dịch và lưu vào sổ
          </p>
        </div>

        {/* Câu trả lời nâng cấp */}
        <div>
          <SectionLabel icon={BookOpen}>
            Band 9.0 Level Upgrade
          </SectionLabel>

          <div className="relative overflow-hidden rounded-2xl border-2 border-[#111] bg-[#e3f5e8] p-4 pl-5 font-semibold leading-relaxed text-[#18542a]">
            <span className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#2f8f3f]" />
            {sample.upgrade}

            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#8a8672]">
              <Info size={12} />
              Bôi đen cụm từ bất kỳ để dịch và lưu lại.
            </p>
          </div>
        </div>

        {/* Từ vựng */}
        <div className="flex flex-wrap gap-2">
          {sample.vocabulary.map((item) => (
            <span
              key={item.word}
              className="flex items-center rounded-full border-2 border-[#111] bg-[#ffe787] px-3 py-1.5 text-[10px] font-bold italic text-[#111]"
            >
              <Sparkles size={12} className="mr-1" />
              {item.word}
            </span>
          ))}
        </div>

        {/* Nhận xét */}
        <p className="relative overflow-hidden rounded-2xl border-2 border-[#111] bg-[#faf9f2] p-4 pl-5 text-xs font-medium leading-relaxed text-[#222]">
          <span className="absolute bottom-0 left-0 top-0 w-[5px] bg-[#5f6a45]" />
          {sample.comment}
        </p>

        {/* Bài mẫu */}
        <div>
          <SectionLabel icon={Award}>2 Bài Mẫu Band 8.0</SectionLabel>

          <div className="space-y-3">
            {sample.modelAnswers.map((model) => (
              <div key={model.title} className="space-y-2.5">
                <div className="rounded-2xl border-2 border-[#111] bg-[#fdf6e3] p-4">
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[3px] text-[#8a6100]">
                    {model.title}
                  </div>

                  <p className="text-sm italic leading-relaxed text-[#555]">
                    “{model.answer}”
                  </p>

                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-[#8a8672]">
                    <Info size={12} />
                    Bôi đen cụm từ bất kỳ để dịch và lưu lại.
                  </div>
                </div>

                <div className="rounded-xl border-2 border-[#111] bg-[#fdf6e3] p-3.5">
                  <SectionLabel icon={Sparkles}>
                    Từ vựng nổi bật
                  </SectionLabel>

                  <div className="flex flex-wrap gap-2.5">
                    {model.words.map((item) => (
                      <VocabularyChip
                        key={item.word}
                        item={item}
                        onSpeak={onSpeak}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trả lời lại */}
        <button
          onClick={onRetry}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-[3px] border-[#111] bg-[#111] py-3 text-sm font-extrabold text-[#ffc926] shadow-[4px_4px_0_#f96015]"
        >
          <RotateCcw size={14} />
          Trả lời lại câu này
        </button>

        {/* Lịch sử */}
        <div className="mt-5 rounded-xl p-1">
          <h3 className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#111]">
            Lịch sử luyện tập
          </h3>

          <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto">
            {history.map((item, index) => (
              <div
                key={`${item.version}-${index}`}
                className="rounded-lg border border-[#111] bg-[#fdf6e3] p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#111] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#ffc926]">
                      {item.version}
                    </span>
                    <span className="text-xs font-bold text-[#8a8672]">
                      {item.time}
                    </span>
                  </div>

                  <span className="rounded bg-green-700 px-1.5 py-0.5 text-[11px] font-bold text-white">
                    Band {item.band}
                  </span>
                </div>

                <p className="mb-2 line-clamp-3 text-xs italic text-[#5f6a45]">
                  “{item.answer}”
                </p>

                <button
                  onClick={() => onSpeak(item.answer)}
                  className="flex items-center gap-1.5 rounded-full border border-[#c9c6b6] px-3 py-1.5 text-[11px] font-bold text-[#111]"
                >
                  <Play size={11} />
                  Nghe lại audio
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}