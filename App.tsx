import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

import useCachedResources from './src/hooks/useCachedResources';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/store';
import { useEffect } from 'react';

Sentry.init({
  dsn: 'https://d39ca52458374366a903cf75fea68a98@o1092928.ingest.sentry.io/6111892',
  enableNative: false,
  // debug: __DEV__, // true = error 가 호로로록 뜸
  // enableNativeNagger: false,
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  const handleCheckUpdate = async () => {
    try {
      const asd = await Updates.fetchUpdateAsync();
      console.log('앱 업데이트', asd);
      // alert(JSON.stringify(asd));
    } catch (error: any) {
      // alert(JSON.stringify(error.message));
    }
  };

  const handleForceUpdate = async () => {
    await Updates.reloadAsync();
  };

  useEffect(() => {
    handleCheckUpdate();
    // handleForceUpdate();
  }, []);

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
