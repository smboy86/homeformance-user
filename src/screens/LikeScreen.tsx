import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

function VideoTab() {
  return (
    <ContainerWithScroll>
      <Text> </Text>
    </ContainerWithScroll>
  );
}

function LikeTab() {
  return (
    <ContainerWithScroll>
      <Text> </Text>
    </ContainerWithScroll>
  );
}

export default function () {
  const appStore = useSelector((state) => state.app);

  React.useEffect(() => {}, []);

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
