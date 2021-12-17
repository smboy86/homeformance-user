import * as React from 'react';
import { Image, Linking, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import Container from '../basicComponents/Container';
import BoxPressable from '../basicComponents/BoxPressable';
import { useRoute } from '@react-navigation/core';

export default function CompleteSearchPasswordScreen({ navigation }) {
  const route = useRoute();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '비밀번호 찾기',
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
            {route.params.email}
          </Text>
          <Text size={14} color={'#4a4a4a'}>
            비밀번호 재설정 메일이 전송되었습니!
          </Text>
        </Box>
        {/* bottom button layout */}
        <BoxPressable
          center
          onPress={() => {
            const number = '15778520';
            let phoneNumber;
            if (Platform.OS === 'android') {
              phoneNumber = `tel:${number}`;
            } else {
              phoneNumber = `telprompt:${number}`;
            }

            Linking.openURL(phoneNumber);
          }}
          style={{
            marginBottom: 30,
          }}>
          <Text
            size={12}
            color={'#4a4a4a'}
            style={{
              textDecorationLine: 'underline',
            }}>
            메일이 오지 않았다면?
          </Text>
        </BoxPressable>
      </Box>
    </Container>
  );
}
