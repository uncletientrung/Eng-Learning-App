
import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import SpeakingHeader from '../../components/sections/speaking/speaking-part1/SpeakingP1Header'
import SpeakingP2Content from '../../components/sections/speaking/speaking-part2/SpeakingP2Content'
import SpeakingP2Footer from '../../components/sections/speaking/speaking-part2/SpeakingP2Footer'
import SpeakingAttemptActionFooter from '../../components/sections/speaking/SpeakingAttemptActionFooter'
import SpeakingInlineAssessment from '../../components/sections/speaking/SpeakingInlineAssessment'
import useSpeakingAttempt from '../../hooks/useSpeakingAttempt'
import useSpeakingRecorder from '../../hooks/useSpeakingRecorder'
import { speak } from '../../utils/speech'
import { getSpeakingExerciseById } from '../../services/speakingAPI'

export default function SpeakingPart2() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id: speakingExerciseId } = useParams()

  const [speakingExercise, setSpeakingExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Trạng thái âm thanh
  const [isMuted, setIsMuted] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState('British')
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false)

  // Trạng thái trả lời
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isFinished, setIsFinished] = useState(false)
  const [isSavingAnswer, setIsSavingAnswer] = useState(false)
  const [isActionBusy, setIsActionBusy] = useState(false)
  const [practiceError, setPracticeError] = useState('')
  const speakingAttempt = useSpeakingAttempt(
    speakingExerciseId,
    location.state?.attemptId,
    Boolean(speakingExercise?.questions?.length),
    Boolean(location.state?.startNewAttempt)
  )
  const recorder = useSpeakingRecorder(setCurrentAnswer)

  // Thời gian chuẩn bị Part 2
  const [preparationTimeRemaining, setPreparationTimeRemaining] =useState(60)
  const [isPreparationStarted, setIsPreparationStarted] = useState(false)
  const conversationHistory = (speakingAttempt.attempt?.answers ?? []).map(
    (answer) => ({
      ...answer,
      answer: answer.transcript,
    })
  )

  // Dọn dẹp khi rời trang
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
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
  const handleMicrophoneToggle = async () => {
    // Chỉ cho phép ghi âm sau khi hết thời gian chuẩn bị
    if (
      !isPreparationStarted ||
      preparationTimeRemaining > 0
    ) {
      return
    }

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
    const question = speakingExercise?.questions?.[0]
    if (!question || isSavingAnswer) return

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
        question.id,
        submittedAnswer,
        audio
      )
      recorder.clearRecording()
      setCurrentAnswer('')
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
      setCurrentAnswer('')
      setIsPreparationStarted(false)
      setPreparationTimeRemaining(60)
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
      <SpeakingHeader
        navigate={navigate}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        isVoiceMenuOpen={isVoiceMenuOpen}
        setIsVoiceMenuOpen={setIsVoiceMenuOpen}
        questionNumber={1}
        onSpeak={handleTextToSpeech}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        onFinish={() => setIsFinished(true)}
        onSubmit={handleSubmitAttempt}
        speakingExercise={speakingExercise}
        showFinishButton={false}
      />

      <section className="min-h-0 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pb-4 pt-1 md:px-10 md:pb-10 md:pt-6">
        <SpeakingP2Content
          question={speakingExercise.questions?.[0]}
          onSpeak={handleTextToSpeech}
        />

        {conversationHistory.map((conversationItem, index) => (
          <div key={`${conversationItem.questionId}-${index}`}>
            <div className="flex animate-in flex-col items-end fade-in slide-in-from-left-2 duration-500">
              <div className="max-w-[90%] text-right md:max-w-[75%]">
                <div className="inline-block rounded-2xl rounded-tr-none border-2 border-[#111] bg-[#e8f0c9] p-3 text-[#111] shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
                  <p className="whitespace-pre-wrap text-left text-[13px] font-medium leading-relaxed md:text-[15px]">
                    {conversationItem.answer}
                  </p>
                </div>
              </div>
            </div>
            <SpeakingInlineAssessment
              attempt={speakingAttempt.attempt}
              questionId={conversationItem.questionId}
              isFinalAnswer={index === conversationHistory.length - 1}
              onRetry={speakingAttempt.retry}
              onRetryError={setPracticeError}
            />
          </div>
        ))}
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

      {speakingAttempt.attempt?.status === 'IN_PROGRESS' &&
        conversationHistory.length === 0 && (
        <SpeakingP2Footer
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
          isRecording={recorder.isRecording}
          onMicrophoneToggle={handleMicrophoneToggle}
          onAnswerSubmit={handleAnswerSubmit}
          preparationTimeRemaining={preparationTimeRemaining}
          setPreparationTimeRemaining={setPreparationTimeRemaining}
          isPreparationStarted={isPreparationStarted}
          setIsPreparationStarted={setIsPreparationStarted}
          isSaving={isSavingAnswer}
        />
      )}
      <SpeakingAttemptActionFooter
        status={speakingAttempt.attempt?.status}
        allAnswersSaved={conversationHistory.length === 1}
        isSubmitting={isActionBusy}
        isRestarting={isActionBusy}
        onSubmit={handleSubmitAttempt}
        onRestart={handleRestartAttempt}
      />
    </main>
  )
}
