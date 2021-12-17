import * as React from 'react';
import { Alert, Image } from 'react-native';
import { Video } from 'expo-av';

import { useGetTodayVideosQuery } from '../api/commonAuth';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import Text from '../basicComponents/Text';
import Layout from '../constants/Layout';
import { SvgXml } from 'react-native-svg';
import Svgs from '../constants/Svgs';
import Swiper from 'react-native-swiper';

export default function VideoScreen() {
  const video = React.useRef(null);

  const {
    data: todayVideoList,
    isLoading,
    isError,
    error,
  } = useGetTodayVideosQuery();

  if (error) {
    console.log('errrr :: ', error);
    return <></>;
  }

  if (isLoading) {
    console.log('isLoading');
    return <></>;
  }

  return (
    <Container
      style={{
        backgroundColor: '#fff',
      }}>
      <Swiper index={0} showsPagination={false} horizontal={false} loop={false}>
        {todayVideoList?.data.map((item, idx) => (
          <Box
            key={idx.toString()}
            style={
              {
                // paddingBottom: 70,
              }
            }>
            <Video
              ref={video}
              style={{
                width: Layout.window.width,
                height: Layout.window.height - 70,
              }}
              source={{
                uri: item.video.uri,
              }}
              useNativeControls
              resizeMode="contain"
            />
            <Box
              row
              style={{
                position: 'absolute',
                justifyContent: 'space-between',
                bottom: 0,
                padding: 16,
              }}>
              <Box
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: 10,
                }}>
                <Box
                  row
                  style={{
                    marginBottom: 12,
                  }}>
                  <Image
                    source={{ uri: item.cafe.profileImage.uri }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginRight: 4,
                    }}
                  />
                  <Text bold size={12} color={'#fff'}>
                    {item.cafe.name}
                  </Text>
                </Box>
                <Text size={12} color={'#fff'}>
                  {item.description}
                </Text>
              </Box>
              {/* <Box
                aCenter
                style={{
                  marginLeft: 34,
                  justifyContent: 'flex-end',
                }}>
                <BoxPressable
                  center
                  onPress={() => Alert.alert('', '좋아요 버튼')}
                  style={{
                    backgroundColor: '#937665',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}>
                  <SvgXml
                    xml={Svgs.svgHeart}
                    width="24"
                    height="24"
                    color={'#fff'}
                  />
                </BoxPressable>
              </Box> */}
            </Box>
          </Box>
        ))}
      </Swiper>
    </Container>
  );
}
