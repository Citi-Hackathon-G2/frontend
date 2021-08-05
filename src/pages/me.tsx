import { TagOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, notification, Spin } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../authentication';
import { VoucherCard } from '../components/voucher';
import { db, firebaseFunctions } from '../config/firebase.config';
import { PATHS } from '../config/routes';
import { Voucher } from '../utils';
import styles from './me.module.css';
import QRCode from "react-qr-code";

export const Me: React.FC<{}> = () => {
  let history = useHistory();
  const { logout, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isQRModalVisible, setQRModalVisible] = useState<boolean>(false);
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null);
  const [transferVoucherForm] = Form.useForm();
  const handleLogout = async () => {
    await logout();
    history.push(PATHS.LOGIN);
  };

  const handleSwitchToCashier = async () => {
    history.push(PATHS.CASHIER);
  };

  const handleBuy = async () => {
    try {
      const buyVoucher = firebaseFunctions.httpsCallable('buyVoucher');
      await buyVoucher({ voucherId: 'tgP7nUh9kfoH9rsUEg9c' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetModalVisible = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    setCurrentVoucher(voucher);
    setModalVisible(true);
  };

  const handleSetQRModalVisible = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    setCurrentVoucher(voucher);
    setQRModalVisible(true);
  };

  const transferVoucher = async (username: string, voucherId: string) => {
    try {
      // console.log(username);
      const userIdQuery = await db
        .collection('user')
        .where('username', '==', username)
        .get();

      // console.log(userIdQuery);
      if (userIdQuery.empty) {
        throw new Error('This username does not exist!');
      }
      if (userIdQuery.docs.length > 1) {
        throw new Error('Duplicate Username!');
      }

      for (const doc of userIdQuery.docs) {
        // const currentUser = doc.data();
        //query for username
        const transferFunctionCallable =
          firebaseFunctions.httpsCallable('transferVoucher');
        await transferFunctionCallable({
          userId: doc.id,
          voucherId: voucherId,
        });
        notification.success({ message: 'Successfully transferred!' });
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
      notification.error({ message: err.message });
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
            <div className="header-style" style={{ marginTop: '0.5rem' }}>
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
            <div className="header-style" style={{ marginTop: '0.5rem' }}>
              Username:
            </div>
            <div className="mid-header-style" style={{ marginTop: '0.5rem' }}>
              {user?.username}
            </div>
          </div>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            <div className="header-style" style={{ marginTop: '0.5rem' }}>
              Email:
            </div>
            <div className="mid-header-style" style={{ marginTop: '0.5rem' }}>
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
            <div className="header-style" style={{ marginTop: '0.5rem' }}>
              No. Of Vouchers:
            </div>
            <div className="mid-header-style" style={{ marginTop: '0.5rem' }}>
              {user?.vouchers.length}
            </div>
          </div>
        </Card>
        {user == null
          ? null
          : user.vouchers.map((voucher) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <VoucherCard
                style={{
                  marginTop: '0.5rem',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                }}
                key={voucher.id}
                {...voucher}
              />
              <div className={styles.button} style={{ marginTop: '0.5rem' }}>
                <Button
                  type="dashed"
                  onClick={(e) => handleSetModalVisible(e, voucher)}
                >
                  Transfer Voucher
                </Button>
                <Button
                  type="dashed"
                  onClick={(e) => handleSetQRModalVisible(e, voucher)}
                >
                  Redeem
                </Button>
              </div>
            </div>
          ))}
        <Modal
          title={`Transfer Voucher: ${currentVoucher?.title}`}
          visible={isModalVisible}
          onOk={transferVoucherForm.submit}
          onCancel={() => setModalVisible(false)}
          confirmLoading={loading}
        >
          <Spin spinning={loading}>
            <Form
              form={transferVoucherForm}
              onFinish={async (data) => {
                setModalVisible(false);
                setLoading(true);
                await transferVoucher(data.username, currentVoucher?.id ?? '');

                // setIsCreateVoucherLoading(true);
                // await createVoucher({ ...data, shopId: selectedShop?.id });
                // setIsCreateVoucherLoading(false);
                // setIsCreateVoucherModalVisible(false);
                setLoading(false);
                setModalVisible(false);
              }}
            >
              <Form.Item
                name="username"
                label="Username(email)"
                rules={[{ required: true }]}
              >
                <Input placeholder='eg. "johnDoe@gmail.com"' />
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
        <Modal
          title={`Redeem Voucher: ${currentVoucher?.title}`}
          visible={isQRModalVisible}
          onOk={() => setQRModalVisible(false)}
          onCancel={() => setQRModalVisible(false)}
          confirmLoading={loading}
        >
          <div className={styles.center}>
            <QRCode value={currentVoucher?.id ?? ''} />
          </div>
        </Modal>
        <div style={{ marginTop: '0.5rem' }}></div>
      {/* <div className={styles.button}>
          <Button type="primary" onClick={handleBuy}>
            buy
          </Button>
        </div> */}
        <div className={styles.button}>
        <Button type ="primary" onClick={handleLogout}>
        Logout
        </Button>
        </div>
        <div className={styles.button}>
        <Button type ="primary" onClick={handleSwitchToCashier}>
        Switch To Cashier
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
