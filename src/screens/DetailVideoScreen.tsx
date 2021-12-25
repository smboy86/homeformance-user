import React from 'react';
import { Alert, Image, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { Box, Text, TextInput } from '../basicComponents';
import Layout, { pxToDp } from '../constants/Layout';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import CommentCard from '../components/CommentCard';

export default function () {
  const [text, setText] = React.useState();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '옥탑방 고양이',
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box>
        <Box
          wFull
          height={(Layout.window.width * 9) / 16}
          backColor='#00000060'>
          <BoxPressable
            height={46}
            center
            onPress={() => Alert.alert('찜하기')}
            style={{
              position: 'absolute',
              bottom: -46,
              right: 8,
              zIndex: 1000,
            }}>
            <Ionicons name='heart' size={20} color={'red'} />
            <Text
              style={{
                marginTop: 4,
              }}>
              찜하기
            </Text>
          </BoxPressable>
        </Box>
        <Box pv={22} ph={16}>
          <Box row aCenter>
            <Box
              center
              width={pxToDp(80)}
              height={pxToDp(80)}
              borderRadius={pxToDp(40)}
              backColor='#00000060'>
              <Text>img</Text>
            </Box>
            <Box full pl={12}>
              <Text
                size={14}
                style={{
                  marginBottom: 8,
                }}>
                공연팀 명
              </Text>
              <Text size={16} numberOfLines={2}>
                공연 팀 소개는 두 줄 까지공연 팀 소개는 두 줄 까지공연 팀 소개는
                두 줄 까지공연 팀 소개는 두 줄 까지
              </Text>
            </Box>
          </Box>
          <Box pt={pxToDp(32)}>
            <Text
              size={26}
              style={{
                marginBottom: 12,
              }}>
              공연 소개
            </Text>
            <Text>
              10년 연속 연극 예매율 1위{'\n'}
              {'\n'}
              #1 감성 200% 충전{'\n'}
              "어? 너, 예쁜냄새 난다."{'\n'}
              마음을 간질간질 설레이게 할 취향저격 로맨스{'\n'}
              {'\n'}
              #2 우리들만의 파.라.다.이.스{'\n'}
              지긋지긋한 일상 멈춰!{'\n'}
              완벽한 하루를 위한 활력충전{'\n'}
            </Text>
          </Box>
          <Box mt={16}>
            <Text
              size={26}
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
                mr={12}
              />
              <Box
                backColor={Colors.borderGray}
                width={pxToDp(160)}
                height={pxToDp((160 * 9) / 16)}
                borderRadius={8}
                mr={12}
              />
              <Box
                backColor={Colors.borderGray}
                width={pxToDp(160)}
                height={pxToDp((160 * 9) / 16)}
                borderRadius={8}
                mr={12}
              />
            </ScrollView>
          </Box>
          <Box mt={16}>
            <Text
              size={26}
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
          <ActionButton
            buttonColor='#5cc3f4'
            degrees={0}
            renderIcon={() => (
              <Ionicons name='cart-outline' size={26} color={'#000'} />
            )}>
            <ActionButton.Item
              buttonColor='#9b59b6'
              title='상세소개'
              onPress={() => console.log('notes tapped!')}>
              <MaterialIcons name='description' size={18} color='black' />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#3498db'
              title='구매하기'
              onPress={() => {}}>
              <FontAwesome name='won' size={18} color='black' />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#1abc9c'
              title='공유'
              onPress={() => {}}>
              <AntDesign name='sharealt' size={18} color='black' />
            </ActionButton.Item>
          </ActionButton>
          {/*  // warp */}
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
