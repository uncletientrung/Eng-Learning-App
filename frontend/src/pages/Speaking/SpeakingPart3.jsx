import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SpeakingP3Header from '../../components/sections/speaking/speaking-part3/SpeakingP3Header'
import SpeakingP3Content from '../../components/sections/speaking/speaking-part3/SpeakingP3Content'
import SpeakingP3Footer from '../../components/sections/speaking/speaking-part3/SpeakingP3Footer'

const sample = {
  question: "In many societies, the role of the family has changed significantly over the past few decades. What do you think are the most important reasons for this shift?",
  answer: "My hometown is in the south of Vietnam. It's a coastal city and it's also a very popular tourist destination.",
  band: 7,
  scores: [{ label: 'FC', score: 7 }, { label: 'LR', score: 7 }, { label: 'GRA', score: 7 }, { label: 'P', score: 7 }],
  pronunciation: "My hometown is in the south of Vietnam. It's a coastal city and it's also a very popular tourist destination.",
  upgrade: "My hometown is located on the southern coast of Vietnam. It's a coastal city that's also a major tourist hotspot, drawing visitors from all over the world.",
  vocabulary: [
    { word: "a stone's throw from", meaning: 'rất gần, chỉ cách một khoảng ngắn' },
    { word: 'bustling with tourists', meaning: 'nhộn nhịp với khách du lịch' },
    { word: 'off the beaten track', meaning: 'nằm ngoài những tuyến du lịch phổ biến' },
  ],
  comment: 'Câu trả lời của bạn khá rõ ràng và đúng ngữ pháp, nhưng còn ngắn và đơn giản. Để đạt điểm cao hơn, bạn nên phát triển ý thêm, dùng từ vựng chính xác và tự nhiên hơn, đồng thời thể hiện sự lưu loát bằng cách nối câu mạch lạc hơn.',
  modelAnswers: [
    {
      title: 'Bài mẫu 1',
      answer: "My hometown is a coastal city in the south of Vietnam, and it's really taken off as a tourist destination in recent years. The beaches are stunning, and there's a vibrant nightlife that draws in crowds, especially during the summer months.",
      words: [
        { word: 'taken off', meaning: 'trở nên nổi tiếng và thành công nhanh chóng' },
        { word: 'draws in', meaning: 'thu hút, lôi kéo' },
      ],
    },
    {
      title: 'Bài mẫu 2',
      answer: "Well, my hometown sits right on the southern coast of Vietnam. It's a bustling city that's become a magnet for tourists, thanks to its beautiful coastline and rich local culture. You can easily spend days exploring the markets, temples, and seafood restaurants.",
      words: [
        { word: 'a magnet for', meaning: 'thu hút mạnh mẽ, như nam châm' },
        { word: 'bustling', meaning: 'nhộn nhịp, sôi động' },
      ],
    },
  ],
}

const historySample = [
  { version: 'Bản 1', time: '09:38 10/10/2026', band: 7, answer: sample.answer },
]


function speak(text, voiceName, muted) {
  if (
    muted ||
    typeof window === 'undefined' ||
    !('speechSynthesis' in window)
  ) {
    return
  }

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

export default function SpeakingPart1() {
  const navigate = useNavigate()

  const [muted, setMuted] = useState(false)
  const [voice, setVoice] = useState('British')
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false)
  const [answer, setAnswer] = useState('')
  const [recording, setRecording] = useState(false)
  const [finished, setFinished] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [questionIndex] = useState(2)
  const [history, setHistory] = useState(historySample)

  const recognitionRef = useRef(null)

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }

      recognitionRef.current?.stop?.()
    }
  }, [])

  const handleSpeak = (text) => {
    speak(text, voice, muted)
  }

  const handleMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      window.alert(
        'Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn có thể nhập câu trả lời bằng bàn phím.'
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

    setHistory((current) => [
      {
        version: `Bản ${current.length + 1}`,
        time: new Date().toLocaleString('vi-VN'),
        band: '—',
        answer: answer.trim(),
      },
      ...current,
    ])

    setFinished(false)
  }

  const handleRetry = () => {
    if (recording) {
      recognitionRef.current?.stop()
    }

    setAnswer('')
    setRecording(false)
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
      {/* 1. Header */}
      <SpeakingP3Header
        navigate={navigate}
        muted={muted}
        setMuted={setMuted}
        voice={voice}
        setVoice={setVoice}
        voiceMenuOpen={voiceMenuOpen}
        setVoiceMenuOpen={setVoiceMenuOpen}
        questionIndex={questionIndex}
        onSpeak={handleSpeak}
        finished={finished}
        setFinished={setFinished}
        onFinish={() => setFinished(true)}
        onSubmit={handleSubmit}
      />

      {/* Khu vực nội dung cuộn */}
      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth p-4 md:p-10">
        {/* 2. Câu hỏi và câu trả lời */}
        <SpeakingP3Content
          question={sample.question}
          answer={sample.answer}
          showHint={showHint}
          setShowHint={setShowHint}
          onSpeak={handleSpeak}
        />

      </section>

      {/* 4. Footer ghi âm và nhập câu trả lời */}
      <SpeakingP3Footer   Footer
        answer={answer}
        setAnswer={setAnswer}
        recording={recording}
        onMicClick={handleMic}
        onSubmit={handleSubmit}
      />
    </main>
  )
}