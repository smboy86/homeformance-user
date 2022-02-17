import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch } from 'react-redux';
// middleware
import thunk from 'redux-thunk';
// storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// root reducer
import RootReducer, { RootState } from './RootReducer';
// import { authApi } from '../api/auth';
// import { commonApi } from '../api/common';
// import { cafeApi } from '../api/cafe';
// import { commonAuthApi } from '../api/commonAuth';
// import { customersApi } from '../api/customers';

const persistConfig = {
  key: 'root',
  version: 2,
  storage: AsyncStorage,
  // whitelist: ['app'], // save only app reducer
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const arrMiddlewares = [
  thunk,
  // authApi.middleware,
  // commonApi.middleware,
  // commonAuthApi.middleware,
  // cafeApi.middleware,
  // customersApi.middleware,
];

if (__DEV__) {
  // not working in Expo
  // const createDebugger = require('redux-flipper').default;
  // arrMiddlewares.push(createDebugger());
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: arrMiddlewares,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

// dispatch & selector hooks
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
// export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

// 21.11.18 add
declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export default store;
