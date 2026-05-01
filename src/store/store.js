import { configureStore } from '@reduxjs/toolkit'

import performanceReducer from './slices/performanceSlice'
import searchReducer from './slices/searchSlice'
import themeReducer from './slices/themeSlice'
import unitReducer from './slices/unitSlice'

import { weatherApi } from './api/weatherApi'
import { loggerMiddleware } from './middleware/logger'

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    search: searchReducer,
    theme: themeReducer,
    unit: unitReducer,
    performance: performanceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(weatherApi.middleware)
      .concat(loggerMiddleware),

  devTools: import.meta.env.DEV,
})

/* ----------------------------
   Persist theme + unit safely
----------------------------- */
store.subscribe(() => {
  const state = store.getState()

  try {
    localStorage.setItem(
      'weather_unit',
      state.unit.unit
    )
    localStorage.setItem(
      'weather_theme',
      state.theme.mode
    )
  } catch (err) {
    console.error('Persistence error:', err)
  }
})