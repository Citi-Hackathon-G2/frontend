type User = {
    id: string;
    username: string;
    email: string;
    vouchers: any[]; // vouchers which user owns
    shops: any[]; // shops which user controls
};

export type { User };
