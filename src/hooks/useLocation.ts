import React from 'react';
import { Alert, DeviceEventEmitter } from 'react-native';
import * as Location from 'expo-location';
import dayjs from 'dayjs';

import useAppStore from './useAppStore';
import {
  useGetRoadAddressByCoordinateMutation,
  useSetMyLocationMutation,
} from '../api/commonAuth';
import { useReduxDispatch } from '../store';
import { saveMyLocation } from '../store/slices/AppSlice';
import {
  DEFAULT_ADDRESS,
  DEFAULT_ADDRESS_POSTAL,
  REFRESH_GPS,
} from '../constants/Options';

export default function useLocation() {
  const [position, setIsPotion] = React.useState({
    longitude: 0,
    latitude: 0,
  });
  const [isCompleteLocation, setIsCompleteLocation] = React.useState(false);

  const dispatch = useReduxDispatch();
  const appStore = useAppStore();
  const [setMyLocationApi] = useSetMyLocationMutation();
  const [getMyAddress] = useGetRoadAddressByCoordinateMutation();

  async function setDefaultLocation() {
    await setMyLocationApi({
      roadAddress: DEFAULT_ADDRESS,
      postalCode: DEFAULT_ADDRESS_POSTAL,
    });

    dispatch(
      saveMyLocation({
        locationUpdatedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        roadAddress: DEFAULT_ADDRESS,
        postalCode: DEFAULT_ADDRESS_POSTAL,
      }),
    );

    // console.log('emitttt   ::  ', 'reloadMain');
    DeviceEventEmitter.emit('reloadMain');
  }

  React.useEffect(() => {
    (async () => {
      // 1) 위치정보 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('', '위치정보 수락하지 않음');
        setIsCompleteLocation(true);
        setDefaultLocation();
        return;
      }
      // console.log('위치정보 획득 시작');
      // console.log(
      //   '위치정보 획득 시작 222 ',
      //   appStore.myLocation === undefined,
      //   appStore.myLocation.locationUpdatedDate === '',
      //   dayjs(appStore.myLocation.locationUpdatedDate).diff(
      //     new Date(),
      //     'hour',
      //   ) <= -3,
      // );
      // console.log(
      //   '3333  ',
      //   appStore.myLocation === undefined ||
      //     appStore.myLocation.locationUpdatedDate === '' ||
      //     dayjs(appStore.myLocation.locationUpdatedDate).diff(
      //       new Date(),
      //       'hour',
      //     ) <= -3,
      // );

      // console.log(
      //   '위치정보 획득 시작 23333 ',
      //   appStore.myLocation.locationUpdatedDate,
      //   dayjs(appStore.myLocation.locationUpdatedDate).diff(new Date(), 'hour'),
      // );
      ////////
      // console.log(dayjs('2021.11.23 20:00:00').diff(new Date(), 'day'));
      // 2) 나의 위치 업데이트 확인 (24시간 1번, 자정기준)   -  '2021-11-24T08:38:18.512Z'
      // ex) -3 --> 과거 체크 했던 시간보다 3시간이 넘으면 업데이트 로직 멈춤!
      if (
        dayjs(appStore?.myLocation?.locationUpdatedDate).diff(
          new Date(),
          'hour',
        ) >= -REFRESH_GPS &&
        appStore.myLocation === undefined &&
        appStore.myLocation.roadAddress === ''
      ) {
        console.log('위치정보 최신 --------- ');
        setIsCompleteLocation(true);
        return;
      }
      // 2-2) 최신 업데이트
      // console.log('자동 위치정보 셋팅 start');

      // 2-1) 위치정보 획득
      let location = await Location.getCurrentPositionAsync({});
      // console.log('자동 위치정보 셋팅 start  :: ', location);

      try {
        // 2-1) 위치좌표를 도로명주소로 변환 (kakao api 정확도 문제로 폐기)
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;

        const result = await getMyAddress({
          lat: latitude.toString(),
          lon: longitude.toString(),
        }).unwrap();

        // 2-2) 좌표정보 바로 보내거나 주소확인
        // 2-3) api save
        if (result.data !== null) {
          await setMyLocationApi({
            roadAddress: result?.data,
            postalCode: '12345',
          });

          dispatch(
            saveMyLocation({
              locationUpdatedDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              roadAddress: result?.data,
              postalCode: '12345',
            }),
          );
          DeviceEventEmitter.emit('reloadMain');
        } else {
          setDefaultLocation();
        }
      } catch (e) {
        console.log('useLocation 2-1) 위치정보획득 err ', e);
        setDefaultLocation(); // 로그인하여 권한이 없을 때도 이쪽으로
        return;
      } finally {
        // 99) 종료
        setIsCompleteLocation(true);
      }
    })();
  }, [isCompleteLocation]);

  return [isCompleteLocation];
}
