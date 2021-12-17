import * as React from 'react';
import { Image } from 'react-native';
import { NearByCafes } from '../api/types';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';

type Props = NearByCafes & {
  onPress: (cafeId: number) => void;
};

export default function MainCafeCard(props: Props) {
  return (
    <BoxPressable
      onPress={() => props.onPress(props.id)}
      style={{
        paddingHorizontal: 2,
        paddingVertical: 2,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 20,
      }}>
      <Box
        aCenter
        shadow
        style={{
          height: Layout.window.width * 0.637,
          backgroundColor: '#fff',
        }}>
        <Image
          source={{ uri: props.profileImage.uri }}
          style={{
            width: Layout.window.width - 16,
            height: (Layout.window.width - 16) * 0.459,
          }}
        />
        <Box
          wFull
          row
          space
          style={{
            padding: 14,
          }}>
          <Box>
            <Text bold size={18} color={Colors.default.fontBlack}>
              {props.name}
            </Text>
            <Box
              row
              aCenter
              style={{
                paddingTop: 8,
              }}>
              <Image
                source={Images.icoHeart}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
              <Text
                size={12}
                color={Colors.default.commonGrey}
                style={{
                  marginRight: 10,
                }}>
                {props.customerLikesCafes.length}
              </Text>
              <Text size={12} color={Colors.default.commonGrey}>
                {`게시글 ${props.cafePosts.length}개`}
              </Text>
            </Box>
          </Box>
          <Box>
            <Image
              source={Images.icoDirection}
              style={{
                width: 30,
                height: 30,
                marginBottom: 6,
              }}
            />
            <Text medium size={12} color={Colors.default.tintBrown}>
              {Math.round(props.distance)}m
            </Text>
          </Box>
        </Box>
      </Box>
    </BoxPressable>
  );
}
