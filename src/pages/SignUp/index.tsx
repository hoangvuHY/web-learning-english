import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import styles from './styles.module.scss';

const SignUpComponent = () => {
  const onFinish = (values: any) => {
    return values;
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo.message;
  };

  return (
    <Row>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Col push={6} span={24}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col push={6} span={24}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default SignUpComponent;
