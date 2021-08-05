import { FC, CSSProperties } from 'react';
import { Card, Tag, Badge, Button } from 'antd';

import { Voucher } from '../../utils';

import styles from './index.module.css';
import { RightCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const { Meta } = Card;

type VoucherCardProps = Voucher & {
  style?: CSSProperties | undefined;
  displayView?: boolean | undefined;
  displayTransfer?: boolean | undefined;
  handleTransfer?: (e: any) => Promise<void>;

  displayRedeem?: boolean | undefined;
  handleRedeem?: (e: any) => Promise<void>;
};

export const VoucherCard: FC<VoucherCardProps> = ({
  title,
  description,
  price,
  expireAt,
  style,
  user,
  redeemedAt,
  displayView,
  displayTransfer,
  handleTransfer,
  displayRedeem,
  handleRedeem,
  id,
}) => {
  let history = useHistory();
  const isAvailable = !!user === false;

  const handleViewVoucher = () => {
    history.push('/voucher/' + id);
  };

  const card = (
    <Card
      className={styles.shadow}
      style={style}
      size="small"
      actions={[
        // <SettingOutlined key="setting" />,
        // <EditOutlined key="edit" />,
        displayView ? (
          <RightCircleOutlined
            size={48}
            key="rightCircle"
            onClick={handleViewVoucher}
          >
            View Voucher
          </RightCircleOutlined>
        ) : null,
      ]}
    >
      <Meta
        style={{ marginBottom: '1rem' }}
        title={title}
        description={description}
      />

      {expireAt ? (
        <div style={{ marginBottom: '0.5rem' }}>
          <Tag>Expires: {expireAt.toLocaleDateString()}</Tag>
        </div>
      ) : null}

      <div>
        <Tag color="geekblue">${Number(price).toFixed(2)}</Tag>
        <Tag color={isAvailable ? 'green' : 'red'}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </Tag>
        {redeemedAt ? <Tag color="red">Redeemed</Tag> : null}
      </div>
      {displayTransfer && handleTransfer ? (
        <Button
          style={{ marginTop: '0.5rem' }}
          type="primary"
          onClick={handleTransfer}
        >
          Transfer Voucher
        </Button>
      ) : null}

      {displayRedeem && handleRedeem ? (
        <Button
          style={{ marginLeft: '1rem', marginTop: '0.5rem' }}
          type="primary"
          onClick={handleRedeem}
        >
          Redeem Voucher
        </Button>
      ) : null}
    </Card>
  );

  return card;
};
