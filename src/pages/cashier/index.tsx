import { useState, useEffect, FC } from 'react';
import { Menu, Dropdown, Button, Modal, Input, Form } from 'antd';
import { DownOutlined, FormOutlined, ShopOutlined } from '@ant-design/icons';

import { useAuth } from '../../authentication';

import styles from './index.module.css';
import { createShop, createVoucher } from './utils/api';
import { Shop, Voucher } from '../../utils';
import { VoucherCard } from '../../components/voucher';
import { db } from '../../config/firebase.config';

export const Cashier: FC = () => {
  const { user } = useAuth();
  // shops
  const shops = user?.shops ?? [];
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isCreateShopModalVisible, setIsCreateShopModalVisible] =
    useState<boolean>(false);
  const [isCreateShopLoading, setIsCreateShopLoading] =
    useState<boolean>(false);
  const [createShopForm] = Form.useForm();
  // vouchers
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isCreateVoucherModalVisible, setIsCreateVoucherModalVisible] =
    useState<boolean>(false);
  const [isCreateVoucherLoading, setIsCreateVoucherLoading] =
    useState<boolean>(false);
  const [createVoucherForm] = Form.useForm();

  const shopMenu = (
    <Menu>
      {shops.map((shop, idx) => (
        <Menu.Item onClick={() => setSelectedShop(shop)} key={idx}>
          {shop.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    const shopRef = db.collection('shop').doc(selectedShop?.id);
    db.collection('voucher')
      .where('shop', '==', shopRef)
      .onSnapshot((snap) => {
        const vouchers: Voucher[] = [];
        snap.forEach((doc) => {
          const data = doc.data();
          vouchers.push({
            ...data,
            id: doc.id,
            expireAt: data.expireAt?.toDate(),
          } as Voucher);
        });
        vouchers.sort(
          (v1, v2) => v2.createdAt.valueOf() - v1.createdAt.valueOf()
        );
        setVouchers(vouchers);
      });
  }, [selectedShop]);

  return (
    <div className={styles.container}>
      <h1>Cashier</h1>

      {/* SHOP SECTION */}
      <div className={styles.shopContainer}>
        <Dropdown overlay={shopMenu} disabled={shops.length === 0}>
          <Button size="large" block>
            {selectedShop?.name ?? 'Select a shop'} <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          onClick={() => setIsCreateShopModalVisible(true)}
          type="primary"
          icon={<ShopOutlined />}
          style={{
            marginTop: '0.5rem',
          }}
          block
          size="large"
        >
          Create Shop
        </Button>
        <Modal
          title="Create Shop"
          visible={isCreateShopModalVisible}
          onOk={createShopForm.submit}
          onCancel={() => setIsCreateShopModalVisible(false)}
          confirmLoading={isCreateShopLoading}
        >
          <Form
            form={createShopForm}
            onFinish={async ({ name }) => {
              setIsCreateShopLoading(true);
              await createShop({ name });
              setIsCreateShopLoading(false);
              setIsCreateShopModalVisible(false);
            }}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Name of the shop" />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* VOUCHER SECTION */}
      <h2 style={{ marginTop: '3rem' }}>Vouchers</h2>
      <Button
        disabled={!selectedShop}
        onClick={() => setIsCreateVoucherModalVisible(true)}
        icon={<FormOutlined />}
        type="primary"
        block
        size="large"
      >
        Create Voucher
      </Button>
      <Modal
        title="Create Voucher"
        visible={isCreateVoucherModalVisible}
        onOk={createVoucherForm.submit}
        onCancel={() => setIsCreateVoucherModalVisible(false)}
        confirmLoading={isCreateVoucherLoading}
      >
        <Form
          form={createVoucherForm}
          onFinish={async (data) => {
            setIsCreateVoucherLoading(true);
            await createVoucher({ ...data, shopId: selectedShop?.id });
            setIsCreateVoucherLoading(false);
            setIsCreateVoucherModalVisible(false);
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder='eg. "Buy 69 get 420 free!"' />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder='eg. "Only applicable for orders above $420.69"' />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="expireAt"
            label="Expiry date (leave blank if not applicable)"
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>

      <div>
        {vouchers.map((voucher) => (
          <VoucherCard
            style={{ marginTop: '0.5rem' }}
            key={voucher.id}
            {...voucher}
          />
        ))}
      </div>
    </div>
  );
};
