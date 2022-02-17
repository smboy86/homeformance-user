import React from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Share,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { Video } from 'expo-av';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, Button, Text, TextInput } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import CommentCard from '../components/CommentCard';
import Container from '../basicComponents/Container';
import { VideoType } from '../types';

export default function () {
  const [text, setText] = React.useState();

  const { params } = useRoute<{ params: VideoType }>();
  console.log('123123  :: ', params);

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.videoTitle,
    });
  }, []);

  const onMoveDetailItem = () => {
    navigation.navigate('DetailItem');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: params.videoTitle,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  return (
    <Container>
      <ContainerWithScroll>
        <Box>
          <Video
            style={{
              width: Layout.window.width,
              height: (Layout.window.width * 9) / 16,
              backgroundColor: 'black',
            }}
            source={{
              uri: params.videoUrl,
            }}
            useNativeControls
            resizeMode='contain'
          />
          <Box pv={22} ph={16}>
            <Box row aCenter>
              <Box
                center
                width={pxToDp(80)}
                height={pxToDp(80)}
                borderRadius={pxToDp(40)}>
                <Image source={{ uri: params.creatorThumb }} />
              </Box>
              <Box
                row
                aCenter
                style={{
                  flex: 1,
                }}>
                <Box
                  pl={12}
                  pr={0}
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    size={16}
                    style={{
                      marginBottom: 8,
                    }}>
                    {params.creator}
                  </Text>
                  <Text light size={16} numberOfLines={2}>
                    {params.introVideo}
                  </Text>
                </Box>
                <BoxPressable
                  ph={10}
                  height={46}
                  center
                  onPress={() => Alert.alert('찜하기')}>
                  <Ionicons
                    name='heart'
                    size={20}
                    color={false ? '#4231CA' : '#DBDBDB'}
                  />
                </BoxPressable>
              </Box>
            </Box>
            <Box pt={pxToDp(32)}>
              <Text
                size={20}
                style={{
                  marginBottom: 12,
                }}>
                공연 소개
              </Text>
              <Text light size={16}>
                {params.introVideo}
              </Text>
            </Box>
            <Box mt={16}>
              <Text
                size={20}
                style={{
                  marginBottom: 12,
                }}>
                연관 공연
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box
                  backColor={Colors.borderGray}
                  width={pxToDp(160)}
                  height={pxToDp((160 * 9) / 16)}
                  borderRadius={8}
                  mr={12}>
                  <Image
                    source={{
                      uri: 'https://kr.object.ncloudstorage.com/homeformance/video-2-videoThumb.png',
                    }}
                    style={{
                      width: pxToDp(160),
                      height: pxToDp((160 * 9) / 16),
                      borderRadius: 8,
                    }}
                  />
                </Box>
                <Box
                  backColor={Colors.borderGray}
                  width={pxToDp(160)}
                  height={pxToDp((160 * 9) / 16)}
                  borderRadius={8}
                  mr={12}>
                  <Image
                    source={{
                      uri: 'https://kr.object.ncloudstorage.com/homeformance/video-1-videoThumb.png',
                    }}
                    style={{
                      width: pxToDp(160),
                      height: pxToDp((160 * 9) / 16),
                      borderRadius: 8,
                    }}
                  />
                </Box>
                <Box
                  backColor={Colors.borderGray}
                  width={pxToDp(160)}
                  height={pxToDp((160 * 9) / 16)}
                  borderRadius={8}
                  mr={12}>
                  <Image
                    source={{
                      uri: 'https://kr.object.ncloudstorage.com/homeformance/video-3-thumb.png',
                    }}
                    style={{
                      width: pxToDp(160),
                      height: pxToDp((160 * 9) / 16),
                      borderRadius: 8,
                    }}
                  />
                </Box>
              </ScrollView>
            </Box>
            <Box mt={24}>
              <Text
                size={20}
                style={{
                  marginBottom: 12,
                }}>
                코멘트
              </Text>
            </Box>
            <Box
              row
              pd={8}
              mb={18}
              style={{
                borderBottomWidth: 1,
                borderColor: '#000',
              }}>
              <TextInput
                placeholder='코멘트 입력'
                setValue={setText}
                style={{
                  paddingRight: 24,
                }}
              />
              <BoxPressable
                full
                pd={4}
                onPress={() => Alert.alert('코멘트 입력')}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 0,
                }}>
                <AntDesign name='enter' size={18} color='black' />
              </BoxPressable>
            </Box>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
            {/*  // warp */}
          </Box>
        </Box>
      </ContainerWithScroll>
      <ActionButton
        buttonColor='#5cc3f4'
        degrees={0}
        renderIcon={() => (
          <Ionicons name='cart-outline' size={26} color={'#000'} />
        )}>
        <ActionButton.Item
          buttonColor='#9b59b6'
          title='상세소개'
          onPress={onMoveDetailItem}>
          <MaterialIcons name='description' size={18} color='black' />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#3498db'
          title='구매하기'
          onPress={() =>
            Linking.openURL(
              'http://item.gmarket.co.kr/detailview/item.asp?goodscode=2133778334'
            )
          }>
          <FontAwesome name='won' size={18} color='black' />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title='공유' onPress={onShare}>
          <AntDesign name='sharealt' size={18} color='black' />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
}
