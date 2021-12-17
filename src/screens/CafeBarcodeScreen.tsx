import * as React from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  ImageBackgroundBase,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { SceneMap } from 'react-native-tab-view';
import { HScrollView } from 'react-native-head-tab-view';
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import Colors from '../constants/Colors';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Button from '../basicComponents/Button';
import MenuCard from '../components/MenuCard';
import Layout from '../constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Images from '../constants/Images';
import TabCafeProfileInfo from './TabCafeProfileInfo';
import Container from '../basicComponents/Container';
import BoxPressable from '../basicComponents/BoxPressable';
import GreyBox from '../components/GreyBox';
import SignatureMenuCard from '../components/SignatureMenuCard';
import CafeInfoMenuCard from '../components/CafeInfoMenuCard';
import ModalBarcode from '../basicComponents/ModalBarcode';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function CafeBarcodeScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '메뉴',
    });
  }, []);

  const insets = useSafeAreaInsets();
  const [isModalBarcode, setIsModalBarcode] = React.useState(true);

  return (
    <ContainerWithScroll isBottom>
      {/* header backImage */}
      <ModalBarcode
        isVisible={isModalBarcode}
        barcodeImg={Images.imgPubBarcode}
        onCloseModal={setIsModalBarcode}
      />
      <Box style={{}}>
        <Image
          source={Images.imgPubCafeProfileInfo}
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
              열두달 커피 개봉점
            </Text>
            <Box
              row
              aCenter
              style={{
                paddingTop: 21,
              }}>
              <Box row>
                <Image
                  source={Images.icoHeart}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 4,
                  }}
                />
                <Text size={14} color={Colors.default.fontBlack}>
                  찜
                </Text>
                <Text size={14} color={Colors.default.fontBlack}>
                  32
                </Text>
              </Box>
              <Box
                style={{
                  height: 5,
                  marginLeft: 16,
                  marginRight: 13,
                  borderRightWidth: 1,
                  borderColor: '#979797',
                }}
              />
              <Box row>
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
              </Box>
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
        <Box
          center
          style={{
            flex: 1,
          }}>
          {/* 탭 활성화 밑줄을 위한 박스 */}
          <Box
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderBottomWidth: 3,
              borderBottomColor: '#685448',
            }}>
            <Text>정보</Text>
          </Box>
        </Box>
        <Box
          center
          style={{
            flex: 1,
          }}>
          <Text>공간</Text>
        </Box>
        <Box
          center
          style={{
            flex: 1,
          }}>
          <Text>피드</Text>
        </Box>
      </Box>
      {/* 매장 정보 */}
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
              서울특별시 구로구 경인로 323 1층
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
              주차 가능
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
              평일 08:00~23:00
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
              매주 수요일
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
              0507-1494-5051
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
          <SignatureMenuCard idx={1} />
          <SignatureMenuCard idx={1} />
          <SignatureMenuCard idx={1} />
          <SignatureMenuCard idx={1} />
          <SignatureMenuCard idx={1} />
          <SignatureMenuCard idx={1} />
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
          메뉴
          <Text bold size={16} color={'#937665'}>
            {' '}
            31
          </Text>
        </Text>
        <CafeInfoMenuCard />
        <CafeInfoMenuCard isBest />
        <CafeInfoMenuCard />
        <CafeInfoMenuCard />
        <CafeInfoMenuCard />
        <CafeInfoMenuCard />
      </Box>
      {/* 밑줄 부분 정리해야할듯.. */}
      <BoxPressable
        onPress={() => Alert.alert('', '더보기')}
        center
        style={{
          padding: 13,
          // paddingBottom: 0,
        }}>
        <Text medium size={14} color={'#685448'}>
          더 보기
        </Text>
      </BoxPressable>
      <GreyBox />
      <Box
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
                아이스아메리카노
              </Text>
              <Text
                bold
                size={24}
                color={Colors.default.fontBlack}
                style={{
                  paddingTop: 6,
                }}>
                10% 할인
              </Text>
              <Text
                size={14}
                color={Colors.default.commonGrey}
                style={{
                  paddingTop: 16,
                }}>
                2021.10.01-2021.10.31
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
      </Box>
      <Box
        row
        space
        style={{
          // marginTop: 10,
          borderTopWidth: 1,
          borderTopColor: Colors.default.borderGrayColor,
          paddingHorizontal: 16,
        }}>
        <Button
          fill
          label={'스탬프 열기'}
          onPress={() => Alert.alert('', '스탬프 열기')}
          style={{
            marginTop: 14,
          }}
        />
      </Box>
    </ContainerWithScroll>
  );
}
