import { createSlice } from '@reduxjs/toolkit'

// 🧠 Load initial cache safely (outside reducer)
const loadInitialState = () => {
  try {
    const cached = localStorage.getItem('weatherCache')
    if (!cached) return null
    return JSON.parse(cached)
  } catch (err) {
    console.error('Cache parse error:', err)
    return null
  }
}

const cachedState = loadInitialState()

const initialState = {
  current: cachedState?.current || null,
  forecast: cachedState?.forecast || null,
  location: cachedState?.location || null,
  lastUpdated: cachedState?.lastUpdated || null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.current = action.payload.current
      state.forecast = action.payload.forecast
      state.lastUpdated = Date.now()
    },

    setLocation: (state, action) => {
      state.location = action.payload
    },

    clearWeather: (state) => {
      state.current = null
      state.forecast = null
      state.lastUpdated = null
    },
  },
})

export const {
  setWeather,
  setLocation,
  clearWeather,
} = weatherSlice.actions

export default weatherSlice.reducer

