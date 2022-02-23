import React from 'react';
import { useSelector } from 'react-redux';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import ItemList from '../components/ItemList';

export default function () {
  const appStore = useSelector((state) => state.app);

  if (appStore?.items?.length <= 0) return null;

  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>상품리스트</Text>
      </Box>
      <GreyBox />
      {appStore?.items?.length >= 0 &&
        appStore?.items?.map((item, idx: number) => (
          <ItemList key={idx.toString()} {...item} />
        ))}
    </ContainerWithScroll>
  );
}
