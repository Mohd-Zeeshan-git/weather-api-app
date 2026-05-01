import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    input: '',
    city: null,
  },
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
      state.input = ''   // Clear search after selection
    },
  },
})

export const { setInput, setCity } = searchSlice.actions
export default searchSlice.reducer
