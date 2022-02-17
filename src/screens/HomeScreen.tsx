import React from 'react';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';

import { firestoreService } from '../../fireabse';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import VideoCardHome from '../components/VideoCardHome';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../store/slices/AppSlice';
import { VideoType } from '../types';

export default function () {
  const [videoList, setVideoList] = React.useState([]);
  const appStore = useSelector((state) => state.app);
  const commonStore = useSelector((state) => state.common);

  React.useEffect(() => {
    async function getData() {
      const ref = query(collection(firestoreService, 'videos'));

      const querySnapshot = await getDocs(ref);

      let tempList = [];
      querySnapshot.forEach((doc) => {
        console.log('doc id :: ', doc.id);
        tempList.push({ ...doc.data(), id: doc.id });
      });

      setVideoList(tempList);
    }

    getData();
  }, []);

  return (
    <ContainerWithScroll safe>
      <Box pl={16} pv={22} center>
        <Text size={28}>홈퍼먼스</Text>
      </Box>
      {videoList.length >= 0 &&
        videoList.map((item: VideoType, idx) => (
          <VideoCardHome key={idx.toString()} {...item} />
        ))}
    </ContainerWithScroll>
  );
}
