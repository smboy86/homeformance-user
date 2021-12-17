import * as React from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { PubStackParamList } from '../types';
import Layout from '../constants/Layout';
import Container from '../basicComponents/Container';
import ButtonActive from '../basicComponents/ButtonActive';
import BoxPressable from '../basicComponents/BoxPressable';
import {
  MainStackNavigationProp,
  MainStackParamList,
} from '../navigation/types';
import { useNavigation } from '@react-navigation/core';

export default function CompleteJoinScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '회원가입 완료',
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

  return (
    <Container>
      <Box
        full
        space
        style={{
          paddingHorizontal: 16,
        }}>
        <Box center>
          <Image
            source={Images.imgCompleteJoin}
            style={{
              width: 80,
              height: 80,
              marginTop: Layout.window.height * 0.1,
              marginBottom: 36,
            }}
          />
          <Text
            bold
            size={20}
            color={Colors.default.fontBlack}
            style={{
              marginBottom: 8,
            }}>
            회원가입이 완료되었습니다!
          </Text>
          <Text size={14} color={'#4a4a4a'}>
            로그인하시면 다양한 카페의 혜택들을
          </Text>
          <Text size={14} color={'#4a4a4a'}>
            찾아보실 수 있습니다
          </Text>
        </Box>
        {/* bottom button layout */}
        <Box>
          <ButtonActive
            disabled={false}
            label={'로그인'}
            onPress={() => navigation.popToTop()}
          />
        </Box>
      </Box>
    </Container>
  );
}
