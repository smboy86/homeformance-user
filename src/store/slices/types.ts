import { CafeInfo } from '../../api/types';

// AppSlice
// UserSlice
export type JoinUserInfo = {
  recCafeInfo: {
    selRecommendCafeId: string;
    selRecommendCafeName: string;
    selIngRecommendCafeId: string;
  };
};
// CafeSlice
export type CafeSliceInitialState = {
  cafeInfo: CafeInfo | null;
};
