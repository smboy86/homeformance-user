import { useNavigation } from '@react-navigation/core';
import { useAssets } from 'expo-asset';
import React from 'react';
import { ScrollView } from 'react-native';
import { useGetTodayCouponingQuery } from '../api/commonAuth';
import { BannerCouponing } from '../api/types';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import TodayCouponCard from '../components/TodayCouponCard';
import { MainStackNavigationProp } from '../navigation/types';

const BannerCouponList = () => {
  const {
    data: bannerCouponList,
    isLoading,
    error,
  } = useGetTodayCouponingQuery();
  const navigation = useNavigation<MainStackNavigationProp>();

  const onMoveCafeProfile = (cafeId: number) => {
    navigation.navigate('CafeProfileInfo', {
      cafeId: cafeId,
    });
  };

  if (error) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  if (bannerCouponList?.data?.todayCoupons.length === 0) {
    return (
      <Box
        row
        aCenter
        style={{
          height: 40,
          marginBottom: 12,
        }}>
        <Text>쿠폰이 없습니다</Text>
      </Box>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 2,
      }}>
      {bannerCouponList?.data?.todayCoupons.map(
        (item: BannerCouponing, idx) => (
          <TodayCouponCard
            key={item.id.toString()}
            {...item}
            onPress={onMoveCafeProfile}
            // newImageUrl={assets[idx].localUri}
          />
        ),
      )}
    </ScrollView>
  );
};

export default BannerCouponList;
