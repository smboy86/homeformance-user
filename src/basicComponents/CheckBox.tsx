// Refactor -
import React from 'react';
import {
  Image,
  ViewProps,
  TextStyle,
  Pressable,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import Box from './Box';
import Text from './Text';

const CheckBoxContainer = styled.View`
  width: 100%;
  height: 37px;
  border-radius: 13px;
  margin: 4px 0%;
`;

const ButtonBox = styled.View`
  width: 100%;
  height: 100%;
  flex-flow: row;
  align-items: center;
`;

const ButtonLeftBox = styled(Pressable)`
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 100%;
  margin-right: 6px;
`;

interface PropsType extends ViewProps, TextStyle {
  selected: boolean;
  onCheckPress: Function;
  onTextPress: Function;
  color?: string;
  text: string;
  subText: string;
  noLabel?: boolean;
  style?: ViewStyle;
  textStyle: TextStyle;
  subTextStyle: TextStyle;
}

const CheckBox = ({
  selected,
  onCheckPress,
  onTextPress,
  style,
  textStyle,
  subTextStyle,
  text = '',
  subText = '',
  noLabel = false,
  ...props
}: PropsType) => (
  <CheckBoxContainer
    activeOpacity={1}
    style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
    {...props}>
    <ButtonBox>
      <ButtonLeftBox noLabel onPress={onCheckPress}>
        {selected ? (
          <Image
            source={require('../assets/images/ico-check-on.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        ) : (
          <Image
            source={require('../assets/images/ico-check-off.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        )}
      </ButtonLeftBox>
      {noLabel ? null : (
        <Box>
          <Pressable onPress={onTextPress} style={{ paddingVertical: 9 }}>
            <Text color={textStyle.color} size={textStyle.fontSize}>
              {text}
            </Text>
            <Text
              color={subTextStyle.color}
              size={subTextStyle.fontSize}
              numberOfLines={2}>
              {subText}
            </Text>
          </Pressable>
        </Box>
      )}
    </ButtonBox>
  </CheckBoxContainer>
);

export default CheckBox;
