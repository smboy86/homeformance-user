import { collection, getDocs, query } from 'firebase/firestore';
import React from 'react';
import { useSelector } from 'react-redux';
import { firestoreService } from '../../fireabse';

import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import GreyBox from '../components/GreyBox';
import ItemList from '../components/ItemList';
import { pxToDp } from '../constants/Layout';

export default function () {
  const [itemList, setItemList] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const ref = query(collection(firestoreService, 'items'));
      const querySnapshot = await getDocs(ref);

      let tempList: any = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ ...doc.data(), id: doc.id });
      });

      setItemList(tempList);
    }

    getData();
  }, []);

  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>상품리스트</Text>
      </Box>
      <GreyBox />
      {itemList.length >= 0 &&
        itemList.map((item, idx: number) => (
          <ItemList key={idx.toString()} {...item} />
        ))}
    </ContainerWithScroll>
  );
}
