import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const actionName = 'common';

const initialState = {
  isLogin: false,
  test: '111',
};

// 99) slice
const commonSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
    },
    temp(state, action: PayloadAction<{ test: string }>) {
      state.test = action.payload.test;
    },
  },
});

export const commonActions = { ...commonSlice.actions };
export default commonSlice.reducer;
