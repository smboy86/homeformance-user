import * as React from 'react';
import { Image } from 'react-native';
import ImageView from 'react-native-image-viewing';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Menu } from '../api/types';
import { priceToString } from '../utils/CommonUtil';

type Props = Menu;

export default function CafeInfoMenuCard(props: Props) {
  const [isViewImage, setIsViewImage] = React.useState(false);

  return (
    <Box
      style={{
        paddingTop: 16,
      }}>
      <Box
        row
        space
        aCenter
        style={{
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor: Colors.default.borderGrayColor,
        }}>
        <Box>
          <Box row aCenter>
            <Text medium size={18} color={Colors.default.fontBlack}>
              {props.name}
            </Text>
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
        <BoxPressable onPress={() => setIsViewImage(true)}>
          <Image
            source={{ uri: props.image.uri }}
            style={{
              width: Layout.window.width * 0.16,
              height: Layout.window.width * 0.16,
              borderRadius: 4,
            }}
          />
          <ImageView
            images={[{ uri: props.image.uri }]}
            imageIndex={0}
            visible={isViewImage}
            onRequestClose={() => setIsViewImage(false)}
          />
        </BoxPressable>
      </Box>
    </Box>
  );
}
