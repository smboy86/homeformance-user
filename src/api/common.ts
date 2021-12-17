import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../constants/Options';

const API_ROOT_URL = 'common';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/${API_ROOT_URL}`,
  }),
  endpoints: builder => ({
    getCafeList: builder.query<
      {
        success: boolean;
        data: {
          cafes: {
            id: number;
            name: string;
            profileImage: {
              id: number;
              objectName: string;
              uri: string;
              createdAt: string;
              updateAt: string;
            };
          }[];
        };
      },
      string
    >({
      query: query => `/cafes/search?query=${query}`,
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetCafeListQuery } = commonApi;
