import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const actionName = 'app';

const initialState = {
  isLogin: false,
  user: null,
  items: null,
};

// 99) slice
const appSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const appActions = { ...appSlice.actions };
export default appSlice.reducer;
