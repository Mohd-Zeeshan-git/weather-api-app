import { X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPosition } from "../services/geolocationService"
import { togglePerformance } from "../store/slices/performanceSlice"
import { setCity } from "../store/slices/searchSlice"
import { toggleUnit } from "../store/slices/unitSlice"

export default function SettingsDrawer({ onClose }) {
  const dispatch = useDispatch()
  const unit = useSelector(state => state.unit?.unit)
  const performance = useSelector(state => state.performance?.mode)

  /* =========================
     Enable Location Handler
  ========================== */
  const handleEnableLocation = async () => {
    try {
      const coords = await getCurrentPosition()

      if (!coords) return

      // We dispatch coordinates directly.
      // Dashboard already uses lat/lon for weather queries.
      dispatch(
        setCity({
          name: "Your Location",
          lat: coords.latitude,
          lon: coords.longitude,
          country: "",
        })
      )

      // Optional: close drawer after success
      if (onClose) onClose()

    } catch (err) {
      console.error("Location error:", err)
      alert("Unable to access location. Please allow permission.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-80 bg-slate-900 h-full p-6 shadow-xl animate-slideInRight">
        <div className="flex justify-between items-center text-white mb-8">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-6 text-white">

          {/* Temperature Unit */}
          <div>
            <p className="mb-2 text-sm opacity-70">Temperature Unit</p>
            <button
              onClick={() => dispatch(toggleUnit())}
              className="bg-white/20 px-4 py-2 rounded w-full"
            >
              {unit === "metric" ? "Switch to °F" : "Switch to °C"}
            </button>
          </div>

          {/* Performance Mode */}
          <div>
            <p className="mb-2 text-sm opacity-70">Performance Mode</p>
            <button
              onClick={() => dispatch(togglePerformance())}
              className="bg-white/20 px-4 py-2 rounded w-full"
            >
              {performance === "high"
                ? "Switch to Low"
                : "Switch to High"}
            </button>
          </div>

          {/* Location Access */}
          {/* <div>
            <p className="mb-2 text-sm opacity-70">Location Access</p>
            <button
              onClick={handleEnableLocation}
              className="bg-white/20 px-4 py-2 rounded w-full"
            >
              Enable Location
            </button>
          </div> */}

        </div>
      </div>
    </div>
  )
}