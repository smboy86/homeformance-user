import * as React from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Images from '../constants/Images';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import TextInputwithLabel from '../basicComponents/TextInputwithLabel';
import Container from '../basicComponents/Container';
import TextInput from '../basicComponents/TextInput';
import Button from '../basicComponents/Button';
import StoreNewsCard from '../components/StoreFeedCard';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

// const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }

export default function StoreNewsScreen({ navigation }: Props) {
  const [text, setText] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '소식',
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box
        style={{
          paddingTop: 18,
          paddingHorizontal: 16,
        }}>
        <Box row space>
          <Box full>
            <Button
              label={'소식 추가하기'}
              onPress={() => Alert.alert('', '소식 추가하기')}
            />
          </Box>
        </Box>
        <Box
          style={{
            paddingTop: 8,
          }}>
          <StoreNewsCard idx={0} />
          <StoreNewsCard idx={1} />
          <StoreNewsCard idx={2} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
