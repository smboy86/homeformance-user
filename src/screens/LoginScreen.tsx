import * as React from 'react';
import { Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../basicComponents/Box';
import Button from '../basicComponents/Button';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import TextInput from '../basicComponents/TextInput';
import BoxPressable from '../basicComponents/BoxPressable';
import { setCredentials } from '../store/slices/AppSlice';
import { useLoginMutation } from '../api/auth';
import { LoginStackNavigationProp } from '../navigation/types';
import SocialLoginByNaver from '../components/SocialLoginByNaver';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import SocialLoginByKakao from '../components/SocialLoginByKakao';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const insets = useSafeAreaInsets();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginStackNavigationProp>();
  // const { params } = useRoute<RouteProp<LoginStackParamList, 'Login'>>();

  const onLogin = async () => {
    if (email.length < 2) {
      Alert.alert('', '이메일을 입력해주세요');
      return;
    }

    if (password.length < 2) {
      Alert.alert('', '패스워드를 입력해주세요.');
      return;
    }

    try {
      const resultLogin = await login({
        email: email,
        password: password,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: resultLogin.data.accessToken,
          refreshToken: resultLogin.data.refreshToken,
        }),
      );
    } catch (err: any) {
      console.log('eeeeeee :: ', err.status, err.data.errorCode);

      if (err.data.errorCode === 1001) {
        Alert.alert('', '이메일 주소 혹은 비밀번호가\n일치하지 않습니다.');
        return;
      } else if (err.data.errorCode === 1004) {
        Alert.alert('', '이메일 주소 혹은 비밀번호가\n일치하지 않습니다.');
        return;
      } else if (err.data.errorCode === 1005) {
        Alert.alert('', '회원가입 인증이 되지 않았습니다.');
        return;
      } else {
        Alert.alert('', '시스템 오류');
        return;
      }
    }
  };

  return (
    <ContainerWithScroll>
      <LinearGradient
        colors={[Colors.default.brownStart, Colors.default.brownEnd]}
        style={{
          height: Layout.window.height,
          justifyContent: 'space-between',
          paddingTop: insets.top,
          paddingHorizontal: 26,
        }}>
        <Box
          style={{
            flex: 1,
          }}>
          <Box
            center
            style={{
              paddingVertical: Layout.window.width * 0.11,
            }}>
            <Image
              source={Images.imgOtherLogo}
              style={{
                width: Layout.window.width * 0.304,
                height: Layout.window.width * 0.133,
              }}
            />
          </Box>
          <Box>
            <TextInput
              value={email}
              placeholder={'이메일 주소 또는 아이디'}
              placeholderTextColor={'#fff'}
              setValue={setEmail}
              keyboardType={'email-address'}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 16,
                fontFamily: 'spoqaRegular',
                fontSize: 12,
                color: '#fff',
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <TextInput
              value={password}
              placeholder={'비밀번호 입력'}
              placeholderTextColor={'#fff'}
              setValue={setPassword}
              secureTextEntry={true}
              // double click
              // onEndEditing={() => onLogin()}
              // onSubmitEditting={() => onLogin()}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 16,
                marginTop: 10,
                fontFamily: 'spoqaRegular',
                fontSize: 12,
                color: '#fff',
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </Box>
          <Button
            label={'로그인'}
            onPress={onLogin}
            style={{
              marginTop: 20,
              borderRadius: 25,
            }}
          />
          <Box
            row
            jCenter
            style={{
              marginTop: 16,
            }}>
            <BoxPressable
              onPress={() => navigation.navigate('SearchPassword')}
              style={{
                padding: 4,
              }}>
              <Text size={12} color={'#fff'}>
                비밀번호 찾기
              </Text>
            </BoxPressable>
            <Box>
              <Text
                size={12}
                color={'#fff'}
                style={{
                  paddingTop: 4,
                  paddingHorizontal: 10,
                }}>
                |
              </Text>
            </Box>
            <BoxPressable
              onPress={() => navigation.navigate('Join')}
              style={{
                padding: 4,
              }}>
              <Text size={12} color={'#fff'}>
                회원가입
              </Text>
            </BoxPressable>
          </Box>
          <Box
            style={{
              position: 'absolute',
              width: Layout.window.width - 52,
              bottom: 0,
            }}>
            <SocialLoginByNaver />
            <SocialLoginByKakao />
            <Box
              style={{
                paddingBottom: 26,
              }}
            />
          </Box>
        </Box>
      </LinearGradient>
    </ContainerWithScroll>
  );
}
