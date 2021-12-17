import * as React from 'react';
import { Alert, Image, ScrollView, Switch, View } from 'react-native';
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
import Container from '../basicComponents/Container';
import TextInput from '../basicComponents/TextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function UploadStoreMenuScreen({ navigation }: Props) {
  const [text, setText] = React.useState('');
  const [switchA, setSwitchA] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '메뉴정보 변경',
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

  const insets = useSafeAreaInsets();

  return (
    <Container>
      <Box
        center
        style={{
          paddingVertical: 22,
        }}>
        <Box
          style={{
            position: 'relative',
          }}>
          <Image
            source={Images.imgCafeProfile}
            style={{
              width: Layout.window.width * 0.587,
              height: Layout.window.width * 0.587,
              borderRadius: 10,
            }}
          />
          <BoxPressable
            onPress={() => Alert.alert('', '메뉴정보 사진 업로드')}
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
      </Box>
      <Box
        style={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}>
        <TextInputwithLabel
          label={'메뉴명'}
          placeholder={'귤라떼'}
          value={text}
          setValue={text => setText(text)}
        />
        <TextInputwithLabel
          label={'메뉴금액'}
          placeholder={'5500'}
          value={text}
          setValue={text => setText(text)}
          rightLabel={'원'}
        />
        <Box
          style={{
            paddingTop: 18,
          }}>
          <Text
            bold
            size={12}
            color={'#181818'}
            style={{
              marginBottom: 19,
            }}>
            태그 설정
          </Text>
          <Box
            row
            space
            style={{
              marginBottom: 8,
            }}>
            <Text>HOT</Text>
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
          <Box
            row
            space
            style={{
              marginBottom: 8,
            }}>
            <Text>NEW</Text>
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
          <Box
            row
            space
            style={{
              marginBottom: 8,
            }}>
            <Text>BEST</Text>
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
        </Box>
      </Box>
      {/* 동영상 업로드 유무? */}
      <Box
        style={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
        }}>
        <Text size={12} color={Colors.default.commonGrey}>
          - 1분 내외의 짧은 동영상일 수록 클릭 율이 높아집니다
        </Text>
        <Text size={12} color={Colors.default.commonGrey}>
          - 시그니처 동영상 메뉴는{' '}
          <Text size={12} color={'#e47364'}>
            최대 3개
          </Text>
          까지 업로드가 가능합니다
        </Text>
      </Box>
    </Container>
  );
}
