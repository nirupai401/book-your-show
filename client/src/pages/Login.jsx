import React, { useState, useContext } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router';
import useHttp from '../hooks/useHttp';
import { loginUser } from '../lib/apis';
import UserContext from '../context/user-context'; 


const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  
  const userContext=useContext(UserContext);
  
  const onFinish = async (values) => {
    userContext.login(values);
  };
  

  return (
    <div
      style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',  
        padding: '70px 24px',
        width:1200,
        margin: '0 auto',
        minHeight: 'calc(100vh - 134px)',
      }}
    >
      <Card
        style={{
          width:'450px',
          borderRadius: 8,
          border: '1px solid #f0f0f0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <Title level={3} style={{ marginBottom: 8, fontWeight: 600 }}>
          Login
        </Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          Sign in to your Book My Show account
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 16, marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <Text type="secondary">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Login;