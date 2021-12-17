import { NavigatorScreenParams, RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Coupon } from '../api/types';

export type RootStackParamList = {
  Root: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type LoginStackParamList = {
  LoadingModal: undefined;
  Login: undefined;
  SearchPassword: undefined;
  Join: undefined;
  RecommendCafe: undefined;
  CompleteJoin: undefined;
};

export type MainStackParamList = {
  Modal: NavigatorScreenParams<ModalStackParamList> | undefined;
  Bottom: undefined;
  Detail: NavigatorScreenParams<DetailStackParamList> | undefined;
};

// Main > Modal
export type ModalStackParamList = {
  LoadingModal: undefined;
  VideoModal: {
    videoUri: string;
  };
  BarcodeModal: {
    cafeName: string;
    couponInfo: Coupon;
    discoutTitle: string;
    dateTitle: string;
  };
};

// Main > Modal
export type BottomStackParamList = {
  Main: undefined;
  FavoriteCafe: undefined;
  Video: undefined;
  MyPage: undefined;
};

// Main > Detail
export type DetailStackParamList = {
  SearchCafe: undefined;
  Address: undefined;
  CafeProfileInfo: {
    cafeId: number;
  };
  Stamp: {
    cafeId: number;
    cafeName: string;
  };
  MyProfile: {
    userId: string;
    nickname: string;
  };
};

// 위에 정의한 파라미터로 useNavigation 에 사용
export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;
export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

// 위에 정의한 파라미터로 useRoute 사용
export type CafePforileInfoProp = RouteProp<
  DetailStackParamList,
  'CafeProfileInfo'
>;
export type StampProp = RouteProp<DetailStackParamList, 'Stamp'>;
export type BarcodeModalProp = RouteProp<ModalStackParamList, 'BarcodeModal'>;
export type MyProfileProp = RouteProp<DetailStackParamList, 'MyProfile'>;
