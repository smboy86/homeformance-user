import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../constants/Options';
import { JoinInfo } from './types';

const API_ROOT_URL = '/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/${API_ROOT_URL}`,
  }),
  endpoints: builder => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query(body) {
        return {
          url: '/signin/email',
          method: 'POST',
          body,
        };
      },
    }),
    join: builder.mutation<any, JoinInfo>({
      query(body) {
        return {
          url: '/signup/email',
          method: 'POST',
          body,
        };
      },
    }),
    searchPasswrod: builder.mutation<any, { email: string }>({
      query(body) {
        return {
          url: '/find-password',
          method: 'POST',
          body,
        };
      },
    }),
    loginBySocial: builder.mutation<
      any,
      { token: string; authType: 'naver' | 'kakao' | 'apple' }
    >({
      query(body) {
        return {
          url: '/signin/oauth',
          method: 'POST',
          body,
        };
      },
    }),
    joinBySocial: builder.mutation<
      any,
      {
        token: string;
        authType: 'naver' | 'kakao' | 'apple';
        nickname: string;
        recommendCafeId: number;
      }
    >({
      query(body) {
        return {
          url: '/signup/oauth',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useLoginMutation,
  useJoinMutation,
  useSearchPasswrodMutation,
  useLoginBySocialMutation,
  useJoinBySocialMutation,
} = authApi;
