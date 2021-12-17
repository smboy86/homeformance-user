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
import Container from '../basicComponents/Container';
import TextInput from '../basicComponents/TextInput';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function UploadStoreNewsScreen({ navigation }: Props) {
  const [text, setText] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '소식 업로드',
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
          <Box
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <Text size={14} color={'#fff'}>
              0:12
            </Text>
          </Box>
          <BoxPressable
            onPress={() => Alert.alert('', '오늘의 동영상 사진 업로드')}
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
        <Text bold size={12} color={Colors.default.fontBlack}>
          문구입력
        </Text>
        <Box
          style={{
            flexGrow: 0.9,
            padding: 8,
            marginTop: 16,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#e5e5e5',
          }}>
          <TextInput
            placeholder={'오늘의 카페 소식에 대한 문구를 입력해주세요'}
            value={text}
            setValue={setText}
            multiline={true}
          />
        </Box>
      </Box>
    </Container>
  );
}
