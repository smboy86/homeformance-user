import React from 'react';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import VideoCardHome from '../components/VideoCardHome';
import { VideoType } from '../types';
import { useSelector } from 'react-redux';

export default function () {
  const appStore = useSelector((state) => state.app);

  if (appStore?.items?.length <= 0) return null;

  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>홈포먼스</Text>
      </Box>
      {appStore?.items?.length >= 0 &&
        appStore?.items?.map((item: VideoType, idx: number) => (
          <VideoCardHome id={''} key={idx.toString()} {...item} />
        ))}
    </ContainerWithScroll>
  );
}
