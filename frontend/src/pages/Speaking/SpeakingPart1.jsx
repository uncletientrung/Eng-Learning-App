import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingContent from '../../components/sections/speaking/speaking-part1/SpeakingP1Content'
import SpeakingAssessment from '../../components/sections/speaking/speaking-part1/SpeakingP1Assessment'
import SpeakingFooter from '../../components/sections/speaking/speaking-part1/SpeakingP1Footer'
import { speak } from '../../utils/speech'
import { getSpeakingExerciseById } from '../../services/speakingAPI'

export default function SpeakingPart1() {
  const navigate = useNavigate()
  const { id: speakingExerciseId } = useParams()

  const [speakingExercise, setSpeakingExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [isMuted, setIsMuted] = useState(false) // Nút mute
  const [selectedVoice, setSelectedVoice] = useState('British') // Giọng được chọn
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false) // Bật tắt menu chọn giọng

  const [currentAnswer, setCurrentAnswer] = useState('') // Nội dung người dùng đang nhập trong ô chat.
  const [isRecording, setIsRecording] = useState(false) // Trạng thái record có đang được bật không
  const [isFinished, setIsFinished] = useState(false) // Trạng thái đã hoàn thành bài chưa

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Lưu vị trí câu hỏi hiện tại trong mảng questions
  const [conversationHistory, setConversationHistory] = useState([]) // Lưu các cặp câu hỏi và câu trả lời đã gửi để hiển thị hội thoại tất cả trên giao diện.

  const speechRecognitionRef = useRef(null) //  lưu tham chiếu tới đối tượng nhận diện giọng nói của trình duyệt SpeechRecognition

  const speakingQuestions = speakingExercise?.questions ?? [] //  danh sách câu hỏi
  const currentSpeakingQuestion = speakingQuestions[currentQuestionIndex] // câu hỏi hiện tại

  useEffect(() => { // khi người dùng rời khỏi trang hoặc component SpeakingPart1 bị gỡ khỏi giao diện.
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      speechRecognitionRef.current?.stop?.()
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function fetchSpeakingExercise() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        setSpeakingExercise(null)

        const exerciseData = await getSpeakingExerciseById(speakingExerciseId)

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

  useEffect(() => {
    console.log('Bài Speaking hiện tại:', speakingExercise)
  }, [speakingExercise])

  const handleTextToSpeech = useCallback(
    (text) => {
      speak(text, selectedVoice, isMuted)
    },
    [selectedVoice, isMuted]
  )

  const handleMicrophoneToggle = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition // Kiểm tra trình duyệt có hỗ trợ nhận diện giọng nói không

    if (!SpeechRecognition) {
      window.alert(
        'Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn có thể nhập câu trả lời bằng bàn phím.'
      )
      return
    }

    if (isRecording) { // Nếu đang ghi âm thì dừng lại
      speechRecognitionRef.current?.stop() // lưu đối tượng nhận diện giọng nói hiện tại và yêu cầu dừng nhận diện giọng nói.
      setIsRecording(false) //  cập nhật giao diện thành trạng thái không ghi âm.
      return
    }

    const speechRecognition = new SpeechRecognition() // Tạo một obj nhận diện giọng nói mới

    speechRecognition.lang = 'en-US' // Nhận diện giọng nói theo tiếng Anh Mỹ
    speechRecognition.interimResults = true // Cho phép nhận kết quả tạm thời khi người dùng chưa nói xong
    speechRecognition.continuous = true // Cố gắng tiếp tục nhận diện qua nhiều cụm từ, thay vì chỉ một cụm

    speechRecognition.onresult = (event) => { // Chuyển kết quả giọng nói thành văn bản trong ô chat
      // speechRecognition.onresult callback được gọi khi có kết quả nhận diện giọng nói
      let recognizedTranscript = ''

      for (let resultIndex = 0; resultIndex < event.results.length; resultIndex++) { // event.results danh sách các kết quả nhận diện
        recognizedTranscript += event.results[resultIndex][0].transcript // event.results[i][0].transcript: văn bản nhận diện được ở kết quả thứ i
      }

      setCurrentAnswer(recognizedTranscript)
    }

    speechRecognition.onerror = () => setIsRecording(false)
    speechRecognition.onend = () => setIsRecording(false)

    speechRecognitionRef.current = speechRecognition // Gán đối tượng vào speechRecognitionRef.current để có thể dừng phiên nhận diện về sau

    try {
      speechRecognition.start() // thực sự bắt đầu nhận diện giọng nói.
      setIsRecording(true)
    } catch {
      setIsRecording(false)
    }
  }

  const handleAnswerSubmit = () => { // dùng để lưu câu trả lời hiện tại vào lịch sử luyện tập
    const submittedAnswer = currentAnswer.trim()

    if (!submittedAnswer || !currentSpeakingQuestion) return

    if (isRecording) { // Dừng nhận diện giọng nói nếu đang ghi âm
      speechRecognitionRef.current?.stop()
      setIsRecording(false)
    }

    // Thêm cặp câu hỏi - câu trả lời vào lịch sử hội thoại
    setConversationHistory((previousHistory) => [
      ...previousHistory,
      {
        questionId: currentSpeakingQuestion.id,
        question: currentSpeakingQuestion.questionText,
        answer: submittedAnswer,
      },
    ])

    // Chuyển sang câu tiếp theo
    if (currentQuestionIndex < speakingQuestions.length - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1)
      setCurrentAnswer('')
    } else {
      // Đã hoàn thành tất cả câu hỏi
      setIsFinished(true)
    }
  }

  const handleRetryPractice = () => {
    speechRecognitionRef.current?.stop()

    setCurrentAnswer('')
    setConversationHistory([])
    setCurrentQuestionIndex(0)
    setIsRecording(false)
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
      {/* 1. Header */}
      <SpeakingHeader
        navigate={navigate}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        isVoiceMenuOpen={isVoiceMenuOpen}
        setIsVoiceMenuOpen={setIsVoiceMenuOpen}
        questionNumber={currentQuestionIndex + 1}
        onSpeak={handleTextToSpeech}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        onFinish={() => setIsFinished(true)}
        onSubmit={handleAnswerSubmit}
        speakingExercise={speakingExercise}
      />

      {/* Khu vực nội dung cuộn */}
      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pb-4 pt-1 md:px-10 md:pb-10 md:pt-6">
        {/* Lịch sử câu hỏi và câu trả lời đã gửi */}
        {conversationHistory.map((conversationItem, conversationIndex) => (
          <SpeakingContent
            key={`${conversationItem.questionId}-${conversationIndex}`}
            question={conversationItem.question}
            answer={conversationItem.answer}
            setShowHint={() => {}}
            onSpeak={handleTextToSpeech}
            test={speakingExercise}
          />
        ))}

        {/* Câu hỏi hiện tại: chưa truyền câu trả lời đang nhập */}
        {!isFinished && currentSpeakingQuestion && (
          <SpeakingContent
            key={`current-${currentSpeakingQuestion.id}`}
            question={currentSpeakingQuestion.questionText}
            answer=""
            onSpeak={handleTextToSpeech}
            test={speakingExercise}
          />
        )}

        {/* 3. Kết quả đánh giá */}
        {/* <SpeakingAssessment
          sample={sample}
          history={history}
          onSpeak={handleTextToSpeech}
          onRetry={handleRetryPractice}
        /> */}
      </section>

      {/* 4. Footer ghi âm và nhập câu trả lời */}
      {!isFinished && (
        <SpeakingFooter
          answer={currentAnswer}
          setAnswer={setCurrentAnswer}
          recording={isRecording}
          onMicClick={handleMicrophoneToggle}
          onSubmit={handleAnswerSubmit}
        />
      )}
    </main>
  )
}