import * as React from 'react';
import { Alert, Image, TextInput as RNTextinput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Box from '../basicComponents/Box';
import Button from '../basicComponents/Button';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import TextInput from '../basicComponents/TextInput';
import BoxPressable from '../basicComponents/BoxPressable';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import GreyBox from '../components/GreyBox';
import { LoginStackNavigationProp } from '../navigation/types';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useJoinBySocialMutation, useJoinMutation } from '../api/auth';
import useUserStore from '../hooks/useUserStore';

export default function JoinSocialScreen() {
  const [email, setEmail] = React.useState('');
  const [emailHost, setEmailHost] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwConfirm, setPwConfirm] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [recommendCafeId, setRecommendCafeId] = React.useState(undefined);
  const [checkTermALL, setCheckTermALL] = React.useState(false);
  const [checkTermA, setCheckTermA] = React.useState(false);
  const [checkTermB, setCheckTermB] = React.useState(false);
  const [checkTermC, setCheckTermC] = React.useState(true);

  const navigation = useNavigation<LoginStackNavigationProp>();
  const route = useRoute();
  const [joinBySocoal] = useJoinBySocialMutation();
  const userStore = useUserStore();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '소셜로그인 회원가입',
    });
  }, []);

  React.useEffect(() => {
    console.log('111 :: ', route);
    if (checkTermALL) {
      setCheckTermA(true);
      setCheckTermB(true);
      setCheckTermC(true);
    } else {
      setCheckTermA(false);
      setCheckTermB(false);
      setCheckTermC(false);
    }
  }, [checkTermALL]);

  const onJoin = async () => {
    // validation
    if (nickname.length < 2) {
      Alert.alert('', '닉네임을 확인해주세요');
      return;
    }

    // LoadingModal
    navigation.navigate('LoadingModal');

    try {
      await joinBySocoal({
        token: route.params.token,
        authType: route.params.authType,
        nickname: nickname,
        recommendCafeId:
          userStore.joinInfo.recCafeInfo.selRecommendCafeId !== 0
            ? userStore.joinInfo.recCafeInfo.selRecommendCafeId
            : undefined,
      }).unwrap();
      navigation.goBack();

      // 회원가입페이지로 이동
      navigation.navigate('CompleteJoin');
    } catch (error: any) {
      navigation.goBack();
      console.log('onJoin err시rrr ', error);
      setTimeout(() => {
        if (error.data.errorCode === 3001) {
          Alert.alert('', `이메일 중복 ${email + '@' + emailHost}`);
        } else if (error.data.errorCode === 3002) {
          Alert.alert('', `닉네임 중복 ${nickname}`);
        } else {
          Alert.alert('', '시스템 오류');
        }
      }, 300);
    }
  };

  return (
    <ContainerWithScroll
      style={{
        paddingVertical: 6,
      }}>
      {/* 닉네임 */}
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
          닉네임
        </Text>
        <Box
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <TextInput
            placeholder={'한글 2자 이상'}
            placeholderTextColor={'#989696'}
            value={nickname}
            setValue={setNickname}
            style={{
              paddingVertical: 8,
            }}
          />
        </Box>
      </Box>
      {/* 추천카페 */}
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
          추천카페
        </Text>
        <BoxPressable
          onPress={() => navigation.navigate('RecommendCafe')}
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Text
            size={14}
            color={'#989696'}
            style={{
              paddingTop: 8,
              paddingBottom: 8,
            }}>
            {userStore.joinInfo.recCafeInfo.selRecommendCafeName}
          </Text>
        </BoxPressable>
      </Box>
      <Box
        style={{
          paddingHorizontal: 16,
        }}>
        <Button
          fill
          label={'회원가입'}
          onPress={onJoin}
          style={{
            marginTop: 32,
          }}
        />
      </Box>
      {/* bottom  */}
      <Box
        style={{
          paddingBottom: 30,
        }}
      />
    </ContainerWithScroll>
  );
}
