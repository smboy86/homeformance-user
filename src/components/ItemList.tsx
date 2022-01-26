import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout, { pxToDp } from '../constants/Layout';
import GreyBox from './GreyBox';

export default function () {
  const navigation = useNavigation();
  return (
    <>
      <BoxPressable
        onPress={() => navigation.navigate('DetailItem')}
        ph={pxToDp(16)}>
        <Box row aCenter>
          <Image
            source={Images.logoNew}
            style={{
              width: pxToDp(120),
              height: pxToDp(120),
            }}
          />
          <Box
            pl={6}
            style={{
              flex: 1,
            }}>
            <Text size={18} numberOfLines={3}>
              홈플래닛 초음파 가습기 4L, HL1-1001D1 (반투명 물탱크/타이머&무드등
              설정기능)
            </Text>
            <Text
              bold
              size={18}
              color='#FD0505'
              style={{
                paddingTop: 8,
              }}>
              12,240원
            </Text>
          </Box>
        </Box>
      </BoxPressable>
      <GreyBox />
    </>
  );
}
