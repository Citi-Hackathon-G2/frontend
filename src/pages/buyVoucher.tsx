import {
  HeartOutlined,
  HeartFilled,
  TagOutlined,
  WalletOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import {
  Card,
  Carousel,
  Statistic,
  Button,
  Divider,
  Image,
  Space,
  Row,
  Col,
} from 'antd';
import React, { useState } from 'react';
import { useAuth } from '../authentication';
import { VoucherCard } from '../components/voucher';
import styles from './wallet.module.css';
//import Like from '../components/like';

export const buyVoucher: React.FC<{}> = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const changecolourbutton = () => {
    setLiked(!liked);
    //console.log(liked);
  };

    const buy = () => {
      //call buy api thingy i saw in the wallet??
    console.log('buy');
  };

  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <Image
        height={200}
        src="https://stories.starbucks.com/uploads/2019/04/SBX20190424-Featured-Image-Earnings-Q2-3-1-1024x576.jpg"
      />
      <div className="black-header-style">{'Starbucks'}</div>
      <div className="black-header-style">
        {'#02-15, Jewel Mall'}
      </div>
      <Divider
        style={{
          fontSize: 180,
          backgroundColor: 'black',
        }}
      />
      <Row>
        <Col className="black-header-style">{'S$18.00'}</Col>
        <Col
          className="black-header-style"
          style={{ left: '50%', color: 'orange' }}
        >
          {'Save S$2.00'}
        </Col>
      </Row>

      <Row style={{ marginTop: '5%' }} className="black-header-style">
        <Statistic title="Amount Left" value={1237673} loading />
      </Row>
      <div style={{ marginTop: '3%' }} className="text-style">
        Terms and Conditions:{' '}
      </div>
      <div className="text-style">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{' '}
      </div>

      <div>
        <Space
          direction="horizontal"
          style={{
            marginBottom: '15%',
            marginLeft: '5%',
            marginTop: '5%',
          }}
        >
          {liked ? (
            <HeartFilled
              style={{
                color: '#b15983',
                fontSize: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                width: 350,
              }}
              onClick={changecolourbutton}
            />
          ) : (
            <HeartOutlined
              style={{
                color: '#b15983',
                fontSize: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                width: 350,
              }}
              onClick={changecolourbutton}
            />
          )}

          <Button
            size="large"
            className="white-header-style"
            style={{
              backgroundColor: '#b15983',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'inline-flex',
              width: 350,
              padding: '10px 10px 10px 10px',
            }}
            onClick={buy}
          >
            Buy Now
          </Button>
        </Space>
      </div>
    </div>
  );
};
