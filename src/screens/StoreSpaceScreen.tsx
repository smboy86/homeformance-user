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
import SpaceCard from '../components/SpaceCard';

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

export default function StoreSpaceScreen({ navigation }: Props) {
  const [text, setText] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '공간',
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
              label={'내용 편집하기'}
              onPress={() => Alert.alert('', '내용 편집하기')}
            />
          </Box>
        </Box>
        <Box>
          <SpaceCard idx={0} />
          <SpaceCard idx={1} />
          <SpaceCard idx={1} />
          <SpaceCard idx={1} />
          <SpaceCard idx={1} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
