import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './apiUtils';

const API_ROOT_URL = '/'; // Root route

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getMyProfile: builder.query<
      { success: boolean; data: { userId: number; nickname: string } },
      void
    >({
      query: () => `/profile`,
    }),
    setMyProfile: builder.mutation<
      any,
      {
        nickname: string;
      }
    >({
      query(body) {
        return {
          url: `/profile`,
          method: 'PUT',
          body: body,
        };
      },
    }),
    delAccount: builder.mutation<any, void>({
      query() {
        return {
          url: `/profile`,
          method: 'DELETE',
        };
      },
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetMyProfileQuery,
  useSetMyProfileMutation,
  useDelAccountMutation,
} = customersApi;
