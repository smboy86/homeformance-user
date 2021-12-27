import React from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, Button, Text } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Container from '../basicComponents/Container';
import AutoHeightImage from 'react-native-auto-height-image';

export default function () {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '상품 상세 페이지',
    });
  }, []);

  return (
    <Container>
      <ContainerWithScroll>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            height: Layout.window.width - 80,
          }}>
          <Box mr={24}>
            <Box
              backColor={Colors.imgGray}
              style={{
                width: Layout.window.width - 80,
                height: Layout.window.width - 80,
              }}></Box>
          </Box>
          <Box mr={24}>
            <Box
              backColor={Colors.imgGray}
              style={{
                width: Layout.window.width - 80,
                height: Layout.window.width - 80,
              }}></Box>
          </Box>
        </ScrollView>
        <Box ph={16}>
          <Box pv={24}>
            <Text size={28}>[맞춤] 칼주름 형상기억 린넨직조 히든 암막커튼</Text>
          </Box>
          <Box>
            <AutoHeightImage
              source={{
                uri: 'https://image.musinsa.com/images/prd_img/2021042008505200000031446.jpg',
              }}
              width={Layout.window.width}
            />
            <AutoHeightImage
              source={{
                uri: 'https://image.musinsa.com/images/prd_img/2021042008505200000031446.jpg',
              }}
              width={Layout.window.width}
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
          onPress={() => navigation.navigate('DetailVideo')}
          mr={12}>
          <Image
            source={{ uri: 'https://source.unsplash.com/random' }}
            style={{
              width: 100,
              height: (100 * 9) / 16,
              marginBottom: 12,
            }}
            resizeMode='cover'
          />
        </BoxPressable>
        <Button fill label='구매하기' onPress={() => Alert.alert('구매하기')} />
      </Box>
    </Container>
  );
}
