import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { PubStackParamList, RootStackParamList } from '../types';
import Layout from '../constants/Layout';

import MainScreen from '../screens/MainScreen';
import PubListScreen from '../screens/PubListScreen';
import CafeProfileScreen from '../screens/CafeProfileInfoScreen';
import EditCafeProfileScreen from '../screens/EditCafeProfileScreen';
import AddDisscountCouponScreen from '../screens/AddDisscountCouponScreen';
import UploadTodayVideoScreen from '../screens/UploadTodayVideoScreen';
import StoreMenuScreen from '../screens/StoreMenuScreen';
import StoreSpaceScreen from '../screens/StoreSpaceScreen';
import StoreNewsScreen from '../screens/StoreNewsScreen';
import UploadStoreMenuScreen from '../screens/UploadStoreMenuScreen';
import UploadStoreNewsScreen from '../screens/UploadStoreNewsScreen';
import StampDashboardScreen from '../screens/StampDashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import JoinScreen from '../screens/JoinScreen';
import RecommendCafeScreen from '../screens/RecommendCafeScreen';
import CompleteJoinScreen from '../screens/CompleteJoinScreen';
import SearchPasswordScreen from '../screens/SearchPasswordScreen';
import CompleteSearchPasswordScreen from '../screens/CompleteSearchPasswordScreen';
import BottomIcon from '../components/BottomIcon';
import Images from '../constants/Images';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import MainCompleteLogin from '../screens/MainCompleteLogin';
import AddressScreen from '../screens/AddressScreen';
import CafeProfileInfoScreen from '../screens/CafeProfileInfoScreen';
import CafeBarcodeScreen from '../screens/CafeBarcodeScreen';
import CafeProfileSpaceScreen from '../screens/CafeProfileSpaceScreen';
import CafeProfileFeedScreen from '../screens/CafeProfileFeedScreen';
import FavoriteCafeScreen from '../screens/FavoriteCafeScreen';
import StampScreen from '../screens/StampScreen';
import VideoScreen from '../screens/VideoScreen';
import MyPageScreen from '../screens/MyPageScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

// 퍼블리싱 네비게이션 룰
// 1. 디테일인지 아닌지만 구분 (헤더의 뒤로가기 )

const RootStack = createNativeStackNavigator<RootStackParamList>();
const PubStack = createNativeStackNavigator<PubStackParamList>();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

