import dayjs from 'dayjs';
import * as React from 'react';
import { Image } from 'react-native';
import { NewsInfo } from '../api/types';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import GreyBox from './GreyBox';

type Props = NewsInfo & {
  cafeProfileImageUri: string | undefined;
  cafeName: string | undefined;
};

export default function StoreFeedCard(props: Props) {
  return (
    <>
      <Box
        style={{
          padding: 16,
          backgroundColor: '#fff',
          position: 'relative',
          borderRadius: 10,
          paddingBottom: 26,
        }}>
        <Box row>
          <Image
            source={{ uri: props.cafeProfileImageUri }}
            style={{
              width: Layout.window.width * 0.117,
              height: Layout.window.width * 0.117,
              borderRadius: (Layout.window.width * 0.117) / 2,
            }}
          />
          <Box
            jCenter
            style={{
              marginLeft: 8,
            }}>
            <Text
              bold
              size={14}
              color={'rgba(0,0,0,0.85)'}
              style={{
                marginBottom: 2,
              }}>
              {props.cafeName}
            </Text>
            <Text size={12} color={Colors.default.commonGrey}>
              {dayjs(props.createdAt).format('YYYY.MM.DD')}
            </Text>
          </Box>
        </Box>
        <Box
          style={{
            paddingTop: 14,
          }}>
          <Text size={14} color={'rgba(0,0,0,0.85)'} lineHeight={24}>
            {props.content}
          </Text>
        </Box>
        <Box
          style={{
            marginTop: 12,
          }}>
          <Image
            source={{ uri: props.image.uri }}
            style={{
              width: Layout.window.width - 32,
              height: (Layout.window.width - 32) * 0.71,
              borderRadius: 10,
            }}
          />
        </Box>
      </Box>
      <GreyBox />
    </>
  );
}
