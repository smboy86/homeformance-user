import { useFocusEffect, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Alert, Image, Linking, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetMyProfileQuery } from '../api/customers';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { CUSTOMER_TEL } from '../constants/Options';

export default function MyPageScreen() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, refetch } = useGetMyProfileQuery();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) return null;

  return (
    <Container
      style={{
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}>
      <Box
        row
        center
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: Colors.default.borderGrayColor,
        }}>
        <Box
          row
          center
          style={{
            paddingLeft: 2,
          }}>
          <Text bold size={14} color={Colors.default.fontBlack}>
            마이페이지
          </Text>
        </Box>
      </Box>
      <Box
        style={{
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}>
        <BoxPressable
          row
          space
          aCenter
          onPress={
            () =>
              navigation.navigate('MyProfile', {
                userId: data?.data.userId,
                nickname: data?.data.nickname,
              })
            // navigation.navigate('MyProfile', {
            //   params: {
            //     name: '',
            //   },
            // })
          }>
          <Box row center>
            <Image
              source={Images.imgPubProfile}
              style={{
                width: 50,
                height: 50,
                marginRight: 12,
              }}
            />
            <Text bold size={20} color={Colors.default.fontBlack}>
              {data?.data.nickname}
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
      <GreyBox />
      <Box
        style={{
          paddingHorizontal: 16,
        }}>
        <BoxPressable
          row
          space
          aCenter
          onPress={() => {
            const number = CUSTOMER_TEL;
            let phoneNumber;
            if (Platform.OS === 'android') {
              phoneNumber = `tel:${number}`;
            } else {
              phoneNumber = `telprompt:${number}`;
            }

            Linking.openURL(phoneNumber);
          }}
          style={{
            paddingVertical: 22,
            borderBottomWidth: 1,
            borderColor: Colors.default.borderGrayColor,
          }}>
          <Box row center>
            <Image
              source={Images.icoService}
              style={{
                width: 24,
                height: 24,
                marginRight: 9,
              }}
            />
            <Text bold size={14} color={Colors.default.fontBlack}>
              고객센터
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
          onPress={() => Alert.alert('', '공지사항')}
          style={{
            paddingVertical: 22,
            borderBottomWidth: 1,
            borderColor: Colors.default.borderGrayColor,
          }}>
          <Box row center>
            <Image
              source={Images.icoNoti}
              style={{
                width: 24,
                height: 24,
                marginRight: 9,
              }}
            />
            <Text bold size={14} color={Colors.default.fontBlack}>
              공지사항
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
