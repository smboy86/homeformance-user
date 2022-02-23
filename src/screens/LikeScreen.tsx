import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import { useSelector } from 'react-redux';
import { VideoType } from '../types';
import VideoCardHome from '../components/VideoCardHome';
import ItemList from '../components/ItemList';

const Tab = createMaterialTopTabNavigator();

function VideoTab() {
  const appStore = useSelector((state) => state.app);

  return (
    <ContainerWithScroll>
      {appStore?.items?.length >= 0 &&
        appStore?.items?.map((item: VideoType, idx: number) => {
          if (idx === 2)
            return <VideoCardHome id={''} key={idx.toString()} {...item} />;
        })}
    </ContainerWithScroll>
  );
}

function LikeTab() {
  const appStore = useSelector((state) => state.app);

  return (
    <ContainerWithScroll>
      {appStore?.items?.length >= 0 &&
        appStore?.items?.map(
          (item, idx: number) =>
            idx === 2 && <ItemList key={idx.toString()} {...item} />
        )}
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
