import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingP3Content from '../../components/sections/speaking/speaking-part3/SpeakingP3Content'
import SpeakingP3Footer from '../../components/sections/speaking/speaking-part3/SpeakingP3Footer'
import SpeakingAttemptActionFooter from '../../components/sections/speaking/SpeakingAttemptActionFooter'
import useSpeakingAttempt from '../../hooks/useSpeakingAttempt'
import useSpeakingRecorder from '../../hooks/useSpeakingRecorder'
import { speak } from '../../utils/speech'
import { getSpeakingExerciseById } from '../../services/speakingAPI'

export default function SpeakingPart3() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id: speakingExerciseId } = useParams()

  const [speakingExercise, setSpeakingExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [isMuted, setIsMuted] = useState(false) // Nút mute
  const [selectedVoice, setSelectedVoice] = useState('British') // Giọng được chọn
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false) // Bật tắt menu chọn giọng

  const [currentAnswer, setCurrentAnswer] = useState('') // Nội dung người dùng đang nhập trong ô chat.
  const [isFinished, setIsFinished] = useState(false) // Trạng thái đã hoàn thành bài chưa
  const [isSavingAnswer, setIsSavingAnswer] = useState(false)
  const [isActionBusy, setIsActionBusy] = useState(false)
  const [practiceError, setPracticeError] = useState('')

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Lưu vị trí câu hỏi hiện tại trong mảng questions

  const speakingAttempt = useSpeakingAttempt(
    speakingExerciseId,
    location.state?.attemptId,
    Boolean(speakingExercise?.questions?.length),
    Boolean(location.state?.startNewAttempt)
  )
  const recorder = useSpeakingRecorder(setCurrentAnswer)

  const speakingQuestions = speakingExercise?.questions ?? [] //  danh sách câu hỏi
  const conversationHistory = (speakingAttempt.attempt?.answers ?? []).map(
    (answer) => ({
      questionId: answer.questionId,
      question:
        speakingQuestions.find((question) => question.id === answer.questionId)
          ?.questionText ?? answer.question,
      answer: answer.transcript,
    })
  )
  const savedQuestionIds = new Set(
    conversationHistory.map((answer) => answer.questionId)
  )
  const firstUnansweredQuestionIndex = speakingQuestions.findIndex(
    (question) => !savedQuestionIds.has(question.id)
  )
  const resolvedQuestionIndex =
    firstUnansweredQuestionIndex === -1
      ? speakingQuestions.length
      : Math.max(currentQuestionIndex, firstUnansweredQuestionIndex)
  const currentSpeakingQuestion = speakingQuestions[resolvedQuestionIndex]
  const allAnswersSaved =
    speakingQuestions.length > 0 &&
    conversationHistory.length === speakingQuestions.length

  useEffect(() => { // khi người dùng rời khỏi trang hoặc component SpeakingPart1 bị gỡ khỏi giao diện.
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
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

  const handleTextToSpeech = useCallback(
    (text) => {
      speak(text, selectedVoice, isMuted)
    },
    [selectedVoice, isMuted]
  )

  const handleMicrophoneToggle = async () => {
    setPracticeError('')
    try {
      if (recorder.isRecording) {
        await recorder.stopRecording()
        return
      }

      await recorder.startRecording()
    } catch (error) {
      setPracticeError(error.message || 'Không thể xử lý file ghi âm.')
    }
  }

  const handleAnswerSubmit = async () => {
    if (!currentSpeakingQuestion || isSavingAnswer) return

    setIsSavingAnswer(true)
    setPracticeError('')
    try {
      const audio = recorder.isRecording
        ? await recorder.stopRecording()
        : recorder.getRecordedAudio()
      const submittedAnswer =
        currentAnswer.trim() || recorder.getRecognizedTranscript()

      if (!submittedAnswer) {
        throw new Error('Hãy nhập transcript hoặc bật nhận diện giọng nói.')
      }
      if (!audio) {
        throw new Error('Hãy ghi âm câu trả lời trước khi lưu để chấm phát âm.')
      }

      await speakingAttempt.saveAnswer(
        currentSpeakingQuestion.id,
        submittedAnswer,
        audio
      )
      recorder.clearRecording()
      setCurrentAnswer('')
      setCurrentQuestionIndex(
        Math.min(resolvedQuestionIndex + 1, speakingQuestions.length)
      )
    } catch (error) {
      setPracticeError(error.message || 'Không thể lưu câu trả lời.')
    } finally {
      setIsSavingAnswer(false)
    }
  }

  const handleSubmitAttempt = async () => {
    setIsFinished(false)
    setIsActionBusy(true)
    setPracticeError('')
    try {
      await speakingAttempt.submit()
    } catch (error) {
      setPracticeError(error.message || 'Không thể nộp bài Speaking.')
    } finally {
      setIsActionBusy(false)
    }
  }

  const handleRestartAttempt = async () => {
    setIsActionBusy(true)
    setPracticeError('')
    try {
      await speakingAttempt.startNewAttempt()
      setCurrentQuestionIndex(0)
      setCurrentAnswer('')
      recorder.clearRecording()
    } catch (error) {
      setPracticeError(error.message || 'Không thể tạo lượt luyện tập mới.')
    } finally {
      setIsActionBusy(false)
    }
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

  if (!speakingExercise.questions?.length) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fdfcf9] p-6 text-center">
        <h1 className="text-2xl font-black text-[#111]">
          Đề Speaking chưa có câu hỏi
        </h1>
        <p className="max-w-lg text-sm text-slate-600">
          Đề này chưa thể luyện tập. Lượt làm sẽ chỉ được tạo sau khi đề có câu hỏi.
        </p>
        <button
          type="button"
          onClick={() => navigate('/speaking')}
          className="rounded-xl border-2 border-[#111] bg-[#ffc926] px-5 py-2 font-extrabold"
        >
          Quay lại thư viện Speaking
        </button>
      </main>
    )
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
        questionNumber={Math.min(resolvedQuestionIndex + 1, speakingQuestions.length)}
        onSpeak={handleTextToSpeech}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        onFinish={() => setIsFinished(true)}
        onSubmit={handleSubmitAttempt}
        speakingExercise={speakingExercise}
        showFinishButton={false}
      />

      {/* Khu vực nội dung cuộn */}
      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pb-4 pt-1 md:px-10 md:pb-10 md:pt-6">
        {/* Lịch sử câu hỏi và câu trả lời đã gửi */}
        {conversationHistory.map((conversationItem, conversationIndex) => (
          <SpeakingP3Content
            key={`${conversationItem.questionId}-${conversationIndex}`}
            question={conversationItem.question}
            answer={conversationItem.answer}
            setShowHint={() => {}}
            onSpeak={handleTextToSpeech}
            test={speakingExercise}
            autoSpeak={false}
            assessment={{
              attempt: speakingAttempt.attempt,
              questionId: conversationItem.questionId,
              isFinalAnswer: conversationIndex === conversationHistory.length - 1,
              onRetry: speakingAttempt.retry,
              onRetryError: setPracticeError,
            }}
          />
        ))}

        {/* Câu hỏi hiện tại: chưa truyền câu trả lời đang nhập */}
        {!isFinished && currentSpeakingQuestion && (
          <SpeakingP3Content
            key={`current-${currentSpeakingQuestion.id}`}
            question={currentSpeakingQuestion.questionText}
            answer=""
            onSpeak={handleTextToSpeech}
            test={speakingExercise}
          />
        )}

        {(practiceError || speakingAttempt.attemptError || recorder.recordingError) && (
          <div role="alert" className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-red-700">
            <p>{practiceError || speakingAttempt.attemptError || recorder.recordingError}</p>
            {speakingAttempt.attemptError
              .toLowerCase()
              .includes('đăng nhập') && (
              <Link to="/login" className="mt-1 inline-block underline">
                Đăng nhập
              </Link>
            )}
          </div>
        )}

      </section>

      {/* 4. Footer ghi âm và nhập câu trả lời */}
      {!isFinished &&
        speakingAttempt.attempt?.status === 'IN_PROGRESS' &&
        currentSpeakingQuestion && (
        <SpeakingP3Footer
          answer={currentAnswer}
          setAnswer={setCurrentAnswer}
          recording={recorder.isRecording}
          onMicClick={handleMicrophoneToggle}
          onSubmit={handleAnswerSubmit}
          isSaving={isSavingAnswer}
        />
      )}
      {!isFinished && (
        <SpeakingAttemptActionFooter
          status={speakingAttempt.attempt?.status}
          allAnswersSaved={allAnswersSaved}
          isSubmitting={isActionBusy}
          isRestarting={isActionBusy}
          onSubmit={handleSubmitAttempt}
          onRestart={handleRestartAttempt}
        />
      )}
    </main>
  )
}