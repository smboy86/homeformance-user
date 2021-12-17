import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingModalScreen from '../screens/LoadingModalScreen';
import LoginScreen from '../screens/LoginScreen';
import JoinScreen from '../screens/JoinScreen';
import CompleteJoinScreen from '../screens/CompleteJoinScreen';
import SearchPasswordScreen from '../screens/SearchPasswordScreen';
import { LoginStackParamList } from './types';
import RecommendCafeScreen from '../screens/RecommendCafeScreen';
import CompleteSearchPasswordScreen from '../screens/CompleteSearchPasswordScreen';
import JoinSocialScreen from '../screens/JoinSocialScreen';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const LoginNavigator = () => (
  <Stack.Navigator
    initialRouteName={'Login'}
    screenOptions={{
      animation: 'none',
    }}>
    {/* 0) Modal */}
    <Stack.Group
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        animation: 'none',
      }}>
      <Stack.Screen name="LoadingModal" component={LoadingModalScreen} />
    </Stack.Group>
    {/* 1) 헤더 없음 */}
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Group>
    {/* 2) 헤더 있음 */}
    <Stack.Group
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
      <Stack.Screen name="JoinSocial" component={JoinSocialScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="SearchPassword" component={SearchPasswordScreen} />
      <Stack.Screen name="RecommendCafe" component={RecommendCafeScreen} />
      <Stack.Screen name="CompleteJoin" component={CompleteJoinScreen} />
      <Stack.Screen
        name="CompleteSearchPassword"
        component={CompleteSearchPasswordScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default LoginNavigator;
