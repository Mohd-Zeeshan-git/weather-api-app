import { useSelector } from 'react-redux'
import WeatherEngine from '../../engine/WeatherEngine'
import { useOffline } from '../../hooks/useOffline'
import { useCurrentQuery, useForecastQuery } from '../../store/api/weatherApi'
import { getBackground } from '../../utils/getBackground'
import SearchBar from '../search/SearchBar'

export default function Dashboard() {
  const location = useSelector((state) => state.search.city)
  const unit = useSelector((state) => state.unit.unit)

  const { isOffline } = useOffline()

  /* =============================
     Weather Queries (lat/lon based)
  ============================== */

  const {
    data: current,
    isLoading,
    error,
  } = useCurrentQuery(
    {
      lat: location?.lat,
      lon: location?.lon,
      unit,
    },
    {
      skip: !location?.lat || !location?.lon,
    }
  )

  const { data: forecast } = useForecastQuery(
    {
      lat: location?.lat,
      lon: location?.lon,
      unit,
    },
    {
      skip: !location?.lat || !location?.lon,
    }
  )

  const condition = current?.weather?.[0]?.main || null
  const backgroundClass = getBackground(condition)

  return (
    <div
      className={`relative min-h-screen transition-all duration-700 ${backgroundClass} text-white`}
    >
     
      <WeatherEngine condition={condition} />

      {/* =============================
         Main Content Layer
      ============================== */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-8 pt-24">

        {/* 🔍 Search Always Visible */}
        <SearchBar />

        {/* 🔴 Offline Banner */}
        {isOffline && (
          <div className="bg-red-500/30 backdrop-blur p-3 rounded-xl text-center">
            You are offline
          </div>
        )}

        {/* 💤 No Selection Yet */}
        {!location && (
          <div className="text-center opacity-60 mt-20">
            Start typing to search for a city
          </div>
        )}

        {/* ⏳ Loading */}
        {isLoading && (
          <div className="text-center opacity-60">
            Searching weather...
          </div>
        )}

        {/* ❌ Error */}
        {error && (
          <div className="bg-red-500/30 p-4 rounded-xl text-center">
            Failed to load weather data
          </div>
        )}

        {/* 🌤 Current Weather */}
        {current && (
          <div className="glass p-8 text-center sm:w-96 sm:justify-self-center ">
            <h2 className="text-3xl font-bold">
              {location.name}, {location.country}
            </h2>
            
            <p className="text-6xl font-light mt-4">
              {Math.round(current.main.temp)}°
              {unit === 'metric' ? 'C' : 'F'}
            </p>

            <p className="mt-3 text-lg opacity-80">
              {condition}
            </p>

            <div className="mt-4 text-sm opacity-70 space-y-1">
              <p>
                Wind: {current.wind.speed}{' '}
                {unit === 'metric' ? 'm/s' : 'mph'}
              </p>
              <p>Humidity: {current.main.humidity}%</p>
            </div>
          </div>
        )}

        {/* 📅 Forecast */}
        {/* 📅 Forecast */}
{forecast && (() => {
  // 1️⃣ Group by date
  const dailyMap = {}

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0] // YYYY-MM-DD

    // Prefer mid-day forecast (12:00:00) if available
    if (!dailyMap[date] || item.dt_txt.includes('12:00:00')) {
      dailyMap[date] = item
    }
  })

  // 2️⃣ Convert to array & take next 5 days (skip today)
  const dailyForecast = Object.values(dailyMap)
    .slice(1, 6)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {dailyForecast.map((item, index) => (
        <div
          key={index}
          className="glass p-4 text-center"
        >
          <p className="text-sm opacity-70">
            {new Date(item.dt_txt).toLocaleDateString(undefined, {
              weekday: 'short',
            })}
          </p>

          <p className="text-xl font-semibold mt-2">
            {Math.round(item.main.temp)}°
            {unit === 'metric' ? 'C' : 'F'}
          </p>

          <p className="mt-2 text-sm opacity-70">
            {item.weather[0].main}
          </p>

          <div className="mt-3 text-xs opacity-60 space-y-1">
            <p>
              Wind: {item.wind.speed}{' '}
              {unit === 'metric' ? 'm/s' : 'mph'}
            </p>
            <p>Humidity: {item.main.humidity}%</p>
          </div>
        </div>
      ))}
    </div>
  )
})()}
        {/* {forecast && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="glass p-4 text-center"
              >
                <p className="text-sm opacity-70">
                  {new Date(item.dt_txt).toLocaleDateString()}
                </p>

                <p className="text-xl font-semibold mt-2">
                  {Math.round(item.main.temp)}°
                  {unit === 'metric' ? 'C' : 'F'}
                </p>
                 <div className="mt-4 text-sm opacity-70 space-y-1">
              <p>
                Wind: {item.wind.speed}{' '}
                {unit === 'metric' ? 'm/s' : 'mph'}
              </p>
              <p>Humidity: {item.main.humidity}%</p>
            </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  )
}