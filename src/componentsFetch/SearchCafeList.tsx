import React, { useState, useEffect } from 'react';

import { useGetSearchCafeByNameQuery } from '../api/commonAuth';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import SearchCafeCard from '../components/SearchCafeCard';
import useUserStore from '../hooks/useUserStore';

type RecommendCafeListProps = {
  queryParam: string;
  onPress: () => any;
};

export default function SearchCafeList({
  queryParam,
  onPress,
}: RecommendCafeListProps) {
  const [query, setQuery] = useState(queryParam);
  const { data, error, isLoading, isFetching } = useGetSearchCafeByNameQuery(
    query,
    {
      skip: query === '',
    },
  );
  const userStore = useUserStore();

  const dataList = data?.data?.cafes ?? [];

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  if (error) {
    console.log('errrr :: ', error);
    return <></>;
  }

  if (isLoading) {
    console.log('isLoading');
    return <></>;
  }

  if (isFetching) {
    console.log('isFetching');
    return <></>;
  }

  if (dataList.length === 0) {
    console.log('no data');
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
        <SearchCafeCard
          key={id}
          cafeId={id}
          imgCafeLogo={{ uri: profileImage.uri }}
          textCafeName={name}
          onPress={item => onPress(item)}
        />
      ))}
    </>
  );
}
