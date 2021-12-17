import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface IProps extends TextInputProps {
  // onPress(): void; // ? or 조건을 같이 쓸 수가 없네??
  value: string | undefined;
  setValue: Function;
  placeholder: string;
  center?: boolean;
  style?: TextInputProps;
  inputRef?: any; // ref 로 받으면 작동을 안함, 변수명 변경
}

export default function (props: IProps) {
  const { value, setValue, placeholder, center, style, inputRef } = props;

  return (
    <TextInput
      {...props}
      ref={inputRef}
      value={value}
      onChangeText={text => setValue(text)}
      placeholder={placeholder}
      textAlignVertical={center ? 'center' : undefined}
      autoCapitalize={'none'} // 첫글자 대문자 x
      blurOnSubmit={true} // enter 입력시 키보드 사라짐
      style={[
        { ...style },
        {
          fontSize: 14,
          textAlign: center ? 'center' : 'auto',
        },
      ]}
    />
  );
}
