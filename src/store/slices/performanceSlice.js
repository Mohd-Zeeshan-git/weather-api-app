import { createSlice } from "@reduxjs/toolkit"

const performanceSlice = createSlice({
  name: "performance",
  initialState: { mode: "high" },
  reducers: {
    togglePerformance: state => {
      state.mode = state.mode === "high" ? "low" : "high"
    },
  },
})

export const { togglePerformance } = performanceSlice.actions
export default performanceSlice.reducer