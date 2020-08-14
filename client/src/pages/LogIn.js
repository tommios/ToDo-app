import React from "react";
import { Avatar, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

function login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-form-container">
      <Avatar size={64} icon={<UserOutlined />} className="login-form-avatar" />
      <Title className="login-form-title">Login</Title>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default login;