// 1) 일반 화면 네비게이터
const SimpleStackNavigator = () => (
  <PubStack.Navigator>
    {/* 0) Root 퍼블리싱 화면 */}
    <PubStack.Screen
      name="Init"
      component={PubListScreen}
      options={{
        animation: 'none',
        title: '퍼블리싱 화면 리스트',
      }}
    />
    {/* 1) LoginNavigator */}
    <PubStack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <PubStack.Screen name="Login" component={LoginScreen} />
    </PubStack.Group>
    <PubStack.Group
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerTitle: '',
        headerBackTitle: ' ',
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'spoqaBold',
        },
        headerTintColor: '#000',
      }}>
      <PubStack.Screen name="Join" component={JoinScreen} />
      <PubStack.Screen name="RecommendCafe" component={RecommendCafeScreen} />
      <PubStack.Screen name="CompleteJoin" component={CompleteJoinScreen} />
      <PubStack.Screen name="SearchPassword" component={SearchPasswordScreen} />
      <PubStack.Screen
        name="CompleteSearchPassword"
        component={CompleteSearchPasswordScreen}
      />
      {/* 2) MainNavigator */}
      {/* 2-1) 단일 화면 */}
      <PubStack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <PubStack.Screen
          name="MainCompleteLogin"
          component={MainCompleteLogin}
        />
      </PubStack.Group>
      {/* 2-2) 디테일 화면 (header) */}
      <PubStack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: false,
          // headerTitle: '',
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: 'spoqaBold',
          },
          headerTintColor: '#000',
        }}>
        <PubStack.Screen name="Address" component={AddressScreen} />
        <PubStack.Screen name="CafeBarcode" component={CafeBarcodeScreen} />
        <PubStack.Screen
          name="CafeProfileSpace"
          component={CafeProfileSpaceScreen}
        />
        <PubStack.Screen
          name="CafeProfileFeed"
          component={CafeProfileFeedScreen}
        />
        <PubStack.Screen name="MyProfile" component={MyProfileScreen} />
      </PubStack.Group>
      {/* 2-3) 디테일 화면 (header transperence) */}
      <PubStack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: 'spoqaBold',
          },
          headerTintColor: '#000',
        }}>
        <PubStack.Screen
          name="CafeProfileInfo"
          component={CafeProfileInfoScreen}
        />
      </PubStack.Group>
    </PubStack.Group>

    {/* 2. 헤더 있는 화면들 (메인 바텀 제외) */}
    <PubStack.Group
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerTitle: '',
        headerBackTitle: ' ',
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'spoqaBold',
        },
        headerTintColor: '#000',
      }}>
      <PubStack.Screen name="CafeProfile" component={CafeProfileScreen} />
      <PubStack.Screen
        name="EditCafeProfile"
        component={EditCafeProfileScreen}
      />
      <PubStack.Screen
        name="AddDisscountCoupon"
        component={AddDisscountCouponScreen}
      />
      <PubStack.Screen
        name="UploadTodayVideo"
        component={UploadTodayVideoScreen}
      />
      <PubStack.Screen
        name="UploadStoreMenu"
        component={UploadStoreMenuScreen}
      />
      <PubStack.Screen
        name="UploadStoreNews"
        component={UploadStoreNewsScreen}
      />
      <PubStack.Screen name="StampDashboard" component={StampDashboardScreen} />
      <PubStack.Screen name="Stamp" component={StampScreen} />
      {/* 2.1 탭 화면 */}
      <PubStack.Screen
        name="StoreMenu"
        options={{
          headerTitle: '매장정보 변경',
          headerShadowVisible: false,
        }}>
        {props => (
          <TopTab.Navigator
            initialRouteName={'StoreMenu'}
            screenOptions={{
              tabBarLabelStyle: { fontSize: 12, fontFamily: 'spoqaBold' },
              tabBarActiveTintColor: '#685448',
              tabBarInactiveTintColor: '#a0a0a0',
              tabBarItemStyle: {},
              tabBarStyle: {
                borderBottomWidth: 1,
                borderColor: '#e5e5e5',
              },
              tabBarIndicatorStyle: {
                width: Layout.window.width * 0.128,
                left: '10%',
                borderWidth: 2,
                borderRadius: 1.5,
              },
            }}>
            <TopTab.Screen name="StoreMenu" component={StoreMenuScreen} />
            <TopTab.Screen name="StoreSpace" component={StoreSpaceScreen} />
            <TopTab.Screen name="StoreNews" component={StoreNewsScreen} />
          </TopTab.Navigator>
        )}
      </PubStack.Screen>
    </PubStack.Group>
  </PubStack.Navigator>
);

// 2) 바텀 네비게이터
const MainNavigator = () => (
  <BottomTab.Navigator
    // tabBar={props => {
    //   return (
    //     <Box
    //       style={{
    //         position: 'absolute',
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //       }}>
    //       <BottomTabBar {...props} />
    //     </Box>
    //   );
    // }}
    barStyle={{
      height: Platform.select({
        ios: 70,
        android: 60,
      }),
      backgroundColor: '#fff',
    }}
    screenOptions={{}}
    shifting={false}
    labeled={false}
    // screenOptions={{
    //   style: {
    //     backgroundColor: Colors.default.backgroundTintColor,
    //     borderTopLeftRadius: 28,
    //     borderTopRightRadius: 28,
    //   },
    //   showLabel: true,
    //   labelStyle: {
    //     fontSize: 8,
    //     fontWeight: 'bold',
    //     fontFamily: 'netmarble',
    //   },
    //   activeTintColor: '#fff',
    //   inactiveTintColor: '#fff',
    // }}
  >
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

// 3) 공통 부모 Root Navigator 부분
export const PubNavigator = () => (
  <RootStack.Navigator
    // initialRouteName={'SimpleStackNavigator'}
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen
      name="SimpleStackNavigator"
      component={SimpleStackNavigator}
    />
    <RootStack.Screen
      name="MainNavigator"
      component={MainNavigator}
      options={{
        animation: 'none',
      }}
    />
  </RootStack.Navigator>
);

export default PubNavigator;
