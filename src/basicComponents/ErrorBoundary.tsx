import * as React from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import Text from './Text';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // console.log('getDerivedStateFromError :: ', JSON.stringify(error));
    // console.log('getDerivedStateFromError :: ', JSON.stringify(errorInfo));
    crashlytics().recordError(error);
    this.setState({ errorMessage: error.toString() });
  }

  onRefresh = () => {
    // Alert.alert('', '오류 새로 고침');
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <Text>시스템 오류</Text>
          <Text>{this.state.errorMessage}</Text>
          <TouchableOpacity onPress={this.onRefresh}>
            <Text>새로고침</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
