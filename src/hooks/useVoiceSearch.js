import { useRef, useState } from "react"

export default function useVoiceSearch(onResult) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Voice search not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = event => {
      const transcript =
        event.results[0][0].transcript
      if (onResult) onResult(transcript)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => setIsListening(false)

    recognition.start()
    recognitionRef.current = recognition
  }

  return { isListening, startListening }
}