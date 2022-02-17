import React from 'react';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome } from '@expo/vector-icons';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, Text, TextInput } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { useReduxDispatch } from '../store';
import { appActions } from '../store/slices/AppSlice';
import { useSelector } from 'react-redux';

export default function () {
  const [name, setName] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useReduxDispatch();
  const appStore = useSelector((state) => state.app);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '나의 정보',
      headerTitle: '나의 정보',
      // headerRight: () => (
      //   <BoxPressable
      //     height={46}
      //     center
      //     onPress={() => Alert.alert('저장 되었습니다')}>
      //     <FontAwesome name='save' size={24} color='#4231CA' />
      //   </BoxPressable>
      // ),
    });

    setName(appStore.user.name);
  }, []);

  const onLogout = () => {
    dispatch(appActions.logout());
  };

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
        <BoxPressable onPress={onLogout} mt={30}>
          <Text>로그아웃</Text>
        </BoxPressable>
      </Box>
    </ContainerWithScroll>
  );
}
