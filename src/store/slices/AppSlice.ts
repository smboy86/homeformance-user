import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const actionName = 'app';

const initialState = {
  isLogin: false,
};

// 99) slice
const appSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    logout(state, action) {
      state.isLogin = false;
    },
  },
});

export const appActions = { ...appSlice.actions };
export default appSlice.reducer;
