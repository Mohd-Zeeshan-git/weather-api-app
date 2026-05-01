import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import useVoiceSearch from '../../hooks/useVoiceSearch'
import { useGeoSearchQuery } from '../../store/api/weatherApi'
import { setCity } from '../../store/slices/searchSlice'
import VoiceButton from './VoiceButton'

export default function SearchBar({ onSearchComplete }) {
  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debounced = useDebounce(input, 300)

  const {
    data: results = [],
    isFetching,
  } = useGeoSearchQuery(debounced, {
    skip: debounced.length < 2,
  })

  /* =========================
     Voice Search Integration
  ========================== */

  const { isListening, startListening } = useVoiceSearch((text) => {
    setInput(text)
    setShowSuggestions(true)
  })

  /* =========================
     Hide suggestions if input cleared
  ========================== */
  useEffect(() => {
    if (!input) {
      setShowSuggestions(false)
      setActiveIndex(-1)
    }
  }, [input])

  const handleSelect = (item) => {
    dispatch(
      setCity({
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
      })
    )

    setInput('')
    setShowSuggestions(false)
    setActiveIndex(-1)

    if (onSearchComplete) {
      onSearchComplete()
    }
  }

  const handleKeyDown = (e) => {
    if (!results.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      )
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : prev
      )
    }

    if (e.key === 'Enter') {
      e.preventDefault()

      if (activeIndex >= 0) {
        handleSelect(results[activeIndex])
      } else if (results.length === 1) {
        handleSelect(results[0])
      }
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          placeholder="Search city..."
          onChange={(e) => {
            setInput(e.target.value)
            setShowSuggestions(true)
            setActiveIndex(-1)
          }}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur focus:outline-none"
        />

        {/* 🎤 Voice Button */}
        <VoiceButton
          onClick={startListening}
          active={isListening}
        />
      </div>

      {/* Suggestions */}
      {showSuggestions && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          {results.map((item, index) => (
            <li
              key={`${item.lat}-${item.lon}`}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 cursor-pointer transition ${
                index === activeIndex
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              {item.name}, {item.country}
            </li>
          ))}
        </ul>
      )}

      {isFetching && (
        <div className="absolute right-3 top-2 text-xs opacity-50">
          Searching...
        </div>
      )}
    </div>
  )
}