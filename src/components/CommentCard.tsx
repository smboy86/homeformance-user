import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from '../basicComponents';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { pxToDp } from '../constants/Layout';

type Props = {
  id?: string;
  userName: string;
  comment: string;
};

export default function (props: Props) {
  return (
    <Box row aCenter mb={12}>
      <Box
        width={pxToDp(47)}
        height={pxToDp(47)}
        borderRadius={pxToDp(47 / 2)}
        style={{
          borderWidth: 1,
          borderColor: Colors.borderGray,
        }}>
        <Image
          source={Images.logoNew}
          style={{
            width: pxToDp(47),
            height: pxToDp(47),
          }}
        />
      </Box>
      <Box full ml={12}>
        <Text
          size={15}
          style={{
            marginBottom: 4,
          }}>
          {props.userName}
        </Text>
        <Text light size={15}>
          {props.comment}
        </Text>
      </Box>
    </Box>
  );
}
