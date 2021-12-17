import * as React from 'react';
import Box from '../basicComponents/Box';
import Layout from '../constants/Layout';

export default function GreyBox() {
  return (
    <Box
      style={{
        width: Layout.window.width,
        height: 10,
        backgroundColor: '#f6f6f6',
      }}
    />
  );
}
