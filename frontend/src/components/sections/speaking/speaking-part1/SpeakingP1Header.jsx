import {
  ArrowLeft,
  Volume2,
  VolumeX,
  ListChecks,
  ChevronDown,
  Play,
  X,
} from 'lucide-react'

export default function SpeakingP1Header({
  navigate,
  muted, setMuted,
  voice, setVoice,
  voiceMenuOpen, setVoiceMenuOpen,
  questionIndex,
  onSpeak,
  finished, setFinished,
  onFinish,
  onSubmit,
  test
}) {
  return (
    <>
      <header className="z-10 flex flex-none flex-wrap items-center justify-between gap-2 rounded-2xl border-[3px] border-[#111] bg-white px-3 py-2 md:px-4 shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/speaking')}
            aria-label="Quay lại thư viện Speaking"
            className="mr-4 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#f4f1e6] text-[#111] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={20} />
          </button>


          <div>
            <h1 className="text-lg font-extrabold uppercase tracking-tight text-[#111]">
              IELTS Mock Interview
            </h1>
            <p className="mt-0.5 flex items-center text-[11px] font-bold uppercase text-[#8a8672] md:text-xs">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#2f8f3f]" />
              {test.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative hidden md:block">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onSpeak("Welcome to Speaking Practice!")
                }
                title="Nghe thử giọng"
                disabled={voice === 'None' || muted}
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#ffc926] text-[#111] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play size={14} fill="currentColor" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setVoiceMenuOpen(!voiceMenuOpen)}
                  className="flex h-9 min-w-[220px] items-center justify-between rounded-xl border-2 border-[#111] bg-white px-3 text-sm font-bold text-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
                >
                  <span className="truncate">
                    {voice === 'British' ? 'British (Anh-Anh)' : 'American (Anh-Mỹ)'}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`ml-3 shrink-0 transition-transform ${
                      voiceMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {voiceMenuOpen && (
                  <>
                    <button
                      aria-label="Đóng menu chọn giọng"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setVoiceMenuOpen(false)}
                    />

                    <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[220px] animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl border-[3px] border-[#111] bg-white py-2 shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
                      <div className="mb-1 px-4 py-2 text-[11px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                        Select a voice
                      </div>

                      <div className="max-h-[300px] overflow-y-auto">
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
                            className={`flex w-full items-center px-4 py-2.5 text-left text-[15px] font-bold transition-colors ${
                              voice === item.value
                                ? 'bg-[#2f5fa8] text-white'
                                : 'text-[#111] hover:bg-[#ffd6e0]'
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
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
              Câu {questionIndex}/ {test.questions.length}
            </span>
          </div>

          <button
            onClick={onFinish}
            className="flex h-9 items-center justify-center rounded-xl border-2 border-[#111] bg-[#fce3df] px-3 text-sm font-extrabold text-[#c23b3b]"
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