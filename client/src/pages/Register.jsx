import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth-service";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await register(values);
      if (response.status === 200) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(
        "An error occurred while registering. Please try again later."
      );
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen min-w-full">
      <div className="signup-form bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="custom-input" />
          </Form.Item>

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

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="custom-input" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
