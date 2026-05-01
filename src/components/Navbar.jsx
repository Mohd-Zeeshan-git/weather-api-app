import { MapPin, Search, Settings } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import SearchModal from "../features/search/SearchModal"
import SettingsDrawer from "./SettingsDrawer"

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // ✅ Correct slice
  const location = useSelector((state) => state.search.city)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10 px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          className="text-xl font-bold text-white cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🌦 SKY INDIA
        </h1>

        {/* Center Dynamic Slot */}
        <div className="text-white text-sm flex items-center gap-2">

          {location ? (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <MapPin size={16} />
              <span>
                {location.name}, {location.country}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Search size={16} />
              Search
            </button>
          )}

        </div>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="text-white hover:text-blue-400 transition"
        >
          <Settings size={18} />
        </button>
      </nav>

      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}

      {settingsOpen && (
        <SettingsDrawer onClose={() => setSettingsOpen(false)} />
      )}
    </>
  )
}