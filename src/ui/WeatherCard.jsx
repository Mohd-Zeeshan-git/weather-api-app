export default function WeatherCard({ weather }) {
  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8">
      <h1 className="text-4xl font-bold">Ultra Weather</h1>
      <p className="mt-2 text-lg">Condition: {weather.condition}</p>
      <p className="text-6xl font-bold mt-4">{weather.temp}°C</p>
      
    </div>
  )
}
