import { HeartOutlined, TagOutlined, WalletOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import styles from './me.module.css';
export const Wallet: React.FC<{}> = () => {
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
          <WalletOutlined
            style={{ fontSize: '2rem' }}
            className="site-form-item-icon"
          />
          <div className="header-style" style={{ marginTop: '0%' }}>
            My balance
          </div>
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
            My vouchers
          </div>
        </div>
      </Card>
    </div>
  );
};
