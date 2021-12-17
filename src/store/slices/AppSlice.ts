import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const actionName = 'app';

const initialState = {
  isTutorial: false,
  isPersist: false,
  cafeInfoDefault: {
    name: '',
    profileImage: '',
  },
  token: {
    accessToken: '',
    refreshToken: '',
  },
  myLocation: {
    locationUpdatedDate: '',
    roadAddress: '',
    postalCode: '',
  },
};

// 99) slice
const appSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) {
      state.token = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    refreshToken(state, action) {
      state.token = {
        ...state.token,
        accessToken: action.payload.accessToken,
      };
    },
    logout(state, action) {
      state.token = {
        accessToken: '',
        refreshToken: '',
      };
    },
    saveMyLocation(
      state,
      action: PayloadAction<{
        locationUpdatedDate: string;
        roadAddress: string;
        postalCode: string;
      }>,
    ) {
      state.myLocation = action.payload;
    },
  },
});

export const { setCredentials, refreshToken, logout, saveMyLocation } =
  appSlice.actions;
export default appSlice.reducer;
