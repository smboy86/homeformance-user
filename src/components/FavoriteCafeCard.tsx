import * as React from 'react';
import { Image } from 'react-native';

import { FavoriteCafe } from '../api/types';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

type Props = FavoriteCafe & {
  onPress: () => void;
  onPressBarcode: () => void;
};

export default function FavoriteCafeCard(props: Props) {
  return (
    <BoxPressable
      onPress={props.onPress}
      row
      space
      center
      shadow
      style={{
        padding: 16,
        marginTop: 16,
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 10,
      }}>
      <Box row center>
        <Image
          source={{ uri: props.backgroundImage.uri }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 17,
          }}
        />
        <Box>
          <Text bold size={16} color={Colors.default.fontBlack}>
            {props.name}
          </Text>
          <Text
            size={12}
            color={Colors.default.fontBlack}
            style={{
              paddingTop: 8,
            }}>
            {props.simpleAddress}
          </Text>
        </Box>
      </Box>
      <BoxPressable onPress={props.onPressBarcode}>
        <Image
          source={Images.icoQR}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </BoxPressable>
    </BoxPressable>
  );
}
