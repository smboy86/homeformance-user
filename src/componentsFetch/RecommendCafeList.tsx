import React, { useState, useEffect } from 'react';

import { useGetCafeListQuery } from '../api/common';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import RecCafeCard from '../components/RecCafeCard';
import useUserStore from '../hooks/useUserStore';

type RecommendCafeListProps = {
  queryParam: string;
};

const RecommendCafeList = ({ queryParam }: RecommendCafeListProps) => {
  const [query, setQuery] = useState(queryParam);
  const { data, error, isLoading, isFetching } = useGetCafeListQuery(query);
  const userStore = useUserStore();

  const dataList = data?.data?.cafes ?? [];

  useEffect(() => {
    // if (queryParam.length === 0 || queryParam.length > 4) {
    setQuery(queryParam);
    // }
  }, [queryParam]);

  if (error) {
    // console.log('errrr :: ', error);
    return <></>;
  }

  if (isLoading) {
    // console.log('isLoading');
    return <></>;
  }

  if (isFetching) {
    // console.log('isFetching');
    return <></>;
  }

  if (dataList.length === 0) {
    // console.log('no data');
    return (
      <Box
        row
        aCenter
        style={{
          height: 40,
          marginBottom: 12,
        }}>
        <Text>카페가 없습니다.</Text>
      </Box>
    );
  }

  return (
    <>
      {dataList.map(({ id, profileImage, name }) => (
        <RecCafeCard
          key={id}
          isActive={
            userStore.joinInfo.recCafeInfo.selIngRecommendCafeId ===
            id.toString()
          }
          cafeId={id}
          imgCafeLogo={{ uri: profileImage.uri }}
          textCafeName={name}
        />
      ))}
    </>
  );
};

export default RecommendCafeList;
