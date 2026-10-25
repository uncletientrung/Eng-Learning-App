const SPEECH_LANGUAGES = {
  BRITISH: 'en-GB', // Tiếng anh anh
  US: 'en-US',  // Tiếng anh mỹ
}
export function speak(text, voiceName, muted) {
  if (muted || typeof window === 'undefined' || !('speechSynthesis' in window) ) {
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  const voices = window.speechSynthesis.getVoices()

  const selected = voices.find((voice) =>
    voice.name.toLowerCase().includes(voiceName.toLowerCase())
  )

  if (selected) {
    utterance.voice = selected
  }

  utterance.lang =  voiceName === 'British' ? SPEECH_LANGUAGES.BRITISH : SPEECH_LANGUAGES.US
  window.speechSynthesis.speak(utterance)
}