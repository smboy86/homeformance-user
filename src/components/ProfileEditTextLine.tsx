import * as React from 'react';
import Box from '../basicComponents/Box';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';

type Props = {
  label: string;
  text: string;
  textRed?: boolean;
};

export default function ProfileEditTextLine({ label, text, textRed }: Props) {
  return (
    <Box
      row
      style={{
        marginTop: 10,
      }}>
      <Box
        style={{
          flex: 0.19,
        }}>
        <Text size={14} color={Colors.default.commonGrey}>
          {label}
        </Text>
      </Box>
      <Box
        style={{
          flex: 0.81,
        }}>
        <Text
          size={14}
          color={textRed ? '#e47364' : 'rgba(0,0,0,0.85)'}
          numberOfLines={1}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}
