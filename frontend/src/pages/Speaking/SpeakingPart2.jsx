
import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingP2Content from '../../components/sections/speaking/speaking-part2/SpeakingP2Content'
import SpeakingP2Footer from '../../components/sections/speaking/speaking-part2/SpeakingP2Footer'
import { speak } from '../../utils/speech'
import { getSpeakingExerciseById } from '../../services/speakingAPI'

export default function SpeakingPart2() {
  const navigate = useNavigate()
  const { id: speakingExerciseId } = useParams()

  const speechRecognitionRef = useRef(null)

  const [speakingExercise, setSpeakingExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Trạng thái âm thanh
  const [isMuted, setIsMuted] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState('British')
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false)

  // Trạng thái trả lời
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])

  // Thời gian chuẩn bị Part 2
  const [preparationTimeRemaining, setPreparationTimeRemaining] =useState(60)
  const [isPreparationStarted, setIsPreparationStarted] = useState(false)

  // Dọn dẹp khi rời trang
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }

      speechRecognitionRef.current?.stop?.()
    }
  }, [])

  // Tải đề Speaking
  useEffect(() => {
    let isCancelled = false

    async function fetchSpeakingExercise() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        setSpeakingExercise(null)

        const exerciseData =
          await getSpeakingExerciseById(speakingExerciseId)

        if (isCancelled) return

        setSpeakingExercise(exerciseData)
      } catch (error) {
        console.error('Lỗi tải bài Speaking:', error)

        if (!isCancelled) {
          setErrorMessage('Không thể tải dữ liệu bài Speaking.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchSpeakingExercise()

    return () => {
      isCancelled = true
    }
  }, [speakingExerciseId])

  // Đọc văn bản
  const handleTextToSpeech = useCallback(
    (text) => {
      speak(text, selectedVoice, isMuted)
    },
    [selectedVoice, isMuted]
  )

  // Bắt đầu hoặc dừng nhận diện giọng nói
  const handleMicrophoneToggle = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      window.alert(
        'Trình duyệt chưa hỗ trợ nhận diện giọng nói. Bạn có thể nhập câu trả lời bằng bàn phím.'
      )
      return
    }

    if (isRecording) {
      speechRecognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

    // Chỉ cho phép ghi âm sau khi hết thời gian chuẩn bị
    if (
      !isPreparationStarted ||
      preparationTimeRemaining > 0
    ) {
      return
    }

    const speechRecognition = new SpeechRecognition()

    speechRecognition.lang = 'en-US'
    speechRecognition.interimResults = true
    speechRecognition.continuous = true

    speechRecognition.onresult = (event) => {
      let recognizedTranscript = ''

      for (
        let resultIndex = 0;
        resultIndex < event.results.length;
        resultIndex++
      ) {
        recognizedTranscript +=
          event.results[resultIndex][0].transcript
      }

      setCurrentAnswer(recognizedTranscript)
    }

    speechRecognition.onerror = () => {
      setIsRecording(false)
    }

    speechRecognition.onend = () => {
      setIsRecording(false)
    }

    speechRecognitionRef.current = speechRecognition

    try {
      speechRecognition.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Không thể bắt đầu nhận diện giọng nói:', error)
      setIsRecording(false)
    }
  }

  // Gửi câu trả lời
  const handleAnswerSubmit = () => {
    const submittedAnswer = currentAnswer.trim()

    if (!submittedAnswer) return

    if (isRecording) {
      speechRecognitionRef.current?.stop()
      setIsRecording(false)
    }

    setConversationHistory((previousHistory) => [
      ...previousHistory,
      {
        questionId: speakingExercise?.id,
        question: speakingExercise?.title ?? '',
        answer: submittedAnswer,
      },
    ])

    setCurrentAnswer('')
  }

  // Xác nhận kết thúc lượt luyện tập
  const handleFinishPractice = () => {
    if (isRecording) {
      speechRecognitionRef.current?.stop()
      setIsRecording(false)
    }

    setIsFinished(true)
  }

  // Lưu câu trả lời hiện tại trước khi kết thúc
  const handleSaveAndFinish = () => {
    const submittedAnswer = currentAnswer.trim()

    if (submittedAnswer) {
      setConversationHistory((previousHistory) => [
        ...previousHistory,
        {
          questionId: speakingExercise?.id,
          question: speakingExercise?.title ?? '',
          answer: submittedAnswer,
        },
      ])

      setCurrentAnswer('')
    }

    if (isRecording) {
      speechRecognitionRef.current?.stop()
      setIsRecording(false)
    }

    setIsFinished(false)
  }

  if (isLoading) {
    return <div className="p-8">Đang tải bài Speaking...</div>
  }

  if (errorMessage) {
    return <div className="p-8 text-red-600">{errorMessage}</div>
  }

  if (!speakingExercise) {
    return <div className="p-8">Không tìm thấy bài Speaking này</div>
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
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        isVoiceMenuOpen={isVoiceMenuOpen}
        setIsVoiceMenuOpen={setIsVoiceMenuOpen}
        questionNumber={2}
        onSpeak={handleTextToSpeech}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        onFinish={handleFinishPractice}
        onSubmit={handleSaveAndFinish}
        speakingExercise={speakingExercise}
      />

      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pb-4 pt-1 md:px-10 md:pb-10 md:pt-6">
        <SpeakingP2Content
          question={speakingExercise.questions?.[0]}
          onSpeak={handleTextToSpeech}
        />

       {conversationHistory.map((conversationItem, index) => (
        <div
          key={`${conversationItem.questionId}-${index}`}
          className="flex animate-in flex-col items-end fade-in slide-in-from-left-2 duration-500"
        >
          <div className="max-w-[90%] text-right md:max-w-[75%]">
            <div className="inline-block rounded-2xl rounded-tr-none border-2 border-[#111] bg-[#e8f0c9] p-3 text-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
              <p className="whitespace-pre-wrap text-left text-[13px] font-medium leading-relaxed md:text-[15px]">
                {conversationItem.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
      </section>

      <SpeakingP2Footer
        currentAnswer={currentAnswer}
        setCurrentAnswer={setCurrentAnswer}
        isRecording={isRecording}
        onMicrophoneToggle={handleMicrophoneToggle}
        onAnswerSubmit={handleAnswerSubmit}
        preparationTimeRemaining={preparationTimeRemaining}
        setPreparationTimeRemaining={setPreparationTimeRemaining}
        isPreparationStarted={isPreparationStarted}
        setIsPreparationStarted={setIsPreparationStarted}
      />
    </main>
  )
}
