import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Layout, { pxToDp } from '../constants/Layout';
import { VideoType } from '../types';

type props = VideoType & {
  id: string;
};
export default function (props: props) {
  const navigation = useNavigation();
  return (
    <BoxPressable
      onPress={() =>
        navigation.navigate('DetailVideo', {
          ...props,
        })
      }>
      <Box width={Layout.window.width} height={(Layout.window.width * 9) / 16}>
        <Image
          source={{ uri: props.videoThumb }}
          style={{
            width: Layout.window.width,
            height: (Layout.window.width * 9) / 16,
          }}
        />
        <Box
          row
          pd={8}
          width={Layout.window.width - 4}
          height={pxToDp(54)}
          style={{
            position: 'absolute',
            bottom: 10,
          }}>
          <Box
            backColor='#fff'
            center
            style={{
              minWidth: 40,
            }}>
            {console.log('222 :: ', props.itemThumb)}
            <Image
              source={{ uri: props.itemThumb }}
              style={{
                width: 30,
                height: 30 * 1.03,
              }}
            />
          </Box>
          <Box backColor='#00000080' full pd={6}>
            <Text color='#fff'>{props.itemName}</Text>
            <Text color='#fff'>
              <Text color='red'>{props.itemSale}</Text>
              {props.itemPrice}원
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
            source={{ uri: props.creatorThumb }}
            style={{
              width: 22,
              height: 22 * 1.03,
            }}
          />
        </Box>
        <Box full ml={12}>
          <Text>{props.videoTitle}</Text>
          <Box mt={4}>
            <Text color={Colors.fontGray}>{props.creator}</Text>
          </Box>
        </Box>
      </Box>
    </BoxPressable>
  );
}
