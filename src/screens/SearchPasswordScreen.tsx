import * as React from 'react';
import { Alert, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../basicComponents/Box';
import Button from '../basicComponents/Button';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Container from '../basicComponents/Container';
import TextInput from '../basicComponents/TextInput';
import BoxPressable from '../basicComponents/BoxPressable';
import { MainStackParamList } from '../navigation/types';
import { useSearchPasswrodMutation } from '../api/auth';

type Props = NativeStackScreenProps<MainStackParamList, 'SearchCafe'>;

export default function SearchPasswordScreen({ navigation }: Props) {
  const [text, setText] = React.useState('');

  const [searchPw] = useSearchPasswrodMutation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '비밀번호 찾기',
      headerLeft: () => (
        <BoxPressable
          onPress={() => navigation.popToTop()}
          style={{
            padding: 8,
          }}>
          <Image
            source={Images.icoCloseX}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </BoxPressable>
      ),
    });
  }, []);

  const onSearchPassword = async () => {
    if (text == '') {
      Alert.alert('', '이메일을 입력해주세요');
      return;
    }
    try {
      await searchPw({ email: text }).unwrap();
      navigation.navigate('CompleteSearchPassword', {
        email: text,
      });
    } catch (error) {
      console.log('onSearchPassword  errr  :::  ', error);
      if (error?.data.errorCode === 1008) {
        Alert.alert('', error?.data.errorMessage);
      } else if (error?.data.errorCode === 1007) {
        Alert.alert('', error?.data.errorMessage);
      } else {
        Alert.alert('', '비밀번호 찾기 오류');
      }
    }
  };

  return (
    <Container>
      <Box
        style={{
          paddingVertical: 22,
          paddingHorizontal: 16,
        }}>
        <Box
          style={{
            paddingHorizontal: 16,
          }}>
          <Text
            bold
            size={12}
            color={Colors.default.fontBlack}
            style={{
              paddingTop: 24,
              paddingBottom: 8,
            }}>
            이메일
          </Text>
          <Box row aCenter space>
            <Box
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#e5e5e5',
              }}>
              <TextInput
                placeholder={'이메일주소'}
                placeholderTextColor={'#989696'}
                value={text}
                setValue={setText}
                style={{
                  paddingVertical: 8,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            label={'임시 비밀번호 발송'}
            onPress={onSearchPassword}
            style={{
              backgroundColor: '#f6f6f6',
              borderWidth: 1,
              borderColor: '#dddddf',
              marginTop: 30,
              marginBottom: 40,
            }}
          />
        </Box>
        <Text size={12} color={'#a0a0a0'}>
          - 가입시 작성한 이메일 주소를 대소문자 구분해 공백업시 입력하시면 임시
          비밀번호가 발송됩니다
        </Text>
        <Text size={12} color={'#a0a0a0'}>
          - 이메일 수신거부, 용량초과, 휴면계정 상태시 메일을 받을 수 없습니다
        </Text>
      </Box>
    </Container>
  );
}
