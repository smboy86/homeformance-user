import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import BoxPressable from '../basicComponents/BoxPressable';
import Layout from '../constants/Layout';
import { MainStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'VideoModal'>;

export default function VideoModalScreen({ navigation, route }: Props) {
  const video = React.useRef(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BoxPressable
          onPress={() => navigation.goBack()}
          style={{
            padding: 12,
            marginRight: -6,
          }}>
          <Ionicons name="close" size={24} color="#fff" />
        </BoxPressable>
      ),
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}>
      <Video
        ref={video}
        style={{
          width: Layout.window.width,
          height: (Layout.window.width * 9) / 16,
        }}
        source={{
          uri: route.params.videoUri,
        }}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
    </View>
  );
}
