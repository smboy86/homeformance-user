import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { API_BASE_URL } from '../constants/Options';
import { RootState } from '../store/RootReducer';
import { refreshToken } from '../store/slices/AppSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).app.token.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refreshToken: (api.getState() as RootState).app.token.refreshToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      api.dispatch(refreshToken(refreshResult.data.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: 'USER_LOGOUT' });
    }
  }
  return result;
};
