import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MoveScreenProp = {
  type: 'screen' | 'detail';
  // nav: NativeStackScreenProps<any, any>;
  nav: any;
  navigatorName?: string;
  screenName: string;
  params?: any;
};

export const utilOnMoveScreen = ({
  type,
  nav,
  navigatorName,
  screenName,
  params,
}: MoveScreenProp) => {
  if (type === 'screen') {
    if (params !== undefined) {
      nav.navigate(screenName, { ...params });
    } else {
      nav.navigate(screenName);
    }
  } else if (type === 'detail') {
    nav.navigate(navigatorName, { screen: screenName, params: { ...params } });
  } else {
    console.log('onMoveScreen :: ???');
  }
};
