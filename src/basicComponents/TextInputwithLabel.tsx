// Todo - RightLabel 존재할때 텍스트를 가득 채우면 오늘쪽으로 밀려나는 문제 있음 (약 2칸 정도?)
import React, { ReactNode } from 'react';
import {
  Pressable,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';
import Box from './Box';
import Text from './Text';

const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => (props.noMargin ? 0 : 10)}px;
`;

const InputBox = styled.View`
  position: relative;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
`;
interface IProps extends TextInputProps, ViewProps {
  value: string | undefined;
  setValue: Function;
  fill?: boolean;
  label: string;
  placeholder?: string;
  btnLabel?: string;
  noMargin?: boolean;
  rightLabel?: string;
  rightIconImg?: ReactNode;
  isDisabled?: boolean;
  style?: ViewStyle;
  // children?: ReactNode; // 이걸 구현하면 input 타이핑이 튀는 오류가 발생한다 (간헐적)
}

export default function TextInputwithLabel(props: IProps) {
  const {
    value,
    setValue,
    fill,
    label,
    placeholder,
    noMargin,
    rightLabel,
    rightIconImg,
    isDisabled,
    style,
    children,
  } = props;

  return (
    <Container noMargin={noMargin !== undefined} style={[style]}>
      {label === undefined || label.length <= 0 ? null : (
        <Text bold size={12} color={'#181818'}>
          {label}
        </Text>
      )}
      <InputBox>
        <TextInput
          {...props}
          autoCompleteType={'off'}
          autoCorrect={false}
          value={value}
          onChangeText={text => setValue(text)}
          placeholder={placeholder}
          placeholderTextColor={fill ? '#36363630' : '#65747B'}
          textAlignVertical="auto"
          autoCapitalize="none"
          editable={isDisabled}
          style={[
            { ...style },
            {
              paddingTop: 16,
              paddingBottom: 8,
              paddingRight: 50,
              textAlign: 'left',
            },
          ]}
        />
        {/* 오류가 있어서 안쓰고 있음 */}
        {rightIconImg ? (
          <View style={{ position: 'absolute', top: 15, right: 19 }}>
            {rightIconImg}
          </View>
        ) : null}
        {/* Input창 오른쪽 라벨 */}
        {rightLabel ? (
          <>
            {/* <Box full /> */}
            <Box
              jCenter
              style={{
                paddingTop: 8,
              }}>
              <Text medium size={14} color={'#181818'}>
                {rightLabel}
              </Text>
            </Box>
          </>
        ) : null}
      </InputBox>
    </Container>
  );
}
