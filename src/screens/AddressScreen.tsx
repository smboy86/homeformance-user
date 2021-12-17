import * as React from 'react';
import { Image, DeviceEventEmitter } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Layout from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Images from '../constants/Images';
import { useNavigation } from '@react-navigation/core';
import { MainStackNavigationProp } from '../navigation/types';
import { useSetMyLocationMutation } from '../api/commonAuth';
import { useReduxDispatch } from '../store';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import { saveMyLocation } from '../store/slices/AppSlice';
import dayjs from 'dayjs';

export default function AddressScreen() {
  const navigation = useNavigation<MainStackNavigationProp>();
  const [setMyLocationApi] = useSetMyLocationMutation();
  const dispatch = useReduxDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '주소 설정',
      title: '주소 설정',
      headerLeft: () => (
        <BoxPressable
          onPress={() => navigation.goBack()}
          style={{
            padding: 8,
          }}>
          <Image
            source={Images.icoCloseX}
            style={{
              width: 16,
              height: 16,
            }}
          />
        </BoxPressable>
      ),
    });
  }, []);

  const onSelctedAddress = async (data: OnCompleteParams) => {
    try {
      await setMyLocationApi({
        roadAddress: data.roadAddress,
        postalCode: data.zonecode.toString(),
      });

      dispatch(
        saveMyLocation({
          locationUpdatedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          roadAddress: data.roadAddress,
          postalCode: data.zonecode.toString(),
        }),
      );

      DeviceEventEmitter.emit('reloadMain');
      navigation.goBack();
    } catch (error) {
      console.log('onSelctedAddress  :: ', error);
    }
  };

  return (
    <ContainerWithScroll>
      <Postcode
        style={{
          width: Layout.window.width,
          height: Layout.window.height,
        }}
        jsOptions={{ animated: true }}
        onSelected={data => onSelctedAddress(data)}
      />
    </ContainerWithScroll>
  );
}
