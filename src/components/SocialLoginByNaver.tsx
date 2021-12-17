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

const WEB_CLIENT_ID = 'IDjx7twEy_4kYJwHb2B5';
const WEB_SECRET_ID = 'Q_PxJPe9WG';

// 네이버
const discovery = {
  authorizationEndpoint: `https://nid.naver.com/oauth2.0/authorize`, // 네이버 REST API 문서에서 확인 (https://developers.naver.com/docs/login/web/web.md - 네이버 로그인 인증 요청문 생성
  tokenEndpoint: `https://nid.naver.com/oauth2.0/token`,
};

export default function SocialLoginByNaver() {
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
        },
        discovery,
      )
        .then(async (token: TokenResponse) => {
          // 1) 소셜 회원 가입유무 (로그인 시도)
          try {
            const resultLogin = await login({
              token: token.accessToken,
              authType: 'naver',
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
            console.log(' await login({naver}) errrr ::: ', error);
          }
        })
        .catch(err => {
          console.log('exchangeCodeAsync errrr  ', err);
        });
    }

    if (response?.type === 'success') {
      console.log('Auth Code get ::: ', response);
      const { code } = response.params;

      //
      getCodeAndToken(code);
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
        marginBottom: 10,
        backgroundColor: '#00c63b',
        borderRadius: 7,
      }}>
      <Image
        source={Images.icoNaver}
        style={{
          width: 20,
          height: 20,
        }}
      />
      <Box full center>
        <Text medium size={14} color={'#fff'}>
          네이버로 로그인
        </Text>
      </Box>
    </BoxPressable>
  );
}
