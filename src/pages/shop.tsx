import {
  LeftCircleOutlined,
  ShareAltOutlined,
  ShopFilled,
  ShopOutlined,
  TagOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Form, Modal, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useParams } from 'react-router';
import { CheckoutForm } from '../components/stripe/CheckoutForm';
import { VoucherCard } from '../components/voucher';
import { db } from '../config/firebase.config';
import { Shop, Voucher } from '../utils';
import styles from './shop.module.css';
interface RouteParams {
  id: string;
}
export const ShopPage: React.FC<{}> = () => {
  let history = useHistory();
  const { id } = useParams<RouteParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null);
  const [buyVoucherForm] = Form.useForm();
  const handleBuyVoucher = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    //TODO: buy voucher
  };

  const handleSetModalVisible = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    setCurrentVoucher(voucher);
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      const shopRef = db.collection('shop').doc(id);
      const shop = (await shopRef.get()).data() as Shop;
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
          setCurrentShop(shop);
          setVouchers(vouchers);
        });
    })();
  }, [id]);

  const handleBack = () => {
    history.goBack();
  };

  if (currentShop == null) {
    return <>Cannot find shop</>;
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          marginTop: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          type="primary"
          icon={<LeftCircleOutlined />}
          size={'large'}
          onClick={handleBack}
        />
        <Button type="primary" icon={<ShareAltOutlined />} size={'large'} />
      </div>
      <div
        style={{
          marginTop: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Card
          className={styles.card}
          style={{
            backgroundColor: '#edf67d',
            minHeight: '20vh',
            marginLeft: '1rem',
            marginRight: '1rem',
            width: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              display: 'flex',
            }}
          >
            <ShopFilled
              style={{ fontSize: '2rem' }}
              className="site-form-item-icon"
            />
            <div className="header-style" style={{ marginTop: '0.5rem' }}>
              {currentShop.name}
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              cursus lacus sit amet magna pharetra tempus. Nunc a justo libero.
              Nam vel convallis orci. Sed suscipit arcu eget arcu efficitur, non
              lacinia mi aliquet. Curabitur ultricies laoreet quam id
              consectetur.
            </p>
          </div>
        </Card>
      </div>
      <div
        style={{
          marginTop: '1rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Vouchers Available</h1>
      </div>
      {vouchers.map((voucher) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <VoucherCard
            style={{
              marginTop: '0.5rem',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
            key={voucher.id}
            {...voucher}
            displayView={true}
          />
          {/* <div className={styles.button} style={{ marginTop: '0.5rem' }}>
            <Button
              type="primary"
              onClick={(e) => handleSetModalVisible(e, voucher)}
            >
              Buy Voucher
            </Button>
          </div> */}
        </div>
      ))}
      {/* <Modal
        title={`Buy Voucher: ${currentVoucher?.title}`}
        visible={isModalVisible}
        // okButtonProps={{}}
        onOk={buyVoucherForm.submit}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Form
            form={buyVoucherForm}
            onFinish={async (data) => {
              setModalVisible(false);
              setLoading(true);
              // await transferVoucher(data.username, currentVoucher?.id ?? '');

              // setIsCreateVoucherLoading(true);
              // await createVoucher({ ...data, shopId: selectedShop?.id });
              // setIsCreateVoucherLoading(false);
              // setIsCreateVoucherModalVisible(false);
              setLoading(false);
              setModalVisible(false);
            }}
          >
            <CheckoutForm
              formProp={buyVoucherForm}
              voucherId={currentVoucher?.id ?? ''}
              quantity={1}
            />
          </Form>
        </Spin>
      </Modal> */}
    </div>
  );
};
