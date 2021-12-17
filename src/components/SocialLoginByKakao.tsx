import * as React from 'react';
import { Alert, Image, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
  exchangeCodeAsync,
  TokenResponse,
} from 'expo-auth-session';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import BoxPressable from '../basicComponents/BoxPressable';
import Images from '../constants/Images';
import { useMounted } from '../hooks/useMounted';
import { useLoginBySocialMutation } from '../api/auth';
import { setCredentials } from '../store/slices/AppSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

// For popup colse on Web?
WebBrowser.maybeCompleteAuthSession();

// 배포 앱일땐 false
const USE_PROXY = Platform.select({
  web: false,
  default: Constants.appOwnership === 'standalone' ? false : true,
});

const redirectUri = makeRedirectUri({
  useProxy: USE_PROXY,
  native: 'browncouponing-customer://redirect', // 확인 안됨 배포용 앱에서 쓰일지도?
});

const WEB_CLIENT_ID = '0d6e43baf9cfbe1c3bbeebbfb0b626cd';
const WEB_SECRET_ID = '9Nq2O3BCG3xQGE0ls9aywnROBE5aTyRd';

// 카카오
const discovery = {
  authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
  tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
};

export default function SocialLoginByKakao() {
  //// 외부 api start
  const dispatch = useDispatch();
  const [login] = useLoginBySocialMutation();
  const navigation = useNavigation();
  //// 외부 api end

  const isMounted = useMounted();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: WEB_CLIENT_ID,
      clientSecret: WEB_SECRET_ID,
      scopes: [], // 공급자에서 옵션을 제공 하지 않는 경우 []
      usePKCE: false, // 보안 옵션
      redirectUri, // slug 에 맞춰 자동생성 ex) https://auth.expo.io/@browncouponing/browncouponing-customer
      responseType: ResponseType.Code,
    },
    discovery,
  );

  React.useEffect(() => {
    async function getCodeAndToken(code: string) {
      exchangeCodeAsync(
        {
          clientId: WEB_CLIENT_ID,
          clientSecret: WEB_SECRET_ID,
          code,
          redirectUri,
          extraParams: {
            grantType: 'authorization_code',
          },
        },
        discovery,
      )
        .then(async (token: TokenResponse) => {
          // 1) 소셜 회원 가입유무 (로그인 시도)
          console.log('1) 소셜 회원 가입 유무 :: ', token.accessToken);
          try {
            const resultLogin = await login({
              token: token.accessToken,
              authType: 'kakao',
            }).unwrap();
            console.log('resultLogin  :: ', resultLogin);
            // { success : true } ??
            // 2) 로그인 성공시
            if (resultLogin.success && resultLogin.data !== undefined) {
              dispatch(
                setCredentials({
                  accessToken: resultLogin.data.accessToken,
                  refreshToken: resultLogin.data.refreshToken,
                }),
              );
            } else {
              // 3) 최초 회원가입일시 추천회원가입으로 이동
              navigation.navigate('JoinSocial', {
                token: token.accessToken,
                authType: 'naver',
              });
            }
          } catch (error) {
            console.log(' await login({kakao}) errrr ::: ', error);
          }
        })
        .catch(err => {
          console.log('코드 -> 공급자의 access token 얻기 실패  errrr  ', err);
        });
    }

    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Auth Code get response ::: ', code);
      // console.log('Auth Code get Request ::: ', request);

      // getCodeAndToken(code);

      /////

      // grant_type:authorization_code
      // client_id:0d6e43baf9cfbe1c3bbeebbfb0b626cd
      // redirect_uri:https://auth.expo.io/@browncouponing/browncouponing-customer
      // code:iLmefrd5CGfV2ikzzk3KT8CbuRLtIU9GQ2a1JiF7AQ8oFTYLmM35fQ7v0z8t5eOdgF5SNAopcFEAAAF9hWxm7A
      // client_secret:9Nq2O3BCG3xQGE0ls9aywnROBE5aTyRd
      ///
      // const reUri = encodeURI(
      //   'https://auth.expo.io/@browncouponing/browncouponing-customer',
      // );

      // console.log('12312321   :: ', reUri);

      // const body = {
      //   grant_type: 'authorization_code',
      //   client_id: WEB_CLIENT_ID,
      //   redirect_uri:
      //     'https://auth.expo.io/@browncouponing/browncouponing-customer',
      //   code: code,
      //   client_secret: WEB_SECRET_ID,
      // };

      // var formBody = new FormData();
      // formBody.set('grant_type', 'authorization_code');
      // formBody.set('client_id', WEB_CLIENT_ID);
      // formBody.set(
      //   'redirect_uri',
      //   "'https://auth.expo.io/@browncouponing/browncouponing-customer'",
      // );
      // formBody.set('code', code);
      // formBody.set('client_secret', WEB_SECRET_ID);
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', WEB_CLIENT_ID);
      params.append(
        'redirect_uri',
        'https://auth.expo.io/@browncouponing/browncouponing-customer',
      );
      params.append('code', code);
      params.append('client_secret', WEB_SECRET_ID);

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: WEB_CLIENT_ID,
        redirect_uri:
          'https://auth.expo.io/@browncouponing/browncouponing-customer',
        code: code,
        client_secret: WEB_SECRET_ID,
      });

      fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: `grant_type=authorization_code&client_id=${WEB_CLIENT_ID}&redirect_uri=https://auth.expo.io/@browncouponing/browncouponing-customer&code=${code}&client_secret=${WEB_SECRET_ID}`,
      })
        .then(res => res.json())
        .then(async token => {
          console.log('ttttt token.accessToken  ::  ', token);
          /*
            {
              "access_token": "--F246OUhpXSoS4Xz2NMyV8DD36eGddLBKgHPQopb9QAAAF9hbpsbQ",
              "expires_in": 21599,
              "refresh_token": "_DeB60mYBH8qL5dpseo0qyQbVMV_vv7et69lHQopb9QAAAF9hbpsbA",
              "refresh_token_expires_in": 5183999,
              "token_type": "bearer",
            }
          */
          try {
            const resultLogin = await login({
              token: token.access_token,
              authType: 'kakao',
            }).unwrap();
            console.log('resultLogin  :: ', resultLogin);
            // { success : true } ??
            // 2) 로그인 성공시
            if (resultLogin.success && resultLogin.data !== undefined) {
              dispatch(
                setCredentials({
                  accessToken: resultLogin.data.accessToken,
                  refreshToken: resultLogin.data.refreshToken,
                }),
              );
            } else {
              // 3) 최초 회원가입일시 추천회원가입으로 이동
              navigation.navigate('JoinSocial', {
                token: token.accessToken,
                authType: 'naver',
              });
            }
          } catch (error) {
            console.log(' await login({kakao}) errrr ::: ', error);
            Alert.alert('오류', `${error.data.errorMessage}`);
          }
        })
        .catch(err => {
          console.log('dfasfsadfasdf :: ', err);
        });
    } else {
      console.log('login response fail ::: ', response);
    }
  }, [response]);

  return (
    <BoxPressable
      row
      onPress={() =>
        promptAsync({
          useProxy: true,
        })
      }
      style={{
        padding: 15,
        backgroundColor: '#ffdf00',
        borderRadius: 7,
      }}>
      <Image
        source={Images.icoKakao}
        style={{
          width: 20,
          height: 20,
        }}
      />
      <Box full center>
        <Text medium size={14} color={'#381e20'}>
          카카오톡으로 로그인
        </Text>
      </Box>
    </BoxPressable>
  );
}
