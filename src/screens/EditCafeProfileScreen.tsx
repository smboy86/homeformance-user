import * as React from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Images from '../constants/Images';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import TextInputwithLabel from '../basicComponents/TextInputwithLabel';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function EditCafeProfileScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '프로필 편집',
      headerRight: () => (
        <BoxPressable
          onPress={() => Alert.alert('', '완료')}
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
  }, []);

  return (
    <ContainerWithScroll>
      <Box
        style={{
          position: 'relative',
        }}>
        <Image
          source={Images.imgCafeProfile}
          style={{
            width: Layout.window.width,
            height: Layout.window.width * 0.648,
          }}
        />
        <BoxPressable
          onPress={() => Alert.alert('', '매장 배경 사진 변경')}
          style={{ position: 'absolute', right: 8, bottom: 8, padding: 8 }}>
          <Image
            source={Images.imgEditPhoto}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
            }}
          />
        </BoxPressable>
      </Box>
      <Box center>
        <BoxPressable
          center
          onPress={() => Alert.alert('', '매장로고 변경')}
          style={{
            marginTop: -40,
            zIndex: 999,
          }}>
          <Image
            source={Images.imgLogo}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 6,
            }}
          />
          <Text size={12} color={'#64a9e4'}>
            매장로고 변경
          </Text>
        </BoxPressable>
      </Box>
      <Box
        style={{
          padding: 16,
        }}>
        <TextInputwithLabel
          label={'주소'}
          placeholder={'한글 2자 이상'}
          style={{
            marginBottom: 26,
          }}
        />
        <TextInputwithLabel
          label={'주차여부'}
          placeholder={'주차가능'}
          style={{
            marginBottom: 26,
          }}
        />
        <Box
          style={{
            marginBottom: 26,
          }}>
          <Text bold size={12} color={'#181818'} style={{ paddingBottom: 6 }}>
            영업시간
          </Text>
          <Box row space>
            <Box
              style={{
                flex: 0.47,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderColor: '#e5e5e5',
              }}>
              <Text size={12} color={'#989696'}>
                오픈시간
              </Text>
              <Text size={12} color={'#989696'}>
                08:00
              </Text>
            </Box>
            <Box
              style={{
                flex: 0.47,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderColor: '#e5e5e5',
              }}>
              <Text size={12} color={'#989696'}>
                종료시간
              </Text>
              <Text size={12} color={'#989696'}>
                08:00
              </Text>
            </Box>
          </Box>
        </Box>
        <TextInputwithLabel
          label={'휴무일'}
          placeholder={'매주 수요일'}
          style={{
            marginBottom: 26,
          }}
        />
        <TextInputwithLabel
          label={'전화번호'}
          placeholder={'0507-1494-5051'}
          style={{
            marginBottom: 26,
          }}
        />
      </Box>
    </ContainerWithScroll>
  );
}
