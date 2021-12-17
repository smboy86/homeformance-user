import * as React from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import BoxPressable from '../basicComponents/BoxPressable';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Images from '../constants/Images';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import TextInputwithLabel from '../basicComponents/TextInputwithLabel';
import GreyBox from '../components/GreyBox';
import TextInput from '../basicComponents/TextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../basicComponents/Button';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function AddDisscountCouponScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '할인 쿠폰 생성',
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Box>
          <Box
            style={{
              paddingTop: 32,
              paddingHorizontal: 16,
            }}>
            <TextInputwithLabel
              label={'소셜쿠폰명'}
              placeholder={'ex) 아이스 아메리카노 할인!'}
              style={{
                marginBottom: 26,
              }}
            />
            <TextInputwithLabel
              label={'바코드번호'}
              placeholder={'바코드 번호 입력'}
              style={{
                marginBottom: 26,
              }}
            />
            <Box
              style={{
                marginBottom: 26,
              }}>
              <Text
                bold
                size={12}
                color={'#181818'}
                style={{ paddingBottom: 6 }}>
                유효기간
              </Text>
              <Box row space>
                <Box
                  style={{
                    flex: 0.47,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderColor: '#e5e5e5',
                  }}>
                  <Text size={12} color={'#989696'}>
                    시작일
                  </Text>
                  <Text size={12} color={'#989696'}>
                    1900.01.01
                  </Text>
                </Box>
                <Box
                  style={{
                    flex: 0.47,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderColor: '#e5e5e5',
                  }}>
                  <Text size={12} color={'#989696'}>
                    종료일
                  </Text>
                  <Text size={12} color={'#989696'}>
                    1900.01.01
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <GreyBox />
          <Box
            style={{
              paddingTop: 32,
              paddingHorizontal: 16,
            }}>
            <Text
              bold
              size={12}
              color={'#181818'}
              style={{ paddingBottom: 19 }}>
              할인 방법
            </Text>
            {/* 1) 원 할인 */}
            <Box row aCenter>
              <Image
                source={Images.imgRadioBtnOn}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Box
                row
                aCenter
                style={{
                  marginLeft: 10,
                  borderBottomWidth: 2,
                  borderColor: '#e5e5e5',
                }}>
                <TextInput
                  placeholder={'0'}
                  value={''}
                  setValue={() => null}
                  style={{
                    width: 80,
                    textAlign: 'right',
                    fontSize: 14,
                    paddingBottom: 8,
                    lineHeight: 22,
                  }}
                />
                <Text
                  size={14}
                  color={'#989696'}
                  style={{
                    paddingLeft: 4,
                  }}>
                  ₩
                </Text>
              </Box>
              <Text
                size={14}
                color={Colors.default.fontBlack}
                style={{
                  marginLeft: 10,
                }}>
                원 할인
              </Text>
            </Box>
            {/* 2) 퍼센트 할인 */}
            <Box row aCenter>
              <Image
                source={Images.imgRadioBtnOff}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Box
                row
                aCenter
                style={{
                  marginLeft: 10,
                  borderBottomWidth: 2,
                  borderColor: '#e5e5e5',
                }}>
                <TextInput
                  placeholder={'0'}
                  value={''}
                  setValue={() => null}
                  style={{
                    width: 80,
                    textAlign: 'right',
                    fontSize: 14,
                    paddingBottom: 8,
                    lineHeight: 22,
                  }}
                />
                <Text
                  size={14}
                  color={'#989696'}
                  style={{
                    paddingLeft: 4,
                  }}>
                  %
                </Text>
              </Box>
              <Text
                size={14}
                color={Colors.default.fontBlack}
                style={{
                  marginLeft: 10,
                }}>
                퍼센트 할인
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            paddingHorizontal: 16,
            marginBottom: insets.bottom,
          }}>
          <Button
            fill
            label={'생성 하기'}
            onPress={() => Alert.alert('', '생성하기')}
          />
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
