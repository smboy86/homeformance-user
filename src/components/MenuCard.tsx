import * as React from 'react';
import { Alert, Image } from 'react-native';
import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Text from '../basicComponents/Text';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import { useActionSheet } from '@expo/react-native-action-sheet';

type Props = {
  idx: number;
};

export default function MenuCard(props: Props) {
  const { showActionSheetWithOptions } = useActionSheet();

  const onMore = async () => {
    const options = ['수정', '삭제', '취소'];
    const cancelIdx = 2; // 취소 버튼

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: cancelIdx,
      },
      async (choice: number) => {
        if (choice === 0) {
          // 수정
          // onCorfirmDelete(docId);
        } else if (choice === 1) {
          // 삭제
          // setCurCommentDocId(docId);
          // onUpdateComment(docId);
        }
      },
    );
  };

  return (
    <Box
      row
      style={{
        paddingVertical: 16,
        borderTopWidth: props.idx === 0 ? 0 : 0.5,
        borderColor: '#e5e5e5',
      }}>
      <Image
        source={Images.imgMenuEdit01}
        style={{
          width: Layout.window.width * 0.213,
          height: Layout.window.width * 0.213,
          borderRadius: 10,
        }}
      />
      <Box
        jCenter
        style={{
          marginLeft: 20,
        }}>
        <Text
          bold
          size={18}
          color={Colors.default.fontBlack}
          style={{
            marginBottom: 8,
          }}>
          귤라떼
        </Text>
        <Text size={16} color={Colors.default.fontBlack}>
          5,500원
        </Text>
      </Box>
      <Box full />
      <BoxPressable jCenter onPress={onMore}>
        <Image
          source={Images.icoMore}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </BoxPressable>
    </Box>
  );
}
