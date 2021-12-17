import { createApi } from '@reduxjs/toolkit/query/react';
import { CafeInfo, NewsInfo, SpaceInfo } from './types';
import { baseQueryWithReauth } from './apiUtils';

const API_ROOT_URL = 'cafes';

export const cafeApi = createApi({
  reducerPath: 'cafeApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getCafeInfoById: builder.query<
      {
        success: boolean;
        data: CafeInfo;
      },
      number
    >({
      query: cafeId => `/${API_ROOT_URL}/${cafeId}/detail`,
    }),
    getStamp: builder.query<any, number>({
      query: cafeId => `/${API_ROOT_URL}/${cafeId}/stamp`,
    }),
    setLikeCafe: builder.mutation<
      any,
      { cafeId: string; body: { like: boolean } }
    >({
      query({ cafeId, body }) {
        return {
          url: `/${API_ROOT_URL}/${cafeId}/like`,
          method: 'PUT',
          body: body,
        };
      },
    }),
    getSpaceList: builder.query<
      {
        success: boolean;
        data: SpaceInfo[];
      },
      number
    >({
      query: cafeId => `/${API_ROOT_URL}/${cafeId}/posts?type=space`,
    }),
    getFeedList: builder.query<
      {
        success: boolean;
        data: NewsInfo[];
      },
      number
    >({
      query: cafeId => `/${API_ROOT_URL}/${cafeId}/posts?type=news`,
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetCafeInfoByIdQuery,
  useGetStampQuery,
  useSetLikeCafeMutation,
  useGetSpaceListQuery,
  useGetFeedListQuery,
  // useGetMenuListQuery,
  // useGetSignatureMenuListQuery,
  // useSetCafeProfileMutation,
  // useAddCafeMenuMutation,
  // useAddSignatureMenuMutation,
  // useDeleteStoreMenuMutation,
  // useDeleteSignatureMenuMutation,
  // useModSignatureMenuMutation,
  // useModStoreMenuMutation,
  // useGetSpaceNewsListQuery,
  // useAddSpaceNewsMutation,
  // useDeleteSpaceNewsMutation,
  // useModSpaceNewsMutation,
} = cafeApi;
