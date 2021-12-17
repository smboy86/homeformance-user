import * as React from 'react';
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Container from '../basicComponents/Container';
import ButtonActive from '../basicComponents/ButtonActive';
import TextInput from '../basicComponents/TextInput';
import RecommendCafeList from '../componentsFetch/RecommendCafeList';
import useDebounce from '../hooks/useDebounce';
import { useReduxDispatch } from '../store';
import { saveRecCafeInfo } from '../store/slices/UserSlice';
import { LoginStackParamList } from '../navigation/types';
import useUserStore from '../hooks/useUserStore';

type Props = NativeStackScreenProps<LoginStackParamList, 'RecommendCafe'>;

export default function RecommendCafeScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '추천 카페',
    });
  }, []);

  const [cafeName, setCafeName] = React.useState('');

  const userStore = useUserStore();
  const debouncedSearchTerm = useDebounce(cafeName, 500);
  const dispatch = useReduxDispatch();

  const onSelectCafe = () => {
    dispatch(
      saveRecCafeInfo({
        selRecommendCafeId:
          userStore.joinInfo.recCafeInfo.selIngRecommendCafeId,
      }),
    );
    navigation.goBack();
  };

  return (
    <Container>
      <Box
        full
        space
        style={{
          paddingHorizontal: 16,
        }}>
        <Box
          style={{
            paddingVertical: 22,
          }}>
          <Text
            bold
            size={12}
            color={Colors.default.fontBlack}
            style={{
              paddingBottom: 8,
            }}>
            추천카페
          </Text>
          <Box
            style={{
              paddingTop: 16,
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderColor: Colors.default.borderGrayColor,
            }}>
            <TextInput
              placeholder={'추천 카페를 입력해주세요!'}
              value={cafeName}
              setValue={setCafeName}
            />
          </Box>
          <Box
            style={{
              paddingTop: 16,
            }}>
            <ScrollView
              style={{
                maxHeight: Layout.window.height * 0.62,
              }}>
              <RecommendCafeList queryParam={debouncedSearchTerm} />
            </ScrollView>
          </Box>
        </Box>
        {/* bottom button layout */}
        <Box>
          <ButtonActive
            disabled={
              userStore.joinInfo.recCafeInfo.selIngRecommendCafeId === ''
            }
            label={'확인'}
            onPress={onSelectCafe}
          />
        </Box>
      </Box>
    </Container>
  );
}
