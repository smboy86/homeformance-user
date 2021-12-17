import * as React from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import Colors from '../constants/Colors';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Button from '../basicComponents/Button';
import MenuCard from '../components/MenuCard';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function StoreMenuScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '메뉴',
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box
        style={{
          paddingTop: 18,
          paddingHorizontal: 16,
        }}>
        <Box row>
          <Text medium size={12} color={Colors.default.fontBlack}>
            전체
          </Text>
          <Text bold size={12} color={'#e47364'} style={{ paddingLeft: 2 }}>
            21
          </Text>
          <Box full />
          <Text medium size={12} color={Colors.default.fontBlack}>
            편집
          </Text>
        </Box>
        <Box
          row
          space
          style={{
            marginTop: 18,
          }}>
          <Box
            style={{
              flex: 0.49,
            }}>
            <Button
              label={'메뉴 추가하기'}
              onPress={() => Alert.alert('', '메뉴 추가하기')}
            />
          </Box>
          <Box
            style={{
              flex: 0.49,
            }}>
            <Button
              label={'동영상 메뉴 추가'}
              onPress={() => Alert.alert('', '동영상 메뉴 추가')}
            />
          </Box>
        </Box>
        <Box
          style={{
            marginTop: 8,
          }}>
          {/* Menu Card List */}
          <MenuCard idx={0} />
          <MenuCard idx={1} />
          <MenuCard idx={2} />
          <MenuCard idx={3} />
          <MenuCard idx={4} />
          <MenuCard idx={4} />
          <MenuCard idx={4} />
          <MenuCard idx={4} />
          <MenuCard idx={4} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
