import { useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react';
import { Alert, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { useGetStampQuery } from '../api/cafe';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import { StampProp } from '../navigation/types';

export default function StampScreen() {
  const navigation = useNavigation();
  const route = useRoute<StampProp>();

  const {
    data: stampInfo,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetStampQuery(route.params.cafeId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '스탬프',
      headerRight: () => (
        <BoxPressable
          onPress={() => refetch()}
          style={{
            padding: 6,
          }}>
          <Image
            source={Images.icoReload}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </BoxPressable>
      ),
    });
  }, []);

  if (isLoading) return null;
  if (isError) {
    Alert.alert('', '시스템 오류, 관리자에게 문의하세요');
    console.log('StampScreen  errr :: ', error);
    return null;
  }

  return (
    <ContainerWithScroll
      style={{
        backgroundColor: '#f6f6f6',
      }}>
      <Box
        style={{
          paddingTop: 20,
          paddingHorizontal: 16,
          paddingBottom: 22,
          backgroundColor: '#fff',
        }}>
        <Box row space style={{}}>
          <Text bold size={14} color={Colors.default.fontBlack}>
            {route.params.cafeName}
          </Text>
          <Box row center>
            <Text bold size={14} color={'#e47364'}>
              {stampInfo.data.stampCount}
            </Text>
            <Text size={10} color={Colors.default.fontBlack}>
              /10 개
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          paddingTop: 26,
          paddingHorizontal: 16,
        }}>
        <Box
          center
          style={{
            height: Layout.window.width * 0.605,
            padding: 21,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}>
          <QRCode value={stampInfo.data.id.toString()} size={130} />
          <Text
            size={12}
            color={'#a0a0a0'}
            style={{
              paddingTop: 14,
              paddingBottom: 2,
            }}>
            스탬프 적립을 원하시면
          </Text>
          <Text size={12} color={'#a0a0a0'}>
            직원에게 QR코드를 보여주세요
          </Text>
        </Box>
        <Box
          center
          style={{
            height: Layout.window.width * 0.408,
            paddingHorizontal: 21,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}>
          <Image
            source={Images.imgStampLine}
            style={{
              width: Layout.window.width - 32 - 40,
              height: 1,
            }}
          />
          <Box
            row
            wFull
            center
            style={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              height: Layout.window.width * 0.408 - 4,
            }}>
            {Array.from({ length: 10 }).map((item, idx) => {
              return (
                <Box
                  key={`stamp - ${idx.toString()}`}
                  center
                  style={{
                    flexBasis: '20%',
                    paddingTop: 18,
                  }}>
                  <Image
                    source={
                      idx <= stampInfo.data.stampCount - 1
                        ? Images.icoStampUse
                        : idx === 9
                        ? Images.icoStampFull
                        : Images.icoStampEmpty
                    }
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          style={{
            paddingTop: 26,
          }}>
          <Text medium size={14} color={'#4a4a4a'}>
            유의 사항
          </Text>
          <Text
            size={12}
            color={'#a0a0a0'}
            style={{ paddingTop: 12 }}
            lineHeight={18}>
            - 기관과 산야에 생생하며, 노년에게서 할지라도{'\n'}- 가는 때문이다.
            설레는 대한 인생을 공자는 바로 구할 그들은 {'\n'}- 천자만홍이 피다.{' '}
            {'\n'}- 기관과 산야에 생생하며, 노년에게서 {'\n'}- 가는 때문이다.
            설레는대한 인생을 공자는 {'\n'}- 천자만홍이 피다. {'\n'}- 기관과
            산야에생생하며, 노년에게서 할지라도 {'\n'}- 가는 때문이다. 설레는
            대한
          </Text>
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
