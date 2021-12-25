import React from 'react';
import { Alert } from 'react-native';

import Box from '../basicComponents/Box';
import Button from '../basicComponents/Button';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import TextInputWithBorder from '../basicComponents/TextInputWithBorder';
import { pxToDp } from '../constants/Layout';

export default function () {
  const [inputs, setInputs] = React.useState({
    textA: '',
  });

  const onChangeTextA = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textA: text,
    }));
  };

  const onSendEmail = () => {
    Alert.alert('이메일 발송 완료\n이메일을 확인해주세요');
  };

  return (
    <ContainerWithScroll>
      <Box
        full
        aCenter
        ph={16}
        pt={pxToDp(40)}
        style={{
          flex: 1,
        }}>
        <TextInputWithBorder
          placeholder='이메일을 입력해주세요'
          setValue={onChangeTextA}
        />
        <Box wFull pt={14}>
          <Text size={14}>가입하신 이메일을 입력해주세요</Text>
          <Text size={14}>비밀번호 재설정 링크를 보내드립니다.</Text>
        </Box>
        <Box
          wFull
          jEnd
          pb={24}
          style={{
            flex: 1,
          }}>
          <Button fill label='이메일 발송' onPress={onSendEmail} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
