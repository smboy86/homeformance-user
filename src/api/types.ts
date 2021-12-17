// common Type
type Image = {
  id: string;
  objectName: string;
  uri: string;
  createdAt: string;
  updatedAt: string;
};

//// auth API
export type JoinInfo = {
  email: string;
  password: string;
  nickname: string;
  recommendCafeId: number | undefined;
};

//// cafe API
export type Menu = {
  id: number;
  name: string;
  price: number;
  isHot: boolean;
  isNew: boolean;
  isBest: boolean;
  image: {
    uri: string;
  };
};

export type SignatureMenu = {
  id: number;
  name: string;
  price: number;
  isHot: boolean;
  isNew: boolean;
  isBest: boolean;
  video: {
    uri: string;
  };
};

export type Coupon = {
  name: string;
  startDate: string;
  endDate: string;
  discountMethod: string;
  discountAmount: number;
  image: {
    uri: string;
  };
};

export type CafeInfo = {
  id: number;
  name: string;
  detailAddress: string;
  roadAddress: string;
  simpleAddress: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  parkingDescription: string;
  openingTime: string;
  closingTime: string;
  closedDay: string;
  phoneNumber: string;
  isLike: null | any;
  customerLikesCafes: { cafeId: number }[];
  profileImage: Image;
  backgroundImage: Image;
  coupon: Coupon;
  menus: Menu[];
  signatureMenus: SignatureMenu[];
};

export type SearchedCafeInfo = {
  id: number;
  name: string;
  distance: number;
  profileImage: Image;
};

export type SpaceInfo = {
  id: string;
  content: string;
  createdAt: string;
  image: Image;
};

export type NewsInfo = SpaceInfo;

//// common API
export type Banner = {
  id: number;
  createdAt: string;
  image: {
    uri: string;
  };
};

export type TodayVideo = {
  id: number;
  description: string;
  cafeId: number;
  video: {
    uri: string;
  };
  cafe: {
    id: number;
    name: string;
    profileImage: {
      uri: string;
    };
  };
};

export type BannerCouponing = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  discountMethod: string;
  discountAmount: number;
  cafe: {
    id: number;
    name: string;
    profileImage: {
      uri: string;
    };
  };
  onPress: (cafeId: number) => void;
  newImageUrl: string;
};

export type NearByCafes = {
  id: number;
  name: string;
  distance: number;
  roadAddress: string;
  detailAddress: string;
  simpleAddress: string;
  backgroundImage: Image;
  profileImage: Image;
  cafePosts: { id: number }[];
  customerLikesCafes: { cafeId: number }[];
  coupon: any | null;
};

export type MyLocation = {
  userId: number;
  nickname: string;
  roadAddress: string;
  postalCode: string;
  geoLocation: {
    type: string;
    coordinates: string[];
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type FavoriteCafe = {
  id: number;
  name: string;
  simpleAddress: string;
  distance: number;
  backgroundImage: {
    uri: string;
  };
  stamp: {
    id: number;
    stampCount: number;
  };
};
