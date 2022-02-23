import React from 'react';
import { Alert, Image, Linking, ScrollView, Share } from 'react-native';
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
import { Box, Text, TextInput } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import CommentCard from '../components/CommentCard';
import Container from '../basicComponents/Container';
import { VideoType } from '../types';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestoreService } from '../../fireabse';
import { useSelector } from 'react-redux';
import { ScrollableComponent } from 'react-native-keyboard-aware-scroll-view';

type ImperativeScrollViewHandles = {
  scrollToStart(options?: { animated: boolean }): void;
  scrollToEnd(options?: { animated: boolean }): void;
  scrollTo(options: { x?: number; y?: number; animated?: boolean }): void;
};

export default function () {
  const [text, setText] = React.useState();
  const [commentList, setCommentList] = React.useState([]);

  const { params } = useRoute<{ params: VideoType }>();
  const appStore = useSelector((state) => state.app);
  const navigation = useNavigation();
  const wrapRef = React.useRef<ScrollView>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params.videoTitle,
      headerTitle: params.videoTitle,
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreService, 'comments'),
        where('videoUid', '==', params.id)
      ),
      { includeMetadataChanges: false },
      (snapshot) => {
        if (!snapshot.empty) {
          const dataList = [];
          snapshot.forEach((doc) => {
            dataList.push({ ...doc.data() });
          });

          setCommentList(
            dataList.sort((a, b) => {
              return b.createDate - a.createDate;
            })
          );
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const onMoveDetailItem = () => {
    navigation.navigate('DetailItem', {
      id: params.id,
    });
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

  const onLikeVideo = async () => {
    try {
      // await addDoc(
      //   coll(firestoreService, 'likeVideo', 'aaa '),
      //   {
      //     ttt: arrayUnion(params.id),
      //   },
      //   {
      //     merge: true,
      //   }
      // );
      Alert.alert('', '찜하기 완료');
    } catch (error) {}
  };

  const onSaveComment = async () => {
    try {
      await addDoc(collection(firestoreService, 'comments'), {
        videoUid: params.id,
        userId: appStore.user.uid,
        userName: appStore.user.name,
        comment: text,
        createDate: new Date(),
      });

      // 99) 후 처리
      // 99-1) 입력값 초기화
      setText('');
      // 99-2)스크롤 맨 아래로
      wrapRef.current.scrollToEnd();
    } catch (error) {}
  };

  return (
    <Container>
      <ContainerWithScroll refVal={wrapRef}>
        <Box>
          <Video
            usePoster
            posterSource={{
              uri: params.videoThumb,
            }}
            shouldPlay
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
                borderRadius={pxToDp(40)}
                style={{
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: params.creatorThumb,
                  }}
                  style={{
                    width: pxToDp(160),
                    height: pxToDp(160),
                    resizeMode: 'contain',
                  }}
                />
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
                <BoxPressable ph={10} height={46} center onPress={onLikeVideo}>
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
                value={text}
                setValue={setText}
                style={{
                  paddingRight: 24,
                }}
              />
              <BoxPressable
                full
                pd={4}
                onPress={onSaveComment}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 0,
                }}>
                <AntDesign name='enter' size={18} color='black' />
              </BoxPressable>
            </Box>
            {commentList.length > 0 &&
              commentList.map((item, idx) => (
                <CommentCard
                  key={idx.toString()}
                  userName={item.userName}
                  comment={item.comment}
                />
              ))}
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
          onPress={() => onMoveDetailItem()}>
          <MaterialIcons name='description' size={18} color='black' />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#3498db'
          title='구매하기'
          onPress={() => Linking.openURL(params.itemLink)}>
          <FontAwesome name='won' size={18} color='black' />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title='공유' onPress={onShare}>
          <AntDesign name='sharealt' size={18} color='black' />
        </ActionButton.Item>
      </ActionButton>
    </Container>
  );
}
