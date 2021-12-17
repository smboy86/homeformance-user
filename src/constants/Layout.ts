import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  // isSmallDevice: width <= 375, // X 버전도 375 걸림
  isSmallDevice: height <= 800,
};
