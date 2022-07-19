import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { sendPostLogin } from 'api/auth';
import { TOKEN, REFRESH_TOKEN } from 'constants/auth';

interface ILogin {
  username: string;
  password: string;
}

const LoginComponent = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!Cookies.get(TOKEN);

  const { mutate: onFinish, isLoading } = useMutation(
    async (value: ILogin) =>
      sendPostLogin({
        username: value.username.trim(),
        password: value.password.trim(),
      }),
    {
      onSuccess: (data) => {
        const { token, refreshToken } = data;
        Cookies.set(TOKEN, token, {
          expires: 1,
        });
        Cookies.set(REFRESH_TOKEN, refreshToken, {
          expires: 1,
        });

        navigate('/');
      },
      onError: (error: any) => {
        message.error(error?.response?.data?.message || 'Login failed!');
      },
    }
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.pageLogin}>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
