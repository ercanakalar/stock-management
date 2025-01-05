import React from 'react';
import { Flex, Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Loader = () => (
  <Flex gap="middle" vertical>
    <Spin tip="Loading">
      <div>{content}</div>
    </Spin>
  </Flex>
);

export default Loader;