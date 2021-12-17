import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useGetBannersQuery } from '../api/commonAuth';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import BannerCouponList from '../componentsFetch/BannerCouponList';
import NearByCafeList from '../componentsFetch/NearByCafeList';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import useAppStore from '../hooks/useAppStore';
import useLocation from '../hooks/useLocation';
import { MainStackNavigationProp } from '../navigation/types';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigationProp>();
  const appStore = useAppStore();

  const { data: bannerList, isLoading, isError } = useGetBannersQuery();
  const [isCompleteLocation] = useLocation();

  // Todo - isCompleteLocation 완료시 카페 리스트 재조회 해야할듯
  // React.useEffect(() => {
  //   console.log('12312312321');
  // }, [appStore.myLocation.roadAddress]);

  if (isLoading) return null;
  if (isError) return null;

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
        }}>
        <BoxPressable
          onPress={() => navigation.navigate('Address')}
          style={{
            position: 'absolute',
            top: 12,
            left: 16,
            padding: 6,
          }}>
          <Image
            source={Images.icoCompass}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </BoxPressable>
        <Box
          row
          center
          style={{
            paddingLeft: 2,
          }}>
          {isCompleteLocation ? (
            <Text>
              {appStore.myLocation !== undefined &&
                appStore.myLocation.roadAddress}
            </Text>
          ) : (
            <Text>주소 찾는중..</Text>
          )}
        </Box>
      </Box>
      <ContainerWithScroll style={{}}>
        {/* search bar */}
        <BoxPressable
          onPress={() => navigation.navigate('SearchCafe')}
          style={{
            paddingHorizontal: 16,
            marginBottom: 22,
          }}>
          <Box
            style={{
              paddingVertical: 6,
              paddingHorizontal: 16,
              backgroundColor: '#f6f6f6',
              borderRadius: 15,
            }}>
            <Image
              source={Images.icoSearch}
              style={{ width: 16, height: 16 }}
            />
          </Box>
        </BoxPressable>
        <Box
          style={{
            paddingHorizontal: 16,
            paddingBottom: 22,
          }}>
          {/* 메인 배너 */}
          <Box
            center
            style={{
              width: Layout.window.width - 32,
              height: Layout.window.width * 0.427,
              marginBottom: 22,
              backgroundColor: Colors.default.tintBrown,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Swiper
              index={0}
              loop
              autoplay
              autoplayTimeout={4}
              showsPagination={true}
              renderPagination={index => {
                return (
                  <Box
                    row
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 30,
                      padding: 6,
                      paddingHorizontal: 8,
                      borderRadius: 3,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <Text size={10} color={'#fff'}>
                      {index + 1}
                    </Text>
                    <Text size={10} color={'#fff'}>
                      /
                    </Text>
                    <Text size={10} color={'#fff'}>
                      {bannerList?.data.banners.length}
                    </Text>
                  </Box>
                );
              }}>
              {bannerList?.data.banners.map((item, idx) => (
                <Image
                  key={idx.toString()}
                  source={{
                    uri: item.image.uri,
                  }}
                  style={{
                    width: Layout.window.width - 32,
                    height: Layout.window.width * 0.427,
                    resizeMode: 'cover',
                  }}
                />
              ))}
            </Swiper>
          </Box>

          <Box>
            <Text
              bold
              size={18}
              color={Colors.default.fontBlack}
              style={{
                marginBottom: 18,
              }}>
              오늘의 쿠포닝
            </Text>
            <BannerCouponList />
          </Box>
        </Box>
        <GreyBox />
        <Box
          style={{
            paddingTop: 22,
            paddingHorizontal: 16,
            paddingBottom: 60,
            marginBottom: insets.bottom,
          }}>
          <Text
            bold
            size={20}
            color={Colors.default.fontBlack}
            style={{
              marginBottom: 20,
            }}>
            우리 동네에서 한 잔!
          </Text>
          <NearByCafeList />
        </Box>
      </ContainerWithScroll>
    </Container>
  );
}
