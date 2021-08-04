import { useState, useRef, FC } from 'react';
import { Menu, Dropdown, Button, Modal, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useAuth } from '../../authentication';

import styles from './index.module.css';
import { createShop } from './utils/api';

export const Cashier: FC = () => {
  const { user } = useAuth();
  const shops = user?.shops ?? [];
  // create shop modal
  const [isCreateShopModalVisible, setIsCreateShopModalVisible] =
    useState<boolean>(false);
  const [isCreateShopLoading, setIsCreateShopLoading] =
    useState<boolean>(false);
  const createShopInputRef = useRef<Input | null>(null);

  const shopMenu = (
    <Menu>
      {shops.map((shop, idx) => (
        <Menu.Item key={idx}>{shop.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.container}>
      <h1>Shops</h1>
      <div className={styles.shopContainer}>
        <Dropdown overlay={shopMenu} disabled={shops.length === 0}>
          <Button block>
            Shops <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          onClick={() => setIsCreateShopModalVisible(true)}
          type="primary"
          block
        >
          Create Shop
        </Button>
        <Modal
          title="Create Shop"
          visible={isCreateShopModalVisible}
          onOk={async () => {
            setIsCreateShopLoading(true);
            const shopName: string = createShopInputRef.current?.state.value;
            await createShop({ name: shopName });
            setIsCreateShopLoading(false);
            setIsCreateShopModalVisible(false);
          }}
          onCancel={() => setIsCreateShopModalVisible(false)}
          confirmLoading={isCreateShopLoading}
        >
          <Input ref={createShopInputRef} placeholder="Shop name"></Input>
        </Modal>
      </div>
    </div>
  );
};
