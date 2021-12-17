import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CafeInfo } from '../../api/types';
import { CafeSliceInitialState } from './types';

const actionName = 'cafe';

const initialState: CafeSliceInitialState = {
  cafeInfo: null,
};

// 99) slice
const cafeSlice = createSlice({
  name: `${actionName}`,
  initialState,
  reducers: {
    // setCafeInfo(state, action: PayloadAction<CafeInfo>) {
    //   console.log('2222 :: ', action);
    //   state.cafeInfo = action.payload;
    // },
    // setSignatureMenuList(state, action: PayloadAction<SignatureMenu[]>) {
    //   state.signatureMenuList = action.payload;
    // },
    // saveRecCafeInfo(state, action) {
    //   state.joinInfo.recCafeInfo = {
    //     ...state.joinInfo.recCafeInfo,
    //     ...action.payload,
    //   };
    // },
    // // Todo - update 로 변경해야 되는거 아닌가.. (명칭이 헷갈림)
    // setUserDB(state, action: PayloadAction<UserDB>) {
    //   state.userDB = { ...state.userDB, ...action.payload };
    // },
    // setRegDeok(state, action: PayloadAction<boolean>) {
    //   state.isRegDeok = action.payload;
    // },
    // setUserNickname(state, action: PayloadAction<{ nickname: string }>) {
    //   state.userDB.nickname = action.payload.nickname;
    // },
    // setIsArtist(state, action: PayloadAction<{ isArtist: boolean }>) {
    //   state.isArtist = action.payload.isArtist;
    // },
    // setUserProfileImage(state, action: PayloadAction<{ profileImage: string }>) {
    //   state.userDB.profileImage = action.payload.profileImage;
    // },
    // setTokenPushNoti(state, action) {
    //   state.tokenPushNoti = action.payload.token;
    // },
    // setUserSubPushType(state, action) {
    //   state.userDB.subPushType = {
    //     ...state.userDB.subPushType,
    //     ...action.payload,
    //   };
    // },
  },
});

export const {} = cafeSlice.actions;
export default cafeSlice.reducer;
