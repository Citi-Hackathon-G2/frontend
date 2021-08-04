import { User } from './user';

type Shop = {
  id: string;
  name: string;
  tags: string[];
  vouchers: any[]; // vouchers which shop has
};

type Voucher = {
  id: string;
  title: string;
  description?: string | undefined;
  price: string;
  createdAt: Date;
  expireAt?: Date | undefined;
  redeemedAt?: Date | undefined; // undefined if not yet redeemed
  user: User | undefined; // undefined if not yet bought by user
  shop: any;
};

export type { Shop, Voucher };
