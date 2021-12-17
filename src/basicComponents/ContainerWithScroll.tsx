// have to refactoring
import React, { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Box from './Box';

const Wrap = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

// const Container = styled.ScrollView`
const Container = styled(KeyboardAwareScrollView)`
  width: 100%;
`;

const ContentsWrap = styled.View`
  flex: 1;
  /* Todo - Bottom에 뭔가 있을때와 없을때 구분값 필요 */
  padding-bottom: 0px;
`;

const ContentsSafeWrap = styled.View`
  flex: 1;
  padding-bottom: 0px;
`;
interface IProps extends ViewProps {
  children: ReactNode;
  backWhite?: boolean;
  safe?: boolean /* 헤더가 없을때 사용(헤더가 존재하면 기본영역 잡힘) */;
  style?: ViewStyle;
  isBottom?: boolean /* 최하단 영역 잡을때 */;
}

const ContainerWithScroll: React.FunctionComponent<IProps> = (
  props: IProps,
) => {
  return (
    <Wrap style={{ ...props.style }}>
      <Container
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {props.safe ? (
          <SafeAreaView style={{ flex: 1 }}>
            <ContentsWrap>
              {props.children}
              {props.isBottom ? (
                <Box
                  style={{
                    paddingTop: 60,
                  }}
                />
              ) : null}
            </ContentsWrap>
          </SafeAreaView>
        ) : (
          <ContentsSafeWrap>
            {props.children}
            {props.isBottom ? (
              <Box
                style={{
                  paddingTop: 60,
                }}
              />
            ) : null}
          </ContentsSafeWrap>
        )}
      </Container>
    </Wrap>
  );
};
export default ContainerWithScroll;
