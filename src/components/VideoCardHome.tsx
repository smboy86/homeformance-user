import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout, { pxToDp } from '../constants/Layout';

export default function () {
  const navigation = useNavigation();
  return (
    <BoxPressable onPress={() => navigation.navigate('DetailVideo')}>
      <Box
        width={Layout.window.width}
        height={(Layout.window.width * 9) / 16}
        backColor={Colors.imgGray}
        jEnd
        ph={16}>
        <Box row pd={8} height={pxToDp(54)} mb={10}>
          <Box
            backColor='#fff'
            center
            style={{
              minWidth: 40,
            }}>
            <Image
              source={Images.logo}
              style={{
                width: 30,
                height: 30 * 1.03,
              }}
            />
          </Box>
          <Box backColor='#00000080' full pd={6}>
            <Text color='#fff'>숀리 엑스바이크 엑스텐 x10 실내자전거</Text>
            <Text color='#fff'>
              <Text color='red'>10%</Text>
              169,000원
            </Text>
          </Box>
        </Box>
      </Box>
      <Box row pd={16} center>
        <Box
          width={40}
          height={40}
          borderRadius={20}
          backColor='#F3F3F3'
          center>
          <Image
            source={Images.logo}
            style={{
              width: 22,
              height: 22 * 1.03,
            }}
          />
        </Box>
        <Box full ml={12}>
          <Text>
            톤온톤 인테리어 디자인으로 따뜻한 감성을 더한 공간으로 내가 좋아하는
            것들로 매일
          </Text>
          <Box mt={4}>
            <Text color={Colors.fontGray}>마리슈</Text>
          </Box>
        </Box>
      </Box>
    </BoxPressable>
  );
}
