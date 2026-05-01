const DB_NAME = "enterprise_weather_db"
const STORE_NAME = "forecast_store"
const VERSION = 1
const MAX_AGE = 60 * 60 * 1000

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject("IndexedDB not supported")
      return
    }

    const request = indexedDB.open(DB_NAME, VERSION)

    request.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "city" })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveForecast(city, data) {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, "readwrite")
  tx.objectStore(STORE_NAME).put({
    city,
    data,
    timestamp: Date.now(),
  })
}

export async function getForecast(city) {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, "readonly")
  const store = tx.objectStore(STORE_NAME)

  return new Promise(resolve => {
    const req = store.get(city)
    req.onsuccess = () => {
      if (!req.result) {
        resolve(null)
        return
      }

      const expired =
        Date.now() - req.result.timestamp > MAX_AGE

      resolve(expired ? null : req.result.data)
    }
  })
}