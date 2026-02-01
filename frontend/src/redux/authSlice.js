import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,   // ✅ MUST start true
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false; // ✅ auth check finished
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
