import * as React from 'react';
import { Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import ModalAlert from '../basicComponents/ModalAlert';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import MainCafeCard from '../components/MainCafeCard';
import TodayCouponCard from '../components/TodayCouponCard';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';

export default function MainCompleteLogin() {
  const insets = useSafeAreaInsets();
  const [isModalAlert, setIsModalAlert] = React.useState(true);

  return (
    <Container
      style={{
        paddingTop: insets.top,
        backgroundColor: '#fff',
      }}>
      <ModalAlert
        noCloseBtn
        isVisible={isModalAlert}
        title={'로그인이 완료되었습니다!'}
        text={
          '추천 카페 입력을 통해 브라운 쿠포닝의\n더 많은 혜택을 받아 보시겠어요? '
        }
        onCloseModal={setIsModalAlert}
        onPress={() => setIsModalAlert(false)}
        btnLabel={'확인'}
      />
      <Box
        row
        center
        style={{
          padding: 16,
        }}>
        <BoxPressable
          onPress={() => Alert.alert('', '지도보기')}
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
          <Text>경인로 35길 16-8 </Text>
          <Image
            source={Images.icoArrowBottom}
            style={{
              width: 12,
              height: 6,
            }}
          />
        </Box>
      </Box>
      <ContainerWithScroll style={{}}>
        {/* search bar */}
        <Box
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
        </Box>
        <Box
          style={{
            paddingHorizontal: 16,
            paddingBottom: 22,
          }}>
          {/* 메인 배너 */}
          <Box
            center
            style={{
              height: Layout.window.width * 0.427,
              marginBottom: 22,
              backgroundColor: Colors.default.tintBrown,
              borderRadius: 10,
            }}>
            <Text color={'#fff'}>브라운 쿠포닝 배너 (설명 필요)</Text>
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 2,
              }}>
              <TodayCouponCard />
              <TodayCouponCard />
              <TodayCouponCard />
            </ScrollView>
          </Box>
        </Box>
        <GreyBox />
        <Box
          style={{
            paddingTop: 22,
            paddingHorizontal: 16,
            paddingBottom: 60,
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
          {/* Todo - paging */}
          <MainCafeCard />
          <MainCafeCard />
          <MainCafeCard />
          <MainCafeCard />
          <MainCafeCard />
          <MainCafeCard />
          <MainCafeCard />
        </Box>
      </ContainerWithScroll>
    </Container>
  );
}
