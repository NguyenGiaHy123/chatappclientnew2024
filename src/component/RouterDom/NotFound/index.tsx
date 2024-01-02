import React from 'react';
import { Button, Result } from 'antd';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="Not Found "
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" key="console">
        Go Page 
      </Button>
    }
  />
);

export default NotFound;