import {
  HeartOutlined,
  TagOutlined,
  WalletOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Card, Carousel, Statistic, Button } from 'antd';
import React from 'react';
import { useAuth } from '../authentication';
import { VoucherCard } from '../components/voucher';
import styles from './wallet.module.css';

export const Wallet: React.FC<{}> = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      {/* <div style={{ marginTop: '10%' }}></div> */}
      <Card className={styles.yellowCard}>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'start',
            display: 'flex',
          }}
        >
          <TagOutlined
            style={{ fontSize: '2rem' }}
            className="site-form-item-icon"
          />
          <div className="header-style" style={{ marginTop: '0%' }}>
            My vouchers
          </div>
          <div className={styles.cornerCounter}>
            <div className="header-style" style={{ color: 'white' }}>
              5
            </div>
          </div>
        </div>
        <div className={styles.scrollContainer}>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
        </div>
      </Card>

      {/* {user == null ? <></> : user.vouchers.map((voucher) => {
          const { title, decriptions }

          <VoucherCard  ></VoucherCard>
      })}can u */}
      <Card className={styles.yellowCard}>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'start',
            display: 'flex',
          }}
        >
          <WalletOutlined
            style={{ fontSize: '2rem' }}
            className="site-form-item-icon"
          />
          <div className="header-style" style={{ marginTop: '0%' }}>
            My balance
          </div>
        </div>
        <div className={styles.balanceContainer}>
          <Statistic prefix={<DollarOutlined />} value={112893} precision={2} />
          <Button
            style={{
              marginTop: 16,
              borderRadius: '10px',
              backgroundColor: '#b15983',
              border: '0px',
            }}
            type="primary"
          >
            Recharge
          </Button>
        </div>
      </Card>
      <Card className={styles.yellowCard}>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'start',
            display: 'flex',
          }}
        >
          <HeartOutlined
            style={{ fontSize: '2rem' }}
            className="site-form-item-icon"
          />
          <div className="header-style" style={{ marginTop: '0%' }}>
            My liked
          </div>
          <div className={styles.cornerCounter}>
            <div className="header-style" style={{ color: 'white' }}>
              10
            </div>
          </div>
        </div>
        <div className={styles.scrollContainer}>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
          <Card className={styles.innerCard}>test</Card>
        </div>
      </Card>
    </div>
  );
};
