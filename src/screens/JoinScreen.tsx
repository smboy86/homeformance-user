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
import { useNavigation } from '@react-navigation/core';
import { useJoinMutation } from '../api/auth';
import useUserStore from '../hooks/useUserStore';
import { checkPasswordPattern } from '../utils/CommonUtil';

export default function JoinScreen() {
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
  const [join] = useJoinMutation();
  const userStore = useUserStore();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '회원가입',
    });
  }, []);

  React.useEffect(() => {
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
    if (email === '' || emailHost === '') {
      Alert.alert('', '이메일을 입력해주세요');
      return;
    }
    if (password === '' || pwConfirm === '') {
      Alert.alert('', '패스워드를 입력해주세요');
      return;
    }
    if (password !== pwConfirm) {
      Alert.alert('', '패스워드를 확인해주세요');
      return;
    }
    if (!checkPasswordPattern(password)) {
      Alert.alert(
        '',
        '비밀번호는 영문, 숫자, 특수문자를 포함한\n8자리 이상만 가능합니다.',
      );
      return;
    }
    if (nickname.length < 2) {
      Alert.alert('', '닉네임을 확인해주세요');
      return;
    }

    // LoadingModal
    navigation.navigate('LoadingModal');

    try {
      await join({
        email: email + '@' + emailHost,
        password: password,
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
      {/* 이메일 */}
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
              flex: 0.48,
              borderBottomWidth: 1,
              borderColor: '#e5e5e5',
            }}>
            <TextInput
              placeholder={'이메일주소'}
              placeholderTextColor={'#989696'}
              value={email}
              setValue={setEmail}
              style={{
                paddingVertical: 8,
              }}
            />
          </Box>
          <Text size={14} color={'#4a4a4a'}>
            @
          </Text>
          <Box
            style={{
              flex: 0.48,
              borderBottomWidth: 1,
              borderColor: '#e5e5e5',
            }}>
            <TextInput
              placeholder={'이메일 선택'}
              placeholderTextColor={'#989696'}
              value={emailHost}
              setValue={setEmailHost}
              style={{
                paddingVertical: 8,
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* 비밀번호 */}
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
          비밀번호
        </Text>
        <Box
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <TextInput
            placeholder={'영문, 숫자, 특수문자를 포함한 8~20자리'}
            placeholderTextColor={'#989696'}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            style={{
              paddingVertical: 8,
            }}
          />
        </Box>
        <Box
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <TextInput
            placeholder={'비밀번호 재입력'}
            placeholderTextColor={'#989696'}
            value={pwConfirm}
            setValue={setPwConfirm}
            secureTextEntry={true}
            style={{
              paddingVertical: 6,
              marginTop: 12,
            }}
          />
        </Box>
      </Box>
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
      <GreyBox />
      <Box
        row
        space
        style={{
          paddingHorizontal: 16,
          marginBottom: 8,
        }}>
        <Box
          style={{
            flex: 0.7,
          }}>
          <Text
            bold
            size={12}
            color={Colors.default.fontBlack}
            style={{
              paddingTop: 24,
              paddingBottom: 8,
            }}>
            회원가입 약관동의
          </Text>
        </Box>

        <BoxPressable
          onPress={() => setCheckTermALL(!checkTermALL)}
          row
          aCenter
          jEnd
          style={{
            flex: 0.4,
            paddingTop: 24,
            paddingBottom: 8,
          }}>
          <Text
            size={12}
            color={Colors.default.commonGrey}
            style={{
              marginRight: 10,
            }}>
            전체동의
          </Text>
          <Image
            source={checkTermALL ? Images.icoCheckOn : Images.icoCheckOff}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </BoxPressable>
      </Box>
      <Box
        row
        aCenter
        space
        style={{
          paddingHorizontal: 16,
          marginBottom: 12,
        }}>
        <Box
          style={{
            flex: 0.7,
          }}>
          <Text size={12} color={'#4a4a4a'}>
            사업자 등록에 관한 약관에 동의 하십니까?
          </Text>
        </Box>
        <Box
          row
          jEnd
          style={{
            flex: 0.3,
          }}>
          <BoxPressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
              )
            }>
            <Text
              size={12}
              color={'#64a9e4'}
              style={{
                textDecorationLine: 'underline',
                marginRight: 10,
              }}>
              내용보기
            </Text>
          </BoxPressable>
          <BoxPressable onPress={() => setCheckTermA(!checkTermA)}>
            <Image
              source={checkTermA ? Images.icoCheckOn : Images.icoCheckOff}
              style={{
                width: 16,
                height: 16,
              }}
            />
          </BoxPressable>
        </Box>
      </Box>
      <Box
        row
        aCenter
        space
        style={{
          paddingHorizontal: 16,
          marginBottom: 12,
        }}>
        <Box
          style={{
            flex: 0.7,
          }}>
          <Text size={12} color={'#4a4a4a'}>
            개인정보 이용에 대해 동의 하십니까?
          </Text>
        </Box>
        <Box
          row
          jEnd
          style={{
            flex: 0.3,
          }}>
          <BoxPressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
              )
            }>
            <Text
              size={12}
              color={'#64a9e4'}
              style={{
                textDecorationLine: 'underline',
                marginRight: 10,
              }}>
              내용보기
            </Text>
          </BoxPressable>
          <BoxPressable onPress={() => setCheckTermB(!checkTermB)}>
            <Image
              source={checkTermB ? Images.icoCheckOn : Images.icoCheckOff}
              style={{
                width: 16,
                height: 16,
              }}
            />
          </BoxPressable>
        </Box>
      </Box>
      <Box
        row
        aCenter
        space
        style={{
          paddingHorizontal: 16,
          marginBottom: 12,
        }}>
        <Box
          style={{
            flex: 0.7,
          }}>
          <Text size={12} color={'#4a4a4a'}>
            제 3자 마켓팅 이용에 동의 하십니까?(선택)
          </Text>
        </Box>
        <Box
          row
          jEnd
          style={{
            flex: 0.3,
          }}>
          <BoxPressable
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
              )
            }>
            <Text
              size={12}
              color={'#64a9e4'}
              style={{
                textDecorationLine: 'underline',
                marginRight: 10,
              }}>
              내용보기
            </Text>
          </BoxPressable>
          <BoxPressable
            onPress={() => setCheckTermC(!checkTermC)}
            style={
              {
                // padding: 6,
              }
            }>
            <Image
              source={checkTermC ? Images.icoCheckOn : Images.icoCheckOff}
              style={{
                width: 16,
                height: 16,
              }}
            />
          </BoxPressable>
        </Box>
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
