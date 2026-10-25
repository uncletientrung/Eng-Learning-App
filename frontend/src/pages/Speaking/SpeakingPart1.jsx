import { useEffect, useRef, useState, useCallback  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingContent from '../../components/sections/speaking/speaking-part1/SpeakingP1Content'
import SpeakingAssessment from '../../components/sections/speaking/speaking-part1/SpeakingP1Assessment'
import SpeakingFooter from '../../components/sections/speaking/speaking-part1/SpeakingP1Footer'
import { speak } from '../../utils/speech'
import { getSpeakingExerciseById } from '../../services/speakingAPI'


export default function SpeakingPart1() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [test, setTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [muted, setMuted] = useState(false) // Nút mute
  const [voice, setVoice] = useState('British') // Giọng được chọn
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false) // Bật tắt menu chọn giọng

  const [answer, setAnswer] = useState('')  // Nội dung người dùng đang nhập trong ô chat.
  const [recording, setRecording] = useState(false) // Trạng thái record có đang được bật không
  const [finished, setFinished] = useState(false) // Trạng thái đã hoàn thành bài chưa

  const [questionIndex, setQuestionIndex] = useState(0) // Lưu vị trí câu hỏi hiện tại trong mảng questions
  const [conversation, setConversation] = useState([]) // Lưu các cặp câu hỏi và câu trả lời đã gửi để hiển thị hội thoại tất cả trên giao diện.

  const recognitionRef = useRef(null) //  lưu tham chiếu tới đối tượng nhận diện giọng nói của trình duyệt SpeechRecognition

  const questions = test?.questions ?? [] //  danh sách câu hỏi
  const currentQuestion = questions[questionIndex] // câu hỏi hiện tại 

  useEffect(() => { // khi người dùng rời khỏi trang hoặc component SpeakingPart1 bị gỡ khỏi giao diện.
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      recognitionRef.current?.stop?.()
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    async function fetchTest() {
      try {
        setLoading(true)
        setError('')
        setTest(null)
        const data = await getSpeakingExerciseById(id)

        if (cancelled) return
        setTest(data)

      } catch (err) { 
        console.error('Lỗi tải bài Writing:', err)
        if (!cancelled) {
          setError('Không thể tải dữ liệu bài Writing.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    fetchTest()

    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    console.log('Tests hiện tại:', test);
  }, [test]);




  const handleSpeak = useCallback((text) => {
    speak(text, voice, muted)
  }, [voice, muted])

  const handleMic = () => {
    const SpeechRecognition = 
      window.SpeechRecognition || window.webkitSpeechRecognition // Kiểm tra trình duyệt có hỗ trợ nhận diện giọng nói không

    if (!SpeechRecognition) {
      window.alert(
        'Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Bạn có thể nhập câu trả lời bằng bàn phím.'
      )
      return
    }

    if (recording) { // Nếu đang ghi âm thì dừng lại
      recognitionRef.current?.stop() // lưu đối tượng nhận diện giọng nói hiện tại và yêu cầu dừng nhận diện giọng nói.
      setRecording(false) //  cập nhật giao diện thành trạng thái không ghi âm.
      return
    }

    const recognition = new SpeechRecognition() // Tạo một obj nhận diện giọng nói mới

    recognition.lang = 'en-US' // Nhận diện giọng nói theo tiếng Anh Mỹ
    recognition.interimResults = true // Cho phép nhận kết quả tạm thời khi người dùng chưa nói xong
    recognition.continuous = true // Cố gắng tiếp tục nhận diện qua nhiều cụm từ, thay vì chỉ một cụm

    recognition.onresult = (event) => { // Chuyển kết quả giọng nói thành văn bản trong ô chat
              // recognition.onresult callback được gọi khi có kết quả nhận diện giọng nói
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) { // event.results danh sách các kết quả nhận diện
        transcript += event.results[i][0].transcript // event.results[i][0].transcript: văn bản nhận diện được ở kết quả thứ i
      }

      setAnswer(transcript)
    }

    recognition.onerror = () => setRecording(false)
    recognition.onend = () => setRecording(false)

    recognitionRef.current = recognition // Gán đối tượng vào recognitionRef.current để có thể dừng phiên nhận diện về sau

    try {
      recognition.start() // thực sự bắt đầu nhận diện giọng nói.
      setRecording(true)
    } catch {
      setRecording(false)
    }
  }

  const handleSubmit = () => { // dùng để lưu câu trả lời hiện tại vào lịch sử luyện tập
    const trimmedAnswer = answer.trim()
    if (!trimmedAnswer || !currentQuestion) return


    if (recording) { // Dừng nhận diện giọng nói nếu đang ghi âm
      recognitionRef.current?.stop()
      setRecording(false)
    }

    // Thêm cặp câu hỏi - câu trả lời vào lịch sử hội thoại
    setConversation((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.questionText,
        answer: trimmedAnswer,
      },
    ])

    // Chuyển sang câu tiếp theo
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1)
      setAnswer('')
    } else {
      // Đã hoàn thành tất cả câu hỏi
      setFinished(true)
    }
  }

  const handleRetry = () => {
    recognitionRef.current?.stop()

    setAnswer('')
    setConversation([])
    setQuestionIndex(0)
    setRecording(false)
    setFinished(false)
  }

  if (loading) {
    return <div className="p-8">Đang tải bài Speaking...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>
  }

  if (!test) {
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
        muted={muted}
        setMuted={setMuted}
        voice={voice}
        setVoice={setVoice}
        voiceMenuOpen={voiceMenuOpen}
        setVoiceMenuOpen={setVoiceMenuOpen}
        questionIndex={questionIndex + 1}
        onSpeak={handleSpeak}
        finished={finished}
        setFinished={setFinished}
        onFinish={() => setFinished(true)}
        onSubmit={handleSubmit}
        test = {test}
      />

      {/* Khu vực nội dung cuộn */}
      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth p-4 md:p-10">
        {/* Lịch sử câu hỏi và câu trả lời đã gửi */}
        {conversation.map((item) => (
          <SpeakingContent
            key={item.questionId}
            question={item.question}
            answer={item.answer}
            setShowHint={() => {}}
            onSpeak={handleSpeak}
            test={test}
          />
        ))}

        {/* Câu hỏi hiện tại: chưa truyền câu trả lời đang nhập */}
        {!finished && currentQuestion && (
          <SpeakingContent
            key={`current-${currentQuestion.id}`}
            question={currentQuestion.questionText}
            answer=""
            onSpeak={handleSpeak}
          />
        )}

        {/* 3. Kết quả đánh giá */}
        {/* <SpeakingAssessment
          sample={sample}
          history={history}
          onSpeak={handleSpeak}
          onRetry={handleRetry}
        /> */}
      </section>

      {/* 4. Footer ghi âm và nhập câu trả lời */}
      {!finished && (
        <SpeakingFooter
          answer={answer}
          setAnswer={setAnswer}
          recording={recording}
          onMicClick={handleMic}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  )
}