import React from 'react';
import { Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import { BarcodeModalProp } from '../navigation/types';

export default function BarcodeModalScreen() {
  const [isLong, setIsLong] = React.useState(false);

  const navigation = useNavigation();
  const route = useRoute<BarcodeModalProp>();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLong(true);
    }, 10000);
  }, []);

  return (
    <BoxPressable
      onPress={() => navigation.goBack()}
      style={{
        width: Layout.window.width,
        height: Layout.window.height,
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
      <Box
        center
        style={{
          width: Layout.window.width,
          height: Layout.window.height * 0.46,
          borderBottomEndRadius: 10,
          backgroundColor: '#fff',
          paddingTop: 18,
        }}>
        <Box center row>
          <Image
            source={Images.icoBeen}
            style={{
              width: 16,
              height: 16,
            }}
          />
          <Text medium size={16} color={'#937665'}>
            {route.params.cafeName}
          </Text>
        </Box>
        <Text
          bold
          size={22}
          color={Colors.default.fontBlack}
          style={{
            paddingTop: 12,
            paddingBottom: 20,
          }}>
          {route.params.discountTitle}
        </Text>
        <Image
          source={{ uri: route.params.couponInfo.image.uri }}
          style={{
            width: Layout.window.width * 0.7,
            height: Layout.window.width * 0.7 * 0.513,
            marginBottom: 22,
          }}
        />
        <Text
          size={14}
          color={Colors.default.commonGrey}
          style={{
            paddingTop: 4,
          }}>
          {route.params.couponInfo.name}
        </Text>
        <Text size={14} color={Colors.default.commonGrey}>
          {route.params.dateTitle}
        </Text>
      </Box>
    </BoxPressable>
  );
}
