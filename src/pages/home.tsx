import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    notification,
    Typography,
    Divider,
    Space,
    Col,
    Row,
} from 'antd';
import styles from './login.module.css';
import React, { useState } from 'react';
import {
    TagOutlined,
    WalletOutlined,
    SearchOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import { Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { PATHS } from '../config/routes';

export const Home: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async ({ searchquery }: any) => {
        setLoading(true);
        try {
            //TODO: Search from API??
            //await login(email, password);
        } catch (err) {
            setLoading(false);
        }
    };

    let history = useHistory();
    const navToScan = () => {
        history.push(PATHS.SCAN);
    };

    return (
        <div style={{ height: '100vh', overflowY: 'scroll' }}>
            <div className="header-style">Hi User,</div>
            <div className="mid-header-style">Welcome Back!</div>
            <Card
                className={styles.card}
                style={{ left: '5%', backgroundColor: '#edf67d' }}
            >
                <Form>
                    <Space direction="horizontal">
                        <Form.Item
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'inline-flex',
                            }}
                        >
                            <Form.Item
                                className="header-style"
                                name="myvouchers"
                            >
                                my vouchers
                            </Form.Item>
                            <Form.Item name="amount">
                                <TagOutlined className="site-form-item-icon" />{' '}
                                jnjnj
                            </Form.Item>
                        </Form.Item>
                        <Divider
                            type="vertical"
                            style={{
                                fontSize: 180,
                                backgroundColor: 'black',
                            }}
                        />
                        <Form.Item>
                            <Form.Item
                                className="header-style"
                                name="mysavings"
                            >
                                my savings
                            </Form.Item>
                            <Form.Item name="amount">
                                <WalletOutlined className="site-form-item-icon" />{' '}
                                jnjnj
                            </Form.Item>
                        </Form.Item>
                    </Space>
                </Form>
            </Card>
            <Card
                className={styles.card}
                style={{
                    left: '5%',
                    marginTop: '5%',
                    marginBottom: '15%',
                    backgroundColor: '#b15983',
                }}
            >
                <Input
                    prefix={<SearchOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Search for shop"
                    disabled={loading}
                />
                <div className="site-card-wrapper">
                    <Row
                        style={{
                            marginTop: '3%',
                        }}
                        gutter={16}
                    >
                        <Col span={8}>
                            <Card title="Retail" bordered={false}>
                                <ShoppingOutlined
                                    style={{
                                        fontSize: '50px',
                                    }}
                                    className="site-form-item-icon"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Food" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginTop: '3%',
                        }}
                        gutter={16}
                    >
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                    <button style={{backgroundColor: '#b15983'}} onClick={navToScan}>Removetislater</button>
                </div>
            </Card>

            
        </div>
    );
};
