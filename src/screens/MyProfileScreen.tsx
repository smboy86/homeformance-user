import { useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react';
import { Alert, Image, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useDelAccountMutation,
  useSetMyProfileMutation,
} from '../api/customers';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import Text from '../basicComponents/Text';
import TextInput from '../basicComponents/TextInput';
import GreyBox from '../components/GreyBox';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { MyProfileProp } from '../navigation/types';
import { useReduxDispatch } from '../store';

export default function MyProfileScreen() {
  const route = useRoute<MyProfileProp>();

  const [name, setName] = React.useState(route.params.nickname);
  const [switchA, setSwitchA] = React.useState(false);
  const [switchB, setSwitchB] = React.useState(false);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useReduxDispatch();

  const [setMyProfile] = useSetMyProfileMutation();
  const [delMyProfile] = useDelAccountMutation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '내 정보 수정',
      headerRight: () => (
        <BoxPressable
          onPress={onSaveMyProfile}
          style={{
            padding: 6,
            marginRight: -6,
          }}>
          <Text medium size={14} color={Colors.default.fontBlack}>
            완료
          </Text>
        </BoxPressable>
      ),
    });
  }, [name]);

  const onLogout = () => {
    dispatch({ type: 'USER_LOGOUT' });
  };

  const onSaveMyProfile = async () => {
    try {
      await setMyProfile({ nickname: name }).unwrap();
      Alert.alert('', '내정보 수정 완료');
    } catch (error) {
      console.log('onSaveMyProfile  :: ', error);
    }
  };

  const onDelMyProfile = async () => {
    Alert.alert(
      '',
      '회원탈퇴 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              await delMyProfile().unwrap();
              Alert.alert('', '회원탈퇴 완료');
              dispatch({ type: 'USER_LOGOUT' });
            } catch (error) {
              console.log('delMyProfile  :: ', error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Container
      style={{
        backgroundColor: '#fff',
      }}>
      <Box
        center
        style={{
          paddingTop: 24,
          paddingBottom: 12,
        }}>
        <BoxPressable
          row
          space
          aCenter
          onPress={() => Alert.alert('', '바스키아')}>
          <BoxPressable
            row
            center
            onPress={() => Alert.alert('', '프로필 사진 교체')}
            style={{
              position: 'relative',
            }}>
            <Image
              source={Images.imgPubProfile}
              style={{
                width: 60,
                height: 60,
              }}
            />
            <Image
              source={Images.imgEditPhoto}
              style={{
                width: 26,
                height: 26,
                position: 'absolute',
                right: -6,
                bottom: 0,
              }}
            />
          </BoxPressable>
        </BoxPressable>
      </Box>
      <Box
        style={{
          paddingHorizontal: 16,
        }}>
        <TextInput
          placeholder={'이름 입력'}
          value={name}
          setValue={setName}
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: Colors.default.borderGrayColor,
            borderRadius: 10,
            marginBottom: 16,
            fontSize: 14,
          }}
        />
      </Box>
      <GreyBox />
      <Box
        style={{
          paddingVertical: 22,
          paddingHorizontal: 16,
        }}>
        <Text medium size={14} color={Colors.default.fontBlack}>
          개인정보 활용 동의
        </Text>
        <Box
          row
          space
          center
          style={{
            paddingTop: 12,
          }}>
          <Text size={12} color={'#4a4a4a'}>
            위치정보 사용동의 설정
          </Text>
          <Switch
            trackColor={{ false: '#B2B2B2', true: Colors.default.tintBrown }}
            ios_backgroundColor="#B2B2B2"
            onValueChange={isValue => setSwitchA(isValue)}
            value={switchA}
            style={{
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
          />
        </Box>
        <Box row space center>
          <Text size={12} color={'#4a4a4a'}>
            마케팅 활용 동의 설정 (선택)
          </Text>
          <Switch
            trackColor={{ false: '#B2B2B2', true: Colors.default.tintBrown }}
            ios_backgroundColor="#B2B2B2"
            onValueChange={isValue => setSwitchB(isValue)}
            value={switchB}
            style={{
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
          />
        </Box>
      </Box>
      <GreyBox />
      <Box
        style={{
          paddingHorizontal: 16,
        }}>
        <BoxPressable
          row
          space
          aCenter
          onPress={onLogout}
          style={{
            paddingVertical: 22,
            borderBottomWidth: 1,
            borderColor: Colors.default.borderGrayColor,
          }}>
          <Box row center>
            <Text bold size={14} color={Colors.default.fontBlack}>
              로그아웃
            </Text>
          </Box>
          <Image
            source={Images.icoArrowRight}
            style={{
              width: 6,
              height: 10,
            }}
          />
        </BoxPressable>
        <BoxPressable
          row
          space
          aCenter
          onPress={onDelMyProfile}
          style={{
            paddingVertical: 22,
            borderBottomWidth: 1,
            borderColor: Colors.default.borderGrayColor,
          }}>
          <Box row center>
            <Text bold size={14} color={Colors.default.fontBlack}>
              회원탈퇴
            </Text>
          </Box>
          <Image
            source={Images.icoArrowRight}
            style={{
              width: 6,
              height: 10,
            }}
          />
        </BoxPressable>
      </Box>
    </Container>
  );
}
