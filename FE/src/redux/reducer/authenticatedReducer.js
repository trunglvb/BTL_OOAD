import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
