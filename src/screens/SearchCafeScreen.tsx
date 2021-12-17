import * as React from 'react';
import { Image, ScrollView, TextInput as RnTextInput } from 'react-native';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import Container from '../basicComponents/Container';
import TextInput from '../basicComponents/TextInput';
import { useNavigation } from '@react-navigation/core';
import useDebounce from '../hooks/useDebounce';
import SearchCafeList from '../componentsFetch/SearchCafeList';
import useAppStore from '../hooks/useAppStore';
import BoxPressable from '../basicComponents/BoxPressable';

export default function SearchCafeScreen() {
  const [text, setText] = React.useState('');

  const searchRef = React.useRef<RnTextInput | null>(null);
  const appStore = useAppStore();
  const navigation = useNavigation();
  const debouncedSearchTerm = useDebounce(text, 500);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${appStore?.myLocation?.roadAddress}`,
    });
  }, []);

  const onMoveCafe = (selCafeInfo: {
    cafeId: number;
    imgCafeLogo: {
      uri: string;
    };
    textCafeName: string;
  }) => {
    navigation.navigate('CafeProfileInfo', {
      cafeId: selCafeInfo.cafeId,
    });
  };

  return (
    <Container>
      <Box
        full
        space
        style={{
          paddingHorizontal: 16,
          paddingVertical: 22,
        }}>
        <Box>
          <Box
            style={{
              marginBottom: 22,
            }}>
            <BoxPressable
              onPress={() => searchRef.current?.focus()}
              row
              aCenter
              style={{
                paddingVertical: 6,
                paddingHorizontal: 16,
                backgroundColor: '#f6f6f6',
                borderRadius: 15,
              }}>
              <Image
                source={Images.icoSearch}
                style={{ width: 16, height: 16 }}
              />
              <TextInput
                inputRef={searchRef}
                placeholder={'검색할 카페 입력'}
                value={text}
                setValue={setText}
                style={{
                  paddingLeft: 12,
                }}
              />
            </BoxPressable>
          </Box>
          <Box>
            <ScrollView
              style={{
                maxHeight: Layout.window.height * 0.62,
              }}>
              <SearchCafeList
                queryParam={debouncedSearchTerm}
                onPress={selCafeInfo => onMoveCafe(selCafeInfo)}
              />
            </ScrollView>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
