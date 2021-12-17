import * as React from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

import Text from '../basicComponents/Text';
import { PubStackParamList } from '../types';
import Colors from '../constants/Colors';
import Box from '../basicComponents/Box';
import ContainerWithScroll from '../basicComponents/ContainerWithScroll';
import { CalendarThemeOptions } from '../constants/Options';
import GreyBox from '../components/GreyBox';

type Props = NativeStackScreenProps<PubStackParamList, 'CafeProfile'>;

export default function StampDashboardScreen({ navigation }: Props) {
  console.log(
    dayjs()
      .startOf('month')
      .add(1, 'day')
      .set('year', 2018)
      .format('YYYY-MM-DD HH:mm:ss'),
  );

  const [text, setText] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '스탬프 통계',
    });
  }, []);

  return (
    <ContainerWithScroll>
      <Box
        style={{
          paddingTop: 22,
          paddingHorizontal: 16,
        }}>
        <Calendar
          /* @ts-ignore */
          theme={CalendarThemeOptions}
          // markingType={'multi-dot'}
          current={'2021-10-25'}
          // onMonthChange={(dateObj: IDateObj) => {
          //   setSelCalDate(dateObj.timestamp);
          // }}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          markedDates={{
            '2021-10-01': { selected: true },
          }}
          // hideArrows={false} /* 달력 이동 화살표 감춤 */
          disableAllTouchEventsForDisabledDays={true} /* 다른달 선택이벤트x */
          // disableMonthChange={true} /* 달력 고정 */
          // disabledDaysIndexes={[0, 6]}
          monthFormat={'yyyy년 MM월'}
          enableSwipeMonths={false} /* 달력 슬라이드 좌우로 넘기기 */
        />
      </Box>
      <GreyBox />
      <Box
        style={{
          paddingTop: 22,
          paddingHorizontal: 16,
        }}>
        {/* 헤더 */}
        <Box
          row
          style={{
            paddingVertical: 4,
            backgroundColor: Colors.default.tintBrown,
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={12} color={'#fff'}>
              시간
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={12} color={'#fff'}>
              개수
            </Text>
          </Box>
        </Box>
        {/* 그리드 내용 */}
        {/* 1 */}
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        {/* 2 */}
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        <Box
          row
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              13:01:51
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text size={14} color={Colors.default.fontBlack}>
              1
            </Text>
          </Box>
        </Box>
        {/* Last statistic */}
        <Box
          row
          style={{
            paddingVertical: 10,
            marginBottom: 30,
            borderBottomWidth: 1,
            borderColor: '#e5e5e5',
          }}>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text bold size={14} color={Colors.default.fontBlack}>
              총 스탬프 수
            </Text>
          </Box>
          <Box
            aCenter
            style={{
              flex: 0.5,
            }}>
            <Text bold size={14} color={Colors.default.fontBlack}>
              32
            </Text>
          </Box>
        </Box>
      </Box>
    </ContainerWithScroll>
  );
}
