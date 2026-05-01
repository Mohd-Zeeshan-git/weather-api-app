/* =========================================================
   Geolocation Service
   - Returns Promise
   - Safe browser support
   - High accuracy enabled
   - Timeout protection
========================================================= */

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported by this browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords)
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject("User denied location permission.")
            break
          case error.POSITION_UNAVAILABLE:
            reject("Location information unavailable.")
            break
          case error.TIMEOUT:
            reject("Location request timed out.")
            break
          default:
            reject("Unknown location error.")
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

