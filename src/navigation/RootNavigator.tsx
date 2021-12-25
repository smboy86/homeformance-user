/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginNavigator from './LoginNavigator';
// import PubNavigator from './PubNavigator';
// import useAppStore from '../hooks/useAppStore';
import MainNavigator from './MainNavigator';
// import useLocation from '../hooks/useLocation';

export default function RootNavigator() {
  const [isAppLoading, setIsAppLoading] = React.useState(false); // default 작업 없음

  // const appStore = useAppStore();
  // const [isCompleteLocation] = useLocation();

  // React.useEffect(() => {
  //   if (isCompleteLocation) {
  //     setIsAppLoading(false);
  //   }
  // }, [isAppLoading]);

  if (isAppLoading) return null;

  return (
    <NavigationContainer>
      {/* {appStore.token.refreshToken === '' ? ( */}
      {false ? <LoginNavigator /> : <MainNavigator />}
      {/* <PubNavigator /> */}
    </NavigationContainer>
  );
}
