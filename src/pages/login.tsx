import { MailOutlined, LockOutlined } from '@ant-design/icons';
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
import styles from './login.module.css';
const { Title } = Typography;

export const Login: React.FC<{}> = () => {
    let history = useHistory();
    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        setLoading(true);
        try {
            await login(email, password);
            history.push(PATHS.HOME);
        } catch (err) {
            notification.error({
                message: err.message,
            });
        }
    };
    const navToRegister = () => {
        history.push(PATHS.REGISTER);
    };
    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <Card className={styles.card}>
                    <Title level={3}>Login</Title>
                    <Form
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
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
                        <Button type="link" onClick={navToRegister}>
                            Need an account? Register now!
                        </Button>
                        {/* <Link href={Route.REGISTER}>
                            Need an account? Register now!
                        </Link> */}
                    </Form>
                </Card>
            </div>
        </div>
    );
};
