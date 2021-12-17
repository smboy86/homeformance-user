import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Sentry from '@sentry/react-native';

import BoxPressable from './src/basicComponents/BoxPressable';
import Colors from './src/constants/Colors';
import Svgs from './src/constants/Svgs';
import useCachedResources from './src/hooks/useCachedResources';
import Text from './src/basicComponents/Text';

Sentry.init({
  dsn: 'https://d39ca52458374366a903cf75fea68a98@o1092928.ingest.sentry.io/6111892',
  enableNative: false,
  // debug: __DEV__, // true = error 가 호로로록 뜸
  // enableNativeNagger: false,
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  const onSentryTest = () => {
    try {
      //
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          screen: 'APP.tsx',
        },
      });
      console.log('eee  ', error);
    }

    console.log('센츄리 오케이');
  };

  if (!isLoadingComplete) return null;

  return (
    <View style={styles.container}>
      <Text>1111111Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
      <BoxPressable onPress={onSentryTest}>
        <Text>누르세요</Text>
      </BoxPressable>
    </View>
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
