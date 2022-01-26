import React from 'react';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import ItemList from '../components/ItemList';
import { pxToDp } from '../constants/Layout';

export default function () {
  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>상품리스트</Text>
      </Box>
      <GreyBox />
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
      <ItemList />
      <ItemList />
      <ItemList />
    </ContainerWithScroll>
  );
}
