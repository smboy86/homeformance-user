/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginNavigator from './LoginNavigator';
// import PubNavigator from './PubNavigator';
// import useAppStore from '../hooks/useAppStore';
import MainNavigator from './MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { authService, firestoreService } from '../../fireabse';
import { commonActions } from '../store/slices/CommonSlice';
// import useLocation from '../hooks/useLocation';

export default function RootNavigator() {
  const [isAppLoading, setIsAppLoading] = React.useState(true); // default 작업 없음

  const commonStore = useSelector((state) => state.common);
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
        dispatch(commonActions.login({}));
        // const docRef = doc(firestoreService, 'users', user.uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists) {
        //   dispatch(
        //     setUserInfo({
        //       uid: user.uid,
        //       isLogin: true,
        //       userInfo: {
        //         ...docSnap.data(),
        //       },
        //     })
        //   );
        // }
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
      {commonStore.isLogin ? <LoginNavigator /> : <MainNavigator />}
      {/* {true ? <LoginNavigator /> : <MainNavigator />} */}
    </NavigationContainer>
  );
}
