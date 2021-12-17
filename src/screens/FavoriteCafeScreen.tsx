import { useFocusEffect, useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetMyLikeCafeListQuery } from '../api/commonAuth';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import FavoriteCafeCard from '../components/FavoriteCafeCard';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { MainStackNavigationProp } from '../navigation/types';

export default function FavoriteCafeScreen() {
  const [curOrderby, setCurOrderBy] = React.useState('latest'); // latest | stamp

  const navigation = useNavigation<MainStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const {
    data: FavoriteCafeList,
    error,
    isLoading,
    refetch,
  } = useGetMyLikeCafeListQuery(curOrderby);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  React.useEffect(() => {
    refetch();
  }, [curOrderby]);

  const onMoveCafeProfile = (cafeId: number) => {
    navigation.navigate('CafeProfileInfo', {
      cafeId: cafeId,
    });
  };

  if (error) {
    console.log('errrr :: ', error);
    return <></>;
  }

  if (isLoading) {
    console.log('isLoading');
    return <></>;
  }

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
            찜카페
          </Text>
        </Box>
        <BoxPressable
          onPress={() => refetch()}
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
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
      </Box>
      <ContainerWithScroll>
        <Box
          style={{
            paddingTop: 20,
            paddingHorizontal: 16,
            paddingBottom: 22,
          }}>
          <Box row space style={{}}>
            <Text medium size={12} color={Colors.default.fontBlack}>
              사용가능 스탬프{' '}
              <Text medium size={12} color={'#e47364'}>
                0
              </Text>
            </Text>
            <Box row center>
              <BoxPressable onPress={() => setCurOrderBy('latest')}>
                <Text
                  size={12}
                  color={
                    curOrderby === 'latest'
                      ? Colors.default.fontBlack
                      : '#a0a0a0'
                  }>
                  최신순
                </Text>
              </BoxPressable>
              <Box
                onPress={() => setCurOrderBy('latest')}
                style={{
                  height: 5,
                  marginHorizontal: 8,
                  borderRightWidth: 1,
                  borderColor: '#979797',
                }}
              />
              <BoxPressable onPress={() => setCurOrderBy('count')}>
                <Text
                  size={12}
                  color={
                    curOrderby === 'count'
                      ? Colors.default.fontBlack
                      : '#a0a0a0'
                  }>
                  스탬프순
                </Text>
              </BoxPressable>
            </Box>
          </Box>
          {FavoriteCafeList?.data.length === 0 ? (
            <Box
              row
              aCenter
              style={{
                height: 40,
                marginBottom: 12,
              }}>
              <Text>카페가 없습니다.</Text>
            </Box>
          ) : (
            // [...FavoriteCafeList?.data]
            //   .sort((a, b) => {
            //     // Todo - API 최신순, 스탬프순을 가리기가 힘들다
            //     // 최신 api 정보가 필요함
            //     if (curOrderby === 'latest') {
            //       return a.name > b.name ? 1 : -1;
            //     } else {
            //       // stamp 내림차순 (높은게 위로)
            //       return b.stamp.stampCount - a.stamp.stampCount;
            //     }
            //   })
            FavoriteCafeList?.data.map(item => {
              return (
                <FavoriteCafeCard
                  key={item.id}
                  {...item}
                  onPress={() => onMoveCafeProfile(item.id)}
                  onPressBarcode={() =>
                    navigation.navigate('Stamp', {
                      cafeId: item.id,
                      cafeName: item.name,
                    })
                  }
                />
              );
            })
          )}
        </Box>
      </ContainerWithScroll>
    </Container>
  );
}
