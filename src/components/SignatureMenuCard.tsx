import * as React from 'react';
import { Image } from 'react-native';
import { Video } from 'expo-av';

import { SignatureMenu } from '../api/types';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import { priceToString } from '../utils/CommonUtil';
import { useNavigation } from '@react-navigation/core';
import { MainStackNavigationProp } from '../navigation/types';

type Props = SignatureMenu & {};

export default function SignatureMenuCard(props: Props) {
  const video = React.useRef(null);
  const navigation = useNavigation<MainStackNavigationProp>();

  const onReadyForDisplay = event => {};

  return (
    <Box
      shadow
      style={{
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
      }}>
      <BoxPressable
        onPress={() =>
          navigation.navigate('VideoModal', {
            videoUri: props.video.uri,
          })
        }>
        <Image
          source={Images.icoBtnPlay}
          style={{
            position: 'absolute',
            top: (Layout.window.width * 0.445) / 2 - 16,
            left: (Layout.window.width * 0.445) / 2 - 16,
            width: 32,
            height: 32,
            zIndex: 1000,
          }}
        />
        <Video
          ref={video}
          style={{
            width: Layout.window.width * 0.445,
            height: Layout.window.width * 0.445,
          }}
          source={{
            uri: props.video.uri,
          }}
          resizeMode="cover"
          onReadyForDisplay={onReadyForDisplay}
        />
      </BoxPressable>
      <Box
        style={{
          padding: 12,
        }}>
        <Box row>
          <Text>{props.name}</Text>
          {props.isHot || props.isNew || props.isBest ? (
            <Box
              center
              style={{
                height: 16,
                paddingHorizontal: 6,
                paddingVertical: 0,
                marginLeft: 4,
                borderRadius: 4,
                backgroundColor: '#f79772',
              }}>
              <Text medium size={10} color={'#fff'} lineHeight={12}>
                {props.isHot ? 'HOT' : props.isNew ? 'NEW' : 'BEST'}
              </Text>
            </Box>
          ) : null}
        </Box>
        <Text>{priceToString(props.price)}원</Text>
      </Box>
    </Box>
  );
}
