import React from 'react';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import VideoCardHome from '../components/VideoCardHome';

export default function () {
  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>홈퍼먼스</Text>
      </Box>
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
      <VideoCardHome />
    </ContainerWithScroll>
  );
}
