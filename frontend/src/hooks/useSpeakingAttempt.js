import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createSpeakingAttempt,
  getSpeakingAttempt,
  retrySpeakingGrading,
  saveSpeakingAnswer,
  submitSpeakingAttempt,
} from '../services/speakingAPI'

export default function useSpeakingAttempt(
  exerciseId,
  initialAttemptId = null,
  enabled = true,
  startNewAttemptOnLoad = false
) {
  const [attempt, setAttempt] = useState(null)
  const [attemptError, setAttemptError] = useState('')
  const startRequestRef = useRef({ exerciseId: null, request: null })

  const refreshAttempt = useCallback(async (attemptId) => {
    const currentAttempt = await getSpeakingAttempt(attemptId)
    setAttempt(currentAttempt)
    setAttemptError('')
    return currentAttempt
  }, [])

  useEffect(() => {
    let cancelled = false

    async function beginAttempt() {
      try {
        setAttemptError('')
        if (initialAttemptId) {
          const currentAttempt = await getSpeakingAttempt(initialAttemptId)
          if (!cancelled) setAttempt(currentAttempt)
          return
        }
        if (
          startRequestRef.current.exerciseId !== exerciseId ||
          startRequestRef.current.startNewAttempt !== startNewAttemptOnLoad
        ) {
          startRequestRef.current = {
            exerciseId,
            startNewAttempt: startNewAttemptOnLoad,
            request: createSpeakingAttempt(
              exerciseId,
              startNewAttemptOnLoad
            ),
          }
        }
        const created = await startRequestRef.current.request
        const currentAttempt = await getSpeakingAttempt(created.attemptId)
        if (!cancelled) setAttempt(currentAttempt)
      } catch (error) {
        if (!cancelled) {
          setAttemptError(error.message || 'Không thể bắt đầu lượt Speaking.')
        }
      }
    }

    if (enabled && exerciseId) beginAttempt()
    return () => {
      cancelled = true
    }
  }, [enabled, exerciseId, initialAttemptId, startNewAttemptOnLoad])

  useEffect(() => {
    const attemptId = attempt?.attemptId
    if (!attemptId || !['SUBMITTED', 'GRADING'].includes(attempt.status)) {
      return undefined
    }

    const timerId = window.setInterval(() => {
      refreshAttempt(attemptId).catch((error) => {
        setAttemptError(error.message || 'Không thể tải trạng thái chấm bài.')
      })
    }, 2000)

    return () => window.clearInterval(timerId)
  }, [attempt?.attemptId, attempt?.status, refreshAttempt])

  const saveAnswer = useCallback(
    async (questionId, transcript, audio) => {
      if (!attempt?.attemptId) {
        throw new Error('Lượt Speaking chưa sẵn sàng hoặc bạn chưa đăng nhập.')
      }
      await saveSpeakingAnswer(
        attempt.attemptId,
        questionId,
        transcript,
        audio
      )
      await refreshAttempt(attempt.attemptId)
    },
    [attempt, refreshAttempt]
  )

  const submit = useCallback(async () => {
    if (!attempt?.attemptId) {
      throw new Error('Không tìm thấy lượt Speaking cần nộp.')
    }
    await submitSpeakingAttempt(attempt.attemptId)
    await refreshAttempt(attempt.attemptId)
  }, [attempt, refreshAttempt])

  const retry = useCallback(async () => {
    if (!attempt?.attemptId) {
      throw new Error('Không tìm thấy lượt Speaking cần chấm lại.')
    }
    await retrySpeakingGrading(attempt.attemptId)
    await refreshAttempt(attempt.attemptId)
  }, [attempt, refreshAttempt])

  const startNewAttempt = useCallback(async () => {
    const created = await createSpeakingAttempt(exerciseId, true)
    const currentAttempt = await getSpeakingAttempt(created.attemptId)
    setAttempt(currentAttempt)
    setAttemptError('')
    return currentAttempt
  }, [exerciseId])

  return {
    attempt,
    attemptError,
    saveAnswer,
    submit,
    retry,
    startNewAttempt,
  }
}
