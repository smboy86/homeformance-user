import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingModalScreen from '../screens/LoadingModalScreen';
import { BottomStackParamList, MainStackParamList } from './types';
import MainScreen from '../screens/MainScreen';
import VideoModalScreen from '../screens/VideoModalScreen';
import AddressScreen from '../screens/AddressScreen';
import SearchCafeScreen from '../screens/SearchCafeScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Platform, Image } from 'react-native';
import BottomIcon from '../components/BottomIcon';
import Images from '../constants/Images';
import FavoriteCafeScreen from '../screens/FavoriteCafeScreen';
import VideoScreen from '../screens/VideoScreen';
import MyPageScreen from '../screens/MyPageScreen';
import CafeProfileInfoScreen from '../screens/CafeProfileInfoScreen';
import BarcodeModalScreen from '../screens/BarcodeModalScreen';
import StampScreen from '../screens/StampScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import BoxPressable from '../basicComponents/BoxPressable';

const Stack = createNativeStackNavigator<MainStackParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomStackParamList>();

//////////////////// Bottom
// 2) 바텀 네비게이터
const BottomNavigator = () => (
  <BottomTab.Navigator
    barStyle={{
      height: Platform.select({
        ios: 70,
        android: 60,
      }),
      backgroundColor: '#fff',
    }}
    screenOptions={{}}
    shifting={false}
    labeled={false}>
    <BottomTab.Screen
      name="Main"
      component={MainScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <BottomIcon
            focused={focused}
            icon={Images.icoBottomHome}
            iconOn={Images.icoBottomHomeOn}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="FavoriteCafe"
      component={FavoriteCafeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <BottomIcon
            focused={focused}
            icon={Images.icoBottomFavorite}
            iconOn={Images.icoBottomFavoriteOn}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="Video"
      component={VideoScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <BottomIcon
            focused={focused}
            icon={Images.icoBottomTodayMenu}
            iconOn={Images.icoBottomTodayMenuOn}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name="MyPage"
      component={MyPageScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <BottomIcon
            focused={focused}
            icon={Images.icoBottomMyPage}
            iconOn={Images.icoBottomMyPageOn}
          />
        ),
      }}
    />
  </BottomTab.Navigator>
);

//////////////////// MAIN ( Bottom + Detail )
export const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={'Bottom'}
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: '#fff',
        shadowOffset: { height: 0, width: 0 },
        elevation: 0,
      },
    }}>
    {/* 1) Main Bottom Tab 4 */}
    <Stack.Screen name="Bottom" component={BottomNavigator} />
    {/* 2) Details */}
    {/* 2-1) No Header */}
    {/* 2-2) yes Header */}
    <Stack.Group
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTransparent: false,
        headerTitle: '',
        headerTitleAlign: 'center',
        title: '',
        headerBackTitle: ' ',
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'spoqaBold',
        },
        headerTintColor: '#000',
        headerLeft: props => (
          <BoxPressable
            onPress={() => navigation.goBack()}
            // hitSlop={{ top: 10, bottom: 10, left: 10, right: 50 }} // not working
            style={{
              padding: 20,
              paddingLeft: 0,
            }}>
            <Image
              source={Images.icoArrowLeft}
              style={{
                width: 6,
                height: 10,
              }}
            />
          </BoxPressable>
        ),
      })}>
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Stamp" component={StampScreen} />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="SearchCafe" component={SearchCafeScreen} />
    </Stack.Group>
    {/* 2-3) yes header + transparent */}
    <Stack.Group
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        title: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerBackTitle: '',
        headerLeft: props => (
          <BoxPressable
            onPress={() => navigation.goBack()}
            // hitSlop={{ top: 10, bottom: 10, left: 10, right: 50 }} // not working
            style={{
              padding: 20,
              paddingLeft: 0,
            }}>
            <Image
              source={Images.icoArrowLeft}
              style={{
                width: 6,
                height: 10,
              }}
            />
          </BoxPressable>
        ),
        headerShadowVisible: false,
      })}>
      <Stack.Screen name="CafeProfileInfo" component={CafeProfileInfoScreen} />
    </Stack.Group>
    {/* 3) Modal */}
    {/* 3-1)  containedTransparentModal */}
    <Stack.Group
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        title: '',
        headerStyle: {
          backgroundColor: '#000',
        },
        presentation: 'containedTransparentModal',
        animation: 'none',
      }}>
      <Stack.Screen name="VideoModal" component={VideoModalScreen} />
    </Stack.Group>
    {/* 3-2)  fullScreenModal */}
    <Stack.Group
      screenOptions={{
        headerShown: false,
        presentation: 'fullScreenModal',
        animation: 'none',
      }}>
      <Stack.Screen name="LoadingModal" component={LoadingModalScreen} />
    </Stack.Group>
    {/* 3-3) transparent Modal*/}
    <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <Stack.Screen name="BarcodeModal" component={BarcodeModalScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

export default MainNavigator;
