import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const actionName = 'user';

const initialState = {
  isLogin: false,
  joinInfo: {
    recCafeInfo: {
      selRecommendCafeId: 0,
      selRecommendCafeName: '추천 카페를 입력해주세요!',
      selIngRecommendCafeId: '',
    },
  },
};

// 99) slice
const userSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    saveRecCafeInfo(state, action) {
      state.joinInfo.recCafeInfo = {
        ...state.joinInfo.recCafeInfo,
        ...action.payload,
      };
    },
  },
});

export const { saveRecCafeInfo } = userSlice.actions;
export default userSlice.reducer;
