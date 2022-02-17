import React from 'react';
import { Alert, Image, Linking } from 'react-native';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import Images from '../constants/Images';
import { pxToDp } from '../constants/Layout';
import GreyBox from '../components/GreyBox';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

export default function () {
  const navigation = useNavigation();
  const appStore = useSelector((state) => state.app);

  return (
    <ContainerWithScroll safe>
      <Box
        full
        ph={16}
        style={{
          flex: 1,
        }}>
        <BoxPressable
          row
          aCenter
          onPress={() => navigation.navigate('DetailMyProfile')}
          mt={50}>
          <Image
            source={Images.logoNew}
            style={{
              width: pxToDp(70),
              height: pxToDp(79),
              borderRadius: pxToDp(35),
              overflow: 'hidden',
            }}
          />
          <Text
            size={20}
            style={{
              marginLeft: 10,
            }}>
            {appStore.user.name}
          </Text>
          <Box
            aEnd
            style={{
              flex: 1,
            }}>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Box>
        </BoxPressable>
        <GreyBox />
        <BoxPressable
          row
          aCenter
          onPress={() => Linking.openURL('https://homeformance.com/')}
          pv={18}
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.borderGray,
          }}>
          <AntDesign name='customerservice' size={24} color='black' />
          <Text
            size={16}
            style={{
              marginLeft: 10,
            }}>
            고객센터
          </Text>
          <Box
            aEnd
            style={{
              flex: 1,
            }}>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Box>
        </BoxPressable>
        <BoxPressable
          row
          aCenter
          onPress={() => Alert.alert('', '준비중입니다.')}
          pv={18}
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.borderGray,
          }}>
          <AntDesign name='notification' size={24} color='black' />
          <Text
            size={16}
            style={{
              marginLeft: 10,
            }}>
            공지사항
          </Text>
          <Box
            aEnd
            style={{
              flex: 1,
            }}>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Box>
        </BoxPressable>
        <BoxPressable
          row
          aCenter
          onPress={() => Alert.alert('', '준비중입니다.')}
          pv={18}
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.borderGray,
          }}>
          <MaterialCommunityIcons
            name='comment-question-outline'
            size={24}
            color='black'
          />
          <Text
            size={16}
            style={{
              marginLeft: 10,
            }}>
            문의사항
          </Text>
          <Box
            aEnd
            style={{
              flex: 1,
            }}>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Box>
        </BoxPressable>
      </Box>
    </ContainerWithScroll>
  );
}
