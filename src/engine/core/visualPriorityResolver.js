const PRIORITY_MAP = {
  thunderstorm: 100,
  snow: 90,
  rain: 80,
  drizzle: 70,
  fog: 60,
  mist: 60,
  clouds: 40,
  clear: 10,
}

export function resolveVisualPriority(condition) {
  if (!condition || typeof condition !== "string") {
    return "clear"
  }

  const normalized = condition.toLowerCase()

  if (PRIORITY_MAP[normalized]) return normalized

  if (normalized.includes("thunder")) return "thunderstorm"
  if (normalized.includes("snow")) return "snow"
  if (normalized.includes("rain")) return "rain"
  if (normalized.includes("fog") || normalized.includes("mist"))
    return "fog"
  if (normalized.includes("cloud")) return "clouds"

  return "clear"
}