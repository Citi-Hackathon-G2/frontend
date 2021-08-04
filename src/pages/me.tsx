import { TagOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../authentication';
import { VoucherCard } from '../components/voucher';
import { db, firebaseFunctions } from '../config/firebase.config';
import { PATHS } from '../config/routes';
import { Voucher } from '../utils';
import styles from './me.module.css';

export const Me: React.FC<{}> = () => {
  let history = useHistory();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    history.push(PATHS.LOGIN);
  };
  const handleBuy = async () => {
    try {
      const buyVoucher = firebaseFunctions.httpsCallable('buyVoucher');
      await buyVoucher({ voucherId: 'tgP7nUh9kfoH9rsUEg9c' });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div style={{ marginTop: '0.5rem' }}></div>
        <Card className={styles.yellowCard}>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              display: 'flex',
            }}
          >
            <TeamOutlined
              style={{ fontSize: '2rem' }}
              className="site-form-item-icon"
            />
            <div className="header-style" style={{ marginTop: '3%' }}>
              My Stats
            </div>
          </div>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            <div className="header-style" style={{ marginTop: '0%' }}>
              Email:
            </div>
            <div className="mid-header-style" style={{ marginTop: '0%' }}>
              {user?.email}
            </div>
          </div>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            <div className="header-style" style={{ marginTop: '0%' }}>
              No. Of Vouchers:
            </div>
            <div className="mid-header-style" style={{ marginTop: '0%' }}>
              {user?.vouchers.length}
            </div>
          </div>
        </Card>
        {user == null
          ? null
          : user.vouchers.map((voucher) => (
              <VoucherCard
                style={{
                  marginTop: '0.5rem',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                }}
                key={voucher.id}
                {...voucher}
              />
            ))}

        <div style={{ marginTop: '0.5rem' }}></div>
        <div className={styles.button}>
          <Button type="primary" onClick={handleBuy}>
            buy
          </Button>
        </div>
        <div className={styles.button}>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </>
    // <button
    //   style={{ marginTop: '50%', marginLeft: '40%' }}
    //   onClick={handleLogout}
    // >
    //   Logout
    // </button>
  );
};
