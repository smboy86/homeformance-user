import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useGetNearbyCafesQuery } from '../api/commonAuth';
import { NearByCafes } from '../api/types';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import MainCafeCard from '../components/MainCafeCard';
import { MainStackNavigationProp } from '../navigation/types';

export default function NearByCafeList() {
  const {
    data: dataList,
    isLoading,
    error,
    refetch,
  } = useGetNearbyCafesQuery();
  const navigation = useNavigation<MainStackNavigationProp>();

  React.useEffect(() => {
    DeviceEventEmitter.addListener('reloadMain', () => {
      refetch();
    });
  }, []);

  if (error) {
    // console.log('errrr :: ', error);
    return <></>;
  }

  if (isLoading) {
    // console.log('isLoading');
    return <></>;
  }

  const onMoveCafeProfile = (cafeId: number) => {
    navigation.navigate('CafeProfileInfo', {
      cafeId: cafeId,
    });
  };

  if (dataList?.data?.cafes.length === 0) {
    return (
      <Box
        row
        aCenter
        style={{
          height: 40,
          marginBottom: 12,
        }}>
        <Text>근처 카페가 없습니다</Text>
      </Box>
    );
  }

  return (
    <>
      {dataList?.data?.cafes.map((item: NearByCafes) => (
        <MainCafeCard
          key={item.id.toString()}
          {...item}
          onPress={onMoveCafeProfile}
        />
      ))}
    </>
  );
}
