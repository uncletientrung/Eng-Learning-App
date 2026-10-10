import {
  ArrowLeft,
  Mic,
  Volume2,
  VolumeX,
  ListChecks,
  ChevronDown,
  Play,
  X,
} from 'lucide-react'

export default function SpeakingP3Header({
  navigate,
  muted,
  setMuted,
  voice,
  setVoice,
  voiceMenuOpen,
  setVoiceMenuOpen,
  questionIndex,
  onSpeak,
  finished,
  setFinished,
  onFinish,
  onSubmit,
}) {
  return (
    <>
      <header className="z-10 flex flex-none flex-wrap items-center justify-between gap-3 rounded-[20px] border-4 border-[#111] bg-white px-4 py-3.5 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:px-7 md:py-5">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/speaking')}
            aria-label="Quay lại thư viện Speaking"
            className="mr-4 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#f4f1e6] text-[#111] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#111] bg-[#e8f0c9] text-[#111]">
            <Mic size={24} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold uppercase tracking-tight text-[#111]">
              IELTS Mock Interview
            </h1>
            <p className="mt-0.5 flex items-center text-[11px] font-bold uppercase tracking-[2px] text-[#8a8672] md:text-xs md:tracking-[3px]">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#2f8f3f]" />
              Giám khảo IELTS (Band 9.0) Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative hidden flex-col items-start md:flex">
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[3px] text-[#8a8672]">
              Giọng giám khảo
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onSpeak(
                    "Let's talk about your hometown. Where is your hometown?"
                  )
                }
                title="Nghe thử giọng"
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#ffc926] text-[#111] hover:-translate-y-0.5"
              >
                <Play size={14} fill="currentColor" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setVoiceMenuOpen(!voiceMenuOpen)}
                  className="flex min-w-[200px] items-center justify-between rounded-xl border-[3px] border-[#111] bg-white px-4 py-2 text-sm font-bold text-[#111] focus:shadow-[4px_4px_0_#ffc926] md:min-w-[240px]"
                >
                  {voice === 'British'
                    ? 'British (Anh-Anh)'
                    : 'American (Anh-Mỹ)'}
                  <ChevronDown size={16} />
                </button>

                {voiceMenuOpen && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border-2 border-[#111] bg-white shadow-lg">
                    {[
                      { value: 'British', label: 'British (Anh-Anh)' },
                      { value: 'American', label: 'American (Anh-Mỹ)' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          setVoice(item.value)
                          setVoiceMenuOpen(false)
                        }}
                        className="block w-full px-4 py-3 text-left text-sm hover:bg-[#e8f0c9]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMuted(!muted)}
            title={muted ? 'Bật âm thanh giám khảo' : 'Tắt âm thanh giám khảo'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-white text-[#111] hover:-translate-y-0.5"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <div className="flex items-center gap-1.5 rounded-xl border-2 border-[#111] bg-[#e8f0c9] px-3 py-1.5 text-[#111]">
            <ListChecks size={12} />
            <span className="text-[11px] font-extrabold uppercase tracking-wide tabular-nums">
              Câu {questionIndex}/10
            </span>
          </div>

          <button
            onClick={onFinish}
            className="rounded-xl border-[3px] border-[#111] bg-[#fce3df] px-4 py-2 text-sm font-extrabold text-[#c23b3b]"
          >
            Kết thúc
          </button>
        </div>
      </header>

      {finished && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border-4 border-[#111] bg-white p-6 shadow-[8px_8px_0_rgba(0,0,0,0.25)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#111]">
                Kết thúc lượt luyện tập?
              </h2>

              <button onClick={() => setFinished(false)}>
                <X size={20} />
              </button>
            </div>

            <p className="mb-5 text-sm text-[#555]">
              Câu trả lời sẽ được lưu trong lịch sử luyện tập trên giao diện này.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFinished(false)}
                className="rounded-xl border-2 border-[#111] px-4 py-2 font-bold"
              >
                Tiếp tục
              </button>

              <button
                onClick={onSubmit}
                className="rounded-xl border-2 border-[#111] bg-[#ffc926] px-4 py-2 font-extrabold"
              >
                Lưu câu trả lời
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}