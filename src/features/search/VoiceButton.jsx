import { Mic } from "lucide-react"

export default function VoiceButton({ onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition ${
        active
          ? "bg-red-500 text-white animate-pulse"
          : "bg-white/20 text-white"
      }`}
      aria-label="Voice search"
    >
      <Mic size={18} />
    </button>
  )
}