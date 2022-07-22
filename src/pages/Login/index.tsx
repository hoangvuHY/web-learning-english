import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLock2Line } from 'react-icons/ri';

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
    <>
      <div className="back-to-page">
        <IoArrowBackOutline />

        <h3 className="title">New Account</h3>
      </div>

      <div className={styles.pageLogin}>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<HiOutlineMail />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<RiLock2Line />} placeholder="Username" />
          </Form.Item>

          <Form.Item>
            <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginComponent;
