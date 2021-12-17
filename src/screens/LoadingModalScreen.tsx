import React from 'react';
import { ActivityIndicator, Button, View } from 'react-native';

export default function LoadingModalScreen({ navigation }: any) {
  const [isLong, setIsLong] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLong(true);
    }, 10000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
      <ActivityIndicator
        size="large"
        color={'#fff'}
        style={{
          zIndex: 1001,
        }}
      />
      {isLong && (
        <Button onPress={() => navigation.goBack()} title="닫기" color="#fff" />
      )}
    </View>
  );
}
