/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginNavigator from './LoginNavigator';
// import PubNavigator from './PubNavigator';
// import useAppStore from '../hooks/useAppStore';
import MainNavigator from './MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { authService, firestoreService } from '../../fireabse';
import { appActions } from '../store/slices/AppSlice';
import { doc, getDoc } from 'firebase/firestore';
// import useLocation from '../hooks/useLocation';

export default function RootNavigator() {
  const [isAppLoading, setIsAppLoading] = React.useState(true); // default 작업 없음

  const appStore = useSelector((state) => state.app);
  const dispatch = useDispatch();
  // const [isCompleteLocation] = useLocation();

  // React.useEffect(() => {
  //   if (isCompleteLocation) {
  //     setIsAppLoading(false);
  //   }
  // }, [isAppLoading]);

  React.useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(firestoreService, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('11111111    ', { ...docSnap.data() });
          dispatch(
            appActions.setUser({
              ...docSnap.data(),
              uid: docSnap.id,
            })
          );
        }
      } else {
        // dispatch(
        //   setUserInfo({
        //     isLogin: false,
        //   })
        // );
      }
    });

    setIsAppLoading(false);
  }, []);

  if (isAppLoading) return null;

  return (
    <NavigationContainer>
      {!appStore.isLogin ? <LoginNavigator /> : <MainNavigator />}
      {/* {true ? <LoginNavigator /> : <MainNavigator />} */}
    </NavigationContainer>
  );
}
