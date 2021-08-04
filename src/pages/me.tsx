import { TagOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../authentication';
import { PATHS } from '../config/routes';
import styles from './me.module.css';

export const Me: React.FC<{}> = () => {
  let history = useHistory();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    history.push(PATHS.LOGIN);
  };

  return (
    <>
      <div className={styles.container}>
        <div style={{ marginTop: '10%' }}></div>
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
        <div style={{ marginTop: '5%' }}></div>
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
