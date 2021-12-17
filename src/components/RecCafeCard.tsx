import * as React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import { useReduxDispatch } from '../store';
import { saveRecCafeInfo } from '../store/slices/UserSlice';

type Props = {
  cafeId: number;
  imgCafeLogo: ImageSourcePropType;
  textCafeName: string;
  isActive: boolean;
};

export default function RecCafeCard(props: Props) {
  const dispatch = useReduxDispatch();

  return (
    <BoxPressable
      onPress={() =>
        dispatch(
          saveRecCafeInfo({
            selRecommendCafeId: '',
            selRecommendCafeName: props.textCafeName,
            selIngRecommendCafeId: props.cafeId.toString(),
          }),
        )
      }
      row
      aCenter
      border
      style={{
        height: 40,
        marginBottom: 12,
        borderWidth: props.isActive ? 1 : 0,
        borderRadius: 10,
        borderColor: Colors.default.tintBrown,
        padding: 4,
      }}>
      <Image
        source={props.imgCafeLogo}
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          marginRight: 12,
        }}
      />
      <Text size={14} color={Colors.default.fontBlack}>
        {props.textCafeName}
      </Text>
    </BoxPressable>
  );
}
