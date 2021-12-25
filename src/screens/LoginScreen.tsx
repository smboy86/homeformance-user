import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Button from '../basicComponents/Button';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import TextInput from '../basicComponents/TextInput';
import Colors from '../constants/Colors';
import Layout, { pxToDp } from '../constants/Layout';

export default function () {
  const [inputs, setInputs] = React.useState({
    textA: '',
    textB: '',
  });

  const navigation = useNavigation();

  const onChangeTextA = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textA: text,
    }));
  };

  const onChangeTextB = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textB: text,
    }));
  };

  return (
    <ContainerWithScroll safe>
      <Box
        full
        aCenter
        ph={16}
        pt={Layout.window.height * 0.138}
        style={{
          flex: 1,
        }}>
        <Text size={30}>홈퍼먼스</Text>
        <Box
          wFull
          pd={10}
          mt={pxToDp(41)}
          style={{
            borderWidth: 1,
            borderColor: Colors.borderGray,
            borderRadius: 4,
          }}>
          <TextInput
            setValue={onChangeTextA}
            placeholder='이메일을 입력하세요'
          />
        </Box>
        <Box
          wFull
          pd={10}
          mt={10}
          style={{
            borderWidth: 1,
            borderColor: Colors.borderGray,
            borderRadius: 4,
          }}>
          <TextInput
            setValue={onChangeTextB}
            placeholder='비밀번호를 입력하세요'
          />
        </Box>
        <Box wFull pt={20}>
          <Button fill label='로그인' onPress={() => null} />
        </Box>
        <Box row aCenter mt={pxToDp(40)}>
          <BoxPressable onPress={() => navigation.navigate('SearchPassword')}>
            <Text>비밀번호 찾기</Text>
          </BoxPressable>
          <Box
            style={{
              height: 10,
              borderRightWidth: 1,
              marginHorizontal: 8,
            }}
          />
          <BoxPressable onPress={() => navigation.navigate('Join')}>
            <Text>회원가입</Text>
          </BoxPressable>
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
