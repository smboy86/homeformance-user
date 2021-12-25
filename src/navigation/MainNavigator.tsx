import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { BottomStackParamList, MainStackParamList } from './types';
import {
  DetailVideoScreen,
  HomeScreen,
  ItemScreen,
  LikeScreen,
  SettingsScreen,
} from '../screens';
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
    activeColor='#7FC4FD'
    inactiveColor='#e6e6e6'
    screenOptions={{}}
    shifting={false}
    labeled={false}>
    <BottomTab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='home-sharp' size={24} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name='Item'
      component={ItemScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='cart-outline' size={26} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name='Like'
      component={LikeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='heart' size={26} color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name='MyPage'
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name='ios-person' size={24} color={color} />
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
    <Stack.Screen name='Bottom' component={BottomNavigator} />
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
        },
        headerTintColor: '#000',
        headerLeft: (props) => (
          <BoxPressable
            onPress={() => navigation.goBack()}
            style={{
              paddingLeft: 0,
            }}>
            <MaterialIcons name='arrow-back-ios' size={18} color='black' />
          </BoxPressable>
        ),
      })}>
      <Stack.Screen name='DetailVideo' component={DetailVideoScreen} />
    </Stack.Group>
    {/* 2-3) yes header + transparent */}
    {/* <Stack.Group
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        title: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerBackTitle: '',
        headerLeft: (props) => (
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
      <Stack.Screen name='CafeProfileInfo' component={CafeProfileInfoScreen} />
    </Stack.Group> */}
    {/* 3) Modal */}
    {/* 3-1)  containedTransparentModal */}
    {/* <Stack.Group
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
      <Stack.Screen name='VideoModal' component={VideoModalScreen} />
    </Stack.Group> */}
    {/* 3-2)  fullScreenModal */}
    {/* <Stack.Group
      screenOptions={{
        headerShown: false,
        presentation: 'fullScreenModal',
        animation: 'none',
      }}>
      <Stack.Screen name='LoadingModal' component={LoadingModalScreen} />
    </Stack.Group> */}
    {/* 3-3) transparent Modal*/}
    {/* <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
      <Stack.Screen name='BarcodeModal' component={BarcodeModalScreen} />
    </Stack.Group> */}
  </Stack.Navigator>
);

export default MainNavigator;
