import { X } from "lucide-react"
import SearchBar from "./SearchBar"

export default function SearchModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex justify-center items-start pt-32">
      <div className="bg-slate-900 w-full max-w-lg rounded-xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white"
        >
          <X />
        </button>

        <SearchBar autoFocus onSearchComplete={onClose} />
      </div>
    </div>
  )
}