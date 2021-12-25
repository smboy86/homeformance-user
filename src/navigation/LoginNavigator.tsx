import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginStackParamList } from './types';
import { JoinScreen, LoginScreen, SearchPasswordScreen } from '../screens';
const Stack = createNativeStackNavigator<LoginStackParamList>();

export const LoginNavigator = () => (
  <Stack.Navigator
    initialRouteName={'Login'}
    screenOptions={{
      animation: 'none',
    }}>
    {/* 0) Modal */}
    {/* <Stack.Group
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        animation: 'none',
      }}>
      <Stack.Screen name="LoadingModal" component={LoadingModalScreen} />
    </Stack.Group> */}
    {/* 1) 헤더 없음 */}
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Group>
    {/* 2) 헤더 있음 */}
    <Stack.Group
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerBackTitle: ' ',
        headerTitleStyle: {
          fontSize: 14,
        },
        headerTintColor: '#000',
      }}>
      <Stack.Screen
        name='Join'
        component={JoinScreen}
        options={{
          title: '회원가입',
        }}
      />
      <Stack.Screen
        name='SearchPassword'
        component={SearchPasswordScreen}
        options={{
          title: '비밀번호 찾기',
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default LoginNavigator;
