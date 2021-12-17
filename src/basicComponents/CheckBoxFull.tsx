// have to refactoring
import React from 'react';
import { ViewProps, TextStyle, Pressable, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';
import Box from './Box';
import Text from './Text';

const CheckBoxContainer = styled(Pressable)`
  width: 100%;
  height: 37px;
  background-color: ${Colors.default.yellow};
  border-radius: 13px;
  margin: 4px 0%;
`;

const ButtonBox = styled.View`
  width: 100%;
  height: 100%;
  flex-flow: row;
  align-items: center;
`;

const ButtonLeftBox = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 100%;
  margin-right: 6px;
`;

interface PropsType extends ViewProps, TextStyle {
  selected: boolean;
  onPress: Function;
  color?: string;
  text: string;
  noLabel?: boolean;
  style?: ViewStyle;
  textStyle: TextStyle;
}

const CheckBoxFull = ({
  selected,
  onPress,
  style,
  textStyle,
  text = '',
  noLabel = false,
  ...props
}: PropsType) => (
  <CheckBoxContainer
    style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
    onPress={onPress}
    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
    {...props}>
    <ButtonBox>
      <ButtonLeftBox noLabel>
        {selected ? (
          <FastImage
            source={require('../assets/images/ico-check-on.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        ) : (
          <FastImage
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
          <Pressable style={{ paddingVertical: 9 }}>
            {/* <Text style={textStyle}> {text} </Text> */}
            <Text
              bold={textStyle.fontWeight === 'bold'}
              color={textStyle.color}
              size={textStyle.fontSize}>
              {text}
            </Text>
          </Pressable>
        </Box>
      )}
    </ButtonBox>
  </CheckBoxContainer>
);

export default CheckBoxFull;
