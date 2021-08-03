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
    discount: {
        type: 'percentage' | 'absolute';
        amount: number;
    };
    expireAt?: Date | undefined;
    redeemedAt?: Date | undefined; // undefined if not yet redeemed
    user: User | undefined; // undefined if not yet bought by user
    shop: any;
};

export type { Shop, Voucher };
