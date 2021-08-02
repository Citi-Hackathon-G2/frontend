import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    notification,
    Typography,
} from 'antd';
import React, { useState } from 'react';
import { Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../authentication';
import { PATHS } from '../config/routes';
import { RegisterRequest } from '../utils';
import styles from './login.module.css';
const { Title } = Typography;

export const Register: React.FC<{}> = () => {
    let history = useHistory();
    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async ({ email, password }: RegisterRequest) => {
        setLoading(true);
        try {
            //TODO: register function here
            await login(email, password);
            history.push(PATHS.HOME);
        } catch (err) {
            notification.error({
                message: err.message,
            });
            setLoading(false);
        }
    };
    const navToLogin = () => {
        history.push(PATHS.LOGIN);
    };
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <Card className={styles.card}>
                    <Title level={3}>Register</Title>
                    <Form
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                type="text"
                                placeholder="Username"
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                type="email"
                                placeholder="Email"
                                disabled={loading}
                            />
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
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox disabled={loading}>
                                    Remember me
                                </Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loading}
                                block
                                type="primary"
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Button type="link" onClick={navToLogin}>
                            Have an account? Login now!
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
};
