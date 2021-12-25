/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Text from './Text';

const BtnBox = styled(Pressable)`
  /* width: ${Layout.window.width * 0.424}px; */
  width: 100%;
  align-items: center;
  padding: 14px 0;
  background: ${(props: PropsType) => (props.fill ? '#bca490' : '#fff')};
  border: ${(props: PropsType) => (props.fill ? '0px' : '1px solid #dddddf')};
  border-radius: 8px;
`;

type PropsType = PressableProps & {
  label: string;
  fill?: boolean;
  disabled?: boolean;
  onPress: Function | null;
};

function Button(props: PropsType) {
  const { label, fill, onPress } = props;
  return (
    <BtnBox {...props} onPress={onPress}>
      <Text medium size={16} color={fill ? '#fff' : Colors.fontBlack}>
        {label}
      </Text>
    </BtnBox>
  );
}

export default Button;
