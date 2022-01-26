import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import { pxToDp } from '../constants/Layout';
import VideoCardHome from '../components/VideoCardHome';
import ItemList from '../components/ItemList';

const Tab = createMaterialTopTabNavigator();

function VideoTab() {
  return (
    <ContainerWithScroll>
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
    </ContainerWithScroll>
  );
}
function LikeTab() {
  return (
    <ContainerWithScroll>
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
      <ItemList />
    </ContainerWithScroll>
  );
}

export default function () {
  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>찜목록</Text>
      </Box>
      <Tab.Navigator
        transitionStyle='curl'
        screenOptions={
          {
            // tabBarInactiveTintColor: '#000'
          }
        }
        style={{
          flex: 1,
        }}>
        <Tab.Screen
          name='Home'
          component={VideoTab}
          options={{
            title: '영상',
          }}
        />
        <Tab.Screen
          name='Settings'
          component={LikeTab}
          options={{
            title: '상품',
          }}
        />
      </Tab.Navigator>
    </ContainerWithScroll>
  );
}
