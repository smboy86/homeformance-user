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
import SpaceCard from '../components/SpaceCard';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function CafeProfileSpaceScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '카페프로필(공간)',
    });
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <ContainerWithScroll isBottom>
      {/* header backImage */}
      <Box style={{ position: 'relative' }}>
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
          <Text>정보</Text>
        </Box>
        <Box
          center
          style={{
            flex: 1,
          }}>
          <Box
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderBottomWidth: 3,
              borderBottomColor: '#685448',
            }}>
            <Text>공간</Text>
          </Box>
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
          공간 소개
        </Text>
        <SpaceCard idx={0} />
        <SpaceCard idx={1} />
        <SpaceCard idx={2} />
        <SpaceCard idx={3} />
        {/* Todo - Fixed Bottom */}
        <Box
          row
          space
          style={{
            // position: 'absolute',
            // bottom: 40,
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
      </Box>
    </ContainerWithScroll>
  );
}
