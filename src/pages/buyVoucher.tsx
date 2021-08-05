import {
  HeartOutlined,
  HeartFilled,
  TagOutlined,
  WalletOutlined,
  DollarOutlined,
  LeftCircleOutlined,
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
  Modal,
  Form,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../authentication';
import { CheckoutForm } from '../components/stripe/CheckoutForm';
import { VoucherCard } from '../components/voucher';
import { db } from '../config/firebase.config';
import { Shop, Voucher } from '../utils';
import styles from './wallet.module.css';
//import Like from '../components/like';
interface RouteParams {
  id: string;
}
export const buyVoucher: React.FC<{}> = () => {
  const { id } = useParams<RouteParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentVoucher, setCurrentVoucher] = useState<Voucher | undefined>(
    undefined
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [buyVoucherForm] = Form.useForm();
  const handleBuyVoucher = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    //TODO: buy voucher
  };
  const [liked, setLiked] = useState<boolean>(false);
  const changecolourbutton = () => {
    setLiked(!liked);
    //console.log(liked);
  };
  const handleSetModalVisible = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    voucher: Voucher
  ) => {
    setCurrentVoucher(voucher);
    setModalVisible(true);
  };
  const handleBack = () => {
    history.back();
  };

  useEffect(() => {
    (async () => {
      try {
        const voucherRef = db.collection('voucher').doc(id);
        // console.log(id);
        const voucherId = (await voucherRef.get()).id;

        const voucher = (await voucherRef.get()).data() as Voucher | undefined;

        // console.log(voucher);
        if (voucher) {
          setCurrentVoucher({ ...voucher, id: voucherId });
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    })();
  }, [id]);

  if (!currentVoucher) {
    return <>Cannot find voucher</>;
  }
  console.log(currentVoucher);
  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <Spin spinning={loading}>
        <Image
          style={{ width: '100vw' }}
          src="https://stories.starbucks.com/uploads/2019/04/SBX20190424-Featured-Image-Earnings-Q2-3-1-1024x576.jpg"
        />
        <div className="black-header-style">{currentVoucher.title}</div>
        {/* <div className="black-header-style">{currentVoucher}</div> */}
        <Divider
          style={{
            fontSize: 180,
            backgroundColor: 'black',
          }}
        />
        <Row>
          <Col className="black-header-style">
            {'S$' + `${currentVoucher.price}`}
          </Col>
          <Col
            className="black-header-style"
            style={{ left: '10', color: 'orange' }}
          >
            {'Save S$2.00'}
          </Col>
          {liked ? (
            <HeartFilled
              style={{
                fontSize: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                marginLeft: 'auto',
                paddingRight: '5vw',
              }}
              onClick={changecolourbutton}
            />
          ) : (
            <HeartOutlined
              style={{
                fontSize: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                marginLeft: 'auto',
                paddingRight: '5vw',
              }}
              onClick={changecolourbutton}
            />
          )}
        </Row>

        <Row style={{ marginTop: '5%' }} className="black-header-style">
          <Statistic title="Amount Left" value={1237} loading />
        </Row>
        <div style={{ marginTop: '3%' }} className="text-style">
          Terms and Conditions:{' '}
        </div>
        <div
          className="text-style"
          style={{
            wordBreak: 'break-all',
            marginRight: '5%',
            marginBottom: '2vh',
          }}
        >
          {currentVoucher.description}
        </div>

        <Button
          size="large"
          className="white-header-style"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'inline-flex',
            width: '90vw',
            padding: '10px 10px 10px 10px',
            marginLeft: '4%',
          }}
          onClick={(e) => handleSetModalVisible(e, currentVoucher)}
        >
          Buy Now
        </Button>

        <div>
          <Space
            direction="horizontal"
            style={{
              marginBottom: '15%',
              marginLeft: '4%',
              marginTop: '5%',
            }}
          >
            <Button
              type="primary"
              icon={<LeftCircleOutlined />}
              size={'large'}
              onClick={handleBack}
            />
          </Space>
        </div>

        <Modal
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
        </Modal>
      </Spin>
    </div>
  );
};
