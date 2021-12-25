import React from 'react';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import { pxToDp } from '../constants/Layout';

export default function () {
  return (
    <ContainerWithScroll>
      <Box
        full
        center
        ph={16}
        pt={pxToDp(40)}
        style={{
          flex: 1,
        }}>
        <Text>메인 C</Text>
      </Box>
    </ContainerWithScroll>
  );
}
