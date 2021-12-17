import * as React from 'react';
import { Alert, Image, ImageBackground, ScrollView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import dayjs from 'dayjs';
import { SvgXml } from 'react-native-svg';
import * as Linking from 'expo-linking';

import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Layout from '../constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../constants/Images';
import BoxPressable from '../basicComponents/BoxPressable';
import GreyBox from '../components/GreyBox';
import SignatureMenuCard from '../components/SignatureMenuCard';
import CafeInfoMenuCard from '../components/CafeInfoMenuCard';
import {
  CafePforileInfoProp,
  MainStackNavigationProp,
} from '../navigation/types';
import {
  useGetCafeInfoByIdQuery,
  useGetFeedListQuery,
  useGetSpaceListQuery,
  useSetLikeCafeMutation,
} from '../api/cafe';
import Container from '../basicComponents/Container';
import SpaceCard from '../components/SpaceCard';
import StoreFeedCard from '../components/StoreFeedCard';
import Svgs from '../constants/Svgs';
import { PAGE_MENU } from '../constants/Options';

export default function CafeProfileInfoScreen() {
  const [menuPage, setMeneuPage] = React.useState(PAGE_MENU);
  const [isLike, setIsLike] = React.useState(false);
  const [curTab, setCurTab] = React.useState<'menu' | 'space' | 'feed'>('menu');

  const navigation = useNavigation<MainStackNavigationProp>();
  const route = useRoute<CafePforileInfoProp>();
  const insets = useSafeAreaInsets();
  const [likeCafe] = useSetLikeCafeMutation();

  const {
    data: cafeInfo,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetCafeInfoByIdQuery(route.params.cafeId);

  const { data: spaceInfoList, refetch: refetchSpace } = useGetSpaceListQuery(
    route.params.cafeId,
  );

  const { data: feedList, refetch: refetchFeed } = useGetFeedListQuery(
    route.params.cafeId,
  );

  React.useEffect(() => {
    if (cafeInfo?.data.menus.length + 1 <= menuPage) {
      // Alert.alert('', '모든 메뉴 확인');
    }
  }, [menuPage]);

  const onLikeCafe = async cafeId => {
    try {
      const resultData = await likeCafe({
        cafeId: cafeId,
        body: {
          like: cafeInfo?.data.isLike === null ? true : !cafeInfo?.data.isLike,
        },
      }).unwrap();
      refetch();
      Alert.alert('', `찜하기 ${resultData.data === 1 ? '해제' : '완료'}`);
    } catch (error) {
      console.log('onLikeCafe  :: ', error);
    }
  };

  const onMoveNaverMap = () => {
    if (cafeInfo?.data.geoLocation) {
      Linking.openURL(
        `http://map.naver.com/index.nhn?enc=utf8&level=2&lng=${
          cafeInfo?.data.geoLocation.coordinates[0]
        }&lat=${
          cafeInfo?.data.geoLocation.coordinates[1]
        }&pinTitle=${encodeURIComponent(cafeInfo?.data.name)}`,
      );
    } else {
      Alert.alert('', '위치정보가 없습니다.');
    }
    // ex) naver Map
    // Linking.openURL(
    //   'nmap://route/public?dlat=35.17982543369992&dlng=129.07499499992576&dname=%EB%B6%80%EC%82%B0%EC%8B%9C%EC%B2%AD',
    // );
  };

  if (isLoading) return null;
  if (isError) {
    Alert.alert('', '시스템 오류, 관리자에게 문의하세요');
    console.log('cafeProfile  errr :: ', error);
    return null;
  }

  return (
    <Container>
      <ContainerWithScroll>
        {/* header backImage */}
        <Box>
          <Image
            source={{ uri: cafeInfo?.data.backgroundImage.uri }}
            style={{
              width: Layout.window.width,
              height: Layout.window.width * 0.667,
            }}
          />
          <Box
            style={{
              marginTop: -20,
              backgroundColor: 'fff',
            }}>
            <Box
              center
              style={{
                padding: 26,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Text bold size={24} color={Colors.default.fontBlack}>
                {cafeInfo?.data.name}
              </Text>
              <Box
                row
                aCenter
                style={{
                  paddingTop: 21,
                }}>
                <BoxPressable onPress={() => onLikeCafe(cafeInfo?.data.id)} row>
                  <SvgXml
                    xml={Svgs.svgHeart}
                    width="20"
                    height="20"
                    color={cafeInfo?.data.isLike ? '#e47364' : '#000'}
                    fill={cafeInfo?.data.isLike ? '#e47364' : '#fff'}
                  />
                  <Text size={14} color={Colors.default.fontBlack}>
                    찜{' '}
                  </Text>
                  <Text size={14} color={Colors.default.fontBlack}>
                    {cafeInfo?.data.customerLikesCafes.length}
                  </Text>
                </BoxPressable>
                <Box
                  style={{
                    height: 5,
                    marginLeft: 16,
                    marginRight: 13,
                    borderRightWidth: 1,
                    borderColor: '#979797',
                  }}
                />
                <BoxPressable onPress={onMoveNaverMap} row>
                  <Image
                    source={Images.icoDirectionSmall}
                    style={{
                      width: 16,
                      height: 16,
                      marginRight: 3,
                    }}
                  />
                  <Text size={14} color={Colors.default.fontBlack}>
                    길찾기
                  </Text>
                </BoxPressable>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Tab */}
        {/* 탭 전체 정렬 */}
        <Box
          row
          space
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.default.borderGrayColor,
          }}>
          {/* 탭 공간 잡기 */}
          <BoxPressable
            onPress={() => setCurTab('menu')}
            center
            style={{
              flex: 1,
            }}>
            {/* 탭 활성화 밑줄을 위한 박스 */}
            <Box
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderBottomWidth: 3,
                borderBottomColor: curTab === 'menu' ? '#685448' : '#fff',
              }}>
              <Text
                bold={curTab === 'menu'}
                size={12}
                color={curTab === 'menu' ? '#685448' : '#a0a0a0'}>
                정보
              </Text>
            </Box>
          </BoxPressable>
          <BoxPressable
            onPress={() => setCurTab('space')}
            center
            style={{
              flex: 1,
            }}>
            <Box
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderBottomWidth: 3,
                borderBottomColor: curTab === 'space' ? '#685448' : '#fff',
              }}>
              <Text
                bold={curTab === 'space'}
                size={12}
                color={curTab === 'space' ? '#685448' : '#a0a0a0'}>
                공간
              </Text>
            </Box>
          </BoxPressable>
          <BoxPressable
            onPress={() => setCurTab('feed')}
            center
            style={{
              flex: 1,
            }}>
            <Box
              style={{
                flex: 1,
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderBottomWidth: 3,
                borderBottomColor: curTab === 'feed' ? '#685448' : '#fff',
              }}>
              <Text
                bold={curTab === 'feed'}
                size={12}
                color={curTab === 'feed' ? '#685448' : '#a0a0a0'}>
                피드
              </Text>
            </Box>
          </BoxPressable>
        </Box>
        {/* ////////////////// 매장 정보 ////////////////// */}
        {curTab === 'menu' ? (
          <>
            <Box
              style={{
                paddingHorizontal: 16,
                paddingVertical: 26,
              }}>
              <Text bold size={16} color={Colors.default.fontBlack}>
                매장 정보
              </Text>
              <Box
                style={{
                  paddingTop: 16,
                }}>
                <Box
                  row
                  style={{
                    marginBottom: 10,
                  }}>
                  <Text
                    size={14}
                    color={Colors.default.commonGrey}
                    style={{
                      flex: 0.2,
                    }}>
                    장소
                  </Text>
                  <Text
                    size={14}
                    color={'rgba(0, 0, 0, 0.85)'}
                    style={{
                      flex: 0.8,
                    }}>
                    {cafeInfo?.data.roadAddress +
                      ', ' +
                      cafeInfo?.data.detailAddress}
                  </Text>
                </Box>
                <Box
                  row
                  style={{
                    marginBottom: 10,
                  }}>
                  <Text
                    size={14}
                    color={Colors.default.commonGrey}
                    style={{
                      flex: 0.2,
                    }}>
                    주차여부
                  </Text>
                  <Text
                    size={14}
                    color={'rgba(0, 0, 0, 0.85)'}
                    style={{
                      flex: 0.8,
                    }}>
                    {cafeInfo?.data.parkingDescription}
                  </Text>
                </Box>
                <Box
                  row
                  style={{
                    marginBottom: 10,
                  }}>
                  <Text
                    size={14}
                    color={Colors.default.commonGrey}
                    style={{
                      flex: 0.2,
                    }}>
                    영업시간
                  </Text>
                  <Text
                    size={14}
                    color={'rgba(0, 0, 0, 0.85)'}
                    style={{
                      flex: 0.8,
                    }}>
                    {cafeInfo?.data.openingTime +
                      ' ~ ' +
                      cafeInfo?.data.closingTime}
                  </Text>
                </Box>
                <Box
                  row
                  style={{
                    marginBottom: 10,
                  }}>
                  <Text
                    size={14}
                    color={Colors.default.commonGrey}
                    style={{
                      flex: 0.2,
                    }}>
                    휴무일
                  </Text>
                  <Text
                    size={14}
                    color={'#e47364'}
                    style={{
                      flex: 0.8,
                    }}>
                    {cafeInfo?.data.closedDay}
                  </Text>
                </Box>
                <Box
                  row
                  style={{
                    marginBottom: 10,
                  }}>
                  <Text
                    size={14}
                    color={Colors.default.commonGrey}
                    style={{
                      flex: 0.2,
                    }}>
                    전화번호
                  </Text>
                  <Text
                    size={14}
                    color={'rgba(0, 0, 0, 0.85)'}
                    style={{
                      flex: 0.8,
                    }}>
                    {cafeInfo?.data.phoneNumber}
                  </Text>
                </Box>
              </Box>
            </Box>

            <GreyBox />
            {/* 시그니쳐 */}
            <Box
              style={{
                paddingHorizontal: 16,
                paddingVertical: 26,
              }}>
              <Text bold size={16} color={Colors.default.fontBlack}>
                시그니쳐 메뉴
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 16,
                  paddingBottom: 4,
                }}>
                {cafeInfo?.data?.signatureMenus.length > 0 &&
                  cafeInfo?.data.signatureMenus.map(item => {
                    return (
                      <SignatureMenuCard key={item.id.toString()} {...item} />
                    );
                  })}
              </ScrollView>
            </Box>
            <GreyBox />
            {/* 메뉴 */}
            <Box
              style={{
                paddingHorizontal: 16,
                paddingVertical: 26,
              }}>
              <Text bold size={16} color={Colors.default.fontBlack}>
                메뉴{' '}
                <Text bold size={16} color={'#937665'}>
                  {cafeInfo?.data?.menus.length}
                </Text>
              </Text>
              {cafeInfo?.data?.menus.length > 0 &&
                cafeInfo?.data.menus.map((item, idx) => {
                  if (idx >= menuPage) return null;
                  return (
                    <CafeInfoMenuCard key={item.id.toString()} {...item} />
                  );
                })}
            </Box>
            <BoxPressable
              onPress={() => setMeneuPage(menuPage + 3)}
              center
              style={{
                padding: 13,
              }}>
              <Text medium size={14} color={'#685448'}>
                더 보기
              </Text>
            </BoxPressable>
            <GreyBox />
            {/* 쿠폰 */}
            {cafeInfo?.data.coupon !== null && (
              <BoxPressable
                onPress={() =>
                  navigation.navigate('BarcodeModal', {
                    cafeName: cafeInfo?.data.name,
                    couponInfo: { ...cafeInfo?.data.coupon },
                    discountTitle: `${cafeInfo?.data.coupon.discountAmount} ${
                      cafeInfo?.data.coupon.discountMethod === 'price'
                        ? '원 '
                        : '% '
                    }할인`,
                    dateTitle:
                      dayjs(cafeInfo?.data.coupon.startDate).format(
                        'YYYY.MM.DD',
                      ) +
                      '-' +
                      dayjs(cafeInfo?.data.coupon.endDate).format('YYYY.MM.DD'),
                  })
                }
                center
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}>
                <ImageBackground
                  source={Images.imgCouponBack}
                  resizeMode={'contain'}
                  style={{
                    width: Layout.window.width,
                    height: Layout.window.width * 0.479,
                  }}>
                  <Box
                    row
                    aCenter
                    space
                    style={{
                      width: Layout.window.width,
                      height: Layout.window.width * 0.46,
                      paddingLeft: Layout.window.width * 0.1,
                      paddingRight: Layout.window.width * 0.073,
                    }}>
                    <Box style={{}}>
                      <Text medium size={16} color={Colors.default.fontBlack}>
                        {cafeInfo?.data.coupon.name}
                      </Text>
                      <Text
                        bold
                        size={24}
                        color={Colors.default.fontBlack}
                        style={{
                          paddingTop: 6,
                        }}>
                        {cafeInfo?.data.coupon.discountAmount}
                        {cafeInfo?.data.coupon.discountMethod === 'price'
                          ? '원 '
                          : '% '}
                        할인
                      </Text>
                      <Text
                        size={14}
                        color={Colors.default.commonGrey}
                        style={{
                          paddingTop: 16,
                        }}>
                        {dayjs(cafeInfo?.data.coupon.startDate).format(
                          'YYYY.MM.DD',
                        ) +
                          '-' +
                          dayjs(cafeInfo?.data.coupon.endDate).format(
                            'YYYY.MM.DD',
                          )}
                      </Text>
                    </Box>
                    <Box>
                      <Image
                        source={Images.icoBarcode}
                        style={{
                          width: 30,
                          height: 19,
                          marginBottom: 8,
                        }}
                      />
                      <Text size={12} color={Colors.default.fontBlack}>
                        바코드
                      </Text>
                    </Box>
                  </Box>
                </ImageBackground>
              </BoxPressable>
            )}
          </>
        ) : curTab === 'space' ? (
          <Box
            style={{
              paddingHorizontal: 16,
              paddingVertical: 26,
            }}>
            <Text bold size={16} color={Colors.default.fontBlack}>
              공간 소개
            </Text>
            {spaceInfoList !== undefined &&
              spaceInfoList?.data.length >= 0 &&
              spaceInfoList?.data.map((item, idx) => (
                <SpaceCard key={idx.toString()} {...item} />
              ))}
          </Box>
        ) : (
          <Box
            style={{
              paddingVertical: 26,
            }}>
            {feedList !== undefined &&
              feedList?.data.length >= 0 &&
              feedList?.data.map((item, idx) => (
                <StoreFeedCard
                  key={idx.toString()}
                  {...item}
                  cafeName={cafeInfo?.data.name}
                  cafeProfileImageUri={cafeInfo?.data.profileImage.uri}
                />
              ))}
          </Box>
        )}
      </ContainerWithScroll>
      <Box
        wFull
        row
        jEnd
        style={{
          position: 'absolute',
          bottom: 24,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}>
        <BoxPressable
          aEnd
          onPress={() =>
            navigation.navigate('Stamp', {
              cafeId: cafeInfo?.data.id,
              cafeName: cafeInfo?.data.name,
            })
          }>
          <Image
            source={Images.icoBtnFloat}
            style={{
              width: 65,
              height: 65,
            }}
          />
        </BoxPressable>
      </Box>
    </Container>
  );
}
