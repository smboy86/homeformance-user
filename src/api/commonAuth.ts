import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './apiUtils';
import {
  Banner,
  BannerCouponing,
  FavoriteCafe,
  MyLocation,
  NearByCafes,
  SearchedCafeInfo,
  TodayVideo,
} from './types';

const API_ROOT_URL = 'common';

export const commonAuthApi = createApi({
  reducerPath: 'commonAuthApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getBanners: builder.query<
      { success: boolean; data: { banners: Banner[] } },
      void
    >({
      query: () => `/${API_ROOT_URL}/banners`,
    }),
    getTodayCouponing: builder.query<
      { success: boolean; data: { todayCoupons: BannerCouponing[] } },
      void
    >({
      query: () => `/${API_ROOT_URL}/today-couponing`,
    }),
    getNearbyCafes: builder.query<
      { success: boolean; data: { cafes: NearByCafes[] } },
      void
    >({
      query: () => `/${API_ROOT_URL}/nearby-cafes`,
    }),
    setMyLocation: builder.mutation<
      { data: MyLocation },
      Pick<MyLocation, 'roadAddress' | 'postalCode'>
    >({
      query(body) {
        return {
          url: `/${API_ROOT_URL}/location`,
          method: 'PUT',
          // headers: {
          //   'content-type': 'application/x-www-form-urlencoded',
          // },
          body,
        };
      },
    }),
    getSearchCafeByName: builder.query<
      { success: boolean; data: { cafes: SearchedCafeInfo[] } },
      string
    >({
      query: searchParam =>
        `/${API_ROOT_URL}/nearby-cafes/search?query=${searchParam}`,
    }),
    getMyLikeCafeList: builder.query<
      { success: boolean; data: FavoriteCafe[] },
      string
    >({
      query: orderType => `/${API_ROOT_URL}/like-cafes?order=${orderType}`,
    }),
    getTodayVideos: builder.query<
      { success: boolean; data: TodayVideo[] },
      void
    >({
      query: () => `/${API_ROOT_URL}/today-videos`,
    }),
    getRoadAddressByCoordinate: builder.mutation<
      { success: boolean; data: MyLocation },
      { lat: string; lon: string }
    >({
      query({ lat, lon }) {
        return {
          url: `/${API_ROOT_URL}/road-address?latitude=${lat}&longitude=${lon}`,
          method: 'PUT',
        };
      },
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetBannersQuery,
  useGetTodayCouponingQuery,
  useGetNearbyCafesQuery,
  useSetMyLocationMutation,
  useGetSearchCafeByNameQuery,
  useGetMyLikeCafeListQuery,
  useGetTodayVideosQuery,
  useGetRoadAddressByCoordinateMutation,
} = commonAuthApi;
