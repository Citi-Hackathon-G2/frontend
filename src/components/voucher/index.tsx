import { FC, CSSProperties } from 'react';
import { Card, Tag, Badge } from 'antd';

import { Voucher } from '../../utils';

import styles from './index.module.css';
import { RightCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const { Meta } = Card;

type VoucherCardProps = Voucher & {
  style?: CSSProperties | undefined;
  displayView?: boolean | undefined;
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
            {' '}
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
      </div>
    </Card>
  );

  return redeemedAt ? (
    <Badge.Ribbon text="Redeemed" color="red">
      {card}
    </Badge.Ribbon>
  ) : (
    card
  );
};
