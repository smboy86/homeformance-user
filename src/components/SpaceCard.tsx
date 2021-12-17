import * as React from 'react';
import { Alert, Image } from 'react-native';
import { SpaceInfo } from '../api/types';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';

type Props = SpaceInfo;

export default function SpaceCard(props: Props) {
  return (
    <Box
      style={{
        paddingVertical: 16,
      }}>
      <Image
        source={{ uri: props.image.uri }}
        style={{
          width: Layout.window.width - 32,
          height: (Layout.window.width - 32) * 0.875,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />
      <Text size={14} color={Colors.default.fontBlack} lineHeight={24}>
        {props.content}
      </Text>
    </Box>
  );
}
