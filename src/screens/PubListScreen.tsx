import * as React from 'react';
import styled from 'styled-components/native';

import Text from '../basicComponents/Text';
import { Alert, Pressable, SectionList } from 'react-native';
import Colors from '../constants/Colors';

const Wrap = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 27px 15px 0px 15px;
`;

const SectionBox = styled.View`
  margin-bottom: 30px;
`;

const ItemBox = styled(Pressable)`
  width: 100%;
  padding: 20px 50px;
  margin-bottom: 10px;
  background-color: ${Colors.default.brownStart};
  border-radius: 14px;
`;

export default function PubListScreen({ navigation }) {
  // 섹션별 화면 맵핑
  // section : 화면 분류 (단순 보기용)
  // data : 화면 이름(navigation name)

  const [data] = React.useState([
    {
      section: 'A. 로그인/ 회원가입 화면',
      stackName: 'SimpleStackNavigator',
      data: [
        'Login',
        'Join',
        'RecommendCafe',
        'CompleteJoin',
        'SearchPassword',
        'CompleteSearchPassword',
      ],
      labels: [
        '로그인',
        '회원가입',
        '추천카페',
        '회원가입완료',
        '비밀번호 찾기',
        '비밀번호 찾기 전송 완료',
      ],
    },
    {
      section: 'B. 메인 Btm',
      stackName: 'MainNavigator',
      data: ['Main', 'FavoriteCafe', 'Video', 'MyPage'],
      labels: ['메인', '찜카페 목록', '오늘의 동영상 (사진)', '마이페이지'],
    },
    {
      section: 'C. 메인 화면내 단일 화면들',
      stackName: 'SimpleStackNavigator',
      data: [
        'MainCompleteLogin',
        'Address',
        'CafeProfileInfo',
        'CafeBarcode',
        'CafeProfileSpace',
        'CafeProfileFeed',
        'Stamp',
        'MyProfile',
      ],
      labels: [
        '메인(로그인 완료 레이어 팝업)',
        '주소설정',
        '카페 프로필(정보)',
        '카페 바코드',
        '카페 프로필 (공간)',
        '카페 프로필 (피드)',
        '스탬프',
        '내 정보 수정',
      ],
    },
  ]);

  const onNavigate = (item, index, section) => {
    if (section.labels[index].includes('X')) {
      Alert.alert('', '개발중입니다.');
    } else {
      navigation.navigate(section.stackName, {
        screen: item,
      });
    }
  };

  return (
    <Wrap>
      <Container
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={'handled'}>
        <SectionList
          style={{ width: '100%' }}
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section, index }) => (
            <ItemBox onPress={() => onNavigate(item, index, section)}>
              <Text size={18} color={'#000'}>
                {section.labels[index]}
              </Text>
            </ItemBox>
          )}
          renderSectionHeader={({ section: { section } }) => (
            <SectionBox style={{ paddingTop: 30 }}>
              <Text size={36} color={'#000'}>
                {section}
              </Text>
            </SectionBox>
          )}
        />
      </Container>
    </Wrap>
  );
}
