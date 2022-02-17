import { StyleSheet } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

Sentry.init({
  dsn: 'https://d39ca52458374366a903cf75fea68a98@o1092928.ingest.sentry.io/6111892',
  enableNative: false,
  // debug: __DEV__, // true = error 가 호로로록 뜸
  // enableNativeNagger: false,
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
