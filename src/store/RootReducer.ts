import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './slices/AppSlice';

const RootReducer = combineReducers({
  app: appSlice,
});

// export root reducer's state type
export type RootState = ReturnType<typeof RootReducer>;

// export default RootReducer;
export default (state: any, action: any) =>
  RootReducer(
    action.type === 'USER_LOGOUT' ? (state = undefined) : state,
    action
  );
