/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { PressableProps } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BoxPressable from './BoxPressable';
import Text from './Text';

type PropsType = PressableProps & {
  disabled: boolean;
  label: string;
  onPress: Function;
};

function ButtonActive(props: PropsType) {
  const { label, disabled, onPress } = props;

  return (
    <BoxPressable
      onPress={disabled ? null : onPress}
      aCenter
      style={{
        width: '100%',
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 28,
        backgroundColor: disabled ? '#ccc' : Colors.default.tintBrown,
      }}>
      <Text bold size={14} color={disabled ? '#fff' : '#FFF'}>
        {label}
      </Text>
    </BoxPressable>
  );
}

export default ButtonActive;
