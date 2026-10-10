import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingP2Content from '../../components/sections/speaking/speaking-part2/SpeakingP2Content'
import SpeakingP2Footer from '../../components/sections/speaking/speaking-part2/SpeakingP2Footer'

const cueCard = {
  title: 'Describe a family member you spend the most time with',
  points: [
    'who this person is',
    'what you usually do together',
    'how long you have been close',
    'and explain why you enjoy spending time with this person',
  ],
  followUp: 'and explain why this person is important in your life',
}

function speak(text, voiceName, muted) {
  if (
    muted ||
    typeof window === 'undefined' ||
    !('speechSynthesis' in window)
  ) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  const voices = window.speechSynthesis.getVoices()

  const selected = voices.find((item) =>
    item.name.toLowerCase().includes(voiceName.toLowerCase())
  )

  if (selected) utterance.voice = selected

  utterance.lang = voiceName === 'British' ? 'en-GB' : 'en-US'
  window.speechSynthesis.speak(utterance)
}

export default function SpeakingPart2() {
  const navigate = useNavigate()
  const recognitionRef = useRef(null)

  const [muted, setMuted] = useState(false)
  const [voice, setVoice] = useState('British')
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  const [recording, setRecording] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const [prepTime, setPrepTime] = useState(60)
  const [prepStarted, setPrepStarted] = useState(false)

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      recognitionRef.current?.stop?.()
    }
  }, [])

  const handleSpeak = (text) => speak(text, voice, muted)

  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      window.alert(
        'Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn có thể nhập câu trả lời bằng bàn phím.'
      )
      return
    }

    if (recording) {
      recognitionRef.current?.stop()
      setRecording(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event) => {
      let transcript = ''

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }

      setAnswer(transcript)
    }

    recognition.onerror = () => setRecording(false)
    recognition.onend = () => setRecording(false)

    recognitionRef.current = recognition

    try {
      recognition.start()
      setRecording(true)
    } catch {
      setRecording(false)
    }
  }

  const handleSubmit = () => {
    if (!answer.trim()) return

    if (recording) {
      recognitionRef.current?.stop()
      setRecording(false)
    }

    // TODO: Lưu câu trả lời vào lịch sử hoặc backend tại đây.
    setFinished(false)
  }

  return (
    <main
      className="flex h-[100dvh] flex-col overflow-hidden bg-[#6f8f4b] p-2 font-sans md:p-6"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <SpeakingHeader
        navigate={navigate}
        muted={muted}
        setMuted={setMuted}
        voice={voice}
        setVoice={setVoice}
        voiceMenuOpen={voiceMenuOpen}
        setVoiceMenuOpen={setVoiceMenuOpen}
        questionIndex={2}
        onSpeak={handleSpeak}
        finished={finished}
        setFinished={setFinished}
        onFinish={() => setFinished(true)}
        onSubmit={handleSubmit}
      />

      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth p-4 md:p-10">
        <SpeakingP2Content
          question={cueCard}
          showHint={showHint}
          setShowHint={setShowHint}
          onSpeak={handleSpeak}
        />
      </section>

      <SpeakingP2Footer
        answer={answer}
        setAnswer={setAnswer}
        recording={recording}
        onMicClick={handleMic}
        onSubmit={handleSubmit}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        prepStarted={prepStarted}
        setPrepStarted={setPrepStarted}
      />

      {finished && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border-4 border-[#111] bg-white p-6 shadow-[8px_8px_0_rgba(0,0,0,0.25)]">
            <h2 className="mb-3 text-lg font-extrabold text-[#111]">
              Kết thúc lượt luyện tập?
            </h2>

            <p className="mb-5 text-sm text-[#555]">
              Bạn có muốn lưu câu trả lời hiện tại không?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setFinished(false)}
                className="rounded-xl border-2 border-[#111] px-4 py-2 font-bold"
              >
                Tiếp tục
              </button>

              <button
                onClick={handleSubmit}
                className="rounded-xl border-2 border-[#111] bg-[#ffc926] px-4 py-2 font-extrabold"
              >
                Lưu câu trả lời
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}