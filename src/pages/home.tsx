import {
  Card,
  Form,
  Input,
  Divider,
  Space,
  Col,
  Row,
  List,
  Button,
} from 'antd';
import styles from './home.module.css';
import React, { useEffect, useState } from 'react';
import {
  TagOutlined,
  WalletOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SketchOutlined,
  ToolOutlined,
  SkinOutlined,
  HddOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { PATHS } from '../config/routes';
import { useAuth } from '../authentication';
import { Shop } from '../utils';
import { db } from '../config/firebase.config';


export const Home: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);

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
 

  const handleEnterShop = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    history.push('shop/' + id);
  };

  useEffect(() => {
    (async () => {
      const shopRef = await db.collection('shop').get();
      const shopArr = shopRef.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Shop;
      });
      setShops(shopArr);
      // db.collection('voucher')
      //   .where('shop', '==', shopRef)
      //   .onSnapshot((snap) => {
      //     const vouchers: Voucher[] = [];
      //     snap.forEach((doc) => {
      //       const data = doc.data();
      //       vouchers.push({
      //         ...data,
      //         id: doc.id,
      //         expireAt: data.expireAt?.toDate(),
      //       } as Voucher);
      //     });
      //     vouchers.sort(
      //       (v1, v2) => v2.createdAt.valueOf() - v1.createdAt.valueOf()
      //     );
      //     setCurrentShop(shop);
      //     setVouchers(vouchers);
      //   });
    })();
  }, []);

  const navtoresults = () => {
    history.push(PATHS.RESULTS);
  }

  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <div className="header-style">Hi {user?.username ?? 'user'},</div>
      <div className="mid-header-style">Welcome Back!</div>
      {/* <Card
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
              <Form.Item className="header-style" name="myvouchers" style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                width:350,
              }}>
                my vouchers
              </Form.Item>
              <Form.Item name="amount">
                <TagOutlined className="site-form-item-icon" /> jnjnj
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
              <Form.Item className="header-style" name="mysavings">
                my savings
              </Form.Item>
              <Form.Item name="amount">
                <WalletOutlined className="site-form-item-icon" /> jnjnj
              </Form.Item>
            </Form.Item>
          </Space>
        </Form>
      </Card> */}
      <Card
        className={styles.maroonCard}
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
        <div style={{ marginTop: '2rem' }}></div>
        <List
          itemLayout="horizontal"
          pagination={{ position: 'bottom' }}
          grid={{ gutter: 12, column: 2 }}
          dataSource={shops}
          renderItem={(shop: Shop) => {
            // console.log(shop);
            return (
              <List.Item>
                <Card title={shop.name}>
                  <Button onClick={(e) => handleEnterShop(e, shop.id)}>
                    {' '}
                    ENTER
                  </Button>
                </Card>
              </List.Item>
            );
          }}
        />
        {/* <div className={styles.scrollContainer}>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
        </div> */}
        {/* <div className="site-card-wrapper">
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
              
              <Card onClick={() => navtoresults() }title="Food" bordered={false}>
                
              <ApiOutlined
                  style={{
                    fontSize: '50px',
                  }}
                  className="site-form-item-icon"
                />
              </Card>
              
            </Col>
            <Col span={8}>
              <Card title="Jewelry" bordered={false}>
              <SketchOutlined
                  style={{
                    fontSize: '50px',
                  }}
                  className="site-form-item-icon"
                />
              
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
              <Card title="Electronics" bordered={false}>
              <ToolOutlined
                  style={{
                    fontSize: '50px',
                  }}
                  className="site-form-item-icon"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Clothes" bordered={false}>
              <SkinOutlined
                  style={{
                    fontSize: '50px',
                  }}
                  className="site-form-item-icon"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Furniture" bordered={false}>
              <HddOutlined
                  style={{
                    fontSize: '50px',
                  }}
                  className="site-form-item-icon"
                />
              </Card>
            </Col>
          </Row>
        </div> */}
      </Card>
    </div>
  );
};
