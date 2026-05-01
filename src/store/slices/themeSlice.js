import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  const saved = localStorage.getItem('weather_theme')
  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  return 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    setTheme: (state, action) => {
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer