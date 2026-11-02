import { useCallback, useEffect, useRef, useState } from 'react'

async function convertToWav(blob) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) {
    throw new Error('Trình duyệt không hỗ trợ xử lý file ghi âm.')
  }

  const context = new AudioContextClass()
  try {
    const audioBuffer = await context.decodeAudioData(await blob.arrayBuffer())
    const sampleRate = 16000
    const channelCount = 1
    const frameCount = Math.ceil(audioBuffer.duration * sampleRate)
    const bytesPerSample = 2
    const dataLength = frameCount * channelCount * bytesPerSample
    const wav = new ArrayBuffer(44 + dataLength)
    const view = new DataView(wav)

    const writeString = (offset, value) => {
      for (let index = 0; index < value.length; index += 1) {
        view.setUint8(offset + index, value.charCodeAt(index))
      }
    }

    writeString(0, 'RIFF')
    view.setUint32(4, 36 + dataLength, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, channelCount, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(
      28,
      sampleRate * channelCount * bytesPerSample,
      true
    )
    view.setUint16(32, channelCount * bytesPerSample, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, dataLength, true)

    let offset = 44
    const sourceChannels = Array.from(
      { length: audioBuffer.numberOfChannels },
      (_, channel) => audioBuffer.getChannelData(channel)
    )
    const sampleRateRatio = audioBuffer.sampleRate / sampleRate
    for (let sampleIndex = 0; sampleIndex < frameCount; sampleIndex += 1) {
      const sourcePosition = sampleIndex * sampleRateRatio
      const sourceIndex = Math.min(
        Math.floor(sourcePosition),
        audioBuffer.length - 1
      )
      const nextSourceIndex = Math.min(sourceIndex + 1, audioBuffer.length - 1)
      const interpolation = sourcePosition - sourceIndex
      const sample = sourceChannels.reduce((sum, channel) => {
        const interpolated =
          channel[sourceIndex] +
          (channel[nextSourceIndex] - channel[sourceIndex]) * interpolation
        return sum + interpolated
      }, 0) / sourceChannels.length
      const clipped = Math.max(-1, Math.min(1, sample))
      view.setInt16(
        offset,
        clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff,
        true
      )
      offset += bytesPerSample
    }

    return new Blob([wav], { type: 'audio/wav' })
  } finally {
    await context.close()
  }
}

export default function useSpeakingRecorder(onTranscript) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const onTranscriptRef = useRef(onTranscript)
  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const recognitionRef = useRef(null)
  const audioRef = useRef(null)
  const recognizedTranscriptRef = useRef('')
  const stopPromiseRef = useRef(null)

  useEffect(() => {
    onTranscriptRef.current = onTranscript
  }, [onTranscript])

  const startRecording = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      setRecordingError('Trình duyệt không hỗ trợ ghi âm.')
      return
    }

    setRecordingError('')
    audioRef.current = null
    recognizedTranscriptRef.current = ''

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      const chunks = []
      recorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        try {
          const sourceBlob = new Blob(chunks, {
            type: recorder.mimeType || 'audio/webm',
          })
          const wavBlob = await convertToWav(sourceBlob)
          audioRef.current = wavBlob
          stopPromiseRef.current?.resolve(wavBlob)
        } catch (error) {
          setRecordingError(error.message || 'Không thể xử lý file ghi âm.')
          stopPromiseRef.current?.reject(error)
        } finally {
          streamRef.current = null
          recorderRef.current = null
          setIsRecording(false)
          stopPromiseRef.current = null
        }
      }

      recorder.start()
      setIsRecording(true)

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = 'en-US'
        recognition.interimResults = true
        recognition.continuous = true
        recognition.onresult = (event) => {
          let transcript = ''
          for (let index = 0; index < event.results.length; index += 1) {
            transcript += event.results[index][0].transcript
          }
          recognizedTranscriptRef.current = transcript.trim()
          onTranscriptRef.current?.(recognizedTranscriptRef.current)
        }
        recognition.onerror = () => {
          setRecordingError(
            'Không nhận diện được lời nói tự động; bạn vẫn có thể nhập transcript.'
          )
        }
        recognitionRef.current = recognition
        try {
          recognition.start()
        } catch {
          setRecordingError(
            'Không thể bật nhận diện giọng nói; bạn vẫn có thể nhập transcript.'
          )
        }
      }
    } catch (error) {
      setRecordingError(
        error.name === 'NotAllowedError'
          ? 'Bạn cần cấp quyền microphone để ghi âm.'
          : error.message || 'Không thể bắt đầu ghi âm.'
      )
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  const stopRecording = useCallback(() => {
    const recorder = recorderRef.current
    if (!recorder || recorder.state === 'inactive') {
      recognitionRef.current?.stop?.()
      recognitionRef.current = null
      return Promise.resolve(audioRef.current)
    }

    recognitionRef.current?.stop?.()
    recognitionRef.current = null

    const stopped = new Promise((resolve, reject) => {
      stopPromiseRef.current = { resolve, reject }
    })
    recorder.stop()
    return stopped
  }, [])

  const getRecordedAudio = useCallback(() => audioRef.current, [])
  const getRecognizedTranscript = useCallback(
    () => recognizedTranscriptRef.current,
    []
  )
  const clearRecording = useCallback(() => {
    audioRef.current = null
    recognizedTranscriptRef.current = ''
  }, [])

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.()
      if (recorderRef.current?.state !== 'inactive') {
        recorderRef.current?.stop()
      }
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return {
    isRecording,
    recordingError,
    startRecording,
    stopRecording,
    getRecordedAudio,
    getRecognizedTranscript,
    clearRecording,
    clearRecordingError: () => setRecordingError(''),
  }
}
