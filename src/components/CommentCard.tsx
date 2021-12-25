import React from 'react';
import { Box, Text } from '../basicComponents';
import Colors from '../constants/Colors';
import { pxToDp } from '../constants/Layout';

export default function () {
  return (
    <Box row aCenter mb={12}>
      <Box
        backColor={Colors.fontGray}
        width={pxToDp(47)}
        height={pxToDp(47)}
        borderRadius={pxToDp(47 / 2)}
      />
      <Box full ml={12}>
        <Text
          style={{
            marginBottom: 4,
          }}>
          홈퍼먼스 유저1
        </Text>
        <Text size={16}>저렴하게 잘 봐서 만족스러워요 </Text>
      </Box>
    </Box>
  );
}
