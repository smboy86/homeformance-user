import { createApi } from '@reduxjs/toolkit/query/react';
import { StampData } from '../types';
import { baseQueryWithReauth } from './apiUtils';

const API_ROOT_URL = 'stamps';

export const stampsApi = createApi({
  reducerPath: 'stampsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getStampData: builder.query<StampData, string>({
      // date : 2021-10-29
      query: date => `/${API_ROOT_URL}/logs/dates/${date}`,
    }),
    // setCafeProfile: builder.mutation<any, any>({
    //   query(body) {
    //     return {
    //       url: `/${API_ROOT_URL}`,
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'application/x-www-form-urlencoded',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // getMenuList: builder.query<menu, void>({
    //   query: () => `/${API_ROOT_URL}/menus`,
    // }),
    // addCafeMenu: builder.mutation<any, any>({
    //   query(body) {
    //     return {
    //       url: `/${API_ROOT_URL}/menus`,
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // deleteStoreMenu: builder.mutation<any, string>({
    //   query(menuId) {
    //     return {
    //       url: `/${API_ROOT_URL}/menus/${menuId}`,
    //       method: 'DELETE',
    //     };
    //   },
    // }),
    // modStoreMenu: builder.mutation<any, { id: string; body: FormData }>({
    //   query({ id: menuId, body }) {
    //     return {
    //       url: `/${API_ROOT_URL}/menus/${menuId}`,
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // getSignatureMenuList: builder.query<menu, void>({
    //   query: () => `/${API_ROOT_URL}/signature-menus`,
    // }),
    // addSignatureMenu: builder.mutation<any, any>({
    //   query(body) {
    //     return {
    //       url: `/${API_ROOT_URL}/signature-menus`,
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // deleteSignatureMenu: builder.mutation<any, string>({
    //   query(menuId) {
    //     return {
    //       url: `/${API_ROOT_URL}/signature-menus/${menuId}`,
    //       method: 'DELETE',
    //     };
    //   },
    // }),
    // modSignatureMenu: builder.mutation<any, { id: string; body: FormData }>({
    //   query({ id: menuId, body }) {
    //     return {
    //       url: `/${API_ROOT_URL}/signature-menus/${menuId}`,
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // getSpaceNewsList: builder.query<void, string>({
    //   query: type => `/${API_ROOT_URL}/posts?type=${type}`,
    // }),
    // addSpaceNews: builder.mutation<any, any>({
    //   query(body) {
    //     return {
    //       url: `/${API_ROOT_URL}/posts`,
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
    // deleteSpaceNews: builder.mutation<any, string>({
    //   query(postId) {
    //     return {
    //       url: `/${API_ROOT_URL}/posts/${postId}`,
    //       method: 'DELETE',
    //     };
    //   },
    // }),
    // modSpaceNews: builder.mutation<any, { postId: string; body: FormData }>({
    //   query({ postId: postId, body }) {
    //     return {
    //       url: `/${API_ROOT_URL}/posts/${postId}`,
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //       },
    //       body,
    //     };
    //   },
    // }),
  }),
});
// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetStampDataQuery } = stampsApi;
