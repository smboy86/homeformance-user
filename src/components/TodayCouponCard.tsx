import * as React from 'react';
import { Image } from 'react-native';
import dayjs from 'dayjs';
import ExpoFastImage from 'expo-fast-image';

import { BannerCouponing } from '../api/types';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';

export default function TodayCouponCard({
  id,
  name,
  startDate,
  endDate,
  discountMethod,
  discountAmount,
  cafe,
  onPress,
  newImageUrl,
}: BannerCouponing) {
  return (
    <BoxPressable
      onPress={() => onPress(cafe.id)}
      key={id.toString()}
      style={{
        paddingHorizontal: 2,
        paddingVertical: 2,
        marginRight: 14,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}>
      <Box
        row
        aCenter
        shadow
        style={{
          width: Layout.window.width * 0.645,
          height: Layout.window.width * 0.347,
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        {/* <Image
          source={{ uri: cafe.profileImage.uri }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        /> */}
        <ExpoFastImage
          uri={cafe.profileImage.uri}
          cacheKey={id}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
        <Box
          style={{
            paddingLeft: 16,
          }}>
          <Text bold size={12} color={'#685448'}>
            {name}
          </Text>
          <Text
            bold
            size={18}
            color={Colors.default.fontBlack}
            style={{
              paddingVertical: 9,
            }}>
            {discountMethod === 'percentage'
              ? `${discountAmount}% 할인`
              : `${discountAmount}원 할인`}
          </Text>
          <Text size={10} color={Colors.default.commonGrey}>
            음료 12,000원 이상 구매시
          </Text>
          <Text size={10} color={Colors.default.commonGrey}>
            {`${dayjs(startDate).format('YYYY.MM.DD')} ~ ${dayjs(
              endDate,
            ).format('YYYY.MM.DD')}`}
          </Text>
        </Box>
      </Box>
    </BoxPressable>
  );
}
