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

type Props = {
  itemImageUrl: string;
  itemName: string;
  itemPrice: string;
};

export default function (props: Props) {
  const navigation = useNavigation();
  return (
    <>
      <BoxPressable
        onPress={() => navigation.navigate('DetailItem')}
        ph={pxToDp(16)}>
        <Box row aCenter>
          <Box pd={10}>
            <Image
              source={{ uri: props.itemImageUrl }}
              style={{
                width: pxToDp(100),
                height: pxToDp(100),
              }}
            />
          </Box>
          <Box
            pl={6}
            style={{
              flex: 1,
            }}>
            <Text size={18} numberOfLines={3}>
              {props.itemName}
            </Text>
            <Text
              bold
              size={18}
              color='#FD0505'
              style={{
                paddingTop: 8,
              }}>
              {props.itemPrice}원
            </Text>
          </Box>
        </Box>
      </BoxPressable>
      <GreyBox />
    </>
  );
}
