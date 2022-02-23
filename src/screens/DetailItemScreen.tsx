import React from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, Button, Text } from '../basicComponents';
import Layout from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Container from '../basicComponents/Container';
import AutoHeightImage from 'react-native-auto-height-image';
import { useSelector } from 'react-redux';
import WebView from 'react-native-webview';

export default function () {
  const [data, setData] = React.useState();
  const appStore = useSelector((state) => state.app);
  const navigation = useNavigation();
  const route = useRoute();

  React.useLayoutEffect(() => {
    console.log('12321  :: ', appStore.items);
    navigation.setOptions({
      title: '상품 상세 페이지',
      headerTitle: '상품 상세 페이지',
      headerRight: () => (
        <BoxPressable
          height={46}
          center
          onPress={() => Alert.alert('상품 찜하기')}>
          <Ionicons name='heart' size={24} color={'#4231CA'} />
        </BoxPressable>
      ),
    });
  }, []);

  React.useEffect(() => {
    const filteredData = appStore.items.filter((item) => {
      return item.id === route.params.id;
    });

    console.log('filteredData :: ', filteredData[0]);
    setData(filteredData[0]);
  }, []);

  if (data === undefined || data === null) return null;

  return (
    <Container>
      <ContainerWithScroll>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            height: Layout.window.width - 80,
          }}>
          {data.itemImageList.map((item, idx) => (
            <Box key={idx.toString()} center>
              <AutoHeightImage
                key={idx.toString()}
                source={{
                  uri: item,
                }}
                width={Layout.window.width - 80}
                style={{
                  resizeMode: 'contain',
                  marginRight: 22,
                }}
              />
            </Box>
          ))}
        </ScrollView>
        <Box ph={16}>
          <Box pv={24}>
            <Text bold size={32}>
              {data.itemName}
            </Text>
          </Box>
          <Box>
            <Text size={20}>상품 상세 내용</Text>
            <WebView
              style={{
                width: Layout.window.width,
                height: Layout.window.height,
              }}
              originWhitelist={['*']}
              source={{ uri: data.itemLink }}
            />
          </Box>
        </Box>
      </ContainerWithScroll>
      <Box
        width={Layout.window.width}
        height={150}
        aEnd
        jEnd
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          paddingBottom: 24,
        }}>
        <BoxPressable
          onPress={() =>
            navigation.navigate('DetailVideo', {
              ...data,
            })
          }
          mr={12}>
          <Image
            source={{ uri: data.videoThumb }}
            style={{
              width: 100,
              height: (100 * 9) / 16,
              marginBottom: 12,
            }}
            resizeMode='cover'
          />
        </BoxPressable>
        <Button
          fill
          label='구매하기'
          onPress={() => WebBrowser.openBrowserAsync(data.itemLink)}
          background={'#000'}
        />
      </Box>
    </Container>
  );
}
