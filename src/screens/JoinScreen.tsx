import React from 'react';
import { Alert, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/core';

import Box from '../basicComponents/Box';
import BoxPressable from '../basicComponents/BoxPressable';
import Button from '../basicComponents/Button';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import Text from '../basicComponents/Text';
import TextInputWithBorder from '../basicComponents/TextInputWithBorder';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import { pxToDp } from '../constants/Layout';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService, firestoreService } from '../../fireabse';
import { doc, setDoc } from 'firebase/firestore';

export default function () {
  const [inputs, setInputs] = React.useState({
    textA: '',
    textB: '',
    textC: '',
    textD: '',
  });

  const [checkTermALL, setCheckTermALL] = React.useState(false);
  const [checkTermA, setCheckTermA] = React.useState(false);
  const [checkTermB, setCheckTermB] = React.useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    if (checkTermALL) {
      setCheckTermA(true);
      setCheckTermB(true);
    } else {
      setCheckTermA(false);
      setCheckTermB(false);
    }
  }, [checkTermALL]);

  const onChangeTextA = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textA: text,
    }));
  };

  const onChangeTextB = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textB: text,
    }));
  };
  const onChangeTextC = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textC: text,
    }));
  };
  const onChangeTextD = (text: string) => {
    setInputs((prev) => ({
      ...prev,
      textD: text,
    }));
  };

  const onJoin = () => {
    createUserWithEmailAndPassword(authService, inputs.textB, inputs.textC)
      .then(async (userCredential) => {
        const user = userCredential.user;
        //1) ?????? ?????? ??????
        try {
          await setDoc(
            doc(firestoreService, 'users', user.uid),
            {
              uid: user.uid,
              name: inputs.textA,
              email: inputs.textB,
              createDate: new Date(),
            },
            { merge: true }
          );
          // 2) ???????????? ??? ??????
          Alert.alert('', '??????????????? ?????????????????????.');
          navigation.goBack();
        } catch (error) {
          console.log('eeee:: ', error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/email-already-in-use') {
          alert('?????? ???????????? ??????????????????');
          return;
        } else if (errorCode === 'auth/invalid-email') {
          alert('???????????? ????????? ????????????');
          return;
        } else if (errorCode === 'auth/weak-password') {
          alert('??????????????? 6??? ?????? ???????????? ?????????.');
          return;
        } else {
          console.log('zzz : :', error);
          alert('???????????? ??????');
          return;
        }
      });
  };

  return (
    <ContainerWithScroll>
      <Box
        full
        aCenter
        ph={16}
        pt={pxToDp(40)}
        style={{
          flex: 1,
        }}>
        <TextInputWithBorder
          placeholder='?????? (2??? ??????)'
          setValue={onChangeTextA}
        />
        <TextInputWithBorder
          placeholder='?????????(example@naver.com)'
          setValue={onChangeTextB}
        />
        <TextInputWithBorder
          placeholder='????????????'
          setValue={onChangeTextC}
          secureTextEntry
        />
        <TextInputWithBorder
          placeholder='???????????? ??????'
          setValue={onChangeTextD}
          secureTextEntry
        />
        <Box
          wFull
          jEnd
          pb={24}
          style={{
            flex: 1,
          }}>
          <Box
            row
            space
            style={{
              paddingHorizontal: 16,
              marginBottom: 8,
            }}>
            <Box
              style={{
                flex: 0.7,
              }}>
              <Text
                bold
                size={12}
                color={Colors.fontBlack}
                style={{
                  paddingTop: 24,
                  paddingBottom: 8,
                }}>
                ???????????? ????????????
              </Text>
            </Box>

            <BoxPressable
              onPress={() => setCheckTermALL(!checkTermALL)}
              row
              aCenter
              jEnd
              style={{
                flex: 0.4,
                paddingTop: 24,
                paddingBottom: 8,
              }}>
              <Text
                size={12}
                color={Colors.fontBlack}
                style={{
                  marginRight: 10,
                }}>
                ????????????
              </Text>
              <Image
                source={checkTermALL ? Images.icoCheckOn : Images.icoCheck}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
            </BoxPressable>
          </Box>
          <Box
            row
            aCenter
            space
            style={{
              paddingHorizontal: 16,
              marginBottom: 12,
            }}>
            <Box
              style={{
                flex: 0.7,
              }}>
              <Text size={12} color={'#4a4a4a'}>
                ????????? ????????? ?????? ????????? ?????? ?????????????
              </Text>
            </Box>
            <Box
              row
              jEnd
              style={{
                flex: 0.3,
              }}>
              <BoxPressable
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
                  )
                }>
                <Text
                  size={12}
                  color={'#64a9e4'}
                  style={{
                    textDecorationLine: 'underline',
                    marginRight: 10,
                  }}>
                  ????????????
                </Text>
              </BoxPressable>
              <BoxPressable onPress={() => setCheckTermA(!checkTermA)}>
                <Image
                  source={checkTermA ? Images.icoCheckOn : Images.icoCheck}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </BoxPressable>
            </Box>
          </Box>
          <Box
            row
            aCenter
            space
            pb={46}
            style={{
              paddingHorizontal: 16,
              marginBottom: 12,
            }}>
            <Box
              style={{
                flex: 0.7,
              }}>
              <Text size={12} color={'#4a4a4a'}>
                ???????????? ????????? ?????? ?????? ?????????????
              </Text>
            </Box>
            <Box
              row
              jEnd
              style={{
                flex: 0.3,
              }}>
              <BoxPressable
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
                  )
                }>
                <Text
                  size={12}
                  color={'#64a9e4'}
                  style={{
                    textDecorationLine: 'underline',
                    marginRight: 10,
                  }}>
                  ????????????
                </Text>
              </BoxPressable>
              <BoxPressable onPress={() => setCheckTermB(!checkTermB)}>
                <Image
                  source={checkTermB ? Images.icoCheckOn : Images.icoCheck}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              </BoxPressable>
            </Box>
          </Box>
          <Button fill label='???????????? ??????' onPress={onJoin} />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
