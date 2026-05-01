import { createSlice } from '@reduxjs/toolkit'

// 🔹 Load initial unit from localStorage safely
const getInitialUnit = () => {
  if (typeof window === 'undefined') return 'metric'

  const saved = localStorage.getItem('weather_unit')
  return saved === 'imperial' ? 'imperial' : 'metric'
}

const unitSlice = createSlice({
  name: 'unit',

  initialState: {
    unit: getInitialUnit(), // 'metric' | 'imperial'
  },

  reducers: {
    toggleUnit: (state) => {
      state.unit =
        state.unit === 'metric'
          ? 'imperial'
          : 'metric'
    },

    setUnit: (state, action) => {
      state.unit = action.payload
    },
  },
})

export const { toggleUnit, setUnit } = unitSlice.actions
export default unitSlice.reducer
