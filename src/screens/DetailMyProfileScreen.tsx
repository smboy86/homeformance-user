import React from 'react';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, TextInput } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

export default function () {
  const [name, setName] = React.useState('유저1');
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '나의 정보',
      headerRight: () => (
        <BoxPressable
          height={46}
          center
          onPress={() => Alert.alert('저장 되었습니다')}>
          <FontAwesome name='save' size={24} color='#4231CA' />
        </BoxPressable>
      ),
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box center pt={30}>
        <Image
          source={Images.logoNew}
          style={{
            width: pxToDp(100),
            height: pxToDp(100),
            borderRadius: pxToDp(50),
            borderWidth: 1,
            borderColor: Colors.borderGray,
          }}
        />
        <Box
          mt={12}
          pv={8}
          ph={20}
          aCenter
          style={{
            width: Layout.window.width * 0.6,
            backgroundColor: '#00000010',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: Colors.borderGray,
          }}>
          <TextInput placeholder='' setValue={setName} value={name} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
