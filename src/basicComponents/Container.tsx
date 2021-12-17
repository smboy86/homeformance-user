// have to refactoring
import React, { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Box from './Box';

const Wrap = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;

  /* background-color: ${(props: IProps) =>
    props.backWhite ? '#fff' : Colors.default.backgroundTintColor}; */
`;

const ContentsWrap = styled.View`
  flex: 1;
`;
interface IProps extends ViewProps {
  children: ReactNode;
  backWhite?: boolean;
  safe?: boolean;
  edges?: ReadonlyArray<Edge>; // safe 적용 되는 부분 지정 edges={['right', 'bottom', 'left']}
  style?: ViewStyle;
  isBottom?: boolean /* 최하단 영역 잡을때 */;
}

const Container: React.FunctionComponent<IProps> = (props: IProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Wrap style={{ ...props.style }}>
      {props.safe ? (
        <SafeAreaView style={{ flex: 1 }} edges={props.edges}>
          <ContentsWrap
            style={{
              height: Layout.window.height - insets.top - insets.bottom,
            }}>
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
        <ContentsWrap>{props.children}</ContentsWrap>
      )}
    </Wrap>
  );
};
export default Container;
