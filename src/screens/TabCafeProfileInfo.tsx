import * as React from 'react';
import { Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Postcode from '@actbase/react-daum-postcode';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Layout from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Images from '../constants/Images';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';

export default function TabCafeProfileInfo(prop) {
  console.log('ddddd :: ', prop.layout);
  const insets = useSafeAreaInsets();
  const [isModalAlert, setIsModalAlert] = React.useState(true);

  const onSelctedAddress = (data: any) => {
    // console.log('aaaa  :: ', data);
    Alert.alert('', `주소 : ${data.roadAddress}을\n선택하셨습니다`);
  };

  // ;

  return (
    <Box
      border
      onLayout={prop.layout}
      // onLayout={event => {
      //   const { x, y, width, height } = event.nativeEvent.layout;
      //   console.log('asdfasdf :: ', x, y, width, height);
      // }}
    >
      <Text>2222</Text>
      <Text>3333</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>11111</Text>
      <Text>22222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
      <Text>222222</Text>
    </Box>
  );
}
