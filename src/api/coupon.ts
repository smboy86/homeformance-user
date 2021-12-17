import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './apiUtils';

const API_ROOT_URL = 'coupon';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    setCoupon: builder.mutation<any, any>({
      query(body) {
        return {
          url: `/${API_ROOT_URL}`,
          method: 'PUT',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          body,
        };
      },
    }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useSetCouponMutation } = couponApi;
