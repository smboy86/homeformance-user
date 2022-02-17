import React from 'react';
import { collection, query, getDocs } from 'firebase/firestore';

import { firestoreService } from '../../fireabse';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import VideoCardHome from '../components/VideoCardHome';
import { VideoType } from '../types';

export default function () {
  const [videoList, setVideoList] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const ref = query(collection(firestoreService, 'videos'));

      const querySnapshot = await getDocs(ref);

      let tempList: any = [];
      querySnapshot.forEach((doc) => {
        tempList.push({ ...doc.data(), id: doc.id });
      });

      setVideoList(tempList);
    }

    getData();
  }, []);

  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>홈포먼스</Text>
      </Box>
      {videoList.length >= 0 &&
        videoList.map((item: VideoType, idx: number) => (
          <VideoCardHome id={''} key={idx.toString()} {...item} />
        ))}
    </ContainerWithScroll>
  );
}
