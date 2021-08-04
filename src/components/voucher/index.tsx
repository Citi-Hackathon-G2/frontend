import { FC, CSSProperties } from 'react';
import { Card, Tag, Badge } from 'antd';

import { Voucher } from '../../utils';

import styles from './index.module.css';

const { Meta } = Card;

type VoucherCardProps = Voucher & {
  style?: CSSProperties | undefined;
};

export const VoucherCard: FC<VoucherCardProps> = ({
  title,
  description,
  price,
  expireAt,
  style,
  user,
  redeemedAt,
}) => {
  const isAvailable = !!user === false;

  const card = (
    <Card className={styles.shadow} style={style} size="small">
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
