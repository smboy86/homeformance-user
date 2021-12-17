import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingBox = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  elevation: 1000;
  background-color: rgba(0, 0, 0, 0.1);
`;

const LoadingBlur = () => {
  return (
    <LoadingBox>
      <ActivityIndicator size="large" color={'#000'} />
    </LoadingBox>
  );
};

export default LoadingBlur;
