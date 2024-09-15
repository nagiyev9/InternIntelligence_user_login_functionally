import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth-service";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("AccessToken", JSON.stringify(response.accessToken));
        localStorage.setItem("RefreshToken", JSON.stringify(response.refreshToken));
        localStorage.setItem("expiresAt", JSON.stringify(response.user.expiresAt));
        message.success(response.message);
        navigate(`/${response.user.id}`);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen min-w-full">
      <div className="login-form bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="custom-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="custom-input" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
