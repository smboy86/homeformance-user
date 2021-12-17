import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { cafeApi } from '../api/cafe';
import { commonApi } from '../api/common';
import { commonAuthApi } from '../api/commonAuth';
import { customersApi } from '../api/customers';
import appSlice from './slices/AppSlice';
import CafeSlice from './slices/CafeSlice';
import userReducer from './slices/UserSlice';

const RootReducer = combineReducers({
  app: appSlice,
  user: userReducer,
  cafe: CafeSlice,
  [authApi.reducerPath]: authApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [commonAuthApi.reducerPath]: commonAuthApi.reducer,
  [cafeApi.reducerPath]: cafeApi.reducer,
  [customersApi.reducerPath]: customersApi.reducer,
});

// export root reducer's state type
export type RootState = ReturnType<typeof RootReducer>;

// export default RootReducer;
export default (state: any, action: any) =>
  RootReducer(
    action.type === 'USER_LOGOUT' ? (state = undefined) : state,
    action,
  );
